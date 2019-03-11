import React, { Component } from 'react';
import {Redirect} from 'react-router-dom'
import axios from 'axios';
import {Link} from 'react-router-dom'

import './Home.css'

class Home extends Component {
    constructor(){
        super()
        this.state = {
            redirect: false,

            username: '',
            password: '',
            firstname: '',
            lastname: '',
            city: '',
            imageUrl: '',
            email: '',

            displayLogin: false,
            displayRegister: false,

            selectedFile: null,
            originalEXIF: 0,
            original64: '',
            new64: null
        }
    }
    componentDidMount(){
        window.scrollTo(0, 0)
    }

    setRedirect(){
        // console.log(this.state.redirect)
        this.setState({redirect: true})
    }
    renderRedirect(){
        if(this.state.redirect){
            return <Redirect to='/profile'/>
        }
    }

    handleChange = (e) => {
        this.setState({[e.target.name]: e.target.value})
    }

    handleLogin = (e, username, password) => {
        e.preventDefault()
        axios 
            .post('/auth/login', {username, password})
            .then(user => {
                this.setState({username: '', password: ''})
                this.setRedirect()
            })
            .catch(err => {
                // console.log(err)
            })
    }

    handleRegister(e){
        e.preventDefault()
        const {username, password, firstname, lastname, city, imageUrl, email} =  this.state
        console.log("ahhhhh")
            axios 
            .post('/auth/register', {username, password, firstname, lastname, city, imageUrl, email})
            .then(user => {
                this.setState({username: '', password: '', firstname: '', lastname: '', city: '', imageUrl: ''})
                this.setRedirect()
            })
            .catch(err => {
                // console.log(err)
            })
    }

    displayLogin(){
        this.setState({displayLogin: !this.state.displayLogin})
        this.setState({displayRegister: false})
        // console.log(this.state.displayLogin)
    }

    displayRegister(){
        this.setState({displayRegister: !this.state.displayRegister})
        this.setState({displayLogin: false})
    }

  render() {
      const {displayLogin, displayRegister, username, password, firstname, lastname, city, imageUrl, email} =  this.state
    return (
      <div id='home'>
        {this.renderRedirect()}
        <header id='homeHeader'>
            <button className='headerButton' onClick={() => this.displayLogin()}>Login</button>
                <div id='authForms'>
                {/* {this.state.displayLogin && !this.state.displayRegister ?  */}
                    <form id={displayLogin ? 'login': 'notLogin'} onSubmit={e => this.handleLogin(e, username, password)}>
                    <input
                        className='inputField'
                        name='username'
                        required 
                        type='text' 
                        value={username}
                        placeholder='Username'
                        onChange={e => this.handleChange(e)}
                    ></input>
                    <input
                        className='inputField'
                        name='password'
                        required 
                        type='text' 
                        value={password}
                        placeholder='Password'
                        onChange={e => this.handleChange(e)}
                    ></input>
                    <input type='submit' className='button' value='Login'></input>
                    </form>
                    {/* :
                    !this.state.displayLogin && this.state.displayRegister
                    ? */}
                    <form id={displayRegister?'register':'notRegister'} onSubmit={e => this.handleRegister(e, username, password, firstname, lastname, city, imageUrl)}>
                    <input
                        className='inputField'
                        name='username'
                        required 
                        type='text' 
                        value={username}
                        placeholder='Username'
                        onChange={e => this.handleChange(e)}
                    ></input>
                    <input
                        className='inputField'
                        name='password'
                        required 
                        type='text' 
                        value={password}
                        placeholder='Password'
                        onChange={e => this.handleChange(e)}
                    ></input>
                    <input
                        className='inputField'
                        name='firstname'
                        required 
                        type='text' 
                        value={firstname}
                        placeholder='First Name'
                        onChange={e => this.handleChange(e)}
                    ></input>
                    <input
                        className='inputField'
                        name='lastname'
                        required 
                        type='text' 
                        value={lastname}
                        placeholder='Last Name'
                        onChange={e => this.handleChange(e)}
                    ></input>
                    <input
                        className='inputField'
                        name='city'
                        required 
                        type='text' 
                        value={city}
                        placeholder='City'
                        onChange={e => this.handleChange(e)}
                    ></input>
                    <input
                        className='inputField'
                        name='email'
                        required 
                        type='text' 
                        value={email}
                        placeholder='Email Address'
                        onChange={e => this.handleChange(e)}
                    ></input>
                    <input type='submit' className='button' value='Register'></input>
                    </form>
                {/* : */}
                {/* <div id='empty'></div> */}
                {/* } */}
            </div>
            <button className='headerButton' onClick={() => this.displayRegister()}>Register</button>
        </header>
        
        <div id='main'>
            <div id='center'>
                <h1 id='main_text'>Find your forever friend, today</h1>
                <div id='clickDiv'>
                    <Link id='click_here' to='survey/intro'>Learn How</Link>
                </div>
            </div>
        </div>
      </div>
    );
  }
}

export default Home;
