require('dotenv').config()

const cors = require('cors')
const express = require("express");
const { json } = require("body-parser");
const massive = require('massive')
const session = require('express-session')
const app = express();
const {SERVERPORT, CONNECTION_STRING, SESSION_SECRET} = process.env;
const c = require('./Controllers/controller')
const ac = require('./Controllers/auth_controller')
const uc = require('./Controllers/user_controller')
const pc = require('./Controllers/pet_controller')

// app.use(cors({origin:true, credentials:true}))
app.use(json())
app.use(cors())
// app.use(express.static(path.join(__dirname, '../src')));

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


// const whitelist = ['http://localhost:3000', 'http://localhost:5001','https://firebasestorage.googleapis.com/']
// var corsOptions = {
//   origin: function (origin, callback) {
//     if (whitelist.indexOf(origin) !== -1 || !origin) {
//       callback(null, true)
//     } else {
//       callback(new Error('Not allowed by CORS'))
//     }
//   }
// }
massive(process.env.CONNECTION_STRING)
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

// app.options('/api/profile/exif', cors())
// app.get('/api/profile/exif', uc.getProfileExif)

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

app.listen(SERVERPORT, () => {
    console.log(`Listening on ${SERVERPORT}`)})