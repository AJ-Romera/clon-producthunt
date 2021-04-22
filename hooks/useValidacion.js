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
            setSubmitForm(false);
        }
    }, []);

    // Función que se ejecuta conforme el usuario escribe algo
    const handleChange = (e) => {
        setValores({
            ...valores,
            [e.target.name]: e.target.value,
        });
    };

    // Función que se ejecuta cuando el usuario hace submit
    const handleSubmit = (e) => {
        e.preventDefault();
        const erroresValidacion = validar(valores);
        setErrores(erroresValidacion);
        setSubmitForm(true);
    };

    return errores, valores, submitForm, handleChange, handleSubmit;
}

export default useValidacion;
