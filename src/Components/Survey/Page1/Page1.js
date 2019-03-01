import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'

import {updateFriendlyDogs, updateFriendlyPets} from '../../../ducks/reducer'

import './Page1.css'

class Page1 extends Component {
    constructor(){
        super()
        this.state = {
            dogsClicked1: false,
            dogsClicked2: false,
            petsClicked1: false,
            petsClicked2: false,
        }
    }

    clickedDogs(e){
        this.props.updateFriendlyDogs(e)
        // console.log(this.props)
        if(e === 1){
            this.setState({dogsClicked1: !this.state.dogsClicked1})
            this.setState({dogsClicked2: false})
        }
        else{
            this.setState({dogsClicked2: !this.state.dogsClicked2})
            this.setState({dogsClicked1: false})
        }

    }
    clickedPets(e){
        this.props.updateFriendlyPets(e)
        if(e === 1){
            this.setState({petsClicked1: !this.state.petsClicked1})
            this.setState({petsClicked2: false})
        }
        else{
            this.setState({petsClicked2: !this.state.petsClicked2})
            this.setState({petsClicked1: false})
        }
    }
    componentDidMount(){
        if(this.props.friendly_dogs == 1){
            this.setState({dogsClicked1: true})
        }
        else if(this.props.friendly_dogs == 2){
            this.setState({dogsClicked2: true})
        }
        if(this.props.friendly_pets == 1){
            this.setState({petsClicked1: true})
        }
        else if(this.props.friendly_pets == 2){
            this.setState({petsClicked2: true})
        }
    }
    
    render(){
        console.log(this.props.match)
        return(
            <div className='wizard'>
                <header id='SearchHeader'>
                    <div className='searchLinkDiv'>
                        <Link className='searchLink' to='/'>Home</Link>
                    </div>
                    <div className='searchLinkDiv'>
                        <Link className='searchLink' to='/profile'>Profile</Link>
                    </div>
                </header>
                <div className='surveyDiv'>
                    <h1>Do you own any other dogs?</h1>
                    <div className='surveyButtons'>
                        <button className={this.state.dogsClicked2 ? 'surveyButtonClicked' : 'surveyButton'} onClick={() => this.clickedDogs(2)}>Of Course!</button>
                        <button className={this.state.dogsClicked1 ? 'surveyButtonClicked' : 'surveyButton'} onClick={() => this.clickedDogs(1)}>Nope!</button>
                    </div>
                    <h1>Do you own any other pets?</h1>
                    <div className='surveyButtons'>
                        <button className={this.state.petsClicked2 ? 'surveyButtonClicked' : 'surveyButton'} onClick={() => this.clickedPets(2)}>Call me Dr. Dolittle!</button>
                        <button className={this.state.petsClicked1 ? 'surveyButtonClicked' : 'surveyButton'} onClick={() => this.clickedPets(1)}>What am I, a zoo!?</button>
                    </div>
                    <div id='survey_links_div'>
                        <Link className='survey_links' to='/survey/1'>Start Over</Link>
                        <Link className='survey_links' to='/survey/2'>Next</Link>
                    </div>
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