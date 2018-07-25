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
            var toReturn, charPos, values;

            // return undefined if the list is empty
            if (cookiesList.length === 0) {
                return undefined;
            }

            // dequeue first element of cookiesList
            toReturn = cookiesList.shift();

            // remove leading whitespaces only
            charPos = 0;
            while (toReturn[charPos] === ' '){
                charPos++;
            }
            toReturn = toReturn.substring(charPos);

            // split 'key=value' string by first '=' occurrence (regex greedy operator)
            values = toReturn.split(/=(.+)?/);
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
        var parsedValue = value instanceof Object ? JSON.stringify(value) : value;
        var newCookie = key + '=' + parsedValue;
        var d = new Date();
        
        // set default exdays value
        if(!!options){
            if (typeof(options.exdays) !== 'undefined'){
                d.setTime(d.getTime() + (options.exdays * 24 * 60 * 60 * 1000));
                newCookie += '; expires=' + d.toUTCString();
            } else if(typeof(options.exhours) !== 'undefined') {
                d.setTime(d.getTime() + (options.exhours * 60 * 60 * 1000));
                newCookie += '; expires=' + d.toUTCString();
            } else if(typeof(options.exminutes) !== 'undefined') {
                d.setTime(d.getTime() + (options.exminutes * 60 * 1000));
                newCookie += '; expires=' + d.toUTCString();
            }

            if (typeof (options.path) !== 'undefined'){
                newCookie += '; path=' + options.path;
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

    this.delete = function(key, options){
        if(options && (options.path)){
            options.exdays = -1;
            this.set(key, '', options);
        } else {
            this.set(key, '', { exdays: -1 });
        }
    };

};