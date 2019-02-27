import React, {Component} from 'react'
import axios from 'axios';
import firebase from '../../../firebase.js'

import MyPetsScroll from './MyPetsScroll'

import './MyPets.css'

class MyPets extends Component {
    constructor(){
        super()
        this.state = {
            pets: [],
            showDelete: false,

            editPets: false,
            petImage: '',
            petName: '',
            petSelectedFile: '',
            PetUploadEXIF: '',
        }

        this.getUserPets = this.getUserPets.bind(this)
    }

    handlePetChange = (e) => {
        this.setState({petName: e.target.value })
    }
    handlePetFileChange(e){
        this.setState({petSelectedFile: e.target.files[0]})
    }
    handlePetUpload (){
        this.getOrientation(this.state.petSelectedFile, function(orientation) {
            this.setState({PetUploadEXIF: orientation})
       }.bind(this));
        if(this.state.petSelectedFile){
            const storageRef = firebase.storage().ref()
            const imageFolderRef = storageRef.child('images/'+this.state.petSelectedFile.name)
            const imageRef = storageRef.child(this.state.petSelectedFile.name)
            const pic = this.state.petSelectedFile
            const metadata = {
                name: this.state.petSelectedFile.name,
            }
            imageFolderRef.put(pic, metadata).then(function(snapshot){
                console.log(snapshot)
                imageFolderRef.getDownloadURL().then(url => {
                    this.setState({petImage: url}, () => console.log(this.state.petImage))
                })
            }.bind(this))
        }
        else {
            alert('Please select a profile image')
        }
    }
    getOrientation(file, callback) {
        var reader = new FileReader();
        reader.onload = function(event) {
          var view = new DataView(event.target.result);
          if (view.getUint16(0, false) != 0xFFD8) return callback(-2);
          var length = view.byteLength,
              offset = 2;
          while (offset < length) {
            var marker = view.getUint16(offset, false);
            offset += 2;
            if (marker == 0xFFE1) {
              if (view.getUint32(offset += 2, false) != 0x45786966) {
                return callback(-1);
              }
              var little = view.getUint16(offset += 6, false) == 0x4949;
              offset += view.getUint32(offset + 4, little);
              var tags = view.getUint16(offset, little);
              offset += 2;
      
              for (var i = 0; i < tags; i++)
                if (view.getUint16(offset + (i * 12), little) == 0x0112)
                  return callback(view.getUint16(offset + (i * 12) + 8, little));
            }
            else if ((marker & 0xFF00) != 0xFF00) break;
            else offset += view.getUint16(offset, false);
          }
          return callback(-1);
        };
        reader.readAsArrayBuffer(file.slice(0, 64 * 1024));
      };
      addPet(e){
        this.setState({editPets: false})
        e.preventDefault()
        const newValues = {
            pet_image_exif: this.state.PetUploadEXIF,
            pet_img: this.state.petImage,
            pet_name: this.state.petName,
        }
        axios
            .put('/api/user/pets', {newValues})
            .then(response => {
                console.log(response.data)
                this.getUserPets()
            })
            .catch(err => {
                console.log(err)
                if(!this.state.username){
                    this.props.history.push("/")
                }
            })
    }
    editPets(){
        this.setState({editPets: !this.state.editPets})
    }
    componentDidMount(){
        this.getUserPets()
    }
    getUserPets(){
        axios
            .get('/api/user/pets')
            .then(response => {
                this.setState({pets: response.data})
            })
    }
    render(){
        return(
            <div id='pets'>
                 <h1>My Pets</h1>
                <div id='my_pets'>
                    <img id={!this.state.editPets ? 'plus' : 'plus_hide'} src={require('../../../Images/plus.png')} onClick={() => this.editPets()}/>
                    <form id={this.state.editPets ? 'pet_upload':'pet_upload_hide'} onSubmit={(e) => this.addPet(e)}> 
                        <input
                            className='profileInputField'
                            name='petName'
                            required 
                            type='text' 
                            // value={}
                            placeholder='Pet Name'
                            onChange={e => this.handlePetChange(e)}
                        ></input>
                        <input
                            required
                            id='petInputFile'
                            name='selectedFile' 
                            type='file' 
                            placeholder='Pet Image'
                            onChange={e => this.handlePetFileChange(e)}
                        ></input>
                        <div id='addPetButtons'>
                            <button type='button' className='profile_button' onClick={(e) => this.handlePetUpload(e)}>Add Image</button>
                            <input type='submit' value='Update' className='profile_button'></input>
                            <button type='button' className='profile_button' onClick={(e) => this.editPets(e)}>Cancel</button>
                        </div>
                    </form>
                    <MyPetsScroll
                        pets = {this.state.pets}
                        getUserPets = {this.getUserPets}
                    />
                </div>
                
            </div>
            
        )
    }
    
}

export default MyPets