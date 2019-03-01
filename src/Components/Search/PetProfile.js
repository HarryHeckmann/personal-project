import React, {Component} from 'react'
import {Link, Redirect} from 'react-router-dom'
import axios from 'axios';

import './PetProfile.css'

class PetProfile extends Component {
    constructor(){
        super()
        this.state = {
            redirect: false,
            id: '',
            name: '',
            age: '',
            sex: '',
            description: '',
            city: '',
            pictures : [],
            pictureIndex: 0,
            loggedIn: false,
            username: '',
            password: '',
            shelterId: '',
            shelterName: '',
            shelterPhone: '',

            otherPets: [],

            denied: false
        }
    }

    componentDidMount(){
        this.dataRefresh()
        this.checkLogin()
    }

    dataRefresh(){
        this.setState({pictures: []}, () => {
            axios
            .get(`/api/pet/${this.props.match.params.id}`)
            .then(response => {
                if(response.data){
                    const images = response.data.media.photos.photo.filter((e, i) => {
                        const key = {i}
                        if(e.$t.match(/-x/g)){
                            this.state.pictures.push(e.$t)
                        }
                    })
                    this.setState({name: response.data.name.$t, id: response.data.id.$t, shelterId: response.data.shelterId.$t, city: response.data.contact.city.$t, age: response.data.age.$t, sex: response.data.sex.$t, description: response.data.description.$t}, () => {
                        axios
                            .get(`/api/shelter/${this.state.shelterId}`)
                            .then(response => {
                                console.log(response.data)
                                this.setState({shelterName: response.data.name.$t, shelterEmail: response.data.email.$t, shelterPhone: response.data.phone.$t}, () => {
                                    axios
                                        .get(`/api/pets/shelter/${this.state.shelterId}`)
                                        .then(response => {
                                            console.log(response.data)
                                            this.setState({otherPets: response.data})
                                        })
                                })
                            })
                    })
                    if(Array.isArray(response.data.breeds.breed)){
                        const mapped = response.data.breeds.breed.map((e, i)=> {
                            return e.$t
                        })
                        const joined = mapped.join(', ')
                        this.setState({breeds: joined})
                      }
                      else{
                        this.setState({breeds: response.data.breeds.breed.$t})
                      }
                }
                else{
                    this.setState({denied: true})
                }
               
            })
            .catch(err => {
                console.log(err)
                this.setState({denied: true})
            })
        })
        
    }

    checkLogin(){
        axios  
            .get('/api/user')
            .then(response => {
                this.setState({loggedIn: true})
            })
    }

    next(){
        if(this.state.pictureIndex < this.state.pictures.length-1){
            this.setState({pictureIndex: this.state.pictureIndex+1})
        }
        else{
            this.setState({pictureIndex: 0})
        }
        
    }
    previous(){
        if(this.state.pictureIndex > 0){
            this.setState({pictureIndex: this.state.pictureIndex-1})
        }
        else{
            this.setState({pictureIndex: this.state.pictures.length-1})
        }
    }

    addtoFavorites(){
        const id = this.state.id
        const name = this.state.name
        axios
            .post('/api/user/favorites', {id, name})
            .then(response => {
                alert(`${this.state.name} saved to your profile!`)
            })
            .catch(err => {
                console.log(err)
            })
    }

    handleLogin = (e, username, password) => {
        e.preventDefault()
        axios 
            .post('/auth/login', {username, password})
            .then(user => {
                this.setState({username: '', password: ''}, () => {console.log(this.state.username)})
                this.checkLogin()
            })
            .catch(err => {
                console.log(err)
            })
    }
    handleChange(e){
        this.setState({[e.target.name]: e.target.value})
        }

        setRedirect(id){
            this.setState({petId: id}, () => {
                this.setState({redirect: true})
                this.dataRefresh()
            })
        }
    renderRedirect(){
        if(this.state.redirect){
            return <Redirect to={`/petprofile/${this.state.petId}`}/>
        }
    }

    contactShelter(){
        const info = {
            shelterEmail: this.state.shelterEmail,
            petName: this.state.name,
            breeds: this.state.breeds
        }
        axios
            .post('/api/contact/shelter', {info})
            .then(response => {
                alert('Message Sent!')
            })
    }

    render(){
        return(
            
            <div id='PetProfileFull'>
                {this.renderRedirect()}
                {this.state.denied 
                    ? 
                        <div id='deniedDiv'>
                            <h1 id='denied'>We're sorry, but it looks like this shelter is opting out of our service</h1> 
                            <div id='petProfileLinkDiv'>
                                <Link id='petProfileLink' to='/search'>Return To Search</Link>
                            </div>
                        </div>
                        
                    :
                        <div id='fullDiv'>
                            <div id={this.state.loggedIn ? 'petProfileHeaderLoggedIn' :'petProfileHeader'}>
                                <div id='petProfileHeaderLinks'>
                                    <div id='petProfileLinkDiv'>
                                        <Link id='petProfileLink' to='/search'>Return To Search</Link>
                                    </div>
                                    {/* <div id='HomeProfleLink'> */}
                                    <div id='petProfileLinkDiv'>
                                        <Link className='searchLink' to='/'>Home</Link>
                                    </div>
                                    <div id='petProfileLinkDiv'>
                                        <Link className='searchLink' to='/profile'>Profile</Link>
                                    </div>
                                    {/* </div> */}
                                    {this.state.loggedIn
                                        ? 
                                        <button id='petProfileButton' onClick={() => this.addtoFavorites()}>Add to Favorites</button>
                                        : 
                                        <div id='PetProfileLoginDiv'>
                                            <h1>Login to save this pet!</h1>
                                            <form id='petProfileLoginForm' onSubmit={e => this.handleLogin(e, this.state.username, this.state.password)}>
                                                <input
                                                    className='petProfileInputField'
                                                    name='username'
                                                    required 
                                                    type='text' 
                                                    value={this.state.username}
                                                    placeholder='Username'
                                                    onChange={e => this.handleChange(e)}
                                                ></input>
                                                <input
                                                    className='petProfileInputField'
                                                    name='password'
                                                    required 
                                                    type='text' 
                                                    value={this.state.password}
                                                    placeholder='Password'
                                                    onChange={e => this.handleChange(e)}
                                                ></input>
                                                <input className='PetProfileImageButton' type='submit' value='Login'></input>
                                            </form>
                                        </div>
                                    }
                                </div>
                        </div>
                        <div id='PetProfileCenter'>
                            <div id='centerLeft'>
                                <div id='leftTop'>
                                    <div className='petProfileInfo'>
                                        <h1>{this.state.name}</h1>
                                        <h3 style={{color: 'black'}}>{this.state.breeds}</h3>
                                        <h3>{this.state.sex == 'M' ? "Male" : "Female"}</h3>
                                        <h3>{this.state.age}</h3>
                                    </div>
                                    <div className='petProfileInfo'>
                                        <h2 style={{color: 'black'}}>{this.state.city} | {this.state.shelterName}</h2>
                                        <h3>{this.state.shelterEmail}</h3>
                                        <h3>{this.state.shelterPhone}</h3>
                                        <button className='contactButton' onClick={() => this.contactShelter()}>Let Shelter Know You're Interested</button>
                                    </div>
                                </div>
                                <div id='leftBottom'>
                                    <p>{this.state.description}</p>
                                </div>
                            </div>
                            <div id='centerRight'>
                                <img id='petImageSlide' src={this.state.pictures[this.state.pictureIndex]}/>
                                <div id='PetProfileImageButtons'>
                                    <button className='PetProfileImageButton' onClick={() => this.previous()}>Previous</button>
                                    <button className='PetProfileImageButton' onClick={() => this.next()}>Next</button>
                                </div>
                            </div>
                        </div>
                        <div id='PetProfileFooter'>
                            <h2 style={{color: 'black'}}>Other Animals At This Shelter</h2>
                                <div className='otherShelterPetDiv'>
                                    
                                    {this.state.otherPets 
                                        ?
                                            this.state.otherPets.map((e, i) => (
                                                <div className='myPetDiv' key={i} onClick={() => this.setRedirect(e.id.$t)}>
                                                    {e.media.photos
                                                        ?
                                                            <img className='PetProfileFooterImg' src={e.media.photos.photo[1].$t}/>
                                                        :
                                                        <img className='PetProfileFooterImg' src={require('../../Images/pet.png')} />
                                                    }
                                                    <h4>{e.name.$t}</h4>
                                                </div>                                                        
                                            ))
                                        :
                                            <div></div>
                                    }
                                </div>                            
                        </div>
                    </div>
                        
                }
            </div>
        )
    }
}

export default PetProfile