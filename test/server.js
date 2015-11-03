var http = require('http')
var ecstatic = require('ecstatic')
var results = require('../index.js')
var launch = require('opener')

var clientTestFile = process.argv[2]
if (!clientTestFile) throw new Error('no test file provided')

var server = http.createServer(ecstatic({ root: __dirname + '/serve' }))
var port = 1024 + Math.floor(Math.random() * 8985)
server.listen(port)
results(server)

launch('http://localhost:' + port + '/' + clientTestFile)
