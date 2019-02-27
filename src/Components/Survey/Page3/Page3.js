import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'

import {updateGrooming, updateVocality} from '../../../ducks/reducer'



class Page3 extends Component {
    render(){
        console.log(this.props.match)
        return(
            <div className='wizard'>
                <h1>How often are you willing to groom your dog?</h1>
                <div className='surveyButtons'>
                    <button onClick={() => this.props.updateGrooming(1)}>Only when I have to</button>
                    <button onClick={() => this.props.updateGrooming(2)}>Regularly</button>
                    <button onClick={() => this.props.updateGrooming(3)}>I'm gonna start my own salon</button>
                </div>
                {/* <h1>How often are you willing to groom your dog?</h1>
                <div className='surveyButtons'>
                    <h3>Only when I have to</h3>
                    <input type="range" id="affection" min="1" max="3"  step="1" onChange={(e) => this.props.updateGrooming(e.target.value)}></input>
                    <h3>I'm gonna start my own salon</h3>
                </div> */}
                <h1>How much do you care about barking?</h1>
                <div className='surveyButtons'>
                    <button onClick={() => this.props.updateVocality(1)}>Maybe I should've got a fish</button>
                    <button onClick={() => this.props.updateVocality(2)}>Don't mind too much!</button>
                    <button onClick={() => this.props.updateVocality(3)}>It's just my backup vocals</button>
                </div>
                {/* <h1>How much do you care about barking?</h1>
                <div className='surveyButtons'>
                    <h3>Maybe I should've got a fish</h3>
                    <input type="range" id="size" min="1" max="3" step="1" onChange={(e) => this.props.updateVocality(e.target.value)}></input>
                    <h3>It's just my backup vocals</h3>
                </div> */}
                <div>
                    <Link to='/survey/1'>Start Over</Link>
                    <Link to='/survey/2'>Previous</Link>
                    <Link to='/survey/4'>Next</Link>
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