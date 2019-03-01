import React, {Component} from 'react'
import {Bar, Radar} from 'react-chartjs-2'
import axios from 'axios'
import {Link, Redirect} from 'react-router-dom'

import './ResultsChart.css'

class ResultsChart extends Component {
    constructor(props){
        super(props)
        this.state = {
            redirect: false,
            loggedIn: false,
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
                this.setState({username: '', password: ''})
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
                // console.log(response.data)
                this.setRedirect()
            })
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

    render(){
        {this.renderRedirect()}
        // const data = {
        //     labels: ['Best', 'Good', 'Okay'],
        //     datasets: [
        //         {
        //             // label: 'How the breeds stack up',
        //             data: [this.props.Best.length, this.props.Good.length, this.props.Okay.length],
        //             backgroundColor: [
        //                 'rgba(125, 170, 146, 0.8)',
        //                 // 'rgba(169, 221, 214, 0.8)',
        //                 'rgba(252, 208, 161, 0.8)',
        //                 'rgba(167, 101, 113, 0.8)'
        //             ]
        //         }
        //     ]
        // }
        const data2 = {
            labels: ['Friendly With Dogs', 'Friendly With Pets', 'Affection','Size', 'Grooming', 'Vocality', 'Energy', 'Training', 'Exercise'],
            datasets: [
                {
                    label: 'Okay Breeds',
                    data: [this.props.okayAvg[0], this.props.okayAvg[1], this.props.okayAvg[2], this.props.okayAvg[3], this.props.okayAvg[4], this.props.okayAvg[5],this.props.okayAvg[6],this.props.okayAvg[7],this.props.okayAvg[8]],
                    backgroundColor: [
                        // 'rgba(125, 170, 146, 0.8)',
                        // 'rgba(169, 221, 214, 0.8)',
                        // 'rgba(252, 208, 161, 0.8)',
                        'rgba(167, 101, 113, 0.5)'
                    ],
                    // borderColor: 'rgba(167, 101, 113, 1)'
                    borderColor: 'rgba(5,4,2,0.8)'
                },
                
                {
                    label: 'Good Breeds',
                    data: [this.props.goodAvg[0], this.props.goodAvg[1], this.props.goodAvg[2], this.props.goodAvg[3], this.props.goodAvg[4], this.props.goodAvg[5],this.props.goodAvg[6],this.props.goodAvg[7],this.props.goodAvg[8]],
                    backgroundColor: [
                        // 'rgba(125, 170, 146, 0.8)',
                        // 'rgba(169, 221, 214, 0.8)',
                        'rgba(252, 208, 161, 0.5)',
                        // 'rgba(167, 101, 113, 0.8)'
                    ],
                    // borderColor: 'rgba(252, 208, 161, 1)'
                    borderColor: 'rgba(5,4,2,0.8)'
                },
                {
                    label: 'Perfect Breeds',
                    data: [this.props.bestAvg[0], this.props.bestAvg[1], this.props.bestAvg[2], this.props.bestAvg[3], this.props.bestAvg[4], this.props.bestAvg[5],this.props.bestAvg[6],this.props.bestAvg[7],this.props.bestAvg[8]],
                    backgroundColor: [
                        'rgba(125, 170, 146, 0.5)',
                        // 'rgba(169, 221, 214, 0.8)',
                        // 'rgba(252, 208, 161, 0.8)',
                        // 'rgba(167, 101, 113, 0.8)'
                    ],
                    // borderColor: 'rgba(125, 170, 146, 1)'
                    borderColor: 'rgba(5,4,2,0.8)'
                }
            ]
        }

        return(
            
            <div id='ResultsChart'>
                {this.renderRedirect()}
                <div id='ResultsChartDiv'>
                    {/* <Bar
                    data = {data}
                    onElementsClick={elems => {
                        this.updateList(elems[0]._model.label)
                        console.log(elems)
                        }
                    }   
                    options={{maintainAspectRatio: true}}
                    /> */}
                    <Radar
                    data = {data2}
                    onElementsClick={elems => {
                        // this.updateList(elems[0]._model.label)
                        console.log(elems)
                        }
                    }
                    // options={{maintainAspectRatio: true}}
                    // options={{scale:{ticks: {min: 1}}}}
                    options={{
                        responsive: true,
                        title: {
                            display: true,
                            text: 'Your Results!',
                            fontFamily: 'Playfair Display',
                            fontStyle: 'italic',
                            fontSize: 46,
                            fontColor: 'black',
                            padding: 20
                        },
                        legend: {
                            labels: {
                                fontSize: 18,
                                fontColor: 'black'
                            },
                            position: 'bottom'
                        }, 
                        scale: {
                            ticks: {
                                min: 1
                            },
                            pointLabels: {
                                fontSize: 20, 
                                fontColor: 'black'
                            }
                        },
                        animation: {
                            duration: 1000,
                            easing: 'easeInQuart'
                        } 
                    }}
                    // options={{}}
                    // options={{animation: {animateScale: true}}}
                    />
                </div>
                
                <div id='chartResultList'>
                    {/* <div id={this.state.displayedList == 'Best' ? 'showBest': 'hideBest'}> */}
                    <div className='BreedList'>
                        <h1 className='breedsDivh1'>Best Fit</h1>
                        {this.props.Best.map((e, i) => (
                            <div className='breedsDiv' key={i}>
                                <h4 className='breedsDivh4'>{e.breed}</h4>
                                <img className='breedImage' src={e.breed_image}/>
                            </div>
                        ))}
                    </div>
                
                    {/* <div id={this.state.displayedList == 'Good' ? 'showGood': 'hideGood'}> */}
                    <div className='BreedList'>
                        <h1 className='breedsDivh1'>Good Fit</h1>
                        {this.props.Good.map((e, i) => (
                            <div className='breedsDiv' key={i}>
                                <h4 className='breedsDivh4'>{e.breed}</h4>
                                <img className='breedImage' src={e.breed_image}/>
                            </div>
                        ))}
                    </div>
                
                    {/* <div id={this.state.displayedList == 'Okay' ? 'showOkay': 'hideOkay'}>  */}
                    <div className='BreedList'>
                        <h1 className='breedsDivh1'>Okay Fit</h1>
                        {this.props.Okay.map((e, i) => (
                            <div className='breedsDiv' key={i}>
                                <h4 className='breedsDivh4'>{e.breed}</h4>
                                <img className='breedImage' src={e.breed_image}/>
                            </div>
                        ))}
                    </div>
                </div>
                <div id='resultsBottomDiv'>
                    <div className='results_link_div'>
                        <Link className='results_link' to='/survey/1'>Retake Quiz</Link>
                    </div>
                    {this.state.loggedIn 
                        ? 
                            <button id='resultsButton'
                                onClick={() => {this.saveBestBreeds()}}
                                >Click here to save your best fitting breeds
                            </button>
                        : 
                            <div>
                                <h1 className='breedsDivh1'>Login to save your results</h1>
                                <form onSubmit={e => this.handleLogin(e, this.state.username, this.state.password)}>
                                    <input
                                        className='resultsInputField'
                                        name='username'
                                        required 
                                        type='text' 
                                        value={this.state.username}
                                        placeholder='Username'
                                        onChange={e => this.handleChange(e)}
                                    ></input>
                                    <input
                                        className='resultsInputField'
                                        name='password'
                                        required 
                                        type='text' 
                                        value={this.state.password}
                                        placeholder='Password'
                                        onChange={e => this.handleChange(e)}
                                    ></input>
                                    <input id='ResultsLoginButton' type='submit' value='Login'></input>
                                </form>
                            </div>
                    }
                </div>
            </div>
        )
    }
}

export default ResultsChart
