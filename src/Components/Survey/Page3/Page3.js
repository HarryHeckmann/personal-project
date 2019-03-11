import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'

import {updateGrooming, updateVocality} from '../../../ducks/reducer'

import './Page3.css'

class Page3 extends Component {
    constructor(){
        super()
        this.state = {
            groomingClicked1: false,
            groomingClicked2: false,
            groomingClicked3: false,
            vocalityClicked1: false,
            vocalityClicked2: false,
            vocalityClicked3: false,
        }
    }
    clickedGrooming(e){
        this.props.updateGrooming(e)
        // console.log(this.prps)
        if(e === 1){
            this.setState({groomingClicked1: !this.state.groomingClicked1})
            this.setState({groomingClicked2: false, groomingClicked3: false})
        }
        else if(e === 2){
            this.setState({groomingClicked2: !this.state.groomingClicked2})
            this.setState({groomingClicked1: false, groomingClicked3: false})
        }
        else{
            this.setState({groomingClicked3: !this.state.groomingClicked3})
            this.setState({groomingClicked2: false, groomingClicked1: false})
        }
    }

    clickedVocality(e){
        this.props.updateVocality(e)
        if(e === 1){
            this.setState({vocalityClicked1: !this.state.vocalityClicked1})
            this.setState({vocalityClicked2: false, vocalityClicked3: false})
        }
        else if(e === 2){
            this.setState({vocalityClicked2: !this.state.vocalityClicked2})
            this.setState({vocalityClicked1: false, vocalityClicked3: false})
        }
        else{
            this.setState({vocalityClicked3: !this.state.vocalityClicked3})
            this.setState({vocalityClicked2: false, vocalityClicked1: false})
        }
    }
    componentDidMount(){
        window.scrollTo(0, 0)
        if(this.props.grooming === 1){
            this.setState({groomingClicked1: true})
        }
        else if(this.props.grooming === 2){
            this.setState({groomingClicked2: true})
        }
        else if(this.props.grooming === 3){
            this.setState({groomingClicked3: true})
        }
        if(this.props.vocality === 1){
            this.setState({vocalityClicked1: true})
        }
        else if(this.props.vocality === 2){
            this.setState({vocalityClicked2: true})
        }
        else if(this.props.vocality === 3){
            this.setState({vocalityClicked3: true})
        }
    }
    render(){
        console.log(this.props.match)
        return(
            <div className='wizard3'>
                <header id='SurveyHeader3'>
                    <div className='searchLinkDiv'>
                        <Link className='searchLink' to='/'>Home</Link>
                    </div>
                    <div className='searchLinkDiv'>
                        <Link className='searchLink' to='/profile'>Profile</Link>
                    </div>
                </header>
                <div className='surveyDiv3'>
                    <h1>How often are you willing to groom your dog?</h1>
                    <div className='surveyButtons3'>
                        <button className={this.state.groomingClicked1 ? 'surveyButtonClicked' : 'surveyButton'} onClick={() => this.clickedGrooming(1)}>I'd rather not have to</button>
                        <button className={this.state.groomingClicked2 ? 'surveyButtonClicked' : 'surveyButton'} onClick={() => this.clickedGrooming(2)}>Regularly</button>
                        <button className={this.state.groomingClicked3 ? 'surveyButtonClicked' : 'surveyButton'} onClick={() => this.clickedGrooming(3)}>All the time!</button>
                    </div>
                    <h1>How much do you care about barking?</h1>
                    <div className='surveyButtons3'>
                        <button className={this.state.vocalityClicked1 ? 'surveyButtonClicked' : 'surveyButton'} onClick={() => this.clickedVocality(1)}>Make it Stop</button>
                        <button className={this.state.vocalityClicked2 ? 'surveyButtonClicked' : 'surveyButton'} onClick={() => this.clickedVocality(2)}>Don't mind too much!</button>
                        <button className={this.state.vocalityClicked3 ? 'surveyButtonClicked' : 'surveyButton'} onClick={() => this.clickedVocality(3)}>It's my backup vocals!</button>
                    </div>
                    <div id='survey_links_div3'>
                        <Link className='survey_links3' to='/survey/1'>Start Over</Link>
                        <Link className='survey_links3' to='/survey/2'>Previous</Link>
                        <Link className='survey_links3' to='/survey/4'>Continue</Link>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    const {grooming, vocality} = state

    return {grooming, vocality}
}

export default connect(mapStateToProps, {updateGrooming, updateVocality})(Page3)