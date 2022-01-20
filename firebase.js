// Import the functions you need from the SDKs you need


import { initializeApp, getApp, getApps } from "firebase/app";
import { getFirestore, collection, getDocs, doc, setDoc, serverTimestamp, addDoc, query, where, orderBy, getDoc } from 'firebase/firestore';
import { debugErrorMap, getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";

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


const useMessages = (chatId) => {
  const chatsRef = doc(db, 'chats', chatId);
  const messagesRef = collection(chatsRef, 'messages');
  const messagesResQuery = query(messagesRef, orderBy('timestamp', 'asc'));

  const messages = async () => {
    const messagesQuerySnapshot = await getDocs(messagesResQuery);
    const result = messagesQuerySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data()
    })).map(messages => ({
      ...messages,
      timestamp: messages.timestamp.toDate().getTime()
    }));

    return result;
  }


  const addMessage = async (body) => {
    const docRef = await addDoc(messagesRef, body);
    return docRef.id;   
  }


  return { messagesResQuery, chatsRef, messages, addMessage };
}


const setUser = async (uid, data) => {
  const usersRef = collection(db, "users");
  await setDoc(doc(usersRef, uid), data, { merge: true });
}


export {
  db,
  auth,
  provider,
  GoogleAuthProvider,
  collection,
  getDocs,
  getDoc,
  signInWithPopup,
  doc,
  setDoc,
  serverTimestamp,
  addDoc,
  query,
  where,
  orderBy,
  useMessages,
  setUser,
};

