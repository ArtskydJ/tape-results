var cp = require('child_process')
var fs = require('fs')
var assert = require('assert')

var expectStatus = process.argv[2]
var expectTxtFile = 'test/expect/' + expectStatus + '.txt'
var clientFile = 'test/' + expectStatus + '.js'
var expectPass = expectStatus === 'pass'
if (!(/^(pass|fail)$/.test(expectStatus))) {
	throw new Error('expected "pass" or "fail"')
}

fs.readFile(expectTxtFile, function (err, expect) {
	assert.ifError(err)
	var child = cp.execFile('node', ['test/server.js', clientFile], function (err, stdout, stderr) {
		if (expectPass) {
			console.log('expect pass')
			assert.ifError(err)
		} else {
			console.log('expect fail')
			assert.ok(err)
			assert.ok(!err.killed)
			assert.ok(!err.signal)
			assert.equal(err.code, 1)
		}
		assert.equal(expect.toString(), stdout.toString())
	})
})
