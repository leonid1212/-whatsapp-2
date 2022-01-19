import '../styles/globals.css';
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import { useAuthState } from 'react-firebase-hooks/auth';
import Login from './login';
import { db, auth, collection, doc, setDoc, serverTimestamp } from "../firebase";
import Loading from '../components/Loading';
import { useEffect } from 'react';

function MyApp({ Component, pageProps }) {
  const [user, loading] = useAuthState(auth);


  useEffect(() => {
    if (user) {
      const setUserInFirebase = async () => {
        const usersRef = collection(db, "users");
        await setDoc(doc(usersRef, user.uid), {
          email: user.email,
          lastSeen: serverTimestamp(),
          photoURL: user.photoURL,
        },
          { merge: true }
        );
      }
      setUserInFirebase();
    }

  }, [user]);

  if (loading) return <Loading />;
  if (!user) return <Login />;

  return <Component {...pageProps} />
}




export default MyApp
