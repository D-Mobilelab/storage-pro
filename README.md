# storage-pro

[![Build Status](https://travis-ci.org/D-Mobilelab/storage-pro.svg?branch=master&v=1)](https://travis-ci.org/D-Mobilelab/storage-pro)
[![Coverage Status](https://coveralls.io/repos/github/D-Mobilelab/storage-pro/badge.svg?branch=master&v=1)](https://coveralls.io/github/D-Mobilelab/storage-pro?branch=master)
[![npm version](https://badge.fury.io/js/storage-pro.svg)](https://badge.fury.io/js/storage-pro)
[![Bower version](https://badge.fury.io/bo/storage-pro.svg)](https://badge.fury.io/bo/storage-pro)
[![GitHub version](https://badge.fury.io/gh/D-Mobilelab%2Fstorage-pro.svg?v=1)](https://badge.fury.io/gh/D-Mobilelab%2Fstorage-pro)

storage-pro is a library to set and get data in different ways.

## Usage
```
Storage.init({
	type: 'cookie',
	logger: console,
	verbose: true
});

// default storage (indicated from 'type' attribute in init)
Storage.set('country', 'it');
Storage.get('country');
Storage.delete('country');

Storage.setMultiple({
	first: 'one',
	second: 'two'
});
Storage.getMultiple(['first', 'second']);

// cookie
Storage.set('isLogged', true, { type: 'cookie' });
Storage.set('twodays', 2, { type: 'cookie', exdays: 2 });
Storage.set('twohours', true, { type: 'cookie', exhours: 2 });
Storage.set('twominutes', true, { type: 'cookie', exminutes: 2 });
Storage.get('isLogged', { type: 'cookie' });
Storage.delete('isLogged', { type: 'cookie' });

// localstorage
Storage.set('isLogged', true, { type: 'localstorage' });
Storage.get('isLogged', { type: 'localstorage' });
Storage.delete('isLogged', { type: 'localstorage' });

// jsobject
Storage.set('environment', 'webapp', { type: 'jsobject' });
Storage.get('environment', { type: 'jsobject' });
Storage.delete('environment', { type: 'jsobject' });

Storage.isLocalStorageSupported()

```

## Installation

### NPM
```
npm install --save storage-pro
```
You can found the library ready for production on <i>node_modules/storage-pro/dist/dist.js</i>

### Bower
```
bower install --save storage-pro
```
You can found the library ready for production on <i>bower_components/storage-pro/dist/dist.js</i>

## Documentation

To read documentation, go to:

[http://d-mobilelab.github.io/storage-pro/1.0.0](http://d-mobilelab.github.io/storage-pro/1.0.0)

Replace <i>1.0.0</i> with the version of the documentation you want to read.
