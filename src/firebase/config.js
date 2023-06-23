import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import "firebase/compat/storage";

// import { initializeApp } from 'firebase/app';
// import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyCGzPs52R5ZvVE4iAe8I5AvdQm0RJZJTC0",
  authDomain: "react-olx-bd03c.firebaseapp.com",
  projectId: "react-olx-bd03c",
  storageBucket: "react-olx-bd03c.appspot.com",
  messagingSenderId: "242800709536",
  appId: "1:242800709536:web:f4f7575450e8f013ee9ec5",
  measurementId: "G-HKRR7MLE8P",
};

export default firebase.initializeApp(firebaseConfig);
// firebase.firestore().enablePersistence()
export const db = firebase.firestore();


