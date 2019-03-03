module.exports = {
	sendMessage: (message, type) => JSON.stringify({
		message: message.replace(/(\n|\r)+$/, ''),
		type
	})
}