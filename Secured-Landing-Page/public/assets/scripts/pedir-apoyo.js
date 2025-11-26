

document.addEventListener("DOMContentLoaded", () => {
    const views = document.querySelectorAll(".pa-view");

    const showView = (viewName) => {
        views.forEach((v) => {
            v.classList.toggle("pa-view-active", v.dataset.view === viewName);
        });
        window.scrollTo({ top: 0, behavior: "instant" });
    };

    // ========================
    // Navegación principal
    // ========================

    // 1) Detalle incidente -> Configurar solicitud
    const btnOpenSupportRequest = document.getElementById("btnOpenSupportRequest");
    if (btnOpenSupportRequest) {
        btnOpenSupportRequest.addEventListener("click", () =>
            showView("configure-request")
        );
    }

    // 2) Configurar solicitud -> volver a Detalle incidente (Cancelar o X)
    const btnCancelConfig = document.getElementById("btnCancelConfig");
    const btnCloseConfig = document.getElementById("btnCloseConfig");
    [btnCancelConfig, btnCloseConfig].forEach((btn) => {
        if (btn) {
            btn.addEventListener("click", () => showView("incident-detail"));
        }
    });

    // 3) Enviar solicitud -> Seguimiento
    const supportForm = document.getElementById("supportRequestForm");
    if (supportForm) {
        supportForm.addEventListener("submit", (e) => {
            e.preventDefault();
            showView("request-tracking");
        });
    }

    // 4) Desde seguimiento, botón "←" -> Detalle incidente
    const btnBackFromTracking = document.getElementById("btnBackFromTracking");
    if (btnBackFromTracking) {
        btnBackFromTracking.addEventListener("click", () =>
            showView("incident-detail")
        );
    }

    // 5) Desde seguimiento, botón "Escalar" -> vista Escalar
    const btnEscalar = document.getElementById("btnEscalar");
    if (btnEscalar) {
        btnEscalar.addEventListener("click", () => showView("escalate"));
    }

    // 6) Desde seguimiento, botón "Cancelar solicitud" -> vista Cancelar
    const btnOpenCancelModal = document.getElementById("btnOpenCancelModal");
    if (btnOpenCancelModal) {
        btnOpenCancelModal.addEventListener("click", () =>
            showView("cancel-confirm")
        );
    }

    // 7) Confirmar cancelación -> volver a Detalle incidente
    const btnConfirmCancel = document.getElementById("btnConfirmCancel");
    if (btnConfirmCancel) {
        btnConfirmCancel.addEventListener("click", () =>
            showView("incident-detail")
        );
    }

    // 8) Volver desde Cancelar -> regresar a Seguimiento
    const btnBackFromCancel = document.getElementById("btnBackFromCancel");
    if (btnBackFromCancel) {
        btnBackFromCancel.addEventListener("click", () =>
            showView("request-tracking")
        );
    }

    // 9) Vista Escalar: cerrar con X o botón "Volver" -> Seguimiento
    const btnBackFromEscalate = document.getElementById("btnBackFromEscalate");
    const btnCloseEscalate = document.getElementById("btnCloseEscalate");
    [btnBackFromEscalate, btnCloseEscalate].forEach((btn) => {
        if (btn) {
            btn.addEventListener("click", () => showView("request-tracking"));
        }
    });

    // 10) Escalar ahora -> volver a Detalle incidente
    const escalateForm = document.getElementById("escalateForm");
    if (escalateForm) {
        escalateForm.addEventListener("submit", (e) => {
            e.preventDefault();
            showView("incident-detail");
        });
    }

    // ========================
    // Pequeñas interacciones visuales
    // ========================

    // Alcance: cambiar selección visual
    const rangeOptionsContainer = document.getElementById("rangeOptions");
    if (rangeOptionsContainer) {
        rangeOptionsContainer.addEventListener("click", (event) => {
            const option = event.target.closest("[data-range-option]");
            if (!option) return;

            rangeOptionsContainer
                .querySelectorAll("[data-range-option]")
                .forEach((el) => el.classList.remove("is-selected"));

            option.classList.add("is-selected");

            const input = option.querySelector("input[type='radio']");
            if (input) input.checked = true;
        });
    }

    // Tipo de unidad: pill "Todos los tipos" + chips
    const unitTypeGroup = document.getElementById("unitTypeGroup");
    if (unitTypeGroup) {
        const allPill = unitTypeGroup.querySelector(".pa-unit-pill");
        const chips = unitTypeGroup.querySelectorAll(".pa-unit-type-chip");

        const clearChipSelection = () => {
            chips.forEach((chip) => chip.classList.remove("is-selected"));
        };

        if (allPill) {
            allPill.addEventListener("click", () => {
                allPill.classList.add("is-selected");
                clearChipSelection();
            });
        }

        chips.forEach((chip) => {
            chip.addEventListener("click", () => {
                chip.classList.toggle("is-selected");
                // Si hay algún chip seleccionado, quitamos la selección de "Todos los tipos"
                const anySelected = Array.from(chips).some((c) =>
                    c.classList.contains("is-selected")
                );
                if (anySelected) {
                    allPill?.classList.remove("is-selected");
                } else {
                    allPill?.classList.add("is-selected");
                }
            });
        });
    }

    // Opciones de escalamiento: selección visual
    const escalateOptionsContainer = document.getElementById("escalateOptions");
    if (escalateOptionsContainer) {
        escalateOptionsContainer.addEventListener("click", (event) => {
            const option = event.target.closest("[data-escalate-option]");
            if (!option) return;

            escalateOptionsContainer
                .querySelectorAll("[data-escalate-option]")
                .forEach((el) => el.classList.remove("is-selected"));

            option.classList.add("is-selected");

            const input = option.querySelector("input[type='radio']");
            if (input) input.checked = true;
        });
    }
});
