import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'

import {updateFriendlyDogs, updateFriendlyPets} from '../../../ducks/reducer'



class Page1 extends Component {
    constructor(){
        super()
        this.state = {
            dogs: false,
            pets: false
        }
    }

    text(e){
        this.props.updateFriendlyDogs(e)
        console.log(this.props)

    }
    render(){
        console.log(this.props.match)
        return(
            <div className='wizard'>
                {/* <h1>Do you own any other dogs?</h1>
                <div className='surveyButtons'>
                    <h3>Of course!</h3>
                    <input type="range" id="friendly_dogs" min="1" max="2"  step="1" onChange={(e) => this.props.updateFriendlyDogs(e.target.value)}></input>
                    <h3>Nope! I am a lone wolf right now.</h3>
                </div> */}
                <h1>Do you own any other dogs?</h1>
                <div className='surveyButtons'>
                    <button onClick={() => this.text(2)}>Of Course!</button>
                    <button onClick={() => this.props.updateFriendlyDogs(1)}>Nope! I am a lone wolf right now.</button>
                </div>
                {/* <h1>Do you own any other pets?</h1>
                <div className='surveyButtons'>
                    <h3>Call me Dr. Dolittle!</h3>
                    <input type="range" id="friendly_pets" min="1" max="2"  step="1" onChange={(e) => this.props.updateFriendlyPets(e.target.value)}></input>
                    <h3>What am I, a zoo!?</h3>
                </div> */}
                <h1>Do you own any other pets?</h1>
                <div className='surveyButtons'>
                    <button onClick={() => this.props.updateFriendlyPets(2)}>Call me Dr. Dolittle!</button>
                    <button onClick={() => this.props.updateFriendlyPets(1)}>What am I, a zoo!?</button>
                </div>
                <div>
                    <Link to='/survey/1'>Start Over</Link>
                    <Link to='/survey/2'>Next</Link>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    const {friendly_dogs, friendly_pets} = state

    return {friendly_dogs, friendly_pets}
}

export default connect(mapStateToProps, {updateFriendlyDogs, updateFriendlyPets})(Page1)