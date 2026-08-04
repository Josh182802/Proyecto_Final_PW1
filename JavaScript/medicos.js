document.addEventListener("DOMContentLoaded", function () {

    //Registro de Medicos
    const medicos = [
        {
            nombre: "Dr. Carlos Martínez",
            especialidad: "Cardiología",
            telefono: "2220-1111",
            horario: "Lunes a viernes, 8:00 a.m. - 4:00 p.m.",
            iniciales: "CM"
        },
        {
            nombre: "Dra. Ana Rodríguez",
            especialidad: "Pediatría",
            telefono: "2220-1112",
            horario: "Lunes a sábado, 7:00 a.m. - 3:00 p.m.",
            iniciales: "AR"
        },
        {
            nombre: "Dr. Luis Hernández",
            especialidad: "Dermatología",
            telefono: "2220-1113",
            horario: "Martes a sábado, 9:00 a.m. - 5:00 p.m.",
            iniciales: "LH"
        },
        {
            nombre: "Dra. María Fernández",
            especialidad: "Ginecología",
            telefono: "2220-1114",
            horario: "Lunes a viernes, 8:00 a.m. - 4:00 p.m.",
            iniciales: "MF"
        },
        {
            nombre: "Dr. Roberto Castillo",
            especialidad: "Traumatología",
            telefono: "2220-1115",
            horario: "Lunes a viernes, 7:00 a.m. - 3:00 p.m.",
            iniciales: "RC"
        },
        {
            nombre: "Dra. Patricia Núñez",
            especialidad: "Medicina Interna",
            telefono: "2220-1116",
            horario: "Lunes a sábado, 8:00 a.m. - 4:00 p.m.",
            iniciales: "PN"
        },
        {
            nombre: "Dr. Eduardo Flores",
            especialidad: "Oftalmología",
            telefono: "2220-1117",
            horario: "Miércoles a sábado, 9:00 a.m. - 5:00 p.m.",
            iniciales: "EF"
        },
        {
            nombre: "Dra. Gabriela Torres",
            especialidad: "Neurología",
            telefono: "2220-1118",
            horario: "Lunes, miércoles y viernes, 8:00 a.m. - 3:00 p.m.",
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

    //Llenar especialidades
    function cargarEspecialidades() {
        const especialidades = [...new Set(medicos.map(m => m.especialidad))].sort();
        especialidades.forEach(function (especialidad) {
            const opcion = document.createElement("option");
            opcion.value = especialidad;
            opcion.textContent = especialidad;
            campoEspecialidad.appendChild(opcion);
        });
    }

    //quitar tildes
    function normalizar(texto) {
        return texto
            .toLowerCase()
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "")
            .trim();
    }

    //crear las tarjetas de medicos
    function mostrarMedicos(lista) {
        contenedorMedicos.innerHTML = "";

        if (lista.length === 0) {
            sinResultados.style.display = "block";
            contadorResultados.textContent = "";
            return;
        }

        sinResultados.style.display = "none";
        contadorResultados.innerHTML = "Se encontraron <strong>" + lista.length + "</strong> médico(s).";

        lista.forEach(function (medico) {
            const tarjeta = document.createElement("article");
            tarjeta.className = "tarjeta-medico";
            tarjeta.innerHTML =
                '<div class="avatar-medico">' + medico.iniciales + '</div>' +
                '<div class="info-medico">' +
                    '<h3>' + medico.nombre + '</h3>' +
                    '<span class="especialidad-medico">' + medico.especialidad + '</span>' +
                    '<p><strong>Horario:</strong> ' + medico.horario + '</p>' +
                    '<p><strong>Teléfono:</strong> ' + medico.telefono + '</p>' +
                '</div>';
            contenedorMedicos.appendChild(tarjeta);
        });
    }

    //filtros
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