import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'

import {updateAffection, updateSize} from '../../../ducks/reducer'

import './Page2.css'

class Page2 extends Component {
    constructor(){
        super()
        this.state = {
            affectionClicked1: false,
            affectionClicked2: false,
            affectionClicked3: false,
            sizeClicked1: false,
            sizeClicked2: false,
            sizeClicked3: false,
            sizeClicked4: false,
        }
    }
    clickedAffection(e){
        this.props.updateAffection(e)
        // console.log(this.props)
        if(e === 1){
            this.setState({affectionClicked1: !this.state.affectionClicked1})
            this.setState({affectionClicked2: false, affectionClicked3: false})
        }
        else if(e === 2){
            this.setState({affectionClicked2: !this.state.affectionClicked2})
            this.setState({affectionClicked1: false, affectionClicked3: false})
        }
        else{
            this.setState({affectionClicked3: !this.state.affectionClicked3})
            this.setState({affectionClicked2: false, affectionClicked1: false})
        }
    }

    clickedSize(e){
        this.props.updateSize(e)
        if(e === 1){
            this.setState({sizeClicked1: !this.state.sizeClicked1})
            this.setState({sizeClicked2: false, sizeClicked3: false, sizeClicked4: false})
        }
        else if(e === 2){
            this.setState({sizeClicked2: !this.state.sizeClicked2})
            this.setState({sizeClicked1: false, sizeClicked3: false, sizeClicked4: false})
        }
        else if(e === 3){
            this.setState({sizeClicked3: !this.state.sizeClicked3})
            this.setState({sizeClicked2: false, sizeClicked4: false, sizeClicked1: false})
        }
        else{
            this.setState({sizeClicked4: !this.state.sizeClicked4})
            this.setState({sizeClicked2: false, sizeClicked3: false, sizeClicked1: false})
        }
    }
    componentDidMount(){
        window.scrollTo(0, 0)
        if(this.props.affection === 1){
            this.setState({affectionClicked1: true})
        }
        else if(this.props.affection === 2){
            this.setState({affectionClicked2: true})
        }
        else if(this.props.affection === 3){
            this.setState({affectionClicked3: true})
        }
        if(this.props.size === 1){
            this.setState({sizeClicked1: true})
        }
        else if(this.props.size === 2){
            this.setState({sizeClicked2: true})
        }
        else if(this.props.size === 3){
            this.setState({sizeClicked3: true})
        }
        else if(this.props.size === 4){
            this.setState({sizeClicked4: true})
        }
    }

    render(){
        // const next = <pre id='next_link'>  Next  </pre>
        console.log(this.props.match)
        return(
            <div className='wizard2'>
                <header id='SurveyHeader2'>
                    <div className='searchLinkDiv'>
                        <Link className='searchLink' to='/'>Home</Link>
                    </div>
                    <div className='searchLinkDiv'>
                        <Link className='searchLink' to='/profile'>Profile</Link>
                    </div>
                </header>
                <div className='surveyDiv2'>
                    <h1>How much do you like cuddles?</h1>
                    <div className='surveyButtons2'>
                        <button className={this.state.affectionClicked1 ? 'surveyButtonClicked' : 'surveyButton'} onClick={() => this.clickedAffection(1)}>On Occassion</button>
                        <button className={this.state.affectionClicked2 ? 'surveyButtonClicked' : 'surveyButton'} onClick={() => this.clickedAffection(2)}>Most Days</button>
                        <button className={this.state.affectionClicked3 ? 'surveyButtonClicked' : 'surveyButton'} onClick={() => this.clickedAffection(3)}>Can't Get Enough</button>
                    </div>
                    <h1>Do you like big dogs or little dogs?</h1>
                    <div className='surveyButtons2'>
                        <button className={this.state.sizeClicked1 ? 'surveyButtonClicked' : 'surveyButton'} onClick={() => this.clickedSize(1)}>The smaller the better!</button>
                        <button className={this.state.sizeClicked2 ? 'surveyButtonClicked' : 'surveyButton'} onClick={() => this.clickedSize(2)}>Medium is always a safe bet</button>
                        <button className={this.state.sizeClicked3 ? 'surveyButtonClicked' : 'surveyButton'} onClick={() => this.clickedSize(3)}>The bigger the better!</button>
                        <button className={this.state.sizeClicked4 ? 'surveyButtonClicked' : 'surveyButton'} onClick={() => this.clickedSize(4)}>Gimme Clifford</button>
                    </div>
                    <div id='survey_links_div2'>
                        <Link className='survey_links2' to='/survey/1'>Start Over</Link>
                        <Link className='survey_links2' to='/survey/1'>Previous</Link>
                        <Link className='survey_links2' to='/survey/3'>Continue</Link>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    const {affection, size} = state

    return {affection, size}
}

export default connect(mapStateToProps, {updateAffection, updateSize})(Page2)