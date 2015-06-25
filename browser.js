var shoe = require('shoe')

module.exports = function browser(tape) {
	tape.createStream()
		.pipe(shoe('/tap-stream'))
		.on('end', window.close.bind(window))
}
