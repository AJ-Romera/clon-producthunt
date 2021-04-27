import React from 'react';
import Header from './Header';
import Head from 'next/head';

function Layout(props) {
    return (
        <>
            <div>
                <Head>
                    <html lang='es' />
                    <meta
                        name='viewport'
                        content='width=device-width, initial-scale=1.0'
                    />
                    <title>Clon Product Hunt con Next.js y Firebase</title>
                    <meta
                        name='description'
                        content='Clon de Product Hunt hecho con Next.js y Firebase para aprender sobre estas tecnologías'
                    />
                    <link
                        rel='stylesheet'
                        href='https://cdnjs.cloudflare.com/ajax/libs/normalize/8.0.1/normalize.min.css'
                        integrity='sha512-NhSC1YmyruXifcj/KFRWoC561YpHpc5Jtzgvbuzx5VozKpWvQ+4nXhPdFgmx8xqexRcpAglTj9sIBWINXa8x5w=='
                        crossOrigin='anonymous'
                    />
                    <link rel='preconnect' href='https://fonts.gstatic.com' />
                    <link
                        href='https://fonts.googleapis.com/css2?family=PT+Sans:wght@400;700&family=Roboto+Slab:wght@400;700&display=swap'
                        rel='stylesheet'
                    />
                </Head>

                <Header />

                <main>{props.children}</main>
            </div>
        </>
    );
}

export default Layout;
