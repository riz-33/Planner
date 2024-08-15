import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.12.3/firebase-app.js';

import {
    getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut,
    updateProfile, updateEmail, updatePassword, updatePhoneNumber, GoogleAuthProvider, signInWithPopup, deleteUser,
    reauthenticateWithCredential, EmailAuthProvider, reauthenticateWithPopup 
} from 'https://www.gstatic.com/firebasejs/10.12.3/firebase-auth.js';

import {
    doc, setDoc, getDoc, getFirestore, addDoc, updateDoc, collection, onSnapshot, query, serverTimestamp, orderBy,
    where, getDocs, deleteField, deleteDoc
}
    from 'https://www.gstatic.com/firebasejs/10.12.3/firebase-firestore.js';

import { getStorage, ref, uploadBytesResumable, getDownloadURL }
    from 'https://www.gstatic.com/firebasejs/10.12.3/firebase-storage.js';

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyArskEuIydwncRw6bUgsjwMHTE4uy5FupY",
    authDomain: "to-do-app-ce607.firebaseapp.com",
    projectId: "to-do-app-ce607",
    storageBucket: "to-do-app-ce607.appspot.com",
    messagingSenderId: "811989245686",
    appId: "1:811989245686:web:57b6628f9d96ffffaa96d7",
    measurementId: "G-BWDX9TX3XW"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();
const db = getFirestore(app);
const storage = getStorage(app);


export {
    auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut, updateProfile,
    updateEmail, updatePassword, updatePhoneNumber, googleProvider, signInWithPopup, GoogleAuthProvider, doc, setDoc,
    db, getDoc, collection, addDoc, updateDoc, onSnapshot, query, serverTimestamp, orderBy, where, ref, getStorage,
    getDownloadURL, uploadBytesResumable, storage, getDocs, deleteField, deleteDoc, getAuth, getFirestore,
    deleteUser, reauthenticateWithCredential, EmailAuthProvider, reauthenticateWithPopup
}