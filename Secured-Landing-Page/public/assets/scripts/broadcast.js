
document.addEventListener("DOMContentLoaded", () => {
    // ------------------------------
    // Utilidad para cambiar de vista
    // ------------------------------
    const views = document.querySelectorAll(".view");

    function showView(id) {
        views.forEach((v) => {
            if (v.id === id) v.classList.add("active-view");
            else v.classList.remove("active-view");
        });
        window.scrollTo({ top: 0, behavior: "smooth" });
    }

    // Estado en memoria del broadcast
    const state = {
        title: "",
        message: "",
        priority: "Alta",
        zoneLabel: "Distrito Centro",
        destinatarios: 20,
    };

    // ------------------------------
    // 1) Centro de alertas
    // ------------------------------
    const btnNewBroadcast = document.getElementById("btnNewBroadcast");

    if (btnNewBroadcast) {
        btnNewBroadcast.addEventListener("click", () => {
            showView("view-new-broadcast-step1");
        });
    }

    // Clic en tarjeta principal abre detalle
    document
        .querySelectorAll("[data-broadcast-card]")
        .forEach((card) =>
            card.addEventListener("click", () => showView("view-broadcast-detail"))
        );

    // Botones que vuelven al centro de alertas
    document.querySelectorAll(".js-go-to-alert-center").forEach((btn) => {
        btn.addEventListener("click", () => {
            showView("view-alert-center");
        });
    });

    // ------------------------------
    // 2) Paso 1 – Detalle
    // ------------------------------
    const formNewBroadcast = document.getElementById("formNewBroadcast");
    const titleInput = document.getElementById("titleInput");
    const messageInput = document.getElementById("messageInput");
    const titleCount = document.getElementById("titleCount");
    const messageCount = document.getElementById("messageCount");

    function updateCounters() {
        if (titleInput && titleCount) {
            titleCount.textContent = `${titleInput.value.length}/60`;
        }
        if (messageInput && messageCount) {
            messageCount.textContent = `${messageInput.value.length}/300`;
        }
    }

    titleInput?.addEventListener("input", updateCounters);
    messageInput?.addEventListener("input", updateCounters);
    updateCounters();

    // radios de prioridad
    function getSelectedPriority() {
        const checked = document.querySelector(
            'input[name="priority"]:checked'
        );
        return checked ? checked.value : "";
    }

    formNewBroadcast?.addEventListener("submit", (e) => {
        e.preventDefault();

        const title = titleInput.value.trim();
        const message = messageInput.value.trim();
        const priority = getSelectedPriority();

        if (!title || !message || !priority) {
            alert("Completa título, mensaje y prioridad antes de continuar.");
            return;
        }

        state.title = title;
        state.message = message;
        state.priority = priority;

        // Actualizar resumen del paso 2
        const reachTitle = document.getElementById("reachSummaryTitle");
        const reachMessage = document.getElementById("reachSummaryMessage");
        if (reachTitle) reachTitle.textContent = state.title;
        if (reachMessage) reachMessage.textContent = state.message || "—";

        showView("view-new-broadcast-step2");
    });

    // Botones "Cancelar" desde paso 1
    document.querySelectorAll(".js-go-to-alert-center").forEach((btn) => {
        btn.addEventListener("click", () => showView("view-alert-center"));
    });

    // ------------------------------
    // 3) Paso 2 – Alcance y audiencia
    // ------------------------------
    const btnBackToStep1 = document.getElementById("btnBackToStep1");
    const btnToReview = document.getElementById("btnToReview");
    const selectedZoneLabel = document.getElementById("selectedZoneLabel");

    btnBackToStep1?.addEventListener("click", () =>
        showView("view-new-broadcast-step1")
    );

    // Control de zona
    document.querySelectorAll(".segmented-option").forEach((btn) => {
        btn.addEventListener("click", () => {
            document
                .querySelectorAll(".segmented-option")
                .forEach((b) => b.classList.remove("is-selected"));
            btn.classList.add("is-selected");

            const label = btn.getAttribute("data-zone-label") || "";
            state.zoneLabel = label || state.zoneLabel;

            if (selectedZoneLabel) selectedZoneLabel.textContent = state.zoneLabel;

            // Destinatarios de ejemplo según zona
            if (label === "Todos los distritos") state.destinatarios = 45;
            else if (label === "Sector Norte") state.destinatarios = 12;
            else state.destinatarios = 20;
        });
    });

    btnToReview?.addEventListener("click", () => {
        // Paso 3: rellenar datos
        const reviewTitle = document.getElementById("reviewTitle");
        const reviewMessage = document.getElementById("reviewMessage");
        const reviewZone = document.getElementById("reviewZone");
        const reviewDest = document.getElementById("reviewDestinatarios");
        const reviewPriorityChip = document.getElementById("reviewPriorityChip");

        if (reviewTitle) reviewTitle.textContent = state.title;
        if (reviewMessage) reviewMessage.textContent = state.message;
        if (reviewZone) reviewZone.textContent = state.zoneLabel;
        if (reviewDest)
            reviewDest.textContent = `${state.destinatarios} unidades`;

        if (reviewPriorityChip) {
            reviewPriorityChip.textContent = state.priority;
            reviewPriorityChip.classList.remove(
                "priority-alta",
                "priority-media",
                "priority-baja"
            );
            if (state.priority === "Alta")
                reviewPriorityChip.classList.add("priority-alta");
            else if (state.priority === "Media")
                reviewPriorityChip.classList.add("priority-media");
            else if (state.priority === "Baja")
                reviewPriorityChip.classList.add("priority-baja");
        }

        showView("view-new-broadcast-step3");
    });

    // ------------------------------
    // 4) Paso 3 – Revisión final
    // ------------------------------
    const btnReviewEdit = document.getElementById("btnReviewEdit");
    const btnSendNow = document.getElementById("btnSendNow");

    btnReviewEdit?.addEventListener("click", () => {
        // Rellenar inputs con lo que hay en state
        if (titleInput) titleInput.value = state.title;
        if (messageInput) messageInput.value = state.message;
        updateCounters();
        showView("view-new-broadcast-step1");
    });

    btnSendNow?.addEventListener("click", () => {
        // En un backend real, aquí iría el fetch().
        // Para demo, vamos directo al detalle usando state.

        const detailTitle = document.getElementById("detailTitle");
        const detailMessage = document.getElementById("detailMessage");
        const detailZone = document.getElementById("detailZone");
        const detailDest = document.getElementById("detailDestinatarios");

        if (detailTitle) detailTitle.textContent = state.title;
        if (detailMessage) detailMessage.textContent = state.message;
        if (detailZone) detailZone.textContent = state.zoneLabel;
        if (detailDest)
            detailDest.textContent = `${state.destinatarios} unidades`;

        showView("view-broadcast-detail");
    });

    // ------------------------------
    // 5) Detalle de broadcast
    // ------------------------------
    const btnDuplicateBroadcast = document.getElementById(
        "btnDuplicateBroadcast"
    );
    const btnDeleteBroadcast = document.getElementById("btnDeleteBroadcast");
    const btnExportLog = document.getElementById("btnExportLog");
    const btnShowDeliveryTracking = document.getElementById(
        "btnShowDeliveryTracking"
    );
    const btnBackToDetail = document.getElementById("btnBackToDetail");
    const detailDeletedMessage = document.getElementById(
        "detailDeletedMessage"
    );
    const detailCard = document.getElementById("detailCard");

    btnDuplicateBroadcast?.addEventListener("click", () => {
        alert(
            "Se ha creado un borrador duplicado del broadcast (simulado en esta demo)."
        );
    });

    btnExportLog?.addEventListener("click", () => {
        alert("Aquí se exportaría el registro a un archivo (simulado).");
    });

    btnDeleteBroadcast?.addEventListener("click", () => {
        const confirmed = confirm(
            "¿Seguro que deseas eliminar este broadcast? Esta acción no se puede deshacer."
        );
        if (!confirmed) return;

        if (detailDeletedMessage) {
            detailDeletedMessage.textContent =
                "Este broadcast ha sido eliminado. Ya no se enviarán reintentos.";
        }
        if (detailCard) {
            detailCard.style.opacity = "0.65";
        }
    });

    btnShowDeliveryTracking?.addEventListener("click", () => {
        showView("view-delivery-tracking");
    });

    btnBackToDetail?.addEventListener("click", () => {
        showView("view-broadcast-detail");
    });

    // ------------------------------
    // 6) Seguimiento de entrega
    // ------------------------------
    const tabs = document.querySelectorAll(".tab");
    const recipientCards = document.querySelectorAll(".recipient-card");

    function filterRecipients(filter) {
        recipientCards.forEach((card) => {
            const statusEl = card.querySelector(".recipient-status");
            if (!statusEl) return;
            const isPending = statusEl.classList.contains(
                "recipient-status-pending"
            );

            if (filter === "all") {
                card.style.display = "";
            } else if (filter === "pending") {
                card.style.display = isPending ? "" : "none";
            }
        });
    }

    if (tabs.length >= 2) {
        const [tabAll, tabPending] = tabs;

        tabAll.addEventListener("click", () => {
            tabs.forEach((t) => t.classList.remove("active"));
            tabAll.classList.add("active");
            filterRecipients("all");
        });

        tabPending.addEventListener("click", () => {
            tabs.forEach((t) => t.classList.remove("active"));
            tabPending.classList.add("active");
            filterRecipients("pending");
        });
    }

    // Vista inicial
    showView("view-alert-center");
});
