import firebase from 'firebase'

const config = {
    apiKey: "AIzaSyDxKXdDTS5-9wi4zssYioRhH8Wsi52myFA",
    authDomain: "personal-project-f0170.firebaseapp.com",
    databaseURL: "https://personal-project-f0170.firebaseio.com",
    projectId: "personal-project-f0170",
    storageBucket: "personal-project-f0170.appspot.com",
    messagingSenderId: "503899746396"
  };
  firebase.initializeApp(config);

  export default firebase