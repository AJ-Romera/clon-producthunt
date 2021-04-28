import React, { useEffect, useContext, useState } from 'react';
import { useRouter } from 'next/router';

import styled from '@emotion/styled';
import { css, jsx } from '@emotion/react';

import Error404 from '../../components/layout/404';
import Layout from '../../components/layout/Layout';

import { FirebaseContext } from '../../firebase';

const ContenedorProducto = styled.div`
    @media (min-width: 768px) {
        display: grid;
        grid-template-columns: 2fr 1fr;
        column-gap: 2rem;
    }
`;

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

    if (Object.keys(producto).length === 0) return 'Cargando...';

    const {
        comentarios,
        creado,
        descripcion,
        empresa,
        nombre,
        url,
        urlImagen,
        votos,
    } = producto;

    return (
        <Layout>
            <>
                {error && <Error404 />}

                <div className='contenedor'>
                    <h1
                        css={css`
                            margin-top: 5rem;
                            text-align: center;
                        `}
                    >
                        {nombre}
                    </h1>

                    <ContenedorProducto>
                        <div>1</div>

                        <aside>2</aside>
                    </ContenedorProducto>
                </div>
            </>
        </Layout>
    );
}

export default Producto;
