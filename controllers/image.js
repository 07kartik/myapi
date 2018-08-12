const Clarifai = require('clarifai');

const app = new Clarifai.App({
  apiKey:'a70dbde901094768ae4eea809dcadd0e',
  });	

const handleApiCall = (req, res) => {
  app.models
    .predict(Clarifai.FACE_DETECT_MODEL, 
      req.body.input)
    .then(data => {
    	res.json(data);
    })
    .catch(err => res.status(400).json('Unable to work with API'))
}

const handleImage = (db) => (req, res) => {
	const { id } = req.body;
	/*{	let found = false;
			database.user.forEach(user => {
				if (user.id === id) {
					found = true;
					user.entries++;
					return	res.json(user.entries);
					}
		})
			if (!found) {
				res.status(400).json('not found');
			}}*/
			db('users').where('id', '=', id)
				.increment('entries', 1)
				.returning('entries')
				.then(entries => {
					// console.log(entries);
					res.json(entries[0]);
				})
				.catch(err => res.status(400).json('unable to get entries'))
}

module.exports = {
	handleImage,
	handleApiCall 
}