(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.Storage = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
module.exports = new function(){

	var tryParse = function(value){
        try { 
            return JSON.parse(value);
        } catch (err) {
            return value;
        }
    };

    var CookieIterator = function(){
        var cookiesList = document.cookie.split(';');

        this.hasNext = function(){
            return cookiesList.length > 0;
        };

        this.next = function(){
            // return undefined if the list is empty
            if (cookiesList.length === 0) {
                return undefined;
            }

            // dequeue first element of cookiesList
            var toReturn = cookiesList.shift();

            // remove leading whitespaces only
            var charPos = 0;
            while (toReturn[charPos] === ' '){
                charPos++;
            }
            toReturn = toReturn.substring(charPos);

            // split 'key=value' string by first '=' occurrence (regex greedy operator)
            var values = toReturn.split(/=(.+)?/);
            return [values[0], values[1]];
        };
    };

    var newCookieIterator = function(){
        return new CookieIterator();
    };

    this.get = function(key){
        var iter = newCookieIterator();
        var result = iter.next();

        while (result){
            if (result[0] === key){
                return tryParse(result[1]);
            }
            result = iter.next();
        }
        return undefined;
    };

    this.set = function(key, value, options){
        var newCookie = key + '=' + JSON.stringify(value);
        
        // set default exdays value
        if(!!options){
	        if (typeof(options.exdays) !== 'undefined'){
	            var d = new Date();
	            d.setTime(d.getTime() + (options.exdays * 24 * 60 * 60 * 1000));
	            newCookie += '; expires=' + d.toUTCString();
	        } else if(typeof(options.exhours) !== 'undefined') {
	        	var d = new Date();
	            d.setTime(d.getTime() + (options.exhours * 60 * 60 * 1000));
	            newCookie += '; expires=' + d.toUTCString();
	        } else if(typeof(options.exminutes) !== 'undefined') {
	        	var d = new Date();
	            d.setTime(d.getTime() + (options.exminutes * 60 * 1000));
	            newCookie += '; expires=' + d.toUTCString();
	        }
	    }
            
        // set cookie
        document.cookie = newCookie;
    };

    this.getMultiple = function(keys){
        var toReturn = {};
        var iter = newCookieIterator();
        var result = iter.next();
        while (result) {
            if (!keys || keys.indexOf(result[0]) > -1) {
                toReturn[result[0]] = tryParse(result[1]);
            }
            result = iter.next();
        }
        return toReturn;
    };

    this.setMultiple = function(params, options){
        for (var key in params){
            this.set(key, params[key], options);
        }
    };

    this.delete = function(key){
        this.set(key, '', { exdays: -1 });
    };

};
},{}],2:[function(require,module,exports){
module.exports = new function(){

	var jsObj = {};

    this.get = function(key){
        return jsObj[key];
    };

    this.set = function(key, value){
        jsObj[key] = value;
    };

    this.getMultiple = function(keys){
        var toReturn = {};
        var index, key;
        if (!!keys){
            for (index in keys){
                key = keys[index];
                toReturn[key] = jsObj[key];
            }
        } else {
            for (key in jsObj){
                toReturn[key] = jsObj[key];
            }
        }
        return toReturn;
    };

    this.setMultiple = function(params){
        for (var key in params){
            this.set(key, params[key]);
        }
    };

    this.delete = function(key){
        delete jsObj[key];
    };

};
},{}],3:[function(require,module,exports){
module.exports = new function(){

    var tryParse = function(value){
        try { 
            return JSON.parse(value);
        } catch (err) {
            return value;
        }
    };

    this.get = function(key){
        return window.localStorage.getItem(key) !== null ? tryParse(window.localStorage.getItem(key)) : undefined;
    };

    this.set = function(key, value){
        window.localStorage.setItem(key, JSON.stringify(value));
    };

    this.getMultiple = function(keys){
        var toReturn = {};
        var index, key;
        if (!!keys){
            for (index in keys){
                key = keys[index];
                toReturn[key] = this.get(key);
            }
        } else {
            for (var i = 0, len = localStorage.length; i < len; ++i){
                key = localStorage.key(i);
                toReturn[key] = this.get(key);
            }
        }
        return toReturn;
    };

    this.setMultiple = function(params){
        for (var key in params){
            this.set(key, params[key]);
        }
    };

    this.delete = function(key){
        window.localStorage.removeItem(key);
    };

};
},{}],4:[function(require,module,exports){

module.exports = new function() {

	var storages = {
	    'cookie': require('./cookie'),
	    'localstorage': require('./localstorage'),
	    'jsobject': require('./jsobject')
	};
    
	var selectedStorage, logger, verbose;

    this.init = function(options){
    	if (options.logger){
            logger = options.logger;
        } else {
            logger = { 
                debug: function(){},
                log: function(){},
                info: function(){},
                warn: function(){},
                error: function(){}
            };
        }

        if (options.verbose){
            verbose = options.verbose;
        } else {
            verbose = false;
        }

        if(options.type){
        	selectedStorage = storages[options.type];
        } else {
        	selectedStorage = storages['cookie'];
        }

        logger.log('Storage', 'init', options);
    };

    this.set = function(key, value, options){
        if(!!options && !!options.type){
            storages[options.type].set(key, value, options);
        } else {
            selectedStorage.set(key, value, options);
        }

        logger.log('Storage', 'set', key, value, options);
    };

    this.get = function(key, options){
        var value;
        if(!!options && !!options.type){
            value = storages[options.type].get(key, options);
        } else {
            value = selectedStorage.get(key, options);
        }
        
        if(verbose){
       		logger.log('Storage', 'get', key, value, options);
       	}

        return value;
    };

    this.getMultiple = function(keys, options){
        var values;
        if(!!options && !!options.type){
            values = storages[options.type].getMultiple(keys, options);
        } else {
            values = selectedStorage.getMultiple(keys, options);
        }
        
        if(verbose){
       		logger.log('Storage', 'getMultiple', values, options);
       	}

        return values;
    };

    this.setMultiple = function(params, options){
        if(!!options && !!options.type){
            storages[options.type].setMultiple(params, options);
        } else {
            selectedStorage.setMultiple(params, options);
        }
        
        logger.log('Storage', 'setMultiple', params, options);
    };

    this.delete = function(key, options){
        if(!!options && !!options.type){
            storages[options.type].delete(key, options);
        } else {
            selectedStorage.delete(key, options);
        }
        
        logger.log('Storage', 'delete', key, options);
    };

    this.isLocalStorageSupported = function(){
        var name = 'test';
        try {
            localStorage.setItem(name, name);
            localStorage.getItem(name);
            localStorage.removeItem(name);
            return true;
        } catch (e) {
            return false;
        }
    };
};
},{"./cookie":1,"./jsobject":2,"./localstorage":3}]},{},[4])(4)
});