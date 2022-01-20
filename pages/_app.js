import '../styles/globals.css';
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import { useAuthState } from 'react-firebase-hooks/auth';
import Login from './login';
import { db, auth, collection, doc, setDoc, serverTimestamp, setUser } from "../firebase";
import Loading from '../components/Loading';
import { useEffect } from 'react';

function MyApp({ Component, pageProps }) {
  const [user, loading] = useAuthState(auth);


  useEffect(() => {
    if (user) {
      setUser(user.uid , {
        email: user.email,
        lastSeen: serverTimestamp(),
        photoURL: user.photoURL,
      });
    }

  }, [user]);

  if (loading) return <Loading />;
  if (!user) return <Login />;

  return <Component {...pageProps} />
}




export default MyApp
