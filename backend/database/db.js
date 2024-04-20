// Import the functions you need from the SDKs you need

import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use

// https://firebase.google.com/docs/web/setup#available-libraries


// Your web app's Firebase configuration

// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const firebaseConfig = {

  apiKey: "AIzaSyBWmZlwCv9d7e1BWC3BJNQSAqJkqH7jrhY",

  authDomain: "signify-118a2.firebaseapp.com",

  databaseURL: "https://signify-118a2-default-rtdb.firebaseio.com",

  projectId: "signify-118a2",

  storageBucket: "signify-118a2.appspot.com",

  messagingSenderId: "556560176280",

  appId: "1:556560176280:web:cb25a6c0c2435783616ced",

  measurementId: "G-KFYCLS85GY"

};


// Initialize Firebase

const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

export {storage};

