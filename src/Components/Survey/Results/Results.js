import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import axios from 'axios'

import './Results.css'

import ResultsChart from './ResultsChart'

class Results extends Component {
    constructor(){
        super()
        this.state = {
            results: ['', '', '', '', '', '', '', '', ''],
            perfect_breeds: [],
            good_breeds: [],
            okay_breeds: [],
            illFitting_breeds: [],
            perfectArray: [],
            goodArray: [],
            okayArray: []
        }
    }
    componentDidMount(){
        this.setState({results: [this.props.friendly_dogs, this.props.friendly_pets, this.props.affection, this.props.size, this.props.grooming, this.props.vocality, this.props.energy, this.props.training, this.props.exercise]}, () => {
            console.log(this.state.results)
            axios
                .post('/api/breed_results', this.state.results)
                .then(response => {
                    // console.log(response)
                    this.setState({
                        perfect_breeds: response.data.perfectFitBreeds,
                        good_breeds: response.data.goodFitBreeds,
                        okay_breeds: response.data.okayFitBreeds,
                    }, ()=> {
                        if(this.state.results[0]){
                            const perfectMidArray = []
                            this.state.perfect_breeds.map((e,i) => {
                                let arr = []
                                arr.push(e.friendly_dogs, e.friendly_pets, e.affection, e.size, e.grooming, e.vocality, e.energy, e.training, e.exercise)
                                perfectMidArray.push(arr)
                            })
                            const perfectResult = []
                            if(perfectMidArray.length){
                                for(var i = 0; i < perfectMidArray[0].length; i++){
                                    var num = 0;
                                    for(var i2 = 0; i2 < perfectMidArray.length; i2++){ 
                                    num += perfectMidArray[i2][i];
                                    }
                                    perfectResult.push(num / perfectMidArray.length);
                                }
                                this.setState({perfectArray: perfectResult})
                            }
                            else{
                                this.setState({perfectArray: [0,0,0,0,0,0,0,0,0]})
                            }

                            const goodMidArray = []
                            this.state.good_breeds.map((e,i) => {
                                let arr = []
                                arr.push(e.friendly_dogs, e.friendly_pets, e.affection, e.size, e.grooming, e.vocality, e.energy, e.training, e.exercise)
                                goodMidArray.push(arr)
                            })
                            const goodResult = []
                            if(goodMidArray.length){
                                for(var i = 0; i < goodMidArray[0].length; i++){
                                    var num = 0;
                                    for(var i2 = 0; i2 < goodMidArray.length; i2++){ 
                                    num += goodMidArray[i2][i];
                                    }
                                    goodResult.push(num / goodMidArray.length);
                                }
                                this.setState({goodArray: goodResult})
                            }
                            else{
                                this.setState({goodArray: [0,0,0,0,0,0,0,0,0]})
                            }

                            const okayMidArray = []
                            this.state.okay_breeds.map((e,i) => {
                                let arr = []
                                arr.push(e.friendly_dogs, e.friendly_pets, e.affection, e.size, e.grooming, e.vocality, e.energy, e.training, e.exercise)
                                okayMidArray.push(arr)
                            })
                            const okayResult = []
                            for(var i = 0; i < okayMidArray[0].length; i++){
                                var num = 0;
                                for(var i2 = 0; i2 < okayMidArray.length; i2++){ 
                                num += okayMidArray[i2][i];
                                }
                                okayResult.push(num / okayMidArray.length);
                            }
                            this.setState({okayArray: okayResult})
                        }
                    })
                })
        })
    }
    render(){
        return(
            <div id='resultsFullDiv'>
                <header id='resultsHeader'>
                    <div className='searchLinkDiv'>
                        <Link className='searchLink' to='/'>Home</Link>
                    </div>
                    <div className='searchLinkDiv'>
                        <Link className='searchLink' to='/profile'>Profile</Link>
                    </div>
                </header>
                <ResultsChart
                    Best = {this.state.perfect_breeds}
                    Good = {this.state.good_breeds} 
                    Okay = {this.state.okay_breeds}
                    bestAvg = {this.state.perfectArray}
                    goodAvg = {this.state.goodArray}
                    okayAvg = {this.state.okayArray} 
                />
            </div>
        )
    }
}

const mapStateToProps = state => {
    const {friendly_dogs, friendly_pets, affection, size, grooming, vocality, energy, training, exercise} = state

    return {friendly_dogs, friendly_pets, affection, size, grooming, vocality, energy, training, exercise}
}

export default connect(mapStateToProps)(Results)