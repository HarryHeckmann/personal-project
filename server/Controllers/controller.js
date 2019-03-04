require('dotenv').config()
const nodemailer = require('nodemailer')
const axios = require('axios')
const { json } = require("body-parser");
const CircularJSON = require('circular-json')

const key = process.env.API_KEY

module.exports ={
    getBreeds: (req, res) => {
        axios
            .get(`http://api.petfinder.com/breed.list?key=${key}&animal=dog&format=json`)
            
            .then(response => {
                let json = CircularJSON.stringify(response.data.petfinder.breeds)
                // console.log(json)
                res.send(json)
            })
            .catch(err => {
                console.log(err)
            })
    },

    getPets: (req, res) => {
        const {animal, breed, size, sex, location, age, offset} = req.body
        // console.log(req.body)
        // console.log(animal)
        axios
            .get(`http://api.petfinder.com/pet.find?key=${key}&animal=${animal}&breed=${breed}&size=${size}&sex=${sex}&location=${location}&age=${age}&offset=${offset}&count=20&format=json`)
            .then(response => {
                let json = CircularJSON.stringify(response.data.petfinder.pets.pet)
                // let woof = CircularJSON.stringify(response.data.petfinder.pets)
                // console.log(json)
                res.send(json)
            })
            .catch(err => {
                console.log(err)
            })
    },


    getPet: (req, res) => {
        console.log(req.params.id)
        axios
            .get(`http://api.petfinder.com/pet.get?key=${key}&id=${req.params.id}&format=json`)
            .then(response => {
                // console.log(response.data)
                // let json = CircularJSON.stringify(response.data.petfinder.pet)
                let status = CircularJSON.stringify(response.data.petfinder.header.status.message.$t)
                if(status === "shelter opt-out"){
                    res.sendStatus(500).send(status)
                }
                else{
                    let woof = CircularJSON.stringify(response.data.petfinder.pet)
                    res.send(woof)
                }
            })
            .catch(err => {
                console.log(err)
            })
    },

    getShelterInfo: (req, res) => {
        console.log(req.params.id)
        axios
            .get(`http://api.petfinder.com/shelter.get?key=${key}&id=${req.params.id}&format=json`)
            .then(response => {
                console.log(response.data)
                let json = CircularJSON.stringify(response.data.petfinder.shelter)
                // let woof = CircularJSON.stringify(response.data.petfinder.pets)
                // console.log(json)
                res.send(json)
            })
            .catch(err => {
                console.log(err)
            })
    },

    getShelterPets: (req, res) => {
        axios
            .get(`http://api.petfinder.com/shelter.getPets?key=${key}&id=${req.params.id}&count=5&format=json`)
            .then(response => {
                let json = CircularJSON.stringify(response.data.petfinder.pets.pet)
                // let woof = CircularJSON.stringify(response.data.petfinder.pets)
                // console.log(json)
                res.send(json)
            })
            .catch(err => {
                console.log(err)
            })
    },

    contactShelter: (req, res, next) => {
        const transport = {
            host: 'smtp.gmail.com',
            // port: 587,
            // secure: false,
            // requireTLS: true,
            auth: {
                user: process.env.MAIL_USER,
                pass: process.env.MAIL_PASS
            }
          }
        const transporter = nodemailer.createTransport(transport)
        const {petName, breeds, shelterEmail, firstName, lastName, userEmail} = req.body.info

        const content = `Hello, I am interested in the ${breeds.toLowerCase()} named ${petName}! Do you have any further information on them? Thank you, ${firstName} ${lastName}.`
        
        const mail = {
            from: userEmail,
            to: 'heckmann.harry@gmail.com',  //Change to email address that you want to receive messages on
            subject: `Interested in ${petName}`,
            text: content,
            replyTo: userEmail
        }
        
        transporter.sendMail(mail, (err, data) => {
            if (err) {
            res.json({
                msg: 'fail'
            })
            } else {
            res.json({
                msg: 'success'
            })
            }
        })
    }
}