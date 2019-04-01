const app = require('express')(),
	bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
	extended: true
}));

let persons = [{
	ssn: 1931125,
	name: 'Andrei',
	age: 25
}, {
	ssn: 1941029,
	name: 'Cosmin',
	age: 24
}, {
	ssn: 2950611,
	name: 'Diana',
	age: 23
}];

app.get('/persons', (req, res) => {
	try {
		return res.status(200).json(persons);
	} catch(error) {
		return res.status(500).json({message: 'There has been an internal server error.'});
	}
});

app.get('/persons/:ssn', (req, res) => {
	try {
		let ssn = req.params.ssn,
			newList = persons.find(person => person.ssn === ssn);

		if(newList) {
			return res.status(200).json(newList);
		} else {
			return res.status(404).json({message: 'User not found.'});
		}
	} catch(error) {
		return res.status(500).json({message: 'There has been an internal server error.'});
	}
});

app.post('/persons', (req, res) => {
	try {
		let person = req.body.person,
			persons = [...persons, person];

		return res.status(200).json(persons);
	} catch(error) {
		return res.status(500).json({message: 'There has been an internal server error.'});
	}
});

app.put('/persons/:ssn', (req, res) => {
	try {
		let ssn = req.params.ssn,
			personData = req.body.person,
			found = false;

		let newList = persons.map(person => {
			if(person.ssn === ssn) {
				found = true;
				return {
					...person,
					personData
				}
			} else {
				return person;
			}
		});

		if(found) {
			persons = newList;
			return res.status(200).json({message: 'User data successfully changed.'});		
		} else {
			return res.status(404).json({message: 'User not found.'});
		}
	} catch(error) {
		return res.status(500).json({message: 'There has been an internal server error.'});
	}
});

app.delete('/persons/:ssn', (req, res) => {
	try {
		let ssn = req.params.ssn, 
			newList = persons.filter(person => person.ssn !== ssn);

		if(newList.length === persons) {
			return res.status(404).json({message: 'User not found.'});
		} else {
			persons = newList;
			return res.status(200).json({message: 'User successfully removed.'});		
		}
	} catch(error) {
		return res.status(500).json({message: 'There has been an internal server error.'});
	}
});

app.listen(8080, () =>
	console.log('Server listening on port 8080'),
);