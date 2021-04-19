import React from 'react';
import Link from 'next/link';

function Layout(props) {
    return (
        <>
            <h1>Header</h1>

            <nav>
                <Link href='/'>Inicio</Link>
                <Link href='/nosotros'>Nosotros</Link>
            </nav>

            <main>{props.children}</main>
        </>
    );
}

export default Layout;
