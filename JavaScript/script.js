document.addEventListener("DOMContentLoaded", function () {
    const botonMenu = document.getElementById("botonMenu");
    const menuPrincipal = document.getElementById("menuPrincipal");
    const diapositivas = document.querySelectorAll(".diapositiva");
    const indicadores = document.querySelectorAll(".indicador");
    const botonAnterior = document.getElementById("botonAnterior");
    const botonSiguiente = document.getElementById("botonSiguiente");
    const botonArriba = document.getElementById("botonArriba");
    const anioActual = document.getElementById("anioActual");

    let indiceActual = 0;
    let intervaloCarrusel;

    // validacion menu
    if (botonMenu && menuPrincipal) {
        botonMenu.addEventListener("click", function () {
            const menuAbierto =
                menuPrincipal.classList.toggle("menu-abierto");

            botonMenu.classList.toggle("activo", menuAbierto);

            botonMenu.setAttribute(
                "aria-expanded",
                menuAbierto.toString()
            );

            botonMenu.setAttribute(
                "aria-label",
                menuAbierto ? "Cerrar menú" : "Abrir menú"
            );
        });

        const enlacesMenu =
            menuPrincipal.querySelectorAll("a");

        enlacesMenu.forEach(function (enlace) {
            enlace.addEventListener("click", function () {
                menuPrincipal.classList.remove("menu-abierto");
                botonMenu.classList.remove("activo");
                botonMenu.setAttribute("aria-expanded", "false");
                botonMenu.setAttribute("aria-label", "Abrir menú");
            });
        });
    }

    // validacion carusel
    if (diapositivas.length > 0 && indicadores.length > 0 && botonAnterior && botonSiguiente) {

        function mostrarDiapositiva(nuevoIndice) {

            if (nuevoIndice >= diapositivas.length) {
                indiceActual = 0;
            } else if (nuevoIndice < 0) {
                indiceActual = diapositivas.length - 1;
            } else {
                indiceActual = nuevoIndice;
            }

            diapositivas.forEach(function (diapositiva) {
                diapositiva.classList.remove("activa");
            });

            indicadores.forEach(function (indicador) {
                indicador.classList.remove("activo");
            });

            diapositivas[indiceActual].classList.add("activa");
            indicadores[indiceActual].classList.add("activo");
        }

        function iniciarCarruselAutomatico() {
            clearInterval(intervaloCarrusel);

            intervaloCarrusel = setInterval(function () {
                mostrarDiapositiva(indiceActual + 1);
            }, 6000);
        }

        botonSiguiente.addEventListener("click", function () {
            mostrarDiapositiva(indiceActual + 1);
            iniciarCarruselAutomatico();
        });

        botonAnterior.addEventListener("click", function () {
            mostrarDiapositiva(indiceActual - 1);
            iniciarCarruselAutomatico();
        });

        indicadores.forEach(function (indicador) {
            indicador.addEventListener("click", function () {
                const indiceSeleccionado =
                    Number(indicador.dataset.indice);

                mostrarDiapositiva(indiceSeleccionado);
                iniciarCarruselAutomatico();
            });
        });

        mostrarDiapositiva(0);
        iniciarCarruselAutomatico();
    }

    // boton subir
    if (botonArriba) {
        window.addEventListener("scroll", function () {
            botonArriba.classList.toggle(
                "visible",
                window.scrollY > 500
            );
        });

        botonArriba.addEventListener("click", function () {
            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });
        });
    }

    if (anioActual) {
        anioActual.textContent = new Date().getFullYear();
    }

});