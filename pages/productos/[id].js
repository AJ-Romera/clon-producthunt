import React, { useEffect, useContext, useState } from 'react';
import { useRouter } from 'next/router';

import styled from '@emotion/styled';
import { css, jsx } from '@emotion/react';

import formatDistanceToNow from 'date-fns/formatDistanceToNow';
import { es } from 'date-fns/locale';

import Error404 from '../../components/layout/404';
import Layout from '../../components/layout/Layout';
import { Campo, InputSubmit } from '../../components/ui/Formulario';
import Boton from '../../components/ui/Boton';

import { FirebaseContext } from '../../firebase';

const ContenedorProducto = styled.div`
    @media (min-width: 768px) {
        display: grid;
        grid-template-columns: 2fr 1fr;
        column-gap: 2rem;
    }
`;

const CreadorProducto = styled.p`
    padding: 0.5rem 2rem;
    background-color: var(--naranja);
    color: #fff;
    text-transform: uppercase;
    font-weight: bold;
    display: inline-block;
    text-align: center;
`;

function Producto() {
    // State del componente
    const [producto, setProducto] = useState({});
    const [error, setError] = useState(false);
    const [comentario, setComentario] = useState({});
    const [consultarDB, setConsultarDB] = useState(true);

    // routing para obtener el id actual
    const router = useRouter();
    const {
        query: { id },
    } = router;

    // Context de firebase
    const { firebase, usuario } = useContext(FirebaseContext);

    useEffect(() => {
        if (id && consultarDB) {
            const obtenerProducto = async () => {
                const productoQuery = await firebase.db
                    .collection('productos')
                    .doc(id);
                const producto = await productoQuery.get();
                if (producto.exists) {
                    setProducto(producto.data());
                    setConsultarDB(false);
                } else {
                    setError(true);
                    setConsultarDB(false);
                }
            };
            obtenerProducto();
        }
    }, [id]);

    if (Object.keys(producto).length === 0 && !error) return 'Cargando...';

    const {
        comentarios,
        creado,
        descripcion,
        empresa,
        nombre,
        url,
        urlImagen,
        votos,
        creador,
        haVotado,
    } = producto;

    // Administrar y validar los votos
    const votarProducto = () => {
        if (!usuario) {
            return router.push('/login');
        }

        // Obtener y sumar un nuevo voto
        const nuevoTotal = votos + 1;

        // Verificar si el usuario actual ha votado (evita votos duplicados, el voto debe ser único)
        if (haVotado.includes(usuario.uid)) {
            return;
        }

        // Guardar ID del usuario que ha votado
        const nuevoHaVotado = [...haVotado, usuario.uid];

        // Actualizar en la BD
        firebase.db
            .collection('productos')
            .doc(id)
            .update({ votos: nuevoTotal, haVotado: nuevoHaVotado });

        // Actualizar el state
        setProducto({
            ...producto,
            votos: nuevoTotal,
        });

        // Hay un voto, consulta la DB
        setConsultarDB(true);
    };

    // Funciones para crear comentarios
    const comentarioChange = (e) => {
        setComentario({
            ...comentario,
            [e.target.name]: e.target.value,
        });
    };

    // Identifica si el comentario es del creador del producto
    const esCreador = (id) => {
        if (creador.id == id) {
            return true;
        }
    };

    const agregarComentario = (e) => {
        e.preventDefault();

        if (!usuario) {
            return router.push('/login');
        }

        // Información extra al comentario
        comentario.usuarioId = usuario.uid;
        comentario.usuarioNombre = usuario.displayName;

        // Tomar copia de comentarios y agregarlos al arreglo
        const nuevosComentarios = [...comentarios, comentario];

        // Actualizar la BD
        firebase.db.collection('productos').doc(id).update({
            comentarios: nuevosComentarios,
        });

        // Actualizar el state
        setProducto({
            ...producto,
            comentarios: nuevosComentarios,
        });

        // Hay un comentario, consulta la DB
        setConsultarDB(true);
    };

    return (
        <Layout>
            <>
                {error ? (
                    <Error404 />
                ) : (
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
                                <img
                                    src={urlImagen}
                                    alt={`Imagen de ${nombre}`}
                                />
                                <p>{descripcion}</p>

                                {usuario && (
                                    <>
                                        <h2>Agrega tu comentario</h2>
                                        <form onSubmit={agregarComentario}>
                                            <Campo>
                                                <input
                                                    type='text'
                                                    name='mensaje'
                                                    onChange={comentarioChange}
                                                />
                                            </Campo>
                                            <InputSubmit
                                                type='submit'
                                                value='Agregar Comentario'
                                            />
                                        </form>
                                    </>
                                )}

                                <h2
                                    css={css`
                                        margin: 2rem 0;
                                    `}
                                >
                                    Comentarios
                                </h2>

                                {comentarios.length === 0 ? (
                                    'No hay comentarios aún'
                                ) : (
                                    <ul>
                                        {comentarios.map((comentario, i) => (
                                            <li
                                                key={`${comentario.usuarioId}-${i}`}
                                                css={css`
                                                    border: 1px solid
                                                        var(--gris3);
                                                    padding: 2rem;
                                                `}
                                            >
                                                <p>{comentario.mensaje}</p>
                                                <p>
                                                    Escrito por:
                                                    <span
                                                        css={css`
                                                            font-weight: bold;
                                                        `}
                                                    >
                                                        {' '}
                                                        {
                                                            comentario.usuarioNombre
                                                        }
                                                    </span>
                                                </p>
                                                {esCreador(
                                                    comentario.usuarioId
                                                ) && (
                                                    <CreadorProducto>
                                                        Creador del Producto
                                                    </CreadorProducto>
                                                )}
                                            </li>
                                        ))}
                                    </ul>
                                )}
                            </div>

                            <aside>
                                <Boton target='_blank' href={url}>
                                    Visitar URL
                                </Boton>

                                {usuario && (
                                    <Boton
                                        bgColor='true'
                                        onClick={votarProducto}
                                    >
                                        &#9650; Votar {votos}
                                    </Boton>
                                )}

                                <p>
                                    Publicado hace{' '}
                                    {formatDistanceToNow(new Date(creado), {
                                        locale: es,
                                    })}{' '}
                                    por {creador.nombre} de {empresa}
                                </p>
                            </aside>
                        </ContenedorProducto>
                    </div>
                )}
            </>
        </Layout>
    );
}

export default Producto;
