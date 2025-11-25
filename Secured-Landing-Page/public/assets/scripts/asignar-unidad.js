document.addEventListener("DOMContentLoaded", () => {
    const views = document.querySelectorAll(".au-view");
    const tabsRadios = document.querySelectorAll(".au-tabs-radio");
    const cancelBtn = document.getElementById("au-cancel-assignment");
    const cancelMessage = document.getElementById("au-cancel-message");

    function showView(name) {
        views.forEach((v) => {
            v.classList.toggle("au-view-active", v.dataset.view === name);
        });
    }

    // Navegación por data-goto
    document.querySelectorAll("[data-goto]").forEach((el) => {
        el.addEventListener("click", (ev) => {
            ev.preventDefault();
            const viewName = el.dataset.goto;
            if (viewName) {
                showView(viewName);

                // Al entrar a confirmación, ocultamos mensaje de anulación (si lo había)
                if (viewName === "confirmacion" && cancelMessage) {
                    cancelMessage.hidden = true;
                }
            }
        });
    });

    // Tabs Lista / Mapa
    function updateManualPanels() {
        const listaRadio = document.getElementById("au-tab-lista");
        const panelLista = document.querySelector(".au-panel-lista");
        const panelMapa = document.querySelector(".au-panel-mapa");
        if (!listaRadio || !panelLista || !panelMapa) return;

        const listaActive = listaRadio.checked;
        panelLista.style.display = listaActive ? "block" : "none";
        panelMapa.style.display = listaActive ? "none" : "block";
    }

    tabsRadios.forEach((r) => {
        r.addEventListener("change", updateManualPanels);
    });

    // Botón "Anular unidad asignadaa"
    if (cancelBtn && cancelMessage) {
        cancelBtn.addEventListener("click", () => {
            // Mostramos mensaje y regresamos al inicio para poder reasignar
            cancelMessage.hidden = false;
            // Pequeño delay visual antes de ir al inicio (opcional)
            setTimeout(() => {
                showView("inicio");
            }, 800);
        });
    }

    // Estado inicial
    showView("inicio");
    updateManualPanels();
});
