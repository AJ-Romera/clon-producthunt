import React from 'react';
import { css, jsx } from '@emotion/react';
import Layout from '../components/layout/Layout';
import {
    Formulario,
    Campo,
    InputSubmit,
    Error,
} from '../components/ui/Formulario';

// Validaciones
import useValidacion from '../hooks/useValidacion';
import validarCrearCuenta from '../validacion/validarCrearCuenta';

const STATE_INICIAL = {
    nombre: '',
    email: '',
    password: '',
};

function CrearCuenta() {
    const {
        errores,
        valores,
        handleChange,
        handleSubmit,
        handleBlur,
    } = useValidacion(STATE_INICIAL, validarCrearCuenta, crearCuenta);

    const { nombre, email, password } = valores;

    function crearCuenta() {
        console.log('Creando cuenta...');
    }

    return (
        <Layout>
            <>
                <h1
                    css={css`
                        text-align: center;
                        margin-top: 5rem;
                    `}
                >
                    Crear Cuenta
                </h1>
                <Formulario onSubmit={handleSubmit} noValidate>
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
                        <label htmlFor='email'>Email</label>
                        <input
                            type='email'
                            autoComplete='email'
                            id='email'
                            placeholder='Tu Email'
                            name='email'
                            value={email}
                            onChange={handleChange}
                            onBlur={handleBlur}
                        />
                    </Campo>

                    {errores.email && <Error>{errores.email}</Error>}

                    <Campo>
                        <label htmlFor='password'>Password</label>
                        <input
                            type='password'
                            autoComplete='new-password'
                            id='password'
                            placeholder='Tu Password'
                            name='password'
                            value={password}
                            onChange={handleChange}
                            onBlur={handleBlur}
                        />
                    </Campo>

                    {errores.password && <Error>{errores.password}</Error>}

                    <InputSubmit type='submit' value='Crear Cuenta' />
                </Formulario>
            </>
        </Layout>
    );
}

export default CrearCuenta;
