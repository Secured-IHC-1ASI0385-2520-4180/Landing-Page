document.addEventListener("DOMContentLoaded", () => {
    const filterButtons = document.querySelectorAll(".tas-filter-btn");
    const cards = document.querySelectorAll(".tas-card");
    const pendingCountEl = document.getElementById("tasPendingCount");
    const viewPendingsBtn = document.getElementById("tasViewPendingsBtn");

    // --- Utilidades ---

    function isPendingStatus(status) {
        // Todo lo que NO es "recibido" se considera pendiente
        return status !== "recibido";
    }

    function updatePendingCount() {
        const pendientes = Array.from(cards).filter(card =>
            isPendingStatus(card.dataset.status)
        ).length;

        if (pendingCountEl) {
            pendingCountEl.textContent = pendientes;
        }
    }

    function clearFilterActiveState() {
        filterButtons.forEach(btn =>
            btn.classList.remove("tas-filter-btn-active")
        );
    }

    function applyFilter(filterName) {
        cards.forEach(card => {
            const status = card.dataset.status;

            let show = true;

            if (filterName === "esperando") {
                show = status === "esperando";
            } else if (filterName === "recordatorio") {
                show = status === "recordatorio";
            } else if (filterName === "recibido") {
                show = status === "recibido";
            } else {
                // "todas"
                show = true;
            }

            card.classList.toggle("tas-card-hidden", !show);
        });
    }

    function showOnlyPendings() {
        clearFilterActiveState(); // ninguna pestaña seleccionada

        cards.forEach(card => {
            const status = card.dataset.status;
            const show = isPendingStatus(status);
            card.classList.toggle("tas-card-hidden", !show);
        });
    }

    // --- Eventos ---

    // Filtros por estado
    filterButtons.forEach(btn => {
        btn.addEventListener("click", () => {
            const filter = btn.dataset.filter;

            clearFilterActiveState();
            btn.classList.add("tas-filter-btn-active");

            applyFilter(filter);
        });
    });

    // Botón "Ver pendientes"
    if (viewPendingsBtn) {
        viewPendingsBtn.addEventListener("click", () => {
            showOnlyPendings();
        });
    }

    // Inicializar contador
    updatePendingCount();
});
