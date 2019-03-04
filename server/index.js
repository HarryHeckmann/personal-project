require('dotenv').config()

const cors = require('cors')
const express = require("express");
const { json } = require("body-parser");
const massive = require('massive')
const session = require('express-session')
const nodemailer = require('nodemailer')
const app = express();
const {SERVERPORT, CONNECTION_STRING, SESSION_SECRET, MAIL_USER, MAIL_PASS} = process.env;
const c = require('./Controllers/controller')
const ac = require('./Controllers/auth_controller')
const uc = require('./Controllers/user_controller')
const pc = require('./Controllers/pet_controller')

const transport = {
    host: 'smtp.gmail.com',
    // port: 587,
    secure: true,
    // requireTLS: true,
    auth: {
        user: MAIL_USER,
        pass: MAIL_PASS
    }
  }
  
  const transporter = nodemailer.createTransport(transport)
  
  transporter.verify((error, success) => {
    //   console.log(MAIL_USER, MAIL_PASS)
    if (error) {
      console.log(error);
    } else {
      console.log('Server is ready to take messages');
    }
  })

app.use(json())
app.use(cors())

app.use( express.static( `${__dirname}/../build` ) )

app.use(
    session({
        secret: SESSION_SECRET,
        resave: true,
        saveUninitialized: false,
        cookie: {
            maxAge: 1000*60*60*24*7
        }
    })
)
massive(CONNECTION_STRING)
    .then(dbInstance => {
        console.log('Database connected')
        app.set('db', dbInstance)
        })
    .catch(err => {
        console.log(err)
    })

app.post('/auth/register', ac.register)
app.post('/auth/login', ac.login)
app.delete('/auth/logout', ac.logout)

app.post('/api/breed_results', pc.getBreedResults)
app.post('/api/user/favorites', pc.updateFavorited)
app.get('/api/user/favorites', pc.getFavorites)
app.delete('/api/deletefavorite/:id', pc.deleteFavorite)

app.get('/api/breeds', c.getBreeds)
app.post('/api/pets', c.getPets)
app.get('/api/pet/:id', c.getPet)
app.get('/api/shelter/:id', c.getShelterInfo)
app.get('/api/pets/shelter/:id', c.getShelterPets)

app.get('/api/user', uc.getUser)
app.get('/api/user/pets', uc.getUserPets)
app.put('/api/user', uc.updateUser)
app.put('/api/user/pets', uc.updateUserPets)
app.put('/api/user/breeds', uc.saveBestBreeds)
app.delete('/api/deletepet/:id', uc.deletePet)


.post('/api/contact/shelter', c.contactShelter)

app.listen(SERVERPORT, () => {
    console.log(`Listening on ${SERVERPORT}`)})