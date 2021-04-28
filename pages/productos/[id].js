import React, { useEffect, useContext, useState } from 'react';
import { useRouter } from 'next/router';

import { FirebaseContext } from '../../firebase';

import Error404 from '../../components/layout/404';
import Layout from '../../components/layout/Layout';

function Producto() {
    // State del componente
    const [producto, setProducto] = useState({});
    const [error, setError] = useState(false);

    // routing para obtener el id actual
    const router = useRouter();
    const {
        query: { id },
    } = router;

    // Context de firebase
    const { firebase } = useContext(FirebaseContext);

    useEffect(() => {
        if (id) {
            const obtenerProducto = async () => {
                const productoQuery = await firebase.db
                    .collection('productos')
                    .doc(id);
                const producto = await productoQuery.get();
                if (producto.exists) {
                    setProducto(producto.data());
                } else {
                    setError(true);
                }
            };
            obtenerProducto();
        }
    }, [id]);

    return (
        <Layout>
            <>{error && <Error404 />}</>
        </Layout>
    );
}

export default Producto;
