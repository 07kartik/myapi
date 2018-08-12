const handleSignin = (req, res, db, bcrypt) => {
/*	bcrypt.compare('cookies', '$2a$10$vXUee1fobhxAkjMzmckEmeHzIF5ht2/TGyok8rNY7wIPSHEBOcqF2', (err, res) => {
		console.log('First Guess', res);
	});
bcrypt.compare('helloworld', '$2a$10$vXUee1fobhxAkjMzmckEmeHzIF5ht2/TGyok8rNY7wIPSHEBOcqF2', (err, res) => {
		console.log('Second Guess', res);
	if (req.body.email === database.user[0].email &&
					req.body.password === database.user[0].password) {
		res.json('success');
	} else {
		res.status(400).json('error logging in')
	}
	});*/

	const { email, password } = req.body;

if (!email || !password) {
	return res.status(400).json('incorrect form submission');
}

	db.select('email', 'hash').from('login')
				.where('email', '=', email)
				.then(data => {
						const isValid = bcrypt.compareSync(password, data[0].hash);
						if (isValid) {
								return db.select('*').from('users')
									.where('email', '=', email)
									.then(user => {
										console.log(user[0])
										res.json(user[0])
								})
								.catch(err => res.status(400).json('unable to get user'))
						} else {
									res.status(400).json('Wrong Credentials')
						}
				})
					.catch(err => res.status(400).json('wrong credentials'))
}

module.exports = {
	handleSignin: handleSignin
}