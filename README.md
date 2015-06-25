tape-results
=========

Get the tap output from tape in your console, and exit with an appropriate exit code.

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

var addr = server.address()
console.log('Server listening on ' + addr.address + ':' addr.port)
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

# travis

When using with travis, [you have to use firefox and xvfb](http://docs.travis-ci.com/user/gui-and-headless-browsers/#Using-xvfb-to-Run-Tests-That-Require-GUI-(e.g.-a-Web-browser)).

Add this to your `.travis.yml` file:

```yml
before_install:
- "export DISPLAY=:99.0"
- "sh -e /etc/init.d/xvfb start"
```

Then, in your server code, add this:

```js
var spawn  = require('child_process').spawn
var firefox = require('firefox-location')
if (!firefox) throw new Error('Firefox was not found!')

spawn(firefox, ['http://localhost:' + port + '/'])
```

# install

With [npm](http://nodejs.org/download) do:

	npm install tape-results

# license

[VOL](http://veryopenlicense.com)
