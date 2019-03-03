let {GREETINGS, NAME, AGE, LOCATION, HOBBYS} = require('./constants'),
	{sendMessage} = require('./tools'),
	WebSocket = require('ws'),
	ws = new WebSocket('ws://localhost:8080');

const readline = require('readline').createInterface({
	input: process.stdin,
	output: process.stdout
});

ws.on('open', function open() {
	ws.send(sendMessage('Hei, server!', GREETINGS));
});

ws.on('message', payload => {
	let {message, type} = JSON.parse(payload);

	readline.question(`[SERVER]: ${message}\n`, answer => {
		switch(type) {
			case NAME:
				ws.send(sendMessage(answer, NAME));
				break;

			case AGE:
				ws.send(sendMessage(answer, AGE));
				break;

			case LOCATION:
				ws.send(sendMessage(answer, LOCATION));
				break;

			default:
				ws.send(sendMessage('Nu înțeleg.'));
		}
	});
});

ws.on('close', () => {
	console.log('[Client]: Byee.')
});