import React, {Component} from 'react'
import axios from 'axios'
import {Link} from 'react-router-dom'
import Pet from './Pet'

import {connect} from 'react-redux'

import {updateLocation, updateAnimal, updateBreed, updateSearchSize, updateAge, updateSex, updateOffset, updatePets} from '../../ducks/reducer'

import './Search.css'

class Search extends Component{
    constructor(){
        super()
        this.state = {
            // location: '',
            // animal: '',
            // breed: '',
            // size: '',
            // age: '',
            // sex: '',
            // offset: 0,

            // pets: [],
            // displayResults: false
        }
        this.nextOffset = this.nextOffset.bind(this)
        this.previousOffset = this.previousOffset.bind(this)
    }


    nextOffset(){
        this.props.updateOffset(this.props.offset+20)
        this.handleSearch()
        // console.log(this.state)
    }
    previousOffset(){
        if(this.props.offset > 0){
            this.props.updateOffset(this.props.offset-20)
            this.handleSearch()
        }
    }

    handleSearch(){
        const location = this.props.location
        const animal = this.props.animal
        const breed = this.props.breed
        const size = this.props.search_size
        const age = this.props.age
        const sex = this.props.sex
        const offset = this.props.offset
        
        axios
            .post('/api/pets', {animal, breed, size, sex, location, age, offset})
            .then(response => {
                console.log(response.data)
                this.props.updatePets(response.data)
                // this.setState({displayResults: true})
            })
    }

    render(){
        return(
            <div id={this.props.pets.length ? 'SearchPage' : 'SearchPageEmpty'}>
                <header>
                    <div className='searchLinkDiv'>
                        <Link className='searchLink' to='/'>Home</Link>
                    </div>
                    <div className='searchLinkDiv'>
                        <Link className='searchLink' to='/profile'>Profile</Link>
                    </div>
                </header>
                <div id='SearchBar'>
                    <label className='SearchLabel'>
                        <input id='locationId' type='text' name='location' onChange={(e) => this.props.updateLocation(e.target.value)} placeholder='Zipcode'></input>
                    </label>
                    <label className='SearchLabel'>
                        <select className='selectClass' value={this.state.value} onChange={(e) => this.props.updateAnimal(e.target.value)} name='animal'>
                            <option value=''>Select Animal</option>
                            <option value="barnyard">Barnyard</option>
                            <option value="cat">Cat</option>
                            <option value="dog">Dog</option>
                            <option value="horse">Horse</option>
                            <option value="reptile">Reptile</option>
                            <option value="smallfurry">Small Furry</option>
                        </select>
                    </label>
                    <label className='SearchLabel'>
                        <select className='selectClass' value={this.state.value} onChange={(e) => this.props.updateBreed(e.target.value)} name='breed'>
                            <option value=''>Select Breed</option>
                            <option value="Affenpinscher">Affenpinscher</option>
                            <option value="Afghan Hound">Afghan Hound</option>
                            <option value="Airedale Terrier">Airedale Terrier</option>
                            <option value="Akita">Akita</option>
                            <option value="Alaskan Malamute">Alaskan Malamute</option>
                            <option value="American Cocker Spaniel">American Cocker Spaniel</option>
                            <option value="American Eskimo Dog">American Eskimo Dog</option>
                            <option value="American Foxhound">American Foxhound</option>
                            <option value="American Staffordshire Terrier">American Staffordshire Terrier</option>
                            <option value="American Water Spaniel">American Water Spaniel</option>
                            <option value="Anatolian Shepherd">Anatolian Shepherd</option>
                            <option value="Australian Cattle Dog / Blue Heeler">Australian Cattle Dog / Blue Heeler</option>
                            <option value="Australian Shepherd">Australian Shepherd</option>
                            <option value="Australian Terrier">Australian Terrier</option>
                            <option value="Basenji">Basenji</option>
                            <option value="Basset Hound">Basset Hound</option>
                            <option value="Beagle">Beagle</option>
                            <option value="Bearded Collie">Bearded Collie</option>
                            <option value="Beauceron">Beauceron</option>
                            <option value="Bedlington Terrier">Bedlington Terrier</option>
                            <option value="Belgian Shepherd / Malinois">Belgian Shepherd / Malinois</option>
                            <option value="Belgian Shepherd / Sheepdog">Belgian Shepherd / Sheepdog</option>
                            <option value="Belgian Shepherd / Tervuren">Belgian Shepherd / Tervuren</option>
                            <option value="Bernese Mountain Dog">Bernese Mountain Dog</option>
                            <option value="Bichon Frise">Bichon Frise</option>
                            <option value="Black and Tan Coonhound">Black and Tan Coonhound</option>
                            <option value="Black Russian Terrier">Black Russian Terrier</option>
                            <option value="Bloodhound">Bloodhound</option>
                            <option value="Bluetick Coonhound">Bluetick Coonhound</option>
                            <option value="Boerboel">Boerboel</option>
                            <option value="Border Collie">Border Collie</option>
                            <option value="Border Terrier">Border Terrier</option>
                            <option value="Borzoi">Borzoi</option>
                            <option value="Boston Terrier">Boston Terrier</option>
                            <option value="Bouvier des Flandres">Bouvier des Flandres</option>
                            <option value="Boxer">Boxer</option>
                            <option value="Boykin Spaniel">Boykin Spaniel</option>
                            <option value="Briard">Briard</option>
                            <option value="Brittany Spaniel">Brittany Spaniel</option>
                            <option value="Brussels Griffon">Brussels Griffon</option>
                            <option value="Bull Terrier">Bull Terrier</option>
                            <option value="Bullmastiff">Bullmastiff</option>
                            <option value="Cairn Terrier">Cairn Terrier</option>
                            <option value="Canaan Dog">Canaan Dog</option>
                            <option value="Cane Corso">Cane Corso</option>
                            <option value="Cardigan Welsh Corgi">Cardigan Welsh Corgi</option>
                            <option value="Cavalier King Charles Spaniel">Cavalier King Charles Spaniel</option>
                            <option value="Chesapeake Bay Retriever">Chesapeake Bay Retriever</option>
                            <option value="Chihuahua">Chihuahua</option>
                            <option value="Chinese Crested Dog">Chinese Crested Dog</option>
                            <option value="Chinook">Chinook</option>
                            <option value="Chow Chow">Chow Chow</option>
                            <option value="Cirneco dell 'Etna">Cirneco dell 'Etna</option>
                            <option value="Clumber Spaniel">Clumber Spaniel</option>
                            <option value="Collie">Collie</option>
                            <option value="Coton de Tulear">Coton de Tulear</option>
                            <option value="Curly-Coated Retriever">Curly-Coated Retriever</option>
                            <option value="Dachshund">Dachshund</option>
                            <option value="Dalmatian">Dalmatian</option>
                            <option value="Dandie Dinmont Terrier">Dandie Dinmont Terrier</option>
                            <option value="Doberman Pinscher">Doberman Pinscher</option>
                            <option value="Dogue de Bordeaux">Dogue de Bordeaux</option>
                            <option value="English Bulldog">English Bulldog</option>
                            <option value="English Cocker Spaniel">English Cocker Spaniel</option>
                            <option value="English Coonhound">English Coonhound</option>
                            <option value="English Foxhound">English Foxhound</option>
                            <option value="English Pointer">English Pointer</option>
                            <option value="English Setter">English Setter</option>
                            <option value="English Springer Spaniel">English Springer Spaniel</option>
                            <option value="English Toy Spaniel">English Toy Spaniel</option>
                            <option value="Entlebucher Mountain Dog">Entlebucher Mountain Dog</option>
                            <option value="Field Spaniel">Field Spaniel</option>
                            <option value="Finnish Lapphund">Finnish Lapphund</option>
                            <option value="Finnish Spitz">Finnish Spitz</option>
                            <option value="Flat-Coated Retriever">Flat-Coated Retriever</option>
                            <option value="French Bulldog">French Bulldog</option>
                            <option value="German Pinscher">German Pinscher</option>
                            <option value="German Shepherd Dog">German Shepherd Dog</option>
                            <option value="German Shorthaired Pointer">German Shorthaired Pointer</option>
                            <option value="German Wirehaired Pointer">German Wirehaired Pointer</option>
                            <option value="Giant Schnauzer">Giant Schnauzer</option>
                            <option value="Glen of Imaal Terrier">Glen of Imaal Terrier</option>
                            <option value="Golden Retriever">Golden Retriever</option>
                            <option value="Gordon Setter">Gordon Setter</option>
                            <option value="Great Dane">Great Dane</option>
                            <option value="Great Pyrenees">Great Pyrenees</option>
                            <option value="Greater Swiss Mountain Dog">Greater Swiss Mountain Dog</option>
                            <option value="Greyhound">Greyhound</option>
                            <option value="Harrier">Harrier</option>
                            <option value="Havanese">Havanese</option>
                            <option value="Ibizan Hound">Ibizan Hound</option>
                            <option value="Icelandic Sheepdog">Icelandic Sheepdog</option>
                            <option value="Irish Setter">Irish Setter</option>
                            <option value="Irish Terrier">Irish Terrier</option>
                            <option value="Irish Water Spaniel">Irish Water Spaniel</option>
                            <option value="Irish Wolfhound">Irish Wolfhound</option>
                            <option value="Italian Greyhound">Italian Greyhound</option>
                            <option value="Japanese Chin">Japanese Chin</option>
                            <option value="Keeshond">Keeshond</option>
                            <option value="Kerry Blue Terrier">Kerry Blue Terrier</option>
                            <option value="Komondor">Komondor</option>
                            <option value="Kuvasz">Kuvasz</option>
                            <option value="Labrador Retriever">Labrador Retriever</option>
                            <option value="Lakeland Terrier">Lakeland Terrier</option>
                            <option value="Leonberger">Leonberger</option>
                            <option value="Lhasa Apso">Lhasa Apso</option>
                            <option value="Lowchen">Lowchen</option>
                            <option value="Maltese">Maltese</option>
                            <option value="Manchester Terrier">Manchester Terrier</option>
                            <option value="Mastiff">Mastiff</option>
                            <option value="Miniature Bull Terrier">Miniature Bull Terrier</option>
                            <option value="Miniature Dachshund">Miniature Dachshund</option>
                            <option value="Miniature Pinscher">Miniature Pinscher</option>
                            <option value="Miniature Poodle">Miniature Poodle</option>
                            <option value="Miniature Schnauzer">Miniature Schnauzer</option>
                            <option value="Mixed Breed">Mixed Breed</option>
                            <option value="Norwegian Buhund">Norwegian Buhund</option>
                            <option value="Norwegian Elkhound">Norwegian Elkhound</option>
                            <option value="Norwegian Lundehund">Norwegian Lundehund</option>
                            <option value="Norwich Terrier">Norwich Terrier</option>
                            <option value="Nova Scotia Duck Tolling Retriever">Nova Scotia Duck Tolling Retriever</option>
                            <option value="Old English Sheepdog">Old English Sheepdog</option>
                            <option value="Otterhound">Otterhound</option>
                            <option value="Papillon">Papillon</option>
                            <option value="Parson Russell Terrier">Parson Russell Terrier</option>
                            <option value="Pekingese">Pekingese</option>
                            <option value="Pembroke Welsh Corgi">Pembroke Welsh Corgi</option>
                            <option value="Petit Basset Griffon Vendeen">Petit Basset Griffon Vendeen</option>
                            <option value="Pharaoh Hound">Pharaoh Hound</option>
                            <option value="Plott Hound">Plott Hound</option>
                            <option value="Polish Lowland Sheepdog">Polish Lowland Sheepdog</option>
                            <option value="Pomeranian">Pomeranian</option>
                            <option value="Poodle">Poodle</option>
                            <option value="Portuguese Podengo">Portuguese Podengo</option>
                            <option value="Portuguese Water Dog">Portuguese Water Dog</option>
                            <option value="Pug">Pug</option>
                            <option value="Puli">Puli</option>
                            <option value="Pyrenean Shepherd">Pyrenean Shepherd</option>
                            <option value="Rat Terrier">Rat Terrier</option>
                            <option value="Redbone Coonhound">Redbone Coonhound</option>
                            <option value="Rhodesian Ridgeback">Rhodesian Ridgeback</option>
                            <option value="Rottweiler">Rottweiler</option>
                            <option value="Saint Bernard">Saint Bernard</option>
                            <option value="Saluki">Saluki</option>
                            <option value="Samoyed">Samoyed</option>
                            <option value="Schipperke">Schipperke</option>
                            <option value="Schnauzer">Schnauzer</option>
                            <option value="Scottish Deerhound">Scottish Deerhound</option>
                            <option value="Scottish Terrier">Scottish Terrier</option>
                            <option value="Sealyham Terrier">Sealyham Terrier</option>
                            <option value="Shar-Pei">Shar-Pei</option>
                            <option value="Shetland Sheepdog / Sheltie">Shetland Sheepdog / Sheltie</option>
                            <option value="Shiba Inu">Shiba Inu</option>
                            <option value="Shih Tzu">Shih Tzu</option>
                            <option value="Siberian Husky">Siberian Husky</option>
                            <option value="Silky Terrier">Silky Terrier</option>
                            <option value="Smooth Fox Terrier">Smooth Fox Terrier</option>
                            <option value="Spanish Water Dog">Spanish Water Dog</option>
                            <option value="Spinone Italiano">Spinone Italiano</option>
                            <option value="Staffordshire Bull Terrier">Staffordshire Bull Terrier</option>
                            <option value="Sussex Spaniel">Sussex Spaniel</option>
                            <option value="Swedish Vallhund">Swedish Vallhund</option>
                            <option value="Tibetan Mastiff">Tibetan Mastiff</option>
                            <option value="Tibetan Spaniel">Tibetan Spaniel</option>
                            <option value="Tibetan Terrier">Tibetan Terrier</option>
                            <option value="Toy Fox Terrier">Toy Fox Terrier</option>
                            <option value="Toy Manchester Terrier">Toy Manchester Terrier</option>
                            <option value="Treeing Walker Coonhound">Treeing Walker Coonhound</option>
                            <option value="Vizsla">Vizsla</option>
                            <option value="Weimaraner">Weimaraner</option>
                            <option value="Welsh Springer Spaniel">Welsh Springer Spaniel</option>
                            <option value="Welsh Terrier">Welsh Terrier</option>
                            <option value="West Highland White Terrier / Westie">West Highland White Terrier / Westie</option>
                            <option value="Wheaten Terrier">Wheaten Terrier</option>
                            <option value="Whippet">Whippet</option>
                            <option value="Wire Fox Terrier">Wire Fox Terrier</option>
                            <option value="Wirehaired Pointing Griffon">Wirehaired Pointing Griffon</option>
                            <option value="Xoloitzcuintli / Mexican Hairless">Xoloitzcuintli / Mexican Hairless</option>
                            <option value="Yorkshire Terrier">Yorkshire Terrier</option>
                        </select>
                    </label>
                    <label className='SearchLabel'>
                        <select className='selectClass' value={this.state.value} onChange={(e) => this.props.updateSearchSize(e.target.value)} name='size'>
                            <option value=''>Select Size</option>
                            <option value="S">Small</option>
                            <option value="M">Medium</option>
                            <option value="L">Large</option>
                            <option value="XL">Extra Large</option>
                        </select>
                    </label>
                    <label className='SearchLabel'>
                        <select className='selectClass' value={this.state.value} onChange={(e) => this.props.updateAge(e.target.value)} name='age'>
                            <option value=''>Select Age</option>
                            <option value="Baby">Baby</option>
                            <option value="Young">Young</option>
                            <option value="Adult">Adult</option>
                            <option value="Senior">Senior</option>
                        </select>
                    </label>
                    <label className='SearchLabel'>
                        <select className='selectClass' value={this.state.value} onChange={(e) => this.props.updateSex(e.target.value)} name='sex'>
                            <option value=''>Select Sex</option>
                            <option value="M">Male</option>
                            <option value="F">Female</option>
                        </select>
                    </label>
                    <button id='SearchButton' onClick={() => this.handleSearch()}>Search</button>
                </div>
                    <Pet
                        pets = {this.props.pets}
                        nextOffset = {this.nextOffset}
                        previousOffset = {this.previousOffset}
                        offset = {this.props.offset}
                    />
                
            </div>
        )
    }
}

const mapStateToProps = state => {
    const {location, animal, breed, search_size, age, sex, offset, pets} = state

    return {location, animal, breed, search_size, age, sex, offset, pets}
}

export default connect(mapStateToProps, {updateLocation, updateAnimal, updateBreed, updateSearchSize, updateAge, updateSex, updateOffset, updatePets})(Search)