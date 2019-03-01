import React, {Component} from 'react'
import axios from 'axios';

import './Favorites.css'
import FavoritesColumn from './FavoritesColumn';

class Favorites extends Component {
    constructor(){
        super()
        this.state = {
            myFavorites: [],
            favorites: [],
            // showDelete: false,
            loading: true
        }
        this.getFavoritePets = this.getFavoritePets.bind(this)
    }

    componentDidMount(){
        this.getFavoritePets()
    }
    getFavoritePets(){
        this.setState({favorites: []}, () => {
            axios
            .get('api/user/favorites')
            .then(response => {
                console.log(response)
                this.setState({myFavorites: response.data})
                if(response.data.length){
                    for(let i=0;i<response.data.length;i++){
                        axios
                            .get(`/api/pet/${response.data[i].pet_id}`)
                            .then(result => {
                                console.log(result.data)
                                this.setState({favorites: [...this.state.favorites, result.data], loading: false})
                            })
                    }
                }
                else{
                    this.setState({loading: false})
                }
            })
        })
        
    }

    

    render(){
        return (
            <div id='favoritesDiv'>
                <FavoritesColumn
                    myFavorites = {this.state.myFavorites}
                    favorites = {this.state.favorites}
                    getFavoritePets = {this.getFavoritePets}
                    loading = {this.state.loading}
                />
            </div>
        )
    }
    
}

export default Favorites





