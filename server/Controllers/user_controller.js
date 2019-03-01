var ExifImage = require('exif').ExifImage;

module.exports = {

    getUser: async (req, res) => {
        try {
            const db = req.app.get('db')
            if(req.session.user){
                const user = await db.get_user(req.session.user.username)
                // console.log(user)
                return res.status(200).json(user)
            }
            else{
                // console.log('womp')
                return res.status(404).json('not logged in')
            }
        }
        catch(err) {
            console.log(err)
            res.status(500).json('Not logged in')
        }
        
        
    },
    getUserPets: async (req, res) => {
        try {
            const db = req.app.get('db')
            if(req.session.user){
                const pets = await db.get_user_pets(req.session.user.id)
                // console.log(pets)
                return res.status(200).json(pets)
            }
            else{
                // console.log('womp')
                return res.status(404).json('not logged in')
            }
        }
        catch(err) {
            console.log(err)
            res.status(500).json('Not logged in')
        }
        
        
    },

    updateUser: async (req, res) => {
        try {
            const {profile_image_exif, profile_img, firstname, lastname, city} = req.body.newValues
            const db = req.app.get('db')
            if(req.session.user){
                console.log(req.body)
                console.log(req.session.user.id)
                const user = await db.update_user([+req.session.user.id, profile_image_exif, profile_img, firstname, lastname, city])
                // console.log(user)
                return res.status(200).json(user)
            }
            else{
                // console.log('womp')
                return res.status(404).json('not logged in')
            }
        }
        catch(err){
            console.log(err)
            res.status(500).json('Not Logged On')
        }
    },

    updateUserPets: async (req, res) => {
        console.log(req.body)
        try {
            const {pet_image_exif, pet_img, pet_name} = req.body.newValues
            const db = req.app.get('db')
            if(req.session.user){
                // console.log(req.body)
                const pets = await db.update_user_pets([req.session.user.id, pet_name, pet_img, pet_image_exif])
                // console.log(pets)
                return res.status(200).json(pets)
            }
            else{
                console.log('womp')
                return res.status(404).json('not logged in')
            }
        }
        catch(err){
            console.log(err)
            res.status(500).json('Not Logged On')
        }
    },
    saveBestBreeds: async (req, res) => {
        const {best} = req.body
        try {
            const db = req.app.get('db')
            if(req.session.user){
                const user = await db.update_best_breeds([req.session.user.id, best])
                return res.status(200).json(user)
            }
            else{
                return res.status(404).json('Not Logged In')
            }
        }
        catch(err){
            console.log(err)
            res.status(500).json(err)
        }
    },
    deletePet: async (req, res) => {
        const {id} = req.params
        try {
            const db = req.app.get('db')
            if(req.session.user){
                const user = await db.delete_pet([req.session.user.id, id])
                return res.status(200).json(user)
            }
            else{
                return res.status(404).json('Not Logged In')
            }
        }
        catch(err){
            console.log(err)
            res.status(500).json(err)
        }
    }



}