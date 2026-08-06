document.addEventListener("DOMContentLoaded", function () {

    // expresiones regulares

    const RE_SOLO_LETRAS = /^[A-Za-zÁÉÍÓÚÑáéíóúñÜü\s]+$/;

    const RE_TELEFONO_HN = /^[0-9]{4}-?[0-9]{4}$/;

    const RE_PREFIJO_TELEFONO_HN = /^[2389]/;

    const RE_CORREO = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

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

    function formatearTelefono(input) {
        input.addEventListener("input", function () {
            let valor = input.value.replace(/[^0-9]/g, "").slice(0, 8);
            if (valor.length > 4) {
                valor = valor.slice(0, 4) + "-" + valor.slice(4);
            }
            input.value = valor;
        });
    }

    function formatearHora12(horaStr) {
        const [horaTexto, minutoTexto] = horaStr.split(":");
        let hora = Number(horaTexto);
        const sufijo = hora >= 12 ? "p.m." : "a.m.";
        hora = hora % 12;
        if (hora === 0) hora = 12;
        return hora + ":" + minutoTexto + " " + sufijo;
    }

    function formatearFechaLarga(fechaISO) {
        const fecha = new Date(fechaISO + "T00:00:00");
        const opciones = { weekday: "long", day: "numeric", month: "long", year: "numeric" };
        return fecha.toLocaleDateString("es-HN", opciones);
    }

    // validaciones individuales

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
        // No se permite una dirección compuesta únicamente por números
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

    // citas

    const formularioCitas = document.getElementById("formularioCitas");

    if (formularioCitas) {

        const avisoSinMedico = document.getElementById("avisoSinMedico");
        const contenidoConMedico = document.getElementById("contenidoConMedico");
        const bloqueFormulario = document.getElementById("bloqueFormulario");
        const reciboCita = document.getElementById("reciboCita");

        const resumenNombre = document.getElementById("resumenNombre");
        const resumenEspecialidad = document.getElementById("resumenEspecialidad");
        const resumenDias = document.getElementById("resumenDias");

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

        // traer medico de medicos.html
        const medicoGuardado = sessionStorage.getItem("medicoSeleccionado");
        let medico = null;

        if (medicoGuardado) {
            try {
                medico = JSON.parse(medicoGuardado);
            } catch (error) {
                medico = null;
            }
        }

        if (!medico || !medico.dias || !medico.horas) {
            avisoSinMedico.style.display = "block";
            contenidoConMedico.style.display = "none";
        } else {
            avisoSinMedico.style.display = "none";
            contenidoConMedico.style.display = "block";

            // mostrar resumen
            resumenNombre.textContent = medico.nombre;
            resumenEspecialidad.textContent = medico.especialidad;
            resumenDias.textContent = "Atiende: " + medico.diasTexto;

            // validar fechas para cita
            const hoyISO = new Date().toISOString().split("T")[0];
            fecha.setAttribute("min", hoyISO);

            // llenar horas
            medico.horas.forEach(function (horaFija) {
                const opcion = document.createElement("option");
                opcion.value = horaFija;
                opcion.textContent = formatearHora12(horaFija);
                hora.appendChild(opcion);
            });

            formatearTelefono(telefono);

            // validar coincidencia de fechas
            function validarFechaSegunMedico() {
                const valor = fecha.value;
                if (campoVacio(valor)) {
                    mostrarError(fecha, errorFecha, "La fecha es obligatoria.");
                    return false;
                }

                const hoy = new Date();
                hoy.setHours(0, 0, 0, 0);
                const fechaSeleccionada = new Date(valor + "T00:00:00");

                if (fechaSeleccionada < hoy) {
                    mostrarError(fecha, errorFecha, "La fecha no puede ser anterior a hoy.");
                    return false;
                }

                const diasSemana = ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"];
                const diaSeleccionado = diasSemana[fechaSeleccionada.getDay()];

                if (!medico.dias.includes(diaSeleccionado)) {
                    mostrarError(
                        fecha,
                        errorFecha,
                        medico.nombre + " no atiende los días " + diaSeleccionado + ". Días disponibles: " + medico.diasTexto + "."
                    );
                    return false;
                }

                limpiarError(fecha, errorFecha);
                return true;
            }

            // Validación en tiempo real
            nombre.addEventListener("blur", function () { validarSoloLetras(nombre, errorNombre, "nombre"); });
            apellido.addEventListener("blur", function () { validarSoloLetras(apellido, errorApellido, "apellido"); });
            fecha.addEventListener("change", validarFechaSegunMedico);
            hora.addEventListener("change", function () { validarSelect(hora, errorHora, "una hora"); });
            genero.addEventListener("change", function () { validarSelect(genero, errorGenero, "el género"); });
            direccion.addEventListener("blur", function () { validarDireccion(direccion, errorDireccion); });
            telefono.addEventListener("blur", function () { validarTelefonoHN(telefono, errorTelefono); });

            // crear el recibo
            function generarRecibo() {
                const numeroRecibo = "HVS-" + Date.now().toString().slice(-8);

                document.getElementById("reciboNumero").textContent = "N.° " + numeroRecibo;
                document.getElementById("reciboMedico").textContent = medico.nombre;
                document.getElementById("reciboEspecialidad").textContent = medico.especialidad;
                document.getElementById("reciboFecha").textContent = formatearFechaLarga(fecha.value);
                document.getElementById("reciboHora").textContent = formatearHora12(hora.value);
                document.getElementById("reciboPaciente").textContent = nombre.value.trim() + " " + apellido.value.trim();
                document.getElementById("reciboGenero").textContent = genero.value;
                document.getElementById("reciboTelefono").textContent = telefono.value.trim();
                document.getElementById("reciboDireccion").textContent = direccion.value.trim();

                bloqueFormulario.style.display = "none";
                reciboCita.style.display = "block";
                reciboCita.scrollIntoView({ behavior: "smooth", block: "start" });
            }

            formularioCitas.addEventListener("submit", function (evento) {
                evento.preventDefault();

                const valido =
                    validarFechaSegunMedico() &
                    validarSelect(hora, errorHora, "una hora") &
                    validarSoloLetras(nombre, errorNombre, "nombre") &
                    validarSoloLetras(apellido, errorApellido, "apellido") &
                    validarSelect(genero, errorGenero, "el género") &
                    validarDireccion(direccion, errorDireccion) &
                    validarTelefonoHN(telefono, errorTelefono);

                if (valido) {
                    generarRecibo();
                } else {
                    mostrarMensajeFormulario(
                        mensajeFormulario,
                        "error",
                        "Por favor corrige los campos marcados antes de enviar el formulario."
                    );
                }
            });

            const botonImprimir = document.getElementById("botonImprimirRecibo");
            const botonNuevaCita = document.getElementById("botonNuevaCita");

            botonImprimir.addEventListener("click", function () {
                window.print();
            });

            botonNuevaCita.addEventListener("click", function () {
                sessionStorage.removeItem("medicoSeleccionado");
                window.location.href = "medicos.html";
            });
        }
    }

    // contacto

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