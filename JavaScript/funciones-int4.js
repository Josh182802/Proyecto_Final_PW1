document.addEventListener("DOMContentLoaded", function () {
    const botonesAcordeon = document.querySelectorAll(".accordion-header");

    botonesAcordeon.forEach(boton => {
        boton.addEventListener("click", function () {
            const contenido = this.nextElementSibling;
            this.classList.toggle("activo");

            if (contenido.style.maxHeight) {
                contenido.style.maxHeight = null;
            } else {
                contenido.style.maxHeight = contenido.scrollHeight + "px";
            }
        });
    });

    const btnArriba = document.getElementById("btn-volver-arriba");
    if (btnArriba) {
        window.addEventListener("scroll", function () {
            if (window.scrollY > 400) {
                btnArriba.classList.add("mostrar");
            } else {
                btnArriba.classList.remove("mostrar");
            }
        });

        btnArriba.addEventListener("click", function () {
            window.scrollTo({ top: 0, behavior: "smooth" });
        });
    }

    const elementosAnimar = document.querySelectorAll(".animar-scroll");
    const observador = new IntersectionObserver((entradas) => {
        entradas.forEach(entrada => {
            if (entrada.isIntersecting) {
                entrada.target.classList.add("visible");
                observador.unobserve(entrada.target); 
            }
        });
    }, { threshold: 0.1 });

    elementosAnimar.forEach(el => observador.observe(el));
});