import React from 'react';
import { css, jsx } from '@emotion/react';
import Layout from '../components/layout/Layout';
import { Formulario, Campo, InputSubmit } from '../components/ui/Formulario';

function CrearCuenta() {
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
                <Formulario>
                    <Campo>
                        <label htmlFor='nombre'>Nombre</label>
                        <input
                            type='text'
                            id='nombre'
                            placeholder='Tu Nombre'
                            name='nombre'
                        />
                    </Campo>

                    <Campo>
                        <label htmlFor='email'>Email</label>
                        <input
                            type='email'
                            id='email'
                            placeholder='Tu Email'
                            name='email'
                        />
                    </Campo>

                    <Campo>
                        <label htmlFor='password'>Password</label>
                        <input
                            type='password'
                            id='password'
                            placeholder='Tu Password'
                            name='password'
                        />
                    </Campo>

                    <InputSubmit type='submit' value='Crear Cuenta' />
                </Formulario>
            </>
        </Layout>
    );
}

export default CrearCuenta;
