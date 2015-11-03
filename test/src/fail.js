var test = require('tape')
var results = require('../../index.js')

results(test)

test('zero', function (t) {
	t.fail('one')
	t.end()
})
