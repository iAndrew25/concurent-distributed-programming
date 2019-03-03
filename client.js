let {GREETINGS, NAME, AGE, LOCATION, HOBBYS} = require('./constants'),
	{sendMessage} = require('./tools'),
	WebSocket = require('ws'),
	ws = new WebSocket('ws://localhost:8080'),
	standard_input = process.stdin;

standard_input.setEncoding('utf-8');

ws.on('open', function open() {
	ws.send(sendMessage('Hei, server!', GREETINGS));
});

ws.on('message', payload => {
	let {message, type} = JSON.parse(payload);

	console.log('[SERVER]', message, '\n');
	standard_input.on('data', input => {
		switch(type) {
			case NAME:
				ws.send(sendMessage(input, NAME));
				break;

			case AGE:
				ws.send(sendMessage(input, AGE));
				break;

			case LOCATION:
				ws.send(sendMessage(input, LOCATION));
				break;
		}
	});
});