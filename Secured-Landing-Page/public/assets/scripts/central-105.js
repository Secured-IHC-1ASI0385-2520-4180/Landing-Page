// =======================================
// CENTRAL 105 - LÓGICA DE VISTAS Y MODALES
// =======================================

document.addEventListener("DOMContentLoaded", () => {
    const views = document.querySelectorAll(".c105-view");

    function showView(id) {
        views.forEach((v) => {
            v.classList.toggle("c105-view-active", v.id === id);
        });
    }

    // --- Navegación principal ---

    // Botones "Contestar" en la cola -> Llamada en curso
    document.querySelectorAll(".js-answer-call").forEach((btn) => {
        btn.addEventListener("click", () => {
            const callId = btn.dataset.callid || "";
            const phoneElement = btn
                .closest(".c105-call-card")
                .querySelector(".c105-call-phone");

            const activePhone = document.getElementById("activeCallPhone");
            const capturedPhone = document.getElementById("capturedPhone");
            const transferPhone = document.getElementById("transferPhone");

            if (phoneElement) {
                const phoneText = phoneElement.textContent.trim();
                if (activePhone) activePhone.textContent = phoneText;
                if (capturedPhone) capturedPhone.textContent = phoneText;
                if (transferPhone) transferPhone.textContent = phoneText;
            }

            showView("view-call-active");
        });
    });

    // Botón "Grabaciones" desde la cola
    const btnGoRecordings = document.getElementById("btnGoRecordings");
    if (btnGoRecordings) {
        btnGoRecordings.addEventListener("click", () => {
            showView("view-recordings");
        });
    }

    // Botones con data-goto-view (back en grabaciones)
    document.querySelectorAll("[data-goto-view]").forEach((btn) => {
        btn.addEventListener("click", () => {
            const target = btn.getAttribute("data-goto-view");
            if (target) showView(target);
        });
    });

    // --- Reproductor de grabaciones ---

    const recordingPlayer = document.getElementById("recordingPlayer");
    const recPlayerId = document.getElementById("recPlayerId");
    const recAudio = document.getElementById("recAudio");
    const btnClosePlayer = document.getElementById("btnClosePlayer");

    document.querySelectorAll(".js-play-recording").forEach((btn) => {
        btn.addEventListener("click", () => {
            const recId = btn.dataset.recId || "REC-000";
            if (recPlayerId) recPlayerId.textContent = recId;

            // Aquí podrías mapear cada ID a un archivo real.
            // Por ahora dejamos el src vacío para que solo muestre el control.
            if (recAudio) {
                recAudio.pause();
                recAudio.currentTime = 0;
                recAudio.removeAttribute("src");
                recAudio.load();
            }

            if (recordingPlayer) recordingPlayer.hidden = false;
        });
    });

    if (btnClosePlayer && recordingPlayer) {
        btnClosePlayer.addEventListener("click", () => {
            if (recAudio) {
                recAudio.pause();
            }
            recordingPlayer.hidden = true;
        });
    }

    // --- Modales genéricos ---

    function openModal(id) {
        const modal = document.getElementById(id);
        if (modal) modal.classList.add("is-open");
    }

    function closeModal(id) {
        const modal = document.getElementById(id);
        if (modal) modal.classList.remove("is-open");
    }

    // Cerrar modal con botón .js-close-modal
    document.querySelectorAll(".js-close-modal").forEach((btn) => {
        btn.addEventListener("click", () => {
            const id = btn.getAttribute("data-modal-id");
            if (id) closeModal(id);
        });
    });

    // Evitar que clic dentro del diálogo cierre el modal (si en el futuro
    // haces cierre al hacer clic en el fondo)
    document.querySelectorAll(".c105-modal-dialog").forEach((dialog) => {
        dialog.addEventListener("click", (ev) => {
            ev.stopPropagation();
        });
    });

    // --- Modal de duplicados ---

    const btnViewDuplicates = document.getElementById("btnViewDuplicates");
    if (btnViewDuplicates) {
        btnViewDuplicates.addEventListener("click", () => {
            openModal("duplicatesModal");
        });
    }

    // --- Modal de transferir llamada ---

    const btnOpenTransfer = document.getElementById("btnOpenTransfer");
    if (btnOpenTransfer) {
        btnOpenTransfer.addEventListener("click", () => {
            openModal("transferModal");
        });
    }

    // Cambiar modo de transferencia (solo estilos)
    document.querySelectorAll(".c105-transfer-tab").forEach((tab) => {
        tab.addEventListener("click", () => {
            document
                .querySelectorAll(".c105-transfer-tab")
                .forEach((t) => t.classList.remove("c105-transfer-tab-active"));
            tab.classList.add("c105-transfer-tab-active");
        });
    });

    // --- Modal de incidente (nuevo / vincular) ---

    const incidentModal = document.getElementById("incidentModal");
    const tabNew = document.getElementById("incidentTabNew");
    const tabExisting = document.getElementById("incidentTabExisting");
    const panelNew = document.getElementById("incidentPanelNew");
    const panelExisting = document.getElementById("incidentPanelExisting");

    function setIncidentTab(mode) {
        if (!tabNew || !tabExisting || !panelNew || !panelExisting) return;

        if (mode === "new") {
            tabNew.classList.add("c105-incident-tab-active");
            tabExisting.classList.remove("c105-incident-tab-active");
            panelNew.classList.add("c105-incident-panel-active");
            panelExisting.classList.remove("c105-incident-panel-active");
        } else {
            tabExisting.classList.add("c105-incident-tab-active");
            tabNew.classList.remove("c105-incident-tab-active");
            panelExisting.classList.add("c105-incident-panel-active");
            panelNew.classList.remove("c105-incident-panel-active");
        }
    }

    if (tabNew) {
        tabNew.addEventListener("click", () => setIncidentTab("new"));
    }
    if (tabExisting) {
        tabExisting.addEventListener("click", () => setIncidentTab("existing"));
    }

    const btnOpenIncidentModalNew = document.getElementById(
        "btnOpenIncidentModalNew"
    );
    const btnOpenIncidentModalExisting = document.getElementById(
        "btnOpenIncidentModalExisting"
    );

    if (btnOpenIncidentModalNew) {
        btnOpenIncidentModalNew.addEventListener("click", () => {
            setIncidentTab("new");
            openModal("incidentModal");
        });
    }

    if (btnOpenIncidentModalExisting) {
        btnOpenIncidentModalExisting.addEventListener("click", () => {
            setIncidentTab("existing");
            openModal("incidentModal");
        });
    }

    // Cerrar modal al hacer clic en el fondo oscuro
    document.querySelectorAll(".c105-modal").forEach((backdrop) => {
        backdrop.addEventListener("click", (ev) => {
            if (ev.target === backdrop) {
                backdrop.classList.remove("is-open");
            }
        });
    });
});
