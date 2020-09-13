import firebase from 'firebase'

const firebaseApp = firebase.initializeApp({


    apiKey: "AIzaSyDUvK0jKvRZ9hXcM1PVe-wZuMoJrM4b9BI",
    authDomain: "instagram-clone-react-shiva.firebaseapp.com",
    databaseURL: "https://instagram-clone-react-shiva.firebaseio.com",
    projectId: "instagram-clone-react-shiva",
    storageBucket: "instagram-clone-react-shiva.appspot.com",
    messagingSenderId: "496037148457",
    appId: "1:496037148457:web:57b5c24bcd7134b68ae938",
    measurementId: "G-GHSZN13CCH"
  });

  const db = firebaseApp.firestore();
  const auth = firebase.auth();
  const storage = firebase.storage();


  export { db, auth, storage}

