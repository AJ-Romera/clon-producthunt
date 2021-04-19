import React from 'react';
import Buscar from '../ui/Buscar';
import Navegacion from './Navegacion';
import Link from 'next/link';

function Header() {
    return (
        <header>
            <div>
                <div>
                    <p>P</p>

                    <Buscar />

                    <Navegacion />
                </div>

                <div>
                    <p>Hola, AJ</p>

                    <button type='button'>Cerrar Sesión</button>

                    <Link href='/'>Iniciar Sesión</Link>
                    <Link href='/'>Crear Cuenta</Link>
                </div>
            </div>
        </header>
    );
}

export default Header;
