import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'

import {updateAffection, updateSize} from '../../../ducks/reducer'



class Page2 extends Component {
    render(){
        console.log(this.props.match)
        return(
            <div className='wizard'>
                <h1>How much do you like cuddles?</h1>
                <div className='surveyButtons'>
                    <button onClick={() => this.props.updateAffection(1)}>On Occassion</button>
                    <button onClick={() => this.props.updateAffection(2)}>Most Days</button>
                    <button onClick={() => this.props.updateAffection(3)}>Can't Get Enough</button>
                </div>
                {/* <h1>How much do you like cuddles?</h1>
                <div className='surveyButtons'>
                    <h3>On occasion</h3>
                    <input type="range" id="affection" min="1" max="3"  step="1" onChange={(e) => this.props.updateAffection(e.target.value)}></input>
                    <h3>Can't get enough!</h3>
                </div> */}
                <h1>Do you like big dogs or little dogs?</h1>
                <div className='surveyButtons'>
                    <button onClick={() => this.props.updateSize(1)}>The smaller the better!</button>
                    <button onClick={() => this.props.updateSize(2)}>Medium is always a safe bet</button>
                    <button onClick={() => this.props.updateSize(3)}>The bigger the better!</button>
                    <button onClick={() => this.props.updateSize(4)}>Gimme Clifford</button>
                </div>
                {/* <h1>Do you like big dogs or little dogs?</h1>
                <div className='surveyButtons'>
                    <h3>I have nightmares about Clifford</h3>
                    <input type="range" id="size" min="1" max="4" step="1" onChange={(e) => this.props.updateSize(e.target.value)}></input>
                    <h3>I dream of riding it into battle</h3>
                </div> */}
                <div>
                    <Link to='/survey/1'>Start Over</Link>
                    <Link to='/survey/3'>Next</Link>
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