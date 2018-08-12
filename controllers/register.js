const handleRegister = (req, res, db, bcrypt) => {
		const { email, name, password } = req.body;
		const hash = bcrypt.hashSync(password);
		/*{bcrypt.hash(password, null, null, (err, hash) => {
					console.log(hash);
});}*/
	/*{	database.user.push({
					id: '14',
					name: req.body.name,
					email: req.body.email,
					entries: 0,
					joined: new Date()
				})}*/

				if( !name || !email || !password) {
					return res.status(400).json('incorret form submission');
				}

				db.transaction(trx => {
					trx.insert({
						hash: hash,
						email: email
					})
						.into('login')
						.returning('email')
						.then(loginEmail => {
							return	trx('users')
									.returning('*')
									.insert({
											email: loginEmail[0],
											name: name,
											joined: new Date()
									})
								.then(user => {
										res.json(user[0]);	
								})
						})
								.then(trx.commit)
								.catch(trx.rollback)
				})
			
		.catch(err => res.status(400).json('Unable to Register'))
}

module.exports = {
	handleRegister: handleRegister
};