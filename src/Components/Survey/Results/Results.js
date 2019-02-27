import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'

import axios from 'axios'

import ResultsChart from './ResultsChart'

class Results extends Component {
    constructor(){
        super()
        this.state = {
            results: ['2', '2', '3', '4', '3', '3', '3', '3', '3'],
            perfect_breeds: [],
            good_breeds: [],
            okay_breeds: [],
            illFitting_breeds: []
        }
    }
    componentDidMount(){
        this.setState({results: [this.props.friendly_dogs, this.props.friendly_pets, this.props.affection, this.props.size, this.props.grooming, this.props.vocality, this.props.energy, this.props.training, this.props.exercise]}, () => {
            console.log(this.state.results)
            axios
                .post('/api/breed_results', this.state.results)
                .then(response => {
                    console.log(response)
                    this.setState({
                        perfect_breeds: response.data.perfectFitBreeds,
                        good_breeds: response.data.goodFitBreeds,
                        okay_breeds: response.data.okayFitBreeds,
                        illFitting_breeds: response.data.illFitBreeds
                    })
                })
        })
    }
    render(){
        console.log(this.state.results)
        return(
            <div>
                
                {/* <p>Best Matched Breeds</p> */}
                {/* {this.state.perfect_breeds !== [] ? this.state.perfect_breeds.map((e, i) => (
                    <div className='breedsDiv' key={i}>
                        <h4>{e.breed}</h4>
                    </div>
                )) : <div></div>} */}
                {/* <p>You-Can-Make-It-Work Breeds</p> */}
                {/* {this.state.okay_breeds !== [] ? this.state.okay_breeds.map((e, i) => (
                    <div className='breedsDiv' key={i}>
                        <h4>{e.breed}</h4>
                    </div>
                )) : <div></div>} */}
                <ResultsChart
                    Best = {this.state.perfect_breeds}
                    Good = {this.state.good_breeds} 
                    Okay = {this.state.okay_breeds} 
                    // Improbable = {this.state.illFitting_breeds}
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