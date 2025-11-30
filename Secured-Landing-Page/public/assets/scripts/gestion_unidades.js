
document.addEventListener("DOMContentLoaded", () => {
    const vistaLista = document.getElementById("vista-lista");
    const vistaMapa = document.getElementById("vista-mapa");

    const filtersButton = document.querySelector(".toolbar-filters");
    const mapButton = document.querySelector(".toolbar-map");
    const viewButtons = document.querySelectorAll(".toolbar-segment");

    const mainTitle = document.getElementById("main-title");
    const mainSubtitle = document.getElementById("main-subtitle");

    const overlay = document.getElementById("units-overlay");
    const modalProgramar = document.getElementById("modal-programar");
    const modalBaja = document.getElementById("modal-baja");

    const tipoMantenimiento = document.getElementById("tipoMantenimiento");
    const fechaInicio = document.getElementById("fechaInicio");
    const fechaFin = document.getElementById("fechaFin");
    const btnProgramar = document.getElementById("btnProgramar");
    const btnCancelarProgramar = document.getElementById("btnCancelarProgramar");
    const bloquearDespacho = document.getElementById("bloquearDespacho");

    const motivoBaja = document.getElementById("motivoBaja");
    const descripcionBaja = document.getElementById("descripcionBaja");
    const btnCancelarBaja = document.getElementById("btnCancelarBaja");
    const btnConfirmarBaja = document.getElementById("btnConfirmarBaja");
    const bajaCharCount = document.getElementById("baja-char-count");

    const backButton = document.querySelector(".back-button");
    if (backButton) {
        backButton.addEventListener("click", () => {
            window.location.href = "variaciones-varias.html";
        });
    }

    function setHeaderToList() {
        if (mainTitle) mainTitle.textContent = "Gestión de unidades";
        if (mainSubtitle) mainSubtitle.textContent = "5 unidades";
    }

    function setHeaderToMap() {
        if (mainTitle) mainTitle.textContent = "Mapa de unidades";
        if (mainSubtitle) mainSubtitle.textContent = "4 unidades";
    }

    function showListView() {
        vistaLista.hidden = false;
        vistaMapa.hidden = true;
        if (filtersButton) filtersButton.classList.add("is-active");
        if (mapButton) mapButton.classList.remove("is-active");
        setHeaderToList();
    }

    function showMapView() {
        vistaLista.hidden = true;
        vistaMapa.hidden = false;
        if (filtersButton) filtersButton.classList.remove("is-active");
        if (mapButton) mapButton.classList.add("is-active");
        setHeaderToMap();
    }

    viewButtons.forEach((btn) => {
        btn.addEventListener("click", () => {
            const view = btn.dataset.view;
            if (view === "mapa") {
                showMapView();
            } else {
                showListView();
            }
        });
    });

    const mapListButton = document.querySelector(".map-list-button");
    if (mapListButton) {
        mapListButton.addEventListener("click", () => {
            showListView();
        });
    }

    function openOverlay() {
        overlay.classList.remove("is-hidden");
        document.body.style.overflow = "hidden";
    }

    function closeOverlay() {
        overlay.classList.add("is-hidden");
        modalProgramar.classList.add("is-hidden");
        modalBaja.classList.add("is-hidden");
        document.body.style.overflow = "";
    }

    function openProgramar() {
        modalBaja.classList.add("is-hidden");
        modalProgramar.classList.remove("is-hidden");
        openOverlay();
    }

    function openBaja() {
        modalProgramar.classList.add("is-hidden");
        modalBaja.classList.remove("is-hidden");
        openOverlay();
    }

    const cardPatrullaCentro = document.querySelector(
        '.unit-card-clickable[data-unit="patrulla-centro-1"]'
    );
    if (cardPatrullaCentro) {
        cardPatrullaCentro.addEventListener("click", () => {
            openProgramar();
        });
    }

    const mapPatrullaCentro = document.querySelector(
        '.map-unit-clickable[data-unit="patrulla-centro-1"]'
    );
    if (mapPatrullaCentro) {
        mapPatrullaCentro.addEventListener("click", () => {
            openProgramar();
        });
    }

    function validateProgramar() {
        const okTipo = tipoMantenimiento.value.trim().length > 0;
        const okInicio = fechaInicio.value.trim().length > 0;
        const okFin = fechaFin.value.trim().length > 0;

        btnProgramar.disabled = !(okTipo && okInicio && okFin);
    }

    if (tipoMantenimiento && fechaInicio && fechaFin) {
        [tipoMantenimiento, fechaInicio, fechaFin].forEach((el) => {
            el.addEventListener("input", validateProgramar);
            el.addEventListener("change", validateProgramar);
        });
    }

    const formProgramar = document.getElementById("form-programar");
    if (formProgramar) {
        formProgramar.addEventListener("submit", (e) => {
            e.preventDefault();
            if (btnProgramar.disabled) return;

            console.log("Mantenimiento programado");

            closeOverlay();
        });
    }

    if (btnCancelarProgramar) {
        btnCancelarProgramar.addEventListener("click", () => {
            closeOverlay();
        });
    }

    if (bloquearDespacho) {
        bloquearDespacho.addEventListener("change", (e) => {
            if (e.target.checked) {
                openBaja();
            }
        });
    }

    function validateBaja() {
        const motivoOk = motivoBaja.value.trim().length > 0;
        const desc = descripcionBaja.value.trim();
        const descOk = desc.length >= 10;

        bajaCharCount.textContent = desc.length.toString();

        btnConfirmarBaja.disabled = !(motivoOk && descOk);
    }

    if (motivoBaja && descripcionBaja) {
        motivoBaja.addEventListener("change", validateBaja);
        descripcionBaja.addEventListener("input", validateBaja);
    }

    const formBaja = document.getElementById("form-baja");
    if (formBaja) {
        formBaja.addEventListener("submit", (e) => {
            e.preventDefault();
            if (btnConfirmarBaja.disabled) return;

            console.log("Unidad marcada fuera de servicio");

            // volvemos a Gestión de unidades (lista)
            closeOverlay();
            showListView();
            if (bloquearDespacho) bloquearDespacho.checked = false;
        });
    }

    // Cancelar
    if (btnCancelarBaja) {
        btnCancelarBaja.addEventListener("click", () => {
            if (bloquearDespacho) bloquearDespacho.checked = false;
            openProgramar();
        });
    }

    const nuevaUnidadBtn = document.querySelector(
        ".units-header .btn-primary"
    );
    if (nuevaUnidadBtn) {
        nuevaUnidadBtn.addEventListener("click", () => {
            console.log("Nueva unidad");
        });
    }

    const exportBtn = document.querySelector(".toolbar-export");
    if (exportBtn) {
        exportBtn.addEventListener("click", () => {
            console.log("Exportar unidades");
        });
    }
});
