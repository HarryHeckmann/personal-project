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
            // <div>
            //     {Array.isArray}
            // </div>
            <div id={Array.isArray(this.props.pets) ? this.props.pets.length ? 'PetDiv' : 'PetDivEmpty' : this.props.pets.name.$t ? 'PetDiv' : 'PetDivEmpty'}>
                {this.renderRedirect()}
                {Array.isArray(this.props.pets) 
                
                ?
                    this.props.pets.map((e, i) => (
                        <div className='myPetDiv' key={i} onClick={() => this.setRedirect(e.id.$t)}>
                            <img className='petThumbnail' src={e.media.photos ? e.media.photos.photo[3].$t : require('../../Images/dog.png')} style={{width: '18vw'}}/>
                            {/* {console.log(e.media.photos.photo[0].$t)} */}
                            <div className='petNameCity'>
                                <h3>{e.name.$t},</h3><h5>   {e.contact.city.$t}</h5>
                            </div>
                            
                        </div>
                    ))
                :
                    <div className='myPetDiv' onClick={() => this.setRedirect(this.props.pets.id.$t)}>
                        {this.props.pets 
                            ? 
                                <div>
                                    <img className='petThumbnail' src={this.props.pets.media.photos.photo[3].$t} style={{width: '18vw'}}/>
                                    <div className='petNameCity'>
                                        <h3>{this.props.pets.name.$t},</h3><h5>   {this.props.pets.contact.city.$t}</h5>
                                    </div>
                                </div>
                            :
                                <div>

                                </div>
                        }
                    </div>
                }
                <div id='searchButtonCycleDiv'>
                {this.props.offset > 0 
                    
                    ? 
                    <button className='SearchButtonCycle' onClick={() => this.props.previousOffset()}>Previous Group</button>
                    :
                    <div></div>
                }
                    <button className='SearchButtonCycle' onClick={() => this.props.nextOffset()}>Next Group</button>
                </div>
            </div>
        )
    }
}

export default Pet