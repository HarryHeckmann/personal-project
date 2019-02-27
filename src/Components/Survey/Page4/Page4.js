import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'

import {updateEnergy, updateTraining, updateExercise} from '../../../ducks/reducer'



class Page4 extends Component {
    render(){
        console.log(this.props.match)
        return(
            <div className='wizard'>
                <h1>How often will the dog be left alone or crated?</h1>
                <div className='surveyButtons'>
                    <button onClick={() => this.props.updateEnergy(1)}>6-8 Hours per day</button>
                    <button onClick={() => this.props.updateEnergy(2)}>A few hours per day</button>
                    <button onClick={() => this.props.updateEnergy(3)}>Almost Never</button>
                </div>
                {/* <h1>How often will the dog be left alone or crated?</h1>
                <div className='surveyButtons'>
                    <h3>6-8 Hours per day</h3>
                    <input type="range" id="affection" min="1" max="3"  step="1" onChange={(e) => this.props.updateEnergy(e.target.value)}></input>
                    <h3>Almost Never</h3>
                </div> */}
                <h1>How much training experience do you have?</h1>
                <div className='surveyButtons'>
                    <button onClick={() => this.props.updateTraining(1)}>It can't be that hard, right??</button>
                    <button onClick={() => this.props.updateTraining(2)}>Some</button>
                    <button onClick={() => this.props.updateTraining(3)}>I taught Cujo how to fetch</button>
                </div>
                {/* <h1>How much training experience do you have?</h1>
                <div className='surveyButtons'>
                    <h3>It can't be that hard, right??</h3>
                    <input type="range" id="affection" min="1" max="3"  step="1" onChange={(e) => this.props.updateTraining(e.target.value)}></input>
                    <h3>I taught Cujo how to fetch</h3>
                </div> */}
                <h1>How active are you?</h1>
                <div className='surveyButtons'>
                    <button onClick={() => this.props.updateExercise(1)}>I work out by using a remote</button>
                    <button onClick={() => this.props.updateExercise(2)}>I exercise regurlarly</button>
                    <button onClick={() => this.props.updateExercise(3)}>I'm practically a Subaru commercial</button>
                </div>
                {/* <h1>How active are you?</h1>
                <div className='surveyButtons'>
                    <h3>I work out by using a remote</h3>
                    <input type="range" id="size" min="1" max="3" step="1" onChange={(e) => this.props.updateExercise(e.target.value)}></input>
                    <h3>I'm practically a Subaru commercial</h3>
                </div> */}
                <div>
                    <Link to='/survey/1'>Start Over</Link>
                    <Link to='/survey/3'>Previous</Link>
                    <Link to='/survey/results'>Complete</Link>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    const {energy, training, exercise} = state

    return {energy, training, exercise}
}

export default connect(mapStateToProps, {updateEnergy, updateTraining, updateExercise})(Page4)