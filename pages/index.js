import React, { useEffect, useState, useContext } from 'react';
import Layout from '../components/layout/Layout';
import { FirebaseContext } from '../firebase';

function Home() {
    const [productos, setProductos] = useState([]);

    const { firebase } = useContext(FirebaseContext);

    useEffect(() => {
        const obtenerProductos = () => {
            firebase.db
                .collection('productos')
                .orderBy('creado', 'desc')
                .onSnapshot(handleSnapshot);
        };
        obtenerProductos();
    }, []);

    function handleSnapshot(snapshot) {
        const productos = snapshot.docs.map((doc) => {
            return {
                id: doc.id,
                ...doc.data(),
            };
        });

        setProductos(productos);
    }

    return (
        <Layout>
            <h1>Inicio</h1>
        </Layout>
    );
}

export default Home;
