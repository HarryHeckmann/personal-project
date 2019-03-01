

module.exports = {
    getBreedResults: async (req, res) => {
        const perfectFitBreeds = []
        const goodFitBreeds = []
        const illFitBreeds = []
        const okayFitBreeds = []
        console.log(req.body)
        const results = req.body
        try {
            const db = req.app.get('db')
            const breeds = await db.get_dog_breeds()
            for(i=0;i<breeds.length;i++){
                console.log(breeds[i])
                let wrong = 0
                if(breeds[i].friendly_dogs !== +results[0]){
                    wrong++
                }
                if(breeds[i].friendly_pets !== +results[1]){
                    wrong++
                }
                if(breeds[i].affection !== +results[2]){
                    wrong++
                }
                if(breeds[i].size !== +results[3]){
                    wrong++
                }
                if(breeds[i].grooming > +results[4]){
                    wrong++
                }
                if(breeds[i].vocality > +results[5]){
                    wrong++
                }
                if(breeds[i].energy > +results[6]){
                    wrong++
                }
                if(breeds[i].training > +results[7]){
                    wrong++
                }
                if(breeds[i].exercise > +results[8]){
                    wrong++
                }
                if(wrong == 0){
                    perfectFitBreeds.push(breeds[i])
                }
                else if(wrong <= 2){
                    goodFitBreeds.push(breeds[i])
                }
                else if(wrong < 5){
                    okayFitBreeds.push(breeds[i])
                }
                else if(wrong >= 5){
                    illFitBreeds.push(breeds[i])
                }
                console.log(wrong)
            }
            
            console.log(perfectFitBreeds)
            return res.status(200).json({perfectFitBreeds, goodFitBreeds, okayFitBreeds, illFitBreeds})
        }
        catch(err) {
            console.log(err)
            res.status(500).json('Not logged in')
        }
        
        
    },

    updateFavorited: async (req, res) => {
        try {
            const db = req.app.get('db')
            if(req.session.user){
                console.log(req.body)
                const pet = await db.update_favorited([req.session.user.id, req.body.id, req.body.name])
                console.log(pet)
                return res.status(200).json(pet)
            }
            else{
                console.log('womp')
            }
        }
        catch(err){
            console.log(err)
            res.status(500).json('Not Logged On')
        }
    },

    getFavorites: async (req, res) => {
        try {
            const db = req.app.get('db')
            if(req.session.user){
                // console.log(req.body)
                const pets = await db.get_favorited(req.session.user.id)
                console.log(pets)
                return res.status(200).json(pets)
            }
            else{
                res.status(500).json('Not Logged On')
            }
        }
        catch(err){
            console.log(err)
            res.status(500).json('Not Loged On')
        }
    },

    deleteFavorite: async (req, res) => {
        console.log(req.params)
        const {id} = req.params
        try {
            const db = req.app.get('db')
            if(req.session.user){
                const user = await db.delete_favorite([req.session.user.id, id])
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