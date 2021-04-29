import React from 'react';
import { css, jsx } from '@emotion/react';

function Error404() {
    return (
        <h1
            css={css`
                margin-top: 5rem;
                text-align: center;
            `}
        >
            La página a la que usted trata de acceder no existe, ha sido borrada
            o necesita loguearse.
        </h1>
    );
}

export default Error404;
