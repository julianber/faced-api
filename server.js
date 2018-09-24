const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require ('cors');
const knex = require ('knex')

const register = require('./controllers/register');
const signin = require('./controllers/signin');
const profile = require('./controllers/profile');
const image = require('./controllers/image');

const db = knex({
  client: 'pg',
  connection: {
    host : '127.0.0.1',
    user : 'postgres',
    password : '80135213',
    database : 'smart-brain'
  }
});

// db.select('*').from('users').then(data=>{
//     console.log(data);
// });

const app = express();

app.use(bodyParser.json());
app.use(cors());

app.get('/', (req, res)=>{
    res.send(database.users);
})

//signin --> POST = succes/fail
app.post('/signin', signin.handleSignin(db, bcrypt))

//register -->   POST = user
app.post('/register', (req, res) => { register.handleRegister(req, res, db, bcrypt) })

//profile /:userID --> GET = user
app.get('/profile/:id', (req, res) => { profile.handleProfile(req, res, db) })

//image --> PUT --> user
app.put ('/image', (req, res) => {image.handleImage(req, res, db)})

const PORT = process.env.PORT;

app.listen(PORT,()=>{
    console.log(`app is running on porte ${PORT}`);
})
