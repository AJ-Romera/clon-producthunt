export default function validarCrearCuenta(valores) {
    let errores = {};

    // Validar el nombre del producto
    if (!valores.nombre) {
        errores.nombre = 'El nombre es obligatorio';
    }

    // Validar el nombre de la empresa
    if (!valores.empresa) {
        errores.empresa = 'El nombre de la empresa es obligatorio';
    }

    // Validar la URL
    if (!valores.url) {
        errores.url = 'La dirección del producto es obligatoria';
    } else if (!/^(ftp|http|https):\/\/[^ "]+$/.test(valores.url)) {
        errores.url = 'URL incorrecta';
    }

    // Validar la descripción
    if (!valores.descripcion) {
        errores.descripcion = 'Por favor, añada una descripción de su producto';
    }

    return errores;
}
