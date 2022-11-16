import firebase from "firebase/compat/app";
import 'firebase/compat/firestore';
import "firebase/compat/storage";
import 'firebase/compat/auth';

const firebaseConfig = {
    apiKey: "AIzaSyCLRWnHJDhcgyeKfsY31HmlHPbvzUCN58o",
    authDomain: "foodpi-747e7.firebaseapp.com",
    projectId: "foodpi-747e7",
    storageBucket: "foodpi-747e7.appspot.com",
    messagingSenderId: "645165102547",
    appId: "1:645165102547:web:5f867e7ec5e8263cabab26"
  };

!firebase.apps.length ? firebase.initializeApp(firebaseConfig) : firebase.app();

firebase.firestore().settings({ merge: true });

export default firebase;