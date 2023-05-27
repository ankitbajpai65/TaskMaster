// import firebase from 'firebase/app';
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth'
// import { getDatabase } from 'firebase/database'
// import 'firebase/firestore';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyA9nTTeZ_pz00vYrI9g9-RU4Dx9ifqtcyw",
    authDomain: "taskmaster-5da56.firebaseapp.com",
    projectId: "taskmaster-5da56",
    storageBucket: "taskmaster-5da56.appspot.com",
    messagingSenderId: "333066413029",
    appId: "1:333066413029:web:cf4984a4717aaeed97850c"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth();

// Create a Firestore reference
const db = getFirestore(app);

export { app, auth, db } 