tape-results
=========

> Get the tap output from the browser to your console, and exit with an appropriate exit code

[![Build Status](https://travis-ci.org/ArtskydJ/tape-results.svg)](https://travis-ci.org/ArtskydJ/tape-results)

Like [smokestack](https://github.com/hughsk/smokestack) but it allows you to write your own server code.

# example

Write your tests for the browser:

```js
// test.js
var test = require('tape')
var results = require('tape-results')
var xhr = require('xhr')
results(test)

test('running in the browser', function (t) {
	t.notEqual(document, undefined)
	t.end()
})

test('serving index.html', function (t) {
	xhr('/index.html', function (err, res, body) {
		t.ifError(err)
		t.ok(res)
		t.notEqual(body.indexOf('meta charset'), -1, 'found the text "meta charset"')
		t.end()
	})
})
```

Write your code for the server:
```js
// server.js
var results = require('tape-results')
var ecstatic = require('ecstatic')

var server = results()
server.on('request', ecstatic({ root: __dirname }))

var a = server.address()
console.log('Server listening on ' + a.address + ':' a.port)
```

You'll need a page to run the test:
```html
<!DOCTYPE html>
<title>test</title>
<script src="/test.js"></script>
<!-- this is valid html according to https://validator.w3.org/nu/#textarea -->
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
var launch  = require('opener')
launch('http://localhost:' + port + '/')
```

# install

With [npm](http://nodejs.org/download) do:

	npm install tape-results

# license

[VOL](http://veryopenlicense.com)
