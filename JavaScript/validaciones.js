document.addEventListener("DOMContentLoaded", function () {

    // ----------------------------------------------------------
    // Expresiones regulares
    // ----------------------------------------------------------

    // Solo letras
    const RE_SOLO_LETRAS = /^[A-Za-zÁÉÍÓÚÑáéíóúñÜü\s]+$/;

    // Teléfono de Honduras
    const RE_TELEFONO_HN = /^[0-9]{4}-?[0-9]{4}$/;

    // validacion de numero inicial valido
    const RE_PREFIJO_TELEFONO_HN = /^[2389]/;

    // Correo electrónico
    const RE_CORREO = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;


    // Funciones de aviso

    function mostrarError(campo, elementoError, mensaje) {
        campo.classList.add("campo-invalido");
        elementoError.textContent = mensaje;
        elementoError.classList.add("visible");
    }

    function limpiarError(campo, elementoError) {
        campo.classList.remove("campo-invalido");
        elementoError.textContent = "";
        elementoError.classList.remove("visible");
    }

    function campoVacio(valor) {
        return valor.trim() === "";
    }

    function mostrarMensajeFormulario(contenedor, tipo, texto) {
        contenedor.textContent = texto;
        contenedor.className = "mensaje-formulario visible " + tipo;
    }

    // Formateo del numero
    function formatearTelefono(input) {
        input.addEventListener("input", function () {
            let valor = input.value.replace(/[^0-9]/g, "").slice(0, 8);
            if (valor.length > 4) {
                valor = valor.slice(0, 4) + "-" + valor.slice(4);
            }
            input.value = valor;
        });
    }

    //Validaciones por Campo y Utilidad

    function validarSoloLetras(campo, elementoError, nombreCampo) {
        const valor = campo.value.trim();
        if (campoVacio(valor)) {
            mostrarError(campo, elementoError, "El campo " + nombreCampo + " es obligatorio.");
            return false;
        }
        if (!RE_SOLO_LETRAS.test(valor)) {
            mostrarError(campo, elementoError, "El campo " + nombreCampo + " no debe contener números ni símbolos.");
            return false;
        }
        if (valor.length < 2) {
            mostrarError(campo, elementoError, "El campo " + nombreCampo + " es demasiado corto.");
            return false;
        }
        limpiarError(campo, elementoError);
        return true;
    }

    function validarRequerido(campo, elementoError, nombreCampo) {
        if (campoVacio(campo.value)) {
            mostrarError(campo, elementoError, "El campo " + nombreCampo + " es obligatorio.");
            return false;
        }
        limpiarError(campo, elementoError);
        return true;
    }

    function validarDireccion(campo, elementoError) {
        const valor = campo.value.trim();
        if (campoVacio(valor)) {
            mostrarError(campo, elementoError, "La dirección es obligatoria.");
            return false;
        }
        if (/^[0-9]+$/.test(valor)) {
            mostrarError(campo, elementoError, "Ingresa una dirección válida, no solo números.");
            return false;
        }
        if (valor.length < 8) {
            mostrarError(campo, elementoError, "Ingresa una dirección más detallada (mín. 8 caracteres).");
            return false;
        }
        limpiarError(campo, elementoError);
        return true;
    }

    function validarTelefonoHN(campo, elementoError) {
        const valor = campo.value.trim();
        if (campoVacio(valor)) {
            mostrarError(campo, elementoError, "El número telefónico es obligatorio.");
            return false;
        }
        if (!RE_TELEFONO_HN.test(valor)) {
            mostrarError(campo, elementoError, "Ingresa un número válido de 8 dígitos (ej. 9987-6543).");
            return false;
        }
        const soloNumeros = valor.replace("-", "");
        if (!RE_PREFIJO_TELEFONO_HN.test(soloNumeros)) {
            mostrarError(campo, elementoError, "El número debe iniciar con 2, 3, 8 o 9 (formato hondureño).");
            return false;
        }
        limpiarError(campo, elementoError);
        return true;
    }

    function validarCorreo(campo, elementoError) {
        const valor = campo.value.trim();
        if (campoVacio(valor)) {
            mostrarError(campo, elementoError, "El correo electrónico es obligatorio.");
            return false;
        }
        if (!RE_CORREO.test(valor)) {
            mostrarError(campo, elementoError, "Ingresa un correo electrónico válido (ej. nombre@correo.com).");
            return false;
        }
        limpiarError(campo, elementoError);
        return true;
    }

    function validarSelect(campo, elementoError, nombreCampo) {
        if (campoVacio(campo.value)) {
            mostrarError(campo, elementoError, "Selecciona " + nombreCampo + ".");
            return false;
        }
        limpiarError(campo, elementoError);
        return true;
    }

    function validarFecha(campo, elementoError) {
        const valor = campo.value;
        if (campoVacio(valor)) {
            mostrarError(campo, elementoError, "La fecha es obligatoria.");
            return false;
        }
        const hoy = new Date();
        hoy.setHours(0, 0, 0, 0);
        const fechaSeleccionada = new Date(valor + "T00:00:00");
        if (fechaSeleccionada < hoy) {
            mostrarError(campo, elementoError, "La fecha no puede ser anterior a hoy.");
            return false;
        }
        limpiarError(campo, elementoError);
        return true;
    }

    function validarMensaje(campo, elementoError) {
        const valor = campo.value.trim();
        if (campoVacio(valor)) {
            mostrarError(campo, elementoError, "El mensaje es obligatorio.");
            return false;
        }
        if (valor.length < 10) {
            mostrarError(campo, elementoError, "Escribe un mensaje un poco más detallado (mín. 10 caracteres).");
            return false;
        }
        limpiarError(campo, elementoError);
        return true;
    }

    //Citas

    const formularioCitas = document.getElementById("formularioCitas");

    if (formularioCitas) {
        const fecha = document.getElementById("fechaCita");
        const hora = document.getElementById("horaCita");
        const nombre = document.getElementById("nombreCita");
        const apellido = document.getElementById("apellidoCita");
        const genero = document.getElementById("generoCita");
        const direccion = document.getElementById("direccionCita");
        const telefono = document.getElementById("telefonoCita");
        const mensajeFormulario = document.getElementById("mensajeFormularioCitas");

        const errorFecha = document.getElementById("errorFechaCita");
        const errorHora = document.getElementById("errorHoraCita");
        const errorNombre = document.getElementById("errorNombreCita");
        const errorApellido = document.getElementById("errorApellidoCita");
        const errorGenero = document.getElementById("errorGeneroCita");
        const errorDireccion = document.getElementById("errorDireccionCita");
        const errorTelefono = document.getElementById("errorTelefonoCita");

        //bloquear fechas pasadas
        const hoyISO = new Date().toISOString().split("T")[0];
        fecha.setAttribute("min", hoyISO);

        formatearTelefono(telefono);

        //validacion al salir del campo
        nombre.addEventListener("blur", function () { validarSoloLetras(nombre, errorNombre, "nombre"); });
        apellido.addEventListener("blur", function () { validarSoloLetras(apellido, errorApellido, "apellido"); });
        fecha.addEventListener("blur", function () { validarFecha(fecha, errorFecha); });
        hora.addEventListener("blur", function () { validarRequerido(hora, errorHora, "hora"); });
        genero.addEventListener("change", function () { validarSelect(genero, errorGenero, "el género"); });
        direccion.addEventListener("blur", function () { validarDireccion(direccion, errorDireccion); });
        telefono.addEventListener("blur", function () { validarTelefonoHN(telefono, errorTelefono); });

        formularioCitas.addEventListener("submit", function (evento) {
            evento.preventDefault();

            const valido =
                validarFecha(fecha, errorFecha) &
                validarRequerido(hora, errorHora, "hora") &
                validarSoloLetras(nombre, errorNombre, "nombre") &
                validarSoloLetras(apellido, errorApellido, "apellido") &
                validarSelect(genero, errorGenero, "el género") &
                validarDireccion(direccion, errorDireccion) &
                validarTelefonoHN(telefono, errorTelefono);

            if (valido) {
                mostrarMensajeFormulario(
                    mensajeFormulario,
                    "exito",
                    "¡Solicitud enviada! Hemos recibido tu solicitud de cita para el " + fecha.value + " a las " + hora.value + ". Nuestro equipo se pondrá en contacto contigo pronto."
                );
                formularioCitas.reset();
            } else {
                mostrarMensajeFormulario(
                    mensajeFormulario,
                    "error",
                    "Por favor corrige los campos marcados antes de enviar el formulario."
                );
            }
        });
    }

    //contacto

    const formularioContacto = document.getElementById("formularioContacto");

    if (formularioContacto) {
        const nombre = document.getElementById("nombreContacto");
        const telefono = document.getElementById("telefonoContacto");
        const correo = document.getElementById("correoContacto");
        const asunto = document.getElementById("asuntoContacto");
        const mensajeCampo = document.getElementById("mensajeContacto");
        const mensajeFormulario = document.getElementById("mensajeFormularioContacto");

        const errorNombre = document.getElementById("errorNombreContacto");
        const errorTelefono = document.getElementById("errorTelefonoContacto");
        const errorCorreo = document.getElementById("errorCorreoContacto");
        const errorAsunto = document.getElementById("errorAsuntoContacto");
        const errorMensaje = document.getElementById("errorMensajeContacto");

        formatearTelefono(telefono);

        nombre.addEventListener("blur", function () { validarSoloLetras(nombre, errorNombre, "nombre"); });
        telefono.addEventListener("blur", function () { validarTelefonoHN(telefono, errorTelefono); });
        correo.addEventListener("blur", function () { validarCorreo(correo, errorCorreo); });
        asunto.addEventListener("change", function () { validarSelect(asunto, errorAsunto, "un asunto"); });
        mensajeCampo.addEventListener("blur", function () { validarMensaje(mensajeCampo, errorMensaje); });

        formularioContacto.addEventListener("submit", function (evento) {
            evento.preventDefault();

            const valido =
                validarSoloLetras(nombre, errorNombre, "nombre") &
                validarTelefonoHN(telefono, errorTelefono) &
                validarCorreo(correo, errorCorreo) &
                validarSelect(asunto, errorAsunto, "un asunto") &
                validarMensaje(mensajeCampo, errorMensaje);

            if (valido) {
                mostrarMensajeFormulario(
                    mensajeFormulario,
                    "exito",
                    "¡Gracias por escribirnos, " + nombre.value.trim() + "! Hemos recibido tu mensaje y te responderemos a la brevedad."
                );
                formularioContacto.reset();
            } else {
                mostrarMensajeFormulario(
                    mensajeFormulario,
                    "error",
                    "Por favor corrige los campos marcados antes de enviar el formulario."
                );
            }
        });
    }

});