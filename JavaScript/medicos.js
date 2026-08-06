document.addEventListener("DOMContentLoaded", function () {

    const medicos = [
        {
            nombre: "Dr. Carlos Martínez",
            especialidad: "Cardiología",
            telefono: "2220-1111",
            dias: ["Lunes", "Martes", "Miércoles", "Jueves"],
            diasTexto: "Lunes a jueves",
            horas: ["08:00", "09:00", "10:00", "11:00", "14:00", "15:00"],
            iniciales: "CM"
        },
        {
            nombre: "Dra. Ana Rodríguez",
            especialidad: "Pediatría",
            telefono: "2220-1112",
            dias: ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"],
            diasTexto: "Lunes a sábado",
            horas: ["07:00", "08:00", "09:00", "10:00", "11:00"],
            iniciales: "AR"
        },
        {
            nombre: "Dr. Luis Hernández",
            especialidad: "Dermatología",
            telefono: "2220-1113",
            dias: ["Martes", "Miércoles", "Jueves", "Viernes", "Sábado"],
            diasTexto: "Martes a sábado",
            horas: ["09:00", "10:00", "11:00", "14:00", "15:00", "16:00"],
            iniciales: "LH"
        },
        {
            nombre: "Dra. María Fernández",
            especialidad: "Ginecología",
            telefono: "2220-1114",
            dias: ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes"],
            diasTexto: "Lunes a viernes",
            horas: ["08:00", "09:00", "10:00", "11:00", "14:00", "15:00"],
            iniciales: "MF"
        },
        {
            nombre: "Dr. Roberto Castillo",
            especialidad: "Traumatología",
            telefono: "2220-1115",
            dias: ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes"],
            diasTexto: "Lunes a viernes",
            horas: ["07:00", "08:00", "09:00", "10:00", "14:00"],
            iniciales: "RC"
        },
        {
            nombre: "Dra. Patricia Núñez",
            especialidad: "Medicina Interna",
            telefono: "2220-1116",
            dias: ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"],
            diasTexto: "Lunes a sábado",
            horas: ["08:00", "09:00", "10:00", "11:00", "15:00", "16:00"],
            iniciales: "PN"
        },
        {
            nombre: "Dr. Eduardo Flores",
            especialidad: "Oftalmología",
            telefono: "2220-1117",
            dias: ["Miércoles", "Jueves", "Viernes", "Sábado"],
            diasTexto: "Miércoles a sábado",
            horas: ["09:00", "10:00", "11:00", "14:00", "15:00"],
            iniciales: "EF"
        },
        {
            nombre: "Dra. Gabriela Torres",
            especialidad: "Neurología",
            telefono: "2220-1118",
            dias: ["Lunes", "Miércoles", "Viernes"],
            diasTexto: "Lunes, miércoles y viernes",
            horas: ["08:00", "09:00", "10:00", "14:00"],
            iniciales: "GT"
        }
    ];

    const formularioBusqueda = document.getElementById("formularioBusqueda");
    const campoNombre = document.getElementById("buscarNombre");
    const campoEspecialidad = document.getElementById("buscarEspecialidad");
    const botonLimpiar = document.getElementById("botonLimpiarBusqueda");
    const contenedorMedicos = document.getElementById("contenedorMedicos");
    const contadorResultados = document.getElementById("contadorResultados");
    const sinResultados = document.getElementById("sinResultados");

    if (!formularioBusqueda) return;

    // llenar el select
    function cargarEspecialidades() {
        const especialidades = [...new Set(medicos.map(m => m.especialidad))].sort();
        especialidades.forEach(function (especialidad) {
            const opcion = document.createElement("option");
            opcion.value = especialidad;
            opcion.textContent = especialidad;
            campoEspecialidad.appendChild(opcion);
        });
    }

    function normalizar(texto) {
        return texto
            .toLowerCase()
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "")
            .trim();
    }

    // envia medico a citas.html
    function seleccionarMedico(medico) {
        sessionStorage.setItem("medicoSeleccionado", JSON.stringify(medico));
        window.location.href = "citas.html";
    }

    // tarjetas
    function mostrarMedicos(lista) {
        contenedorMedicos.innerHTML = "";

        if (lista.length === 0) {
            sinResultados.style.display = "block";
            contadorResultados.textContent = "";
            return;
        }

        sinResultados.style.display = "none";
        contadorResultados.innerHTML = "Se encontraron <strong>" + lista.length + "</strong> médico(s).";

        lista.forEach(function (medico, indice) {
            const tarjeta = document.createElement("article");
            tarjeta.className = "tarjeta-medico";
            tarjeta.innerHTML =
                '<div class="avatar-medico">' + medico.iniciales + '</div>' +
                '<div class="info-medico">' +
                    '<h3>' + medico.nombre + '</h3>' +
                    '<span class="especialidad-medico">' + medico.especialidad + '</span>' +
                    '<p><strong>Atiende:</strong> ' + medico.diasTexto + '</p>' +
                    '<p><strong>Teléfono:</strong> ' + medico.telefono + '</p>' +
                    '<button type="button" class="boton boton-pequeno boton-agendar" data-indice="' + indice + '">Agendar cita</button>' +
                '</div>';
            contenedorMedicos.appendChild(tarjeta);

            const botonAgendar = tarjeta.querySelector(".boton-agendar");
            botonAgendar.addEventListener("click", function () {
                seleccionarMedico(medico);
            });
        });
    }

    // filtros
    function filtrarMedicos() {
        const textoNombre = normalizar(campoNombre.value);
        const especialidadSeleccionada = campoEspecialidad.value;

        const resultado = medicos.filter(function (medico) {
            const coincideNombre = textoNombre === "" || normalizar(medico.nombre).includes(textoNombre);
            const coincideEspecialidad = especialidadSeleccionada === "" || medico.especialidad === especialidadSeleccionada;
            return coincideNombre && coincideEspecialidad;
        });

        mostrarMedicos(resultado);
    }

    formularioBusqueda.addEventListener("submit", function (evento) {
        evento.preventDefault();
        filtrarMedicos();
    });

    botonLimpiar.addEventListener("click", function () {
        formularioBusqueda.reset();
        mostrarMedicos(medicos);
    });

    // Inicializar
    cargarEspecialidades();
    mostrarMedicos(medicos);
});