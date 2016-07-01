// COOKIE

Storage.init({
	type: 'cookie',
	logger: console,
	verbose: true
});

console.log("********");

Storage.set('two-day', true, { exdays: 2 });
Storage.get('two-day');

Storage.set('two-hours', true, { exhours: 2 });
Storage.get('two-hours');

Storage.set('two-minutes', true, { exminutes: 2 });
Storage.get('two-minutes');

console.log("********");

Storage.set('deleted-key', 'pluto');
Storage.delete('deleted-key');
Storage.get('deleted-key');

console.log("********");

Storage.setMultiple({
	first: 'one',
	second: 'two'
});
Storage.getMultiple(['first', 'second']);

console.log("********");

// LOCALSTORAGE

console.log(Storage.isLocalStorageSupported());
Storage.set('local-storage-key', 'pippo', { type: 'localstorage' });
Storage.get('local-storage-key', { type: 'localstorage' });

console.log("********");

// JSOBJECT

Storage.set('jsobject-key', 'pippo', { type: 'jsobject' });
Storage.get('jsobject-key', { type: 'jsobject' });