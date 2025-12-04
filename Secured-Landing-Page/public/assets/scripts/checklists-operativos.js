
document.addEventListener("DOMContentLoaded", () => {
    const views = document.querySelectorAll(".chk-view");

    const goToView = (name) => {
        views.forEach((view) => {
            view.classList.toggle(
                "chk-view-active",
                view.dataset.view === name
            );
        });

        // desplazar arriba al cambiar de vista
        window.scrollTo({ top: 0, behavior: "instant" });
    };

    // Delegamos a todos los elementos con data-goto
    document.querySelectorAll("[data-goto]").forEach((el) => {
        el.addEventListener("click", () => {
            const target = el.getAttribute("data-goto");

            // en este prototipo, algunos pasos "deshabilitados"
            if (target === "paso2-disabled") {
                // solo mostramos un aviso suave en consola
                console.log("Paso 2 no implementado en este prototipo.");
                return;
            }

            if (target) {
                goToView(target);
            }
        });
    });
});
