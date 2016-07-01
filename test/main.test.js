var Storage = require('../src/main');

describe('main -', function () {

	it('default is cookie', function(){
		Storage.init();
		var keyName = 'hello';
		var keyValue = 'world';
		Storage.set(keyName, keyValue);
		expect(Storage.get(keyName, { type: 'cookie' })).toEqual(keyValue);
	});

	describe('cookie -', function(){
		beforeEach(function() {
			Storage.init({
				type: 'cookie'
			})
		});

		it('if save and get a key, it returns saved key', function(){
			var keyName = 'hello';
			var keyValue = 'world';
			Storage.set(keyName, keyValue);
			expect(Storage.get(keyName)).toEqual(keyValue);
		});

		it('if save and get multiple keys, it returns saved keys', function(){
			var keys = { hello: 'world', mars: 'earth' };
			Storage.setMultiple(keys);
			expect(Storage.getMultiple(['hello', 'mars'])).toEqual(keys);
		});	

		it('if save and get all keys, it returns all saved keys', function(){
			var keys = { hello: 'world', mars: 'earth' };
			Storage.setMultiple(keys);
			expect(Storage.getMultiple()).toEqual(keys);
		});

		it('if save, delete and get a key, it returns undefined', function(){
			var keyName = 'hello';
			var keyValue = 'world';
			Storage.set(keyName, keyValue);
			Storage.delete(keyName);
			expect(Storage.get(keyName)).toBeUndefined();
		});	

		it('if save and get a key (as localstorage), it returns saved key', function(){
			var keyName = 'hello';
			var keyValue = 'world';
			Storage.set(keyName, keyValue, { type: 'localstorage' });
			expect(Storage.get(keyName, { type: 'localstorage' })).toEqual(keyValue);
			Storage.delete(keyName, { type: 'localstorage' });
			expect(Storage.get(keyName, { type: 'localstorage' })).toBeUndefined();
		});

		it('if save and get a key (as jsobject), it returns saved key', function(){
			var keyName = 'hello';
			var keyValue = 'world';
			Storage.set(keyName, keyValue, { type: 'jsobject' });
			expect(Storage.get(keyName, { type: 'jsobject' })).toEqual(keyValue);
			Storage.delete(keyName, { type: 'jsobject' });
			expect(Storage.get(keyName, { type: 'jsobject' })).toBeUndefined();
		});
	});

	describe('localstorage -', function(){
		beforeEach(function() {
			Storage.init({
				type: 'localstorage'
			})
		});

		it('if save and get a key, it returns saved key', function(){
			var keyName = 'hello';
			var keyValue = 'world';
			Storage.set(keyName, keyValue);
			expect(Storage.get(keyName)).toEqual(keyValue);
		});

		it('if save and get multiple keys, it returns saved keys', function(){
			var keys = { hello: 'world', mars: 'earth' };
			Storage.setMultiple(keys);
			expect(Storage.getMultiple(['hello', 'mars'])).toEqual(keys);
		});	

		it('if save and get all keys, it returns all saved keys', function(){
			var keys = { hello: 'world', mars: 'earth' };
			Storage.setMultiple(keys);
			expect(Storage.getMultiple()).toEqual(keys);
		});

		it('if save, delete and get a key, it returns undefined', function(){
			var keyName = 'hello';
			var keyValue = 'world';
			Storage.set(keyName, keyValue);
			Storage.delete(keyName);
			expect(Storage.get(keyName)).toBeUndefined();
		});	

		it('if save and get a key (as cookie), it returns saved key', function(){
			var keyName = 'hello';
			var keyValue = 'world';
			Storage.set(keyName, keyValue, { type: 'cookie' });
			expect(Storage.get(keyName, { type: 'cookie' })).toEqual(keyValue);
			Storage.delete(keyName, { type: 'cookie' });
			expect(Storage.get(keyName, { type: 'cookie' })).toBeUndefined();
		});

		it('if save and get a key (as jsobject), it returns saved key', function(){
			var keyName = 'hello';
			var keyValue = 'world';
			Storage.set(keyName, keyValue, { type: 'jsobject' });
			expect(Storage.get(keyName, { type: 'jsobject' })).toEqual(keyValue);
			Storage.delete(keyName, { type: 'jsobject' });
			expect(Storage.get(keyName, { type: 'jsobject' })).toBeUndefined();
		});

		it('check if local storage is supported', function(){
			expect(Storage.isLocalStorageSupported()).toBe(true);
		});
	});

	describe('jsobject -', function(){
		beforeEach(function() {
			Storage.init({
				type: 'jsobject'
			})
		});

		it('if save and get a key, it returns saved key', function(){
			var keyName = 'hello';
			var keyValue = 'world';
			Storage.set(keyName, keyValue);
			expect(Storage.get(keyName)).toEqual(keyValue);
		});

		it('if save and get multiple keys, it returns saved keys', function(){
			var keys = { hello: 'world', mars: 'earth' };
			Storage.setMultiple(keys);
			expect(Storage.getMultiple(['hello', 'mars'])).toEqual(keys);
		});	

		it('if save and get all keys, it returns all saved keys', function(){
			var keys = { hello: 'world', mars: 'earth' };
			Storage.setMultiple(keys);
			expect(Storage.getMultiple()).toEqual(keys);
		});

		it('if save, delete and get a key, it returns undefined', function(){
			var keyName = 'hello';
			var keyValue = 'world';
			Storage.set(keyName, keyValue);
			Storage.delete(keyName);
			expect(Storage.get(keyName)).toBeUndefined();
		});	

		it('if save and get a key (as cookie), it returns saved key', function(){
			var keyName = 'hello';
			var keyValue = 'world';
			Storage.set(keyName, keyValue, { type: 'cookie' });
			expect(Storage.get(keyName, { type: 'cookie' })).toEqual(keyValue);
			Storage.delete(keyName, { type: 'cookie' });
			expect(Storage.get(keyName, { type: 'cookie' })).toBeUndefined();
		});

		it('if save and get a key (as localstorage), it returns saved key', function(){
			var keyName = 'hello';
			var keyValue = 'world';
			Storage.set(keyName, keyValue, { type: 'localstorage' });
			expect(Storage.get(keyName, { type: 'localstorage' })).toEqual(keyValue);
			Storage.delete(keyName, { type: 'localstorage' });
			expect(Storage.get(keyName, { type: 'localstorage' })).toBeUndefined();
		});
	});

	describe('logger -', function(){
		var logger;

		beforeEach(function() {
			logger = {
				log: function(){},
				info: function(){},
				warn: function(){},
				error: function(){}
			};

			spyOn(logger, 'log');

			Storage.init({
				type: 'cookie',
				logger: logger,
				verbose: true
			})
		});

		it('init method logs', function(){
			expect(logger.log.calls.count()).toEqual(1);
		});

		it('set method logs key, value and options', function(){
			var key = 'hello', value = 'world', options = { type: 'jsobject' };
			Storage.set(key, value, options);
			expect(logger.log).toHaveBeenCalledWith('Storage', 'set', key, value, options);
		});

		it('get method logs key, value and options', function(){
			var key = 'hello', value = 'world', options = { type: 'jsobject' };
			Storage.set(key, value, options);
			Storage.get(key, options);
			expect(logger.log).toHaveBeenCalledWith('Storage', 'get', key, value, options);
		});

		it('delete method logs key and options', function(){
			var key = 'hello', value = 'world', options = { type: 'jsobject' };
			Storage.set(key, value, options);
			Storage.delete(key, options);
			expect(logger.log).toHaveBeenCalledWith('Storage', 'delete', key, options);
		});

		it('setMultiple method logs keys, values and options', function(){
			var keys = {hello: 'world', mars: 'earth'}, options = { type: 'jsobject' };
			Storage.setMultiple(keys, options);
			expect(logger.log).toHaveBeenCalledWith('Storage', 'setMultiple', keys, options);
		});

		it('getMultiple method logs key, value and options', function(){
			var keys = {hello: 'world', mars: 'earth'}, options = { type: 'jsobject' };
			Storage.setMultiple(keys, options);
			Storage.getMultiple(['hello', 'mars'], options);
			expect(logger.log).toHaveBeenCalledWith('Storage', 'getMultiple', {hello: 'world', mars: 'earth'}, options);
		});
	});
});