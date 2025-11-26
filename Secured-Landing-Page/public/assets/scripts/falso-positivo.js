// =======================================
// FALSO POSITIVO – LÓGICA DE VISTAS
// =======================================

(function () {
    const views = document.querySelectorAll(".fp-view");

    function setView(id) {
        views.forEach((v) => {
            if (v.dataset.view === id) {
                v.classList.add("fp-view-active");
            } else {
                v.classList.remove("fp-view-active");
            }
        });
        window.scrollTo({ top: 0, behavior: "instant" });
    }

    // Navegación simple por data-goto
    document.querySelectorAll("[data-goto]").forEach((el) => {
        el.addEventListener("click", () => {
            const target = el.dataset.goto;
            if (!target) return;
            setView(target);
        });
    });

    // Selección de motivo
    const reasonButtons = document.querySelectorAll(".fp-reason-row");
    const resumenMotivo = document.getElementById("fpResumenMotivo");
    const historyMotivo = document.getElementById("fpHistoryMotivo");
    let selectedReasonText = "Reporte duplicado confirmado";

    reasonButtons.forEach((btn) => {
        btn.addEventListener("click", () => {
            reasonButtons.forEach((b) =>
                b.classList.remove("fp-reason-selected")
            );
            btn.classList.add("fp-reason-selected");
            selectedReasonText = btn.textContent.trim();
        });
    });

    // Form "Confirmar como falso positivo"
    const markForm = document.getElementById("fpMarkForm");
    if (markForm) {
        markForm.addEventListener("submit", (e) => {
            e.preventDefault();

            if (!selectedReasonText && reasonButtons.length) {
                selectedReasonText = reasonButtons[0].textContent.trim();
            }

            if (resumenMotivo) resumenMotivo.textContent = selectedReasonText;
            if (historyMotivo) historyMotivo.textContent = selectedReasonText;

            setView("resumen");
        });
    }

    // Modal de revertir
    const modal = document.getElementById("fpRevertModal");
    const btnOpenModal = document.getElementById("fpRevertBtn");
    const btnModalCancel = document.getElementById("fpModalCancel");
    const btnModalConfirm = document.getElementById("fpModalConfirm");
    const revertTextarea = document.getElementById("fpRevertReason");

    function openModal() {
        if (!modal) return;
        modal.classList.remove("fp-modal-hidden");
        revertTextarea && (revertTextarea.value = "");
    }

    function closeModal() {
        if (!modal) return;
        modal.classList.add("fp-modal-hidden");
    }

    if (btnOpenModal) {
        btnOpenModal.addEventListener("click", openModal);
    }

    if (btnModalCancel) {
        btnModalCancel.addEventListener("click", closeModal);
    }

    if (btnModalConfirm) {
        btnModalConfirm.addEventListener("click", () => {
            // Aquí podrías enviar el motivo al backend en una app real
            closeModal();
            setView("detalle");
        });
    }
})();
