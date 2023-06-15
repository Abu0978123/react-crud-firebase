// import firebase from 'firebase/app';
import 'firebase/database';
import firebase from 'firebase/compat/app';
// import 'firebase/compat/firestore';
import "firebase/compat/database";
// import "firebase/compat/storage";


const firebaseConfig = {
    apiKey: "AIzaSyBjJTPuM0PO9kKiGcwQsBzcDUkwS1zfYAM",
    authDomain: "react-crud-40779.firebaseapp.com",
    projectId: "react-crud-40779",
    storageBucket: "react-crud-40779.appspot.com",
    messagingSenderId: "193877102492",
    appId: "1:193877102492:web:e9a91619fe8a3548fb0259"
  };

  const fire = firebase.initializeApp(firebaseConfig);
  const Db = fire.database().ref();
  export  default  Db;