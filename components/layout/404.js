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
            El producto al que usted trata de acceder no existe o ha sido
            borrado.
        </h1>
    );
}

export default Error404;
