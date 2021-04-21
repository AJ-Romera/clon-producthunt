import React, { useState, useEffect } from 'react';

function useValidacion(stateInicial, validar, fn) {
    const [valores, setValores] = useState(stateInicial);
    const [errores, setErrores] = useState({});
    const [submitForm, setSubmitForm] = useState(false);

    useEffect(() => {
        if (submitForm) {
            const noErrores = Object.keys(errores).length === 0;

            if (noErrores) {
                fn(); // Función que se ejecuta en el componente
            }
            guardarSubmitForm(false);
        }
    }, []);

    return <div></div>;
}

export default useValidacion;
