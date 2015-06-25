var browserify = require('browserify')
var fs = require('fs')
var results = require('../index.js')
var spawn  = require('child_process').spawn
var chrome = require('chrome-location')

var server = results()
var port = server.address().port
var template = fs.readFileSync(__dirname + '/template.html', { encoding: 'utf-8' })

browserify(__dirname + '/client.js').bundle(function (err, buf) {
	if (err) throw err
	var html = template.replace('CODE', (buf || '').toString())

	server.on('request', function (req, res) {
		res.end(html)
	})

	spawn(chrome, ['http://localhost:' + port + '/index.html'])
})
