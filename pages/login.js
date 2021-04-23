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
import validarIniciarSesion from '../validacion/validarIniciarSesion';

const STATE_INICIAL = {
    email: '',
    password: '',
};

function Login() {
    const [error, setError] = useState(false);

    const {
        errores,
        valores,
        handleChange,
        handleSubmit,
        handleBlur,
    } = useValidacion(STATE_INICIAL, validarIniciarSesion, iniciarSesion);

    const { email, password } = valores;

    async function iniciarSesion() {
        console.log('Iniciando Sesión...');
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
                    Iniciar Sesión
                </h1>
                <Formulario onSubmit={handleSubmit} noValidate>
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

                    {error && <Error>{error}</Error>}

                    <InputSubmit type='submit' value='Iniciar Sesión' />
                </Formulario>
            </>
        </Layout>
    );
}

export default Login;
