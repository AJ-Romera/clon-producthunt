import App from 'next/app';
import '../styles/globals.css';
import '../styles/layout.css';
import firebase, { FirebaseContext } from '../firebase';
import useAutenticacion from '../hooks/useAutenticacion';

function MyApp({ Component, pageProps }) {
    const usuario = useAutenticacion();

    return (
        <FirebaseContext.Provider value={{ firebase, usuario }}>
            <Component {...pageProps} />
        </FirebaseContext.Provider>
    );
}

export default MyApp;
