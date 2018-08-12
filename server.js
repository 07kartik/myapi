const ex = require('express');
const bp = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');

const register = require('./controllers/register.js');
const signin = require('./controllers/signin.js')
const profile = require('./controllers/profileid.js')
const image = require('./controllers/image.js');


const db = knex({
	client: 'pg',
	connection: {
		host: '127.0.0.1',
		user: 'kartik',
		password: '0111',
		database: 'fra'
	}
})

/*
const database = {
	user: [
			{
				id: '123',
				name: 'Parveen',
				email: 'parveen@g.com',
				password: 'hello',
				entries: 0,
				joined: new Date()
			},
			{
				id: '124',
				name: 'Radhika',
				email: 'radhika@gmail.com',
				password: 'radhika4',
				entries: 0,
				joined: new Date()
			}
	]
}
db.select('*').from('users').then(data => {
	console.log(data);
});*/

const app = ex();

app.use(bp.json());
app.use(cors());


app.get('/', (req, res) => {
	res.send(database.user);
})

app.post('/signin', (req,res) => {signin.handleSignin(req, res, db, bcrypt)});

app.post('/register', (req, res) => {register.handleRegister(req, res, db, bcrypt)});

app.get('/profile/:id', (req, res) => {profile.handleProfileGet(req, res, db)});

app.put('/image', image.handleImage(db));

app.post('/imageurl', (req, res) => {image.handleApiCall(req, res)})
{/*
bcrypt.hash('cookies', null, null, (err, hash) => {

});

bcrypt.compare('cookies', null, null, (err, hash) => {

});
*/}

app.listen(3007, () => {
	console.log('App is running on port 3007');
});


/*
/ --> res = this is working
/signin --> POST = success/fail
/register --> POST = user
/profile/:userId --> GET = user
/image --> PUT --> user
*/