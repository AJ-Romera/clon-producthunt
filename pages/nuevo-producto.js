import React, { useState, useContext } from 'react';
import { css, jsx } from '@emotion/react';
import FileUploader from 'react-firebase-file-uploader';
import Router, { useRouter } from 'next/router';
import Layout from '../components/layout/Layout';
import {
    Formulario,
    Campo,
    InputSubmit,
    Error,
} from '../components/ui/Formulario';

import { FirebaseContext } from '../firebase';

// Validaciones
import useValidacion from '../hooks/useValidacion';
import validarCrearProducto from '../validacion/validarCrearProducto';

const STATE_INICIAL = {
    nombre: '',
    empresa: '',
    /* imagen: '', */
    url: '',
    descripcion: '',
};

function NuevoProducto() {
    // State de las imágenes
    const [nombreImagen, setNombre] = useState('');
    const [subiendo, setSubiendo] = useState(false);
    const [progreso, setProgreso] = useState(0);
    const [urlImagen, setUrlImagen] = useState('');

    const [error, setError] = useState(false);

    const {
        errores,
        valores,
        handleChange,
        handleSubmit,
        handleBlur,
    } = useValidacion(STATE_INICIAL, validarCrearProducto, crearProducto);

    const { nombre, empresa, imagen, url, descripcion } = valores;

    // Hook de routing para redireccionar
    const router = useRouter();

    // Context con las operaciones CRUD de firebase
    const { usuario, firebase } = useContext(FirebaseContext);

    async function crearProducto() {
        // Si el usuario no está autenticado llevar al login
        if (!usuario) {
            return router.push('/login');
        }

        // Crear el objeto de nuevo producto
        const producto = {
            nombre,
            empresa,
            url,
            urlImagen,
            descripcion,
            votos: 0,
            comentarios: [],
            creado: Date.now(),
        };

        // Insertarlo en la base de datos
        firebase.db.collection('productos').add(producto);

        return router.push('/');
    }

    const handleUploadStart = () => {
        setProgreso(0);
        setSubiendo(true);
    };

    const handleProgress = (progress) => setProgreso({ progreso });

    const handleUploadError = (error) => {
        setSubiendo(error);
        console.error(error);
    };

    const handleUploadSuccess = (nombre) => {
        setProgreso(100);
        setSubiendo(false);
        setNombre(nombre);
        firebase.storage
            .ref('productos')
            .child(nombre)
            .getDownloadURL()
            .then((url) => {
                console.log(url);
                setUrlImagen(url);
            });
    };

    return (
        <Layout>
            <>
                <h1
                    css={css`
                        text-align: center;
                        margin-top: 5rem;
                    `}
                >
                    Nuevo Producto
                </h1>
                <Formulario onSubmit={handleSubmit} noValidate>
                    <fieldset>
                        <legend>Información General</legend>
                        <Campo>
                            <label htmlFor='nombre'>Nombre</label>
                            <input
                                type='text'
                                autoComplete='username'
                                id='nombre'
                                placeholder='Tu Nombre'
                                name='nombre'
                                value={nombre}
                                onChange={handleChange}
                                onBlur={handleBlur}
                            />
                        </Campo>

                        {errores.nombre && <Error>{errores.nombre}</Error>}

                        <Campo>
                            <label htmlFor='empresa'>Empresa</label>
                            <input
                                type='text'
                                autoComplete='organization'
                                id='empresa'
                                placeholder='Nombre de la Empresa'
                                name='empresa'
                                value={empresa}
                                onChange={handleChange}
                                onBlur={handleBlur}
                            />
                        </Campo>

                        {errores.empresa && <Error>{errores.empresa}</Error>}

                        <Campo>
                            <label htmlFor='imagen'>Imagen</label>
                            <FileUploader
                                accept='image/*'
                                autoComplete='photo'
                                id='imagen'
                                name='imagen'
                                randomizeFilename
                                storageRef={firebase.storage.ref('productos')}
                                onUploadStart={handleUploadStart}
                                onUploadError={handleUploadError}
                                onUploadSuccess={handleUploadSuccess}
                                onProgress={handleProgress}
                            />
                        </Campo>

                        <Campo>
                            <label htmlFor='url'>URL</label>
                            <input
                                type='url'
                                autoComplete='url'
                                id='url'
                                placeholder='Web del producto'
                                name='url'
                                value={url}
                                onChange={handleChange}
                                onBlur={handleBlur}
                            />
                        </Campo>

                        {errores.url && <Error>{errores.url}</Error>}
                    </fieldset>

                    <fieldset>
                        <legend>Sobre tu Producto</legend>
                        <Campo>
                            <label htmlFor='descripcion'>Descripción</label>
                            <textarea
                                autoComplete='off'
                                id='descripcion'
                                placeholder='Descripción del Producto'
                                name='descripcion'
                                value={descripcion}
                                onChange={handleChange}
                                onBlur={handleBlur}
                            />
                        </Campo>

                        {errores.descripcion && (
                            <Error>{errores.descripcion}</Error>
                        )}

                        {error && <Error>{error}</Error>}
                    </fieldset>

                    <InputSubmit type='submit' value='Crear Producto' />
                </Formulario>
            </>
        </Layout>
    );
}

export default NuevoProducto;
