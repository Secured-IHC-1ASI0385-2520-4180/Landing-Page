document.addEventListener("DOMContentLoaded", () => {
    const views = document.querySelectorAll(".au-view");
    const tabsRadios = document.querySelectorAll(".au-tabs-radio");

    function showView(name) {
        views.forEach((v) => {
            v.classList.toggle("au-view-active", v.dataset.view === name);
        });
    }

    // Botones que navegan entre vistas mediante data-goto
    document.querySelectorAll("[data-goto]").forEach((el) => {
        el.addEventListener("click", (ev) => {
            ev.preventDefault();
            const viewName = el.dataset.goto;
            if (viewName) {
                showView(viewName);
            }
        });
    });

    // Tabs Lista / Mapa dentro de la vista manual
    function updateManualPanels() {
        const listaActive = document.getElementById("au-tab-lista")?.checked;
        const panelLista = document.querySelector(".au-panel-lista");
        const panelMapa = document.querySelector(".au-panel-mapa");
        if (!panelLista || !panelMapa) return;

        panelLista.style.display = listaActive ? "block" : "none";
        panelMapa.style.display = listaActive ? "none" : "block";
    }

    tabsRadios.forEach((r) => {
        r.addEventListener("change", updateManualPanels);
    });

    // Estado inicial
    showView("inicio");
    updateManualPanels();
});
