

document.addEventListener("DOMContentLoaded", () => {
    // ---------- Helpers de vistas ----------
    const views = document.querySelectorAll(".wh-view");

    const setView = (id) => {
        views.forEach((view) => {
            view.classList.toggle("wh-view-active", view.id === id);
        });
        window.scrollTo({ top: 0, behavior: "instant" });
    };


    const detalleButtons = document.querySelectorAll(
        '[data-action="ver-detalle"][data-subscriber="municipal"]'
    );

    detalleButtons.forEach((btn) => {
        btn.addEventListener("click", () => {
            setView("view-webhooks-detail");
        });
    });


    const backFromDetail = document.getElementById("whBackFromDetail");
    if (backFromDetail) {
        backFromDetail.addEventListener("click", () => {
            setView("view-webhooks-list");
        });
    }


    const tabButtons = document.querySelectorAll(".wh-tab");
    const tabPanels = document.querySelectorAll(".wh-tab-panel");

    tabButtons.forEach((btn) => {
        btn.addEventListener("click", () => {
            const target = btn.dataset.tab;

            tabButtons.forEach((b) =>
                b.classList.toggle("wh-tab-active", b === btn)
            );

            tabPanels.forEach((panel) => {
                const panelName = panel.dataset.tabPanel;
                panel.classList.toggle(
                    "wh-tab-panel-active",
                    panelName === target
                );
            });
        });
    });


    const editBtn = document.getElementById("whOpenEdit");
    const modal = document.getElementById("whEditModal");
    const closeBtn = document.getElementById("whCloseEdit");
    const cancelBtn = document.getElementById("whCancelEdit");
    const form = document.getElementById("whEditForm");
    const backdrop = modal ? modal.querySelector(".wh-modal-backdrop") : null;

    const openModal = () => {
        if (!modal) return;
        modal.classList.add("wh-modal-open");
        modal.setAttribute("aria-hidden", "false");
    };

    const closeModal = () => {
        if (!modal) return;
        modal.classList.remove("wh-modal-open");
        modal.setAttribute("aria-hidden", "true");
    };

    if (editBtn) editBtn.addEventListener("click", openModal);
    if (closeBtn) closeBtn.addEventListener("click", closeModal);
    if (cancelBtn) cancelBtn.addEventListener("click", closeModal);
    if (backdrop) backdrop.addEventListener("click", closeModal);

    if (form) {
        form.addEventListener("submit", (event) => {
            event.preventDefault();
            // Aquí podrías actualizar el texto si quieres usar los valores del form.
            closeModal();
            // Después de guardar, regresamos al listado principal como pediste.
            setView("view-webhooks-list");
        });
    }
});
