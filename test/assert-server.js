var cp = require('child_process')
var fs = require('fs')

var expectStatus = process.argv[2]
var expectTxtFile = 'test/expect/' + expectStatus + '.txt'
var clientFile = 'test/' + expectStatus + '.js'
var expectPass = expectStatus === 'pass'
if (!(/^(pass|fail)$/.test(expectStatus))) {
	throw new Error('expected "pass" or "fail"')
}

fs.readFile(expectTxtFile, function (err, expect) {
	if (err) throw err
	var child = cp.execFile('node', ['test/server.js', clientFile], function (err, stdout, stderr) {
		if (err && !err.killed && !err.signal && err.code === 1 && !expectPass) {
			console.log('expected fail')
		} else if (err) {
			throw err
		} else if (expect.toString() !== stdout.toString()) {
			throw new Error('neq:\n' + expect + '\n' + stdout)
		} else if (expectPass) {
			console.log('expected pass')
		} else {
			throw new Error('idk what happened but it is probably bad')
		}
	})
})
