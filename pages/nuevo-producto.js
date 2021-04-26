import React, { useState } from 'react';
import { css, jsx } from '@emotion/react';
import Router from 'next/router';
import Layout from '../components/layout/Layout';
import {
    Formulario,
    Campo,
    InputSubmit,
    Error,
} from '../components/ui/Formulario';

import firebase from '../firebase';

// Validaciones
import useValidacion from '../hooks/useValidacion';
import validarCrearCuenta from '../validacion/validarCrearCuenta';

const STATE_INICIAL = {
    nombre: '',
    empresa: '',
    imagen: '',
    url: '',
    descripcion: '',
};

function NuevoProducto() {
    const [error, setError] = useState(false);

    const {
        errores,
        valores,
        handleChange,
        handleSubmit,
        handleBlur,
    } = useValidacion(STATE_INICIAL, validarCrearCuenta, crearCuenta);

    const { nombre, empresa, imagen, url, descripcion } = valores;

    async function crearCuenta() {}

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
                            <input
                                type='file'
                                autoComplete='photo'
                                id='imagen'
                                name='imagen'
                                value={imagen}
                                onChange={handleChange}
                                onBlur={handleBlur}
                            />
                        </Campo>

                        {errores.imagen && <Error>{errores.imagen}</Error>}

                        <Campo>
                            <label htmlFor='url'>URL</label>
                            <input
                                type='url'
                                autoComplete='url'
                                id='url'
                                placeholder='Tu Web'
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
