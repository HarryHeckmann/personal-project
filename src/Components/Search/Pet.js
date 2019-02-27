import React, {Component} from 'react'
import {Link, Redirect} from 'react-router-dom'

import './Search.css'

class Pet extends Component {
    constructor(props){
        super(props)
        this.state = {
            redirect: false,
            petId: ''
        }
    }

    setRedirect(id){
        this.setState({petId: id}, () => {
            this.setState({redirect: true})
        })
    }
    renderRedirect(){
        if(this.state.redirect){
            return <Redirect to={`/petprofile/${this.state.petId}`}/>
        }
    }
    render(){
        return(
            <div id={this.props.pets.length ? 'PetDiv' : 'PetDivEmpty'}>
                {this.renderRedirect()}
                {this.props.pets.map((e, i) => (
                    <div className='myPetDiv' key={i} onClick={() => this.setRedirect(e.id.$t)}>
                        <img className='petThumbnail' src={e.media.photos.photo[3].$t} style={{width: '18vw'}}/>
                        {/* {console.log(e.media.photos.photo[0].$t)} */}
                        <div className='petNameCity'>
                            <h3>{e.name.$t},</h3><h5>   {e.contact.city.$t}</h5>
                        </div>
                        
                    </div>
                ))}
                <div>
                    <button onClick={() => this.props.nextOffset()}>Next Group</button>
                    {this.props.offset > 0 
                    
                        ? 
                        <button onClick={() => this.props.previousOffset()}>Previous Group</button>
                        :
                        <div></div>
                    }
                    
                </div>
            </div>
        )
    }
}

export default Pet