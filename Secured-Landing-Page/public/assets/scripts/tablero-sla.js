
(function () {
    const views = document.querySelectorAll(".sla-view");

    const boardViewId = "view-sla-board";
    const incidentViewId = "view-sla-incident";
    const pauseViewId = "view-pause-sla";

    let currentIncident = {
        id: "INC-2025-082",
        title: "Robo en progreso",
        priority: "Alta",
    };

    let slaIsPaused = false;

    const incidentIdLabel = document.getElementById("slaIncidentIdLabel");
    const pauseIncidentId = document.getElementById("pauseIncidentId");
    const pausedBadge = document.getElementById("slaPausedBadge");

    const slaControlLabel = document.getElementById("slaControlLabel");
    const slaControlHelper = document.getElementById("slaControlHelper");
    const btnSlaControl = document.getElementById("btnSlaControl");

    const pauseViewTitle = document.getElementById("pauseViewTitle");
    const pauseCtaLabel = document.getElementById("pauseCtaLabel");
    const pauseForm = document.getElementById("pauseForm");

    // -----------------------------
    // Helpers
    // -----------------------------
    function showView(targetId) {
        views.forEach((view) => {
            view.classList.toggle("sla-view-active", view.id === targetId);
        });
    }

    function renderIncidentHeader() {
        if (incidentIdLabel) {
            incidentIdLabel.textContent = currentIncident.id;
        }
        if (pauseIncidentId) {
            pauseIncidentId.textContent = currentIncident.id;
        }
    }

    function renderSlaState() {
        if (!slaControlLabel || !slaControlHelper || !pausedBadge) return;

        if (slaIsPaused) {
            slaControlLabel.textContent = "Reanudar SLA";
            slaControlHelper.textContent = "Reanudar cronómetro";
            pausedBadge.hidden = false;
        } else {
            slaControlLabel.textContent = "Pausar SLA";
            slaControlHelper.textContent = "Con motivo justificado";
            pausedBadge.hidden = true;
        }
    }

    function openIncidentFromCard(card) {
        currentIncident.id = card.dataset.incidentId || currentIncident.id;
        currentIncident.title = card.dataset.incidentTitle || currentIncident.title;
        currentIncident.priority =
            card.dataset.incidentPriority || currentIncident.priority;

        slaIsPaused = false;
        renderIncidentHeader();
        renderSlaState();
        showView(incidentViewId);
    }

    function openPauseView() {
        renderIncidentHeader();

        if (slaIsPaused) {
            pauseViewTitle.textContent = "Reanudar SLA";
            pauseCtaLabel.textContent = "Reanudar cronómetro";
        } else {
            pauseViewTitle.textContent = "Pausar SLA";
            pauseCtaLabel.textContent = "Pausar cronómetro";
        }

        showView(pauseViewId);
    }

    // -----------------------------
    // Tablero: clic en incidente
    // -----------------------------
    const incidentCards = document.querySelectorAll(".sla-incident-card");
    incidentCards.forEach((card) => {
        card.addEventListener("click", () => openIncidentFromCard(card));
    });

    // -----------------------------
    // Botón Pausar / Reanudar SLA
    // -----------------------------
    if (btnSlaControl) {
        btnSlaControl.addEventListener("click", () => {
            openPauseView();
        });
    }

    // -----------------------------
    // Enviar formulario de pausa
    // -----------------------------
    if (pauseForm) {
        pauseForm.addEventListener("submit", (event) => {
            event.preventDefault();

            // Simple: alternamos el estado pausado / reanudado
            slaIsPaused = !slaIsPaused;
            renderSlaState();

            // Volvemos a la vista de SLA del incidente
            showView(incidentViewId);
        });
    }

    // -----------------------------
    // Back a Tablero desde SLA y Pausa
    // -----------------------------
    const backToBoardButtons = document.querySelectorAll(".js-back-to-board");
    backToBoardButtons.forEach((btn) => {
        btn.addEventListener("click", () => {
            showView(boardViewId);
        });
    });

    // -----------------------------
    // Filtros rápidos (Todos / Por vencer / Vencidos)
    // -----------------------------
    const filterButtons = document.querySelectorAll(".filter-pill");

    function applyFilter(status) {
        incidentCards.forEach((card) => {
            const cardStatus = card.dataset.slaStatus || "en-tiempo";

            if (status === "todos") {
                card.style.display = "";
            } else {
                card.style.display = cardStatus === status ? "" : "none";
            }
        });
    }

    filterButtons.forEach((btn) => {
        btn.addEventListener("click", () => {
            filterButtons.forEach((b) => b.classList.remove("is-active"));
            btn.classList.add("is-active");

            const filter = btn.dataset.filter || "todos";
            applyFilter(filter);
        });
    });

    // Estado inicial
    renderIncidentHeader();
    renderSlaState();
    applyFilter("todos");
})();
