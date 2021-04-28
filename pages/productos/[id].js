import React, { useEffect, useContext, useState } from 'react';
import { useRouter } from 'next/router';

import styled from '@emotion/styled';
import { css, jsx } from '@emotion/react';

import formatDistanceToNow from 'date-fns/formatDistanceToNow';
import { es } from 'date-fns/locale';

import Error404 from '../../components/layout/404';
import Layout from '../../components/layout/Layout';
import { Campo, InputSubmit } from '../../components/ui/Formulario';

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
                        <div>
                            <p>
                                Publicado hace:{' '}
                                {formatDistanceToNow(new Date(creado), {
                                    locale: es,
                                })}
                            </p>
                            <img src={urlImagen} alt={`Imagen de ${nombre}`} />
                            <p>{descripcion}</p>

                            <h2>Agrega tu comentario</h2>
                            <form>
                                <Campo>
                                    <input type='text' name='mensaje' />
                                </Campo>
                                <InputSubmit
                                    type='submit'
                                    value='Agregar Comentario'
                                />
                            </form>

                            <h2
                                css={css`
                                    margin: 2rem 0;
                                `}
                            >
                                Comentarios
                            </h2>

                            {comentarios.map((comentario) => (
                                <li>
                                    <p>{comentario.nombre}</p>
                                    <p>
                                        Escrito por: {comentario.usuarioNombre}
                                    </p>
                                </li>
                            ))}
                        </div>

                        <aside>2</aside>
                    </ContenedorProducto>
                </div>
            </>
        </Layout>
    );
}

export default Producto;
