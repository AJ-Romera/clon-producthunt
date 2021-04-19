import React from 'react';
import Buscar from '../ui/Buscar';

function Header() {
    return (
        <header>
            <div>
                <div>
                    <p>P</p>

                    <Buscar />

                    {/* Nav aquí */}
                </div>

                <div>{/* Menu de administración */}</div>
            </div>
        </header>
    );
}

export default Header;
