
document.addEventListener("DOMContentLoaded", () => {
    // ----- Cambio de vistas (Pendientes / En revisión / Todos) -----
    const viewButtons = document.querySelectorAll("[data-mr-view-btn]");
    const views = document.querySelectorAll(".mr-view");
    const reportCountLabel = document.getElementById("mrReportCount");
    const pendingBadge = document.getElementById("mrPendingBadge");

    const countsByView = {
        pendientes: { total: 2, pendientes: 2 },
        revision: { total: 1, pendientes: 1 },
        todos: { total: 3, pendientes: 2 },
    };

    function switchView(target) {
        views.forEach((view) => {
            const isActive = view.dataset.view === target;
            view.classList.toggle("mr-view-active", isActive);
        });

        viewButtons.forEach((btn) => {
            btn.classList.toggle(
                "is-active",
                btn.dataset.mrViewBtn === target
            );
        });

        const info = countsByView[target];
        if (info && reportCountLabel && pendingBadge) {
            reportCountLabel.textContent = info.total;
            pendingBadge.textContent = info.pendientes;
        }
    }

    viewButtons.forEach((btn) => {
        btn.addEventListener("click", () => {
            const target = btn.dataset.mrViewBtn;
            if (target) {
                switchView(target);
            }
        });
    });

    // Vista inicial
    switchView("pendientes");

    // ----- Modal de rechazo -----
    const rejectModal = document.getElementById("mrRejectModal");
    const rejectReason = document.getElementById("mrRejectReason");
    const rejectSubmit = document.getElementById("mrRejectSubmit");

    function openRejectModal() {
        if (!rejectModal) return;
        rejectModal.classList.add("is-visible");
        if (rejectReason) {
            rejectReason.value = "";
            rejectReason.classList.remove("mr-textarea-error");
            // pequeño delay para poder enfocar
            setTimeout(() => rejectReason.focus(), 80);
        }
    }

    function closeRejectModal() {
        if (!rejectModal) return;
        rejectModal.classList.remove("is-visible");
    }

    // Botones que abren la "pantalla" de rechazar reporte
    document.querySelectorAll("[data-mr-open-reject]").forEach((btn) => {
        btn.addEventListener("click", openRejectModal);
    });

    // Botones que cierran sin enviar
    document.querySelectorAll("[data-mr-close-reject]").forEach((btn) => {
        btn.addEventListener("click", closeRejectModal);
    });

    // Enviar motivo de rechazo
    if (rejectSubmit && rejectReason) {
        rejectSubmit.addEventListener("click", () => {
            const text = rejectReason.value.trim();

            if (!text) {
                rejectReason.classList.add("mr-textarea-error");
                rejectReason.focus();
                return;
            }

            // Aquí podrías enviar el motivo al servidor.
            // Por ahora solo simulamos con un alert.
            alert("Motivo enviado. El reporte ha sido rechazado.");

            closeRejectModal();
        });

        rejectReason.addEventListener("input", () => {
            rejectReason.classList.remove("mr-textarea-error");
        });
    }

    // Cerrar modal si se hace click en el fondo oscuro
    if (rejectModal) {
        rejectModal.addEventListener("click", (ev) => {
            if (ev.target === rejectModal) {
                closeRejectModal();
            }
        });
    }
});
