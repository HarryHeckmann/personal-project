import React, {Component} from 'react'
import {Link} from 'react-router-dom'
// import {Redirect} from 'react-router-dom'
import axios from 'axios';
import firebase from '../../firebase.js'
import Loader from 'react-loader-spinner'


import './Profile.css'
import MyPets from './MyPets/MyPets';
import Favorites from './Favorites'

class Profile extends Component {
    constructor(){
        super()
        this.state = {
            id: '',
            username: '',
            firstname: '',
            lastname: '',
            city: '',
            email: '',
            best_breeds: [],
            profileImg: '',
            profileEXIF: '',
        
            uploadEXIF: '',
            uploadImage: '',
            selectedFile: '',

            editProfile: false,
            editProfileImage: false,
            editFavorites: false,

            isLoading: false
        }
    }
  
    componentDidMount(){
        axios
            .get('/api/user')
            .then(response => {
                // console.log(response)
                const user = response.data[0]
                let str = []
                let final = []
                if(user.best_breeds){
                    str = user.best_breeds.replace(/[{}"]/g, '')
                    final = str.replace(/[,]/g, ', ')
                }
                this.setState({id: user.id, username: user.username, firstname: user.firstname, lastname: user.lastname, city: user.city, best_breeds: final, profileImg: user.profile_img, profileEXIF: user.profile_img_exif, email: user.email}
                    ,  () => {
                    if(!this.state.username){
                        this.props.history.push("/")
                    }
                })
            })
            .catch(err => {
                // console.log(err)
                if(!this.state.username){
                    this.props.history.push("/")
                }
            })
        }
    handleChange = (e) => {
        this.setState({[e.target.name]: e.target.value})
    }
    handleFileChange = (e) => {
        this.setState({selectedFile: e.target.files[0]}, () => {
        })
        
    } 
    handleUpload (){
        this.setState({isLoading: true}, ()=> {
            this.getOrientation(this.state.selectedFile, function(orientation) {
                // alert(orientation);
                this.setState({uploadEXIF: orientation})
           }.bind(this));
            if(this.state.selectedFile){
                const storageRef = firebase.storage().ref()
                const imageFolderRef = storageRef.child('images/'+this.state.selectedFile.name)
                // const imageRef = storageRef.child(this.state.selectedFile.name)
                const pic = this.state.selectedFile
                const metadata = {
                    name: this.state.selectedFile.name,
                }
                imageFolderRef.put(pic, metadata).then(function(snapshot){
                    imageFolderRef.getDownloadURL().then(url => {
                        this.setState({uploadImage: url, isLoading: false, editProfileImage: false}, () => {
                            this.editProfile()
                        })
                        
                    })
                }.bind(this))
            }
            else {
                alert('Please select a profile image')
            }
        })
        
    }

    getOrientation(file, callback) {
        var reader = new FileReader();
        reader.onload = function(event) {
          var view = new DataView(event.target.result);
          if (view.getUint16(0, false) !== 0xFFD8) return callback(-2);
          var length = view.byteLength,
              offset = 2;
          while (offset < length) {
            var marker = view.getUint16(offset, false);
            offset += 2;
            if (marker === 0xFFE1) {
              if (view.getUint32(offset += 2, false) !== 0x45786966) {
                return callback(-1);
              }
              var little = view.getUint16(offset += 6, false) === 0x4949;
              offset += view.getUint32(offset + 4, little);
              var tags = view.getUint16(offset, little);
              offset += 2;
      
              for (var i = 0; i < tags; i++)
                if (view.getUint16(offset + (i * 12), little) === 0x0112)
                  return callback(view.getUint16(offset + (i * 12) + 8, little));
            }
            else if ((marker & 0xFF00) !== 0xFF00) break;
            else offset += view.getUint16(offset, false);
          }
          return callback(-1);
        };
        reader.readAsArrayBuffer(file.slice(0, 64 * 1024));
      };

    editProfile(e){
        this.setState({editProfile: false})
        if(e){
            e.preventDefault()
        }
        const newValues = {
            profile_image_exif: this.state.uploadEXIF,
            profile_img: this.state.uploadImage,
            firstname: this.state.firstname,
            lastname: this.state.lastname,
            city: this.state.city,
            email: this.state.email
        }
        axios
            .put('/api/user', {newValues})
            .then(response => {
                const user = response.data[0]
                this.setState({id: user.id, username: user.username, firstname: user.firstname, lastname: user.lastname, city: user.city, perfect_breeds: user.perfect_breeds, profileImg: user.profile_img, profileEXIF: user.profile_img_exif, email: user.email})
            })
            .catch(err => {
                console.log(err)
                if(!this.state.username){
                    this.props.history.push("/")
                }
            })
    }
    editProfileImage(){
        this.setState({editProfileImage: !this.state.editProfileImage})
    }
    handleSubmit(e){
        this.setState({editProfile: false})
    }
    discard(e){
        e.preventDefault()
        this.setState({editProfile: false})
    }
    edit(){
        this.setState({editProfile: true})
    }
    handleLogout(){
        axios
            .delete('/auth/logout')
            .then(response => {
                this.props.history.push("/")
            })
            .catch(err => {
                
            })
    }

    render(){
        const {username, firstname, lastname, city, best_breeds, profileImg, profileEXIF, email} = this.state 
        return(
            <div id='profile_page'>
                <header id='ProfileHeader'>
                    <h2>Logged in as {username}</h2>
                    <div id='logout_div'>
                        <Link id='logout' to='/' onClick={() => this.handleLogout()}>Logout</Link>
                    </div>
                </header>
                <div id='profile_main'>
                    <div id='profile_body'>
                        <div id='profile_info'>
                            <div id='profileImageDiv'>
                                <img id={`profilePic${profileEXIF}`} alt='Profile' src={profileImg} onClick={() => this.editProfileImage()}/>
                                <img id='imageEditLogo' alt='edit' src={require('../../Images/edit.png')}/>
                            </div>
                            <div id={this.state.editProfileImage ? 'imageInputDiv' : 'imageInputDivHide'}>
                                {this.state.isLoading 
                                    ?
                                        <Loader 
                                            type="Ball-Triangle"
                                            color="black"
                                            height="100"	
                                            width="100"
                                        />
                                    :
                                        <div id='imageInputDiv'>
                                            <input
                                                id='profileInputFile'
                                                name='selectedFile' 
                                                type='file' 
                                                placeholder='Profile Image'
                                                onChange={e => this.handleFileChange(e)}
                                            ></input>
                                            <button type='button' className='profile_button' onClick={(e) => this.handleUpload(e)}>Add Image</button>
                                        </div>
                                }
                            </div>
                            <div className={this.state.editProfileImage || this.state.editProfile ? 'text_info_hide' : 'text_info'}>
                                <h1>{firstname} {lastname}</h1>
                                <h3>{city}</h3>
                                <h3>{email}</h3>
                                <h3 id='bestBreedsList'>My best breeds are {best_breeds}</h3>
                            </div>
                            {this.state.editProfileImage || this.state.editProfile
                                ?
                                    <div></div>
                                :
                                    <button className='profile_button' onClick={() => this.edit()}>Edit</button>
                            }
                            
                            <form id={this.state.editProfile ? 'profile_info_edit' : 'profile_info_edit_hide'} onSubmit={(e) => this.editProfile(e)}>
                                <div className='text_info'>
                                    <input
                                        className='profileInputField'
                                        name='firstname'
                                        required 
                                        type='text' 
                                        value={firstname}
                                        placeholder='First Name'
                                        onChange={e => this.handleChange(e)}
                                    ></input>
                                    <input
                                        className='profileInputField'
                                        name='lastname'
                                        required 
                                        type='text' 
                                        value={lastname}
                                        placeholder='Last Name'
                                        onChange={e => this.handleChange(e)}
                                    ></input>
                                    <input
                                        className='profileInputField'
                                        name='city'
                                        required 
                                        type='text' 
                                        value={city}
                                        placeholder='City'
                                        onChange={e => this.handleChange(e)}
                                    ></input>
                                    <input
                                        className='profileInputField'
                                        name='email'
                                        required 
                                        type='text' 
                                        value={email}
                                        placeholder='Email'
                                        onChange={e => this.handleChange(e)}
                                    ></input>
                                </div>
                                <div>
                                    <button className='profile_button' onClick={(e) => this.discard(e)}>Discard</button>
                                    <input type='submit' className='profile_button' value='Update'></input>
                                </div>
                            </form>
                            {/* <button className='profile_button' id='bestButton' onClick={() => this.searchBest()}>Search For your Best Breeds</button> */}
                        </div>
                        <MyPets/>
                        <div id='profile_bottom_links'>
                            <div className='profile_bottom_link_div'>
                                <Link className='profile_link' to='/survey/1'>Take Breed Quiz</Link>
                            </div>
                            <div className='profile_bottom_link_div'>
                                <Link className='profile_link' to='/search'>Search For Pets</Link>
                            </div>                            
                        </div>
                    </div>
                    <div id='profile_favorites'>
                        <h1>Favorites</h1>
                        <Favorites/>
                    </div>
                </div>
                
                
            </div>
        )
    }
}

export default Profile