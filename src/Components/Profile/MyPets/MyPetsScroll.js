import React, {Component} from 'react'
import axios from 'axios';
import firebase from '../../../firebase.js'

import './MyPets.css'

class MyPetsScroll extends Component {
    constructor(props){
        super(props)
        this.state = {
            pets: [],
            showDelete: false,

        }
    }
    componentDidMount(){
        console.log(this.props.pets)
        this.setState({pets: this.props.pets})
    }
    componentDidUpdate(prevProps, prevState){
        if(prevProps.pets !== this.props.pets){
             this.setState({pets: this.props.pets})
        }
    }
    showDelete(){
        this.setState({showDelete: true})
    }
    hideDelete(){
        this.setState({showDelete: false})
    }
    deletePet(id){
        axios
            .delete(`/api/deletepet/${id}`)
            .then(response => {
                this.props.getUserPets()
            })
    }
    render(){
        return(
            <div id='myPetsRow'>
                {this.state.pets.map((e, i) => (
                    <div className='myProfilePetDiv' key={i} onMouseEnter={() => this.showDelete()} onMouseLeave={() => this.hideDelete()}>
                        {this.state.showDelete
                            ?
                                <img id='deleteImage' src={require('../../../Images/error.png')} onClick={() => this.deletePet(e.pet_id)}/>
                            :
                                <img id={`myPetImage${e.pet_image_exif}`} src={e.pet_image}/>
                        }
                        <h4>{e.pet_name}</h4>
                    </div>
                ))}
            </div>
        )
    } 
}

export default MyPetsScroll