/**
 * @ngdoc object
 * @name Storage
 *
 * @description
 * Storage is the library to save and get data in different ways.
 *
 * # Import & Usage
 * <pre>
 * <script type="text/javascript" src="./bower_components/storage-pro/dist/dist.js"> 
 * </pre>
 * Now you can use global object **Storage** and associated methods, described below. <br/>
 * You can start by initializing it with {@link Storage#methods_init init} method.
 */

module.exports = new function() {

    var storages = {
        'cookie': require('./cookie'),
        'localstorage': require('./localstorage'),
        'jsobject': require('./jsobject')
    };
    
    var selectedStorage, logger, verbose;

    /**
     * @ngdoc function
     * @name Storage#init
     * @methodOf Storage
     *
     * @description Init storage module.
     *
     * @param {Object} options (see attributes below)
     * @param {string} [options.type='cookie'] Define default storage that you want to use. <br/>
     * It must be one of these options:
     *
     * - localstorage
     * - cookie
     * - jsobject
     *
     * @param {Object} options.logger any object containing the following methods: debug, log, info, warn, error
     * @param {boolean} [options.verbose=false] if true Storage logs also get methods
     *
     * @example
     * <pre>
     *  Storage.init({
     *    type: 'cookie',
     *    logger: console
     *    verbose: false
     * });
     * </pre>
     * 
    */
    this.init = function(options){
        if (!!options && options.logger){
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

        if (!!options && options.verbose){
            verbose = options.verbose;
        } else {
            verbose = false;
        }

        if(!!options && options.type){
            selectedStorage = storages[options.type];
        } else {
            selectedStorage = storages.cookie;
        }

        logger.log('Storage', 'init', options);
    };

    /**
     * @ngdoc function
     * @name Storage#set
     * @methodOf Storage
     *
     * @description 
     * This method is used to set a value in the storage.
     *
     * @param {string} key key to identify data
     * @param {*} value data to store
     * @param {Object} options (see param below)
     * @param {string} [options.type=null] type of storage where save data, use this only if different from default value defined before in {@link Storage#methods_init init} method
     * @param {Integer} [options.exdays=null] expirations days of saved data (valid only for cookie)
     * @param {Integer} [options.exhours=null] expirations hours of saved data (valid only for cookie, if exdays is undefined)
     * @param {Integer} [options.exminutes=null] expirations minutes of saved data (valid only for cookie, if exdays and exhours are undefined)
     *
     * @example
     * <pre>
     * // Storage saves variable in default type storage (defined in init method)
     * Storage.set('country', 'it');
     *
     * // Storage saves variable as cookie
     * Storage.set('isLogged', true, {type: 'cookie'});
     * </pre>
     */
    this.set = function(key, value, options){
        if(!!options && !!options.type){
            storages[options.type].set(key, value, options);
        } else {
            selectedStorage.set(key, value, options);
        }

        logger.log('Storage', 'set', key, value, options);
    };

    /**
     * @ngdoc function
     * @name Storage#setMultiple
     * @methodOf Storage
     *
     * @description 
     * This method is used to set multiple values in the storage.
     *
     * @param {Object} key data to save
     * @param {Object} options (see param below)
     * @param {string} [options.type=null] type of storage where save data, use this only if different from default value defined before in {@link Storage#methods_init init} method
     *
     * @example
     * <pre>
     * // Storage saves variables in default type storage (defined in init method)
     * Storage.setMultiple({country: 'it', isLogged: true});
     *
     * // Storage saves variables as cookies
     * Storage.setMultiple({country: 'it', isLogged: true}, {type: 'cookie'});
     * </pre>
     */
    this.setMultiple = function(params, options){
        if(!!options && !!options.type){
            storages[options.type].setMultiple(params, options);
        } else {
            selectedStorage.setMultiple(params, options);
        }
        
        logger.log('Storage', 'setMultiple', params, options);
    };

    /**
     * @ngdoc function
     * @name Storage#get
     * @methodOf Storage
     *
     * @description 
     * This method is used to get a value from the storage.
     *
     * @param {string} key key to identify data
     * @param {Object} options (see param below)
     * @param {string} [options.type=null] type of storage where load data, use this only if different from default value defined before in {@link Storage#methods_init init} method
     *
     * @return {*} saved data
     *
     * @example
     * <pre>
     * // Storage loads variable from default type storage (defined in init method)
     * Storage.get('country', 'it');
     *
     * // Storage loads variable as cookie
     * Storage.get('isLogged', {type: 'cookie'});
     * </pre>
     */
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

    /**
     * @ngdoc function
     * @name Storage#getMultiple
     * @methodOf Storage
     *
     * @description 
     * This method is used to get multiple values from the storage.
     *
     * @param {Array} keys keys to identify data
     * @param {Object} options (see param below)
     * @param {string} [options.type=null] type of storage where load data, use this only if different from default value defined before in {@link Storage#methods_init init} method
     *
     * @return {*} saved datas
     *
     * @example
     * <pre>
     * // Storage loads variables from default type storage (defined in init method)
     * Storage.getMultiple(['country', 'isLogged']);
     * // it returns {country: 'it', isLogged: true}
     *
     * // Storage loads variables as cookie
     * Storage.getMultiple(['country', 'isLogged'], {type: 'cookie'});
     * // it returns {country: 'it', isLogged: true}
     * </pre>
     */
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

    /**
     * @ngdoc function
     * @name Storage#delete
     * @methodOf Storage
     *
     * @description 
     * This method is used to delete a stored value.
     *
     * @param {string} key key to identify value
     * @param {Object} options (see param below)
     * @param {string} [options.type=null] type of storage where delete data, use this only if different from default value defined before in {@link Storage#methods_init init} method
     *
     * @example
     * <pre>
     * // Storage delete variable from default type storage (defined in init method)
     * Storage.delete('country');
     *
     * // Storage delete variable as cookie
     * Storage.delete('country', {type: 'cookie'});
     * </pre>
     */
    this.delete = function(key, options){
        if(!!options && !!options.type){
            storages[options.type].delete(key, options);
        } else {
            selectedStorage.delete(key, options);
        }
        
        logger.log('Storage', 'delete', key, options);
    };

    /**
     * @ngdoc function
     * @name Storage#isLocalStorageSupported
     * @methodOf Storage
     *
     * @description 
     * This method is used to know if the browser support the local storage
     *
     * @return {boolean} true if supported, else false
     *
     * @example
     * <pre>
     *  if(Storage.isLocalStorageSupported()) {
     *       // store a localstorage key
     *   } else {
     *       alert('local storage is not supported');
     *   }
     * </pre>
     * 
     */
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