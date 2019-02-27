import React, {Component} from 'react'
import {Bar} from 'react-chartjs-2'
import axios from 'axios'
import {Link, Redirect} from 'react-router-dom'

import './ResultsChart.css'

class ResultsChart extends Component {
    constructor(props){
        super(props)
        this.state = {
            redirect: false,
            loggedIn: false,
            test: 3,
            displayedList: 'Best',

            username: '',
            password: ''
        }
    }
    componentDidMount(){
        this.checkLogin()
    }

    checkLogin(){
        axios  
            .get('/api/user')
            .then(response => {
                this.setState({loggedIn: true})
            })
    }

    updateList(list) {
        this.setState({displayedList: list})
        console.log(list)
      }

    handleChange(e){
    this.setState({[e.target.name]: e.target.value})
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

    saveBestBreeds(){
        const best = this.props.Best.map((e, i) => {
            return e.breed
        })
        axios
            .put('/api/user/breeds', {best})
            .then(response => {
                console.log(response.data)
                this.setRedirect()
            })
    }

    setRedirect(){
        console.log(this.state.redirect)
        this.setState({redirect: true})
    }
    renderRedirect(){
        if(this.state.redirect){
            return <Redirect to='/profile'/>
        }
    }

    render(){
        {this.renderRedirect()}
        const data = {
            labels: ['Best', 'Good', 'Okay'],
            datasets: [
                {
                    label: 'How the breeds stack up',
                    data: [this.props.Best.length, this.props.Good.length, this.props.Okay.length],
                    backgroundColor: [
                        'rgba(125, 170, 146, 0.8)',
                        // 'rgba(169, 221, 214, 0.8)',
                        'rgba(252, 208, 161, 0.8)',
                        'rgba(167, 101, 113, 0.8)'
                    ]
                }
            ]
        }   
        return(
            <div>
                {this.renderRedirect()}
                <div>Results Chart</div>
                <Bar
                    data = {data}
                    onElementsClick={elems => {
                        this.updateList(elems[0]._model.label)
                        console.log(elems[0]._model.label)
                        }
                    }   options={{maintainAspectRatio: true}}
                />
                
                <div id={this.state.displayedList == 'Best' ? 'showBest': 'hideBest'}>
                    <h1>Best Fit</h1>
                    {this.props.Best.map((e, i) => (
                        <div className='breedsDiv' key={i}>
                            <h4>{e.breed}</h4>
                            <img className='breedImage' src={e.breed_image}/>
                        </div>
                    ))}
                </div>
            
                <div id={this.state.displayedList == 'Good' ? 'showGood': 'hideGood'}>
                <h1>Good Fit</h1>
                    {this.props.Good.map((e, i) => (
                        <div className='breedsDiv' key={i}>
                            <h4>{e.breed}</h4>
                            <img className='breedImage' src={e.breed_image}/>
                        </div>
                    ))}
                </div>
            
                <div id={this.state.displayedList == 'Okay' ? 'showOkay': 'hideOkay'}> 
                <h1>Okay Fit</h1>
                    {this.props.Okay.map((e, i) => (
                        <div className='breedsDiv' key={i}>
                            <h4>{e.breed}</h4>
                            <img className='breedImage' src={e.breed_image}/>
                        </div>
                    ))}
                </div>
                <div>
                    <Link to='/survey/1'>Retake Quiz</Link>
                    {this.state.loggedIn 
                        ? 
                            <button 
                                onClick={() => {this.saveBestBreeds()}}
                                >Click here to save your best fitting breeds
                            </button>
                        : 
                            <div>
                                <h1>Login to save your results</h1>
                                <form onSubmit={e => this.handleLogin(e, this.state.username, this.state.password)}>
                                    <input
                                        // className='inputField'
                                        name='username'
                                        required 
                                        type='text' 
                                        value={this.state.username}
                                        placeholder='Username'
                                        onChange={e => this.handleChange(e)}
                                    ></input>
                                    <input
                                        // className='inputField'
                                        name='password'
                                        required 
                                        type='text' 
                                        value={this.state.password}
                                        placeholder='Password'
                                        onChange={e => this.handleChange(e)}
                                    ></input>
                                    <input type='submit' value='Login'></input>
                                </form>
                            </div>
                    }
                </div>
                <div></div>
            </div>
        )
    }
}

export default ResultsChart
