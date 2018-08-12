const handleProfileGet = (req, res, db) => {
	const { id } = req.params;
/*{	database.user.forEach(user => {
	let found = false;
		if (user.id === id) {
			return	res.json(user);
			found = true;
		} 
	if (!found) {
		res.status(400).json('not found');
	}
	})}*/
	db.select('*').from('users').where({
		id: id
	}).then(user => {
		if (user.length) {
		res.json(user[0]);		
		} else {
			res.status(400).json('not found')
		}
	})
		.catch(err => res.status(400).json('Error getting user'))
}

module.exports = {
handleProfileGet
}