var browserify = require('browserify')
var fs = require('fs')
var results = require('../index.js')
var spawn  = require('child_process').spawn
var browser = require('chrome-location') || require('firefox-location')

if (!browser) throw new Error('No browser found!')

var clientTestFile = process.argv[2]
if (!clientTestFile) throw new Error('no test file provided')
var server = results()
var port = server.address().port
var template = fs.readFileSync(__dirname + '/template.html', { encoding: 'utf-8' })

browserify(clientTestFile).bundle(function (err, buf) {
	if (err) throw err
	var html = template.replace('CODE', buf.toString())

	server.on('request', function (req, res) {
		res.end(html)
	})

	spawn(browser, ['http://localhost:' + port + '/'])
})
