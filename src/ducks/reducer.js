const initialState = {
    friendly_dogs: '',
    friendly_pets: '',
    affection: '',
    grooming: '',
    vocality: '',
    size: '',
    energy: '',
    exercise: '',
    training: '',

    location: '',
    animal: '',
    breed: '',
    search_size: '',
    age: '',
    sex: '',
    offset: 0,

    pets: [],

}

const UPDATE_FRIENDLY_DOGS = "UPDATE_FRIENDLY_DOGS"
const UPDATE_FRIENDLY_PETS = "UPDATE_FRIENDLY_PETS"
const UPDATE_AFFECTION = "UPDATE_AFFECTION"
const UPDATE_GROOMING = "UPDATE_GROOMING"
const UPDATE_VOCALITY = "UPDATE_VOCALITY"
const UPDATE_SIZE = "UPDATE_SIZE"
const UPDATE_ENERGY = "UPDATE_ENERGY"
const UPDATE_EXERCISE = "UPDATE_EXERCISE"
const UPDATE_TRAINING = "UPDATE_TRAINING"

const UPDATE_LOCATION = "UPDATE_LOCATION"
const UPDATE_ANIMAL = "UPDATE_ANIMAL"
const UPDATE_BREED = "UPDATE_BREED"
const UPDATE_SEARCH_SIZE = "UPDATE_SEARCH_SIZE"
const UPDATE_AGE = "UPDATE_AGE"
const UPDATE_SEX = "UPDATE_SEX"
const UPDATE_OFFSET = "UPDATE_OFFSET"
const UPDATE_PETS = "UPDATE_PETS"


export const updateFriendlyDogs = (friendly_dogs) => {
    return {
        type: UPDATE_FRIENDLY_DOGS,
        payload: friendly_dogs
    }
}
export const updateFriendlyPets = (friendly_pets) => {
    return {
        type: UPDATE_FRIENDLY_PETS,
        payload: friendly_pets
    }
}
export const updateAffection = (affection) => {
    return {
        type: UPDATE_AFFECTION,
        payload: affection
    }
}
export const updateGrooming = (grooming) => {
    return {
        type: UPDATE_GROOMING,
        payload: grooming
    }
}
export const updateVocality = (vocality) => {
    return {
        type: UPDATE_VOCALITY,
        payload: vocality
    }
}
export const updateSize = (size) => {
    return {
        type: UPDATE_SIZE,
        payload: size
    }
}
export const updateEnergy = (energy) => {
    return {
        type: UPDATE_ENERGY,
        payload: energy
    }
}
export const updateExercise = (exercise) => {
    return {
        type: UPDATE_EXERCISE,
        payload: exercise
    }
}
export const updateTraining = (training) => {
    return {
        type: UPDATE_TRAINING,
        payload: training
    }
}
export const updateLocation = (location) => {
    return {
        type: UPDATE_LOCATION,
        payload: location
    }
}
export const updateAnimal = (animal) => {
    return {
        type: UPDATE_ANIMAL,
        payload: animal
    }
}
export const updateBreed = (breed) => {
    return {
        type: UPDATE_BREED,
        payload: breed
    }
}
export const updateSearchSize = (search_size) => {
    return {
        type: UPDATE_SEARCH_SIZE,
        payload: search_size
    }
}
export const updateAge = (age) => {
    return {
        type: UPDATE_AGE,
        payload: age
    }
}
export const updateSex = (sex) => {
    return {
        type: UPDATE_SEX,
        payload: sex
    }
}
export const updateOffset = (offset) => {
    return {
        type: UPDATE_OFFSET,
        payload: offset
    }
}
export const updatePets = (pets) => {
    return {
        type: UPDATE_PETS,
        payload: pets
    }
}

function reducer(state = initialState, action){
    // console.log('REDUCER HIT: Action ->', action)
    switch(action.type){
        case UPDATE_FRIENDLY_DOGS:
        return {
            ...state,
            friendly_dogs: action.payload
        }
        case UPDATE_FRIENDLY_PETS:
        return {
            ...state,
            friendly_pets: action.payload
        }
        case UPDATE_AFFECTION:
        return {
            ...state,
            affection: action.payload
        }
        case UPDATE_GROOMING:
        return {
            ...state,
            grooming: action.payload
        }
        case UPDATE_VOCALITY:
        return {
            ...state,
            vocality: action.payload
        }
        case UPDATE_SIZE:
        return {
            ...state,
            size: action.payload
        }
        case UPDATE_ENERGY:
        return {
            ...state,
            energy: action.payload
        }
        case UPDATE_EXERCISE:
        return {
            ...state,
            exercise: action.payload
        }
        case UPDATE_TRAINING:
        return {
            ...state,
            training: action.payload
        }
        case UPDATE_LOCATION:
        return {
            ...state,
            location: action.payload
        }
        case UPDATE_ANIMAL:
        return {
            ...state,
            animal: action.payload
        }
        case UPDATE_BREED:
        return {
            ...state,
            breed: action.payload
        }
        case UPDATE_SEARCH_SIZE:
        return {
            ...state,
            search_size: action.payload
        }
        case UPDATE_AGE:
        return {
            ...state,
            age: action.payload
        }
        case UPDATE_SEX:
        return {
            ...state,
            sex: action.payload
        }
        case UPDATE_OFFSET:
        return {
            ...state,
            offset: action.payload
        }
        case UPDATE_PETS:
        return {
            ...state,
            pets: action.payload
        }
        default: {
            console.log('hitting default')
            return state
        }
    }
}

export default reducer