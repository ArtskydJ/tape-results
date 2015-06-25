var test = require('tape')
var results = require('../index.js')

results(test)

test('one', function (t) {
	t.pass('two')
	t.end()
})
