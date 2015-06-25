var shoe = require('shoe')
var http = require('http')
var Parser = require('tap-finished')

module.exports = function node(server) {
	if (!server) {
		var port = 1024 + Math.floor(Math.random() * 8975)
		server = http.createServer()
		server.listen(port)
	}

	var sock = shoe(function (stream) {
		stream.pipe(process.stdout, { end: false })
		stream.pipe(Parser(exitOnResults))
	})
	sock.install(server, '/tap-stream')

	function exitOnResults(results) {
		var exitCode = Number(!results.ok)
		process.exit(exitCode)
	}

	return server
}
