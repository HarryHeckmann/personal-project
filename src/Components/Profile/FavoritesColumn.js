import React, {Component} from 'react'
import axios from 'axios';
import {Redirect} from 'react-router-dom'
import Loader from 'react-loader-spinner'

import './Favorites'

class FavoritesColumn extends Component {
    constructor(props){
        super(props)
        this.state = {
            redirect: false,
            myFavorites: [],
            favorites: [],
            showDelete: false,
            loading: true

        }
    }
    componentDidMount(){
        // console.log(this.props.pets)
        this.setState({myFavorites: this.props.myFavorites, favorites: this.props.favorites})
    }
    componentDidUpdate(prevProps, prevState){
        if(prevProps.favorites !== this.props.favorites){
             this.setState({favorites: this.props.favorites, myFavorites: this.props.myFavorites, loading: this.props.loading})
        }
    }
    showDelete(){
        this.setState({showDelete: true})
    }
    hideDelete(){
        this.setState({showDelete: false})
    }
    deleteFavorite(id){
        axios
            .delete(`/api/deletefavorite/${id}`)
            .then(response => {
                this.props.getFavoritePets()
            })
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
        const favArray = this.state.favorites.map((e, i) => (
            // console.log(e)
             !e 
                ?
                    <div>
                    </div>
                :
                    <div key={i} className='favoritesPetCard' key={i} onMouseEnter={() => this.showDelete()} onMouseLeave={() => this.hideDelete()}>  
                    <img id='favoriteImage' src={e.media.photos.photo[1].$t} onClick={() => this.setRedirect(e.id.$t)}/>
                    <h4>{e.name.$t}</h4>
                    <img id={this.state.showDelete ? 'favoriteDeleteImage' : 'favoriteDeleteImageHide'} src={require('../../Images/error.png')} onClick={() => this.deleteFavorite(e.id.$t)}/>
                    </div>
        ))
        const adopted = []
        const existingFav = []
        for(let j=0;j<this.state.favorites.length;j++){
            if(this.state.favorites[j]){
                existingFav.push(this.state.favorites[j].name.$t)
            }
        }
        for(let i=0;i<this.state.myFavorites.length;i++){
            if(existingFav.includes(this.state.myFavorites[i].name)){
            }
            else{
                adopted.push({name: this.state.myFavorites[i].name, id: this.state.myFavorites[i].pet_id})
            }
        }

        return (
            <div id='favoritesDiv'>
                {this.renderRedirect()}
                {this.state.loading 
                ?
                <Loader 
                    type="Ball-Triangle"
                    color="black"
                    height="100"	
                    width="100"
                />   
                : 
                    <div id='pleaseGodWork'>
                        {favArray}
                        {adopted.map((e, i) => (
                            <div key ={i} className='favoritesPetCard' onMouseEnter={() => this.showDelete()} onMouseLeave={() => this.hideDelete()}>
                                <img id='favoriteImage' src={require('../../Images/pet.png')} />
                                <h3 style={{textAlign: 'center'}}>{e.name}'s Been <br></br> Adopted!</h3>
                                <img id={this.state.showDelete ? 'favoriteDeleteImage' : 'favoriteDeleteImageHide'} src={require('../../Images/error.png')} onClick={() => this.deleteFavorite(e.id)}/>
                            </div>
                        ))}
                    </div>
                    
        }
            </div>
        )
    } 
}

export default FavoritesColumn