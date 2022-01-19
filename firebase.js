// Import the functions you need from the SDKs you need


import { initializeApp, getApp, getApps } from "firebase/app";
import { getFirestore, collection, getDocs, doc, setDoc, serverTimestamp, addDoc, query, where, orderBy } from 'firebase/firestore';
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDZqYdYS50Y8l1kgdnm5h_tyov1IiBg2dE",
  authDomain: "whatsapp-2-b44d0.firebaseapp.com",
  projectId: "whatsapp-2-b44d0",
  storageBucket: "whatsapp-2-b44d0.appspot.com",
  messagingSenderId: "588103685000",
  appId: "1:588103685000:web:9e025fb9ab0728e6f5203d"
};

(!getApps().length) ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore();
const auth = getAuth();
const provider = new GoogleAuthProvider();

export {
  db,
  auth,
  provider,
  GoogleAuthProvider,
  collection,
  getDocs,
  signInWithPopup,
  doc,
  setDoc,
  serverTimestamp,
  addDoc,
  query,
  where,
  orderBy,
};

