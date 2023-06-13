import firebase from 'firebase/app';
import 'firebase/database'


const firebaseConfig = {
    apiKey: "AIzaSyBjJTPuM0PO9kKiGcwQsBzcDUkwS1zfYAM",
    authDomain: "react-crud-40779.firebaseapp.com",
    projectId: "react-crud-40779",
    storageBucket: "react-crud-40779.appspot.com",
    messagingSenderId: "193877102492",
    appId: "1:193877102492:web:e9a91619fe8a3548fb0259"
  };

  const fireDb = firebase.initializeApp(firebaseConfig);
  export default fireDb.database().ref();