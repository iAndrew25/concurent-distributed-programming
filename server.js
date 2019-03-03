let {GREETINGS, NAME, AGE, LOCATION, HOBBYS} = require('./constants'),
	{sendMessage} = require('./tools'),
	WebSocket = require('ws').Server,
	wss = new WebSocket({ port: 8080 });

wss.on('connection', ws => {
	console.log('[SERVER]: Conexiune nouă.');

	ws.on('message', payload => {
		console.log('mesaj nou')
		let {message, type} = JSON.parse(payload);
		
		console.log(type, '[CLIENT]:', message, '\n');

		switch(type) {
			case GREETINGS:
				ws.send(sendMessage('Hei, clientule! Cum te numești?', NAME));
				break;

			case NAME:
				ws.send(sendMessage(`Bună, ${message}! Câți ani ai?`, AGE));
				break;

			case AGE:
				ws.send(sendMessage(`Wow, ${message} ani, ești mare! De unde ești?`, LOCATION));
				break;

			case LOCATION:
				ws.send(sendMessage(`${message}... frumos oraș.`, LOCATION));
				break;

			default:
				ws.send(sendMessage(`Nu înțeleg.`, LOCATION));
		}	
	});
	
	ws.on('close', () => {
		console.log('[SERVER]: Conexiune terminata.')
	});
});