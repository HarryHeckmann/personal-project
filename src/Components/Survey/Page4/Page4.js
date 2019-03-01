import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'

import {updateEnergy, updateTraining, updateExercise} from '../../../ducks/reducer'

import './Page4.css'

class Page4 extends Component {
    constructor(){
        super()
        this.state = {
            energyClicked1: false,
            energyClicked2: false,
            energyClicked3: false,
            trainingClicked1: false,
            trainingClicked2: false,
            trainingClicked3: false,
            exerciseClicked1: false,
            exerciseClicked2: false,
            exerciseClicked3: false,
        }
    }

    clickedEnergy(e){
        this.props.updateEnergy(e)
        // console.log(this.prps)
        if(e === 1){
            this.setState({energyClicked1: !this.state.energyClicked1})
            this.setState({energyClicked2: false, energyClicked3: false})
        }
        else if(e === 2){
            this.setState({energyClicked2: !this.state.energyClicked2})
            this.setState({energyClicked1: false, energyClicked3: false})
        }
        else{
            this.setState({energyClicked3: !this.state.energyClicked3})
            this.setState({energyClicked2: false, energyClicked1: false})
        }
    }

    clickedTraining(e){
        this.props.updateTraining(e)
        if(e === 1){
            this.setState({trainingClicked1: !this.state.trainingClicked1})
            this.setState({trainingClicked2: false, trainingClicked3: false})
        }
        else if(e === 2){
            this.setState({trainingClicked2: !this.state.trainingClicked2})
            this.setState({trainingClicked1: false, trainingClicked3: false})
        }
        else{
            this.setState({trainingClicked3: !this.state.trainingClicked3})
            this.setState({trainingClicked2: false, trainingClicked1: false})
        }
    }
    clickedExercise(e){
        this.props.updateExercise(e)
        if(e === 1){
            this.setState({exerciseClicked1: !this.state.exerciseClicked1})
            this.setState({exerciseClicked2: false, exerciseClicked3: false})
        }
        else if(e === 2){
            this.setState({exerciseClicked2: !this.state.exerciseClicked2})
            this.setState({exerciseClicked1: false, exerciseClicked3: false})
        }
        else{
            this.setState({exerciseClicked3: !this.state.exerciseClicked3})
            this.setState({exerciseClicked2: false, exerciseClicked1: false})
        }
    }

    componentDidMount(){
        if(this.props.energy == 1){
            this.setState({energyClicked1: true})
        }
        else if(this.props.energy == 2){
            this.setState({energyClicked2: true})
        }
        else if(this.props.energy == 3){
            this.setState({energyClicked3: true})
        }
        if(this.props.training == 1){
            this.setState({trainingClicked1: true})
        }
        else if(this.props.training == 2){
            this.setState({trainingClicked2: true})
        }
        else if(this.props.training == 3){
            this.setState({trainingClicked3: true})
        }
        if(this.props.exercise == 1){
            this.setState({exerciseClicked1: true})
        }
        else if(this.props.exercise == 2){
            this.setState({exerciseClicked2: true})
        }
        else if(this.props.exercise == 3){
            this.setState({exerciseClicked3: true})
        }
    }
    render(){
        // console.log(this.props.match)
        return(
            <div className='wizard4'>
                <header id='SurveyHeader4'>
                    <div className='searchLinkDiv'>
                        <Link className='searchLink' to='/'>Home</Link>
                    </div>
                    <div className='searchLinkDiv'>
                        <Link className='searchLink' to='/profile'>Profile</Link>
                    </div>
                </header>
                <div className='surveyDiv4'>
                    <h1>How often will the dog be left alone or crated?</h1>
                    <div className='surveyButtons4'>
                        <button className={this.state.energyClicked1 ? 'surveyButtonClicked' : 'surveyButton'} onClick={() => this.clickedEnergy(1)}>6-8 Hours per day</button>
                        <button className={this.state.energyClicked2 ? 'surveyButtonClicked' : 'surveyButton'} onClick={() => this.clickedEnergy(2)}>A few hours per day</button>
                        <button className={this.state.energyClicked3 ? 'surveyButtonClicked' : 'surveyButton'} onClick={() => this.clickedEnergy(3)}>Almost Never</button>
                    </div>
                    <h1>How much training experience do you have?</h1>
                    <div className='surveyButtons4'>
                        <button className={this.state.trainingClicked1 ? 'surveyButtonClicked' : 'surveyButton'} onClick={() => this.clickedTraining(1)}>It can't be that hard, right??</button>
                        <button className={this.state.trainingClicked2 ? 'surveyButtonClicked' : 'surveyButton'} onClick={() => this.clickedTraining(2)}>Some</button>
                        <button className={this.state.trainingClicked3 ? 'surveyButtonClicked' : 'surveyButton'} onClick={() => this.clickedTraining(3)}>I taught Cujo how to fetch</button>
                    </div>
                    <h1>How active are you?</h1>
                    <div className='surveyButtons4'>
                        <button className={this.state.exerciseClicked1 ? 'surveyButtonClicked' : 'surveyButton'} onClick={() => this.clickedExercise(1)}>I work out by using a remote</button>
                        <button className={this.state.exerciseClicked2 ? 'surveyButtonClicked' : 'surveyButton'} onClick={() => this.clickedExercise(2)}>I exercise regurlarly</button>
                        <button className={this.state.exerciseClicked3 ? 'surveyButtonClicked' : 'surveyButton'} onClick={() => this.clickedExercise(3)}>I'm practically a Subaru commercial</button>
                    </div>
                    <div>
                        <div id='survey_links_div4'>
                            <Link className='survey_links4' to='/survey/1'>Start Over</Link>
                            <Link className='survey_links4' to='/survey/3'>Previous</Link>
                            <Link className='survey_links4' to='/survey/results'>Complete</Link>
                        </div>
                    </div>
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