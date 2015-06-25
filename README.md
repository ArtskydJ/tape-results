tape-results
=========

Get the tap output from tape in your console, and exit with an appropriate exit code

[![Build Status](https://travis-ci.org/ArtskydJ/tape-results.svg)](https://travis-ci.org/ArtskydJ/tape-results)
[![Dependency Status](https://david-dm.org/artskydj/tape-results.svg)](https://david-dm.org/artskydj/tape-results)
[![devDependency Status](https://david-dm.org/artskydj/tape-results/dev-status.svg)](https://david-dm.org/artskydj/tape-results#info=devDependencies)

Like [smokestack](https://github.com/hughsk/smokestack) but it allows you to write your own server code.

# example

*browser-test.js*
```js
var test = require('tape')
var results = require('tape-results')

results(test)

test('thing', function (t) {
	t.pass('hi')
	t.end()
})
```

*server.js*
```js
var results = require('tape-results')
var ecstatic = require('ecstatic')

var server = results()
var requestHandler = ecstatic(__dirname + '/public' )
server.on('request', requestHandler)
```

# api

```js
var results = require('tape-results')
```

## `results(tape)` (Client-side)

Just pass it `test` from `var test = require('tape')`.

## `results([server])` (Server-side)

If you don't supply a server, it will create a server on a random port, and return it.

The `server` object returned is an [`http.Server`](https://nodejs.org/api/http.html#http_class_http_server) instance.

When tape is finished on the browser, `server.close()` and `process.exit()` are called.

# install

With [npm](http://nodejs.org/download) do:

	npm install tape-results

Made to work in the browser using [browserify](https://github.com/substack/node-browserify).

# license

[VOL](http://veryopenlicense.com)
