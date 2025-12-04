document.addEventListener("DOMContentLoaded", () => {
    const views = document.querySelectorAll(".rt-view");

    function showView(name) {
        views.forEach((view) => {
            const isActive = view.dataset.view === name;
            view.classList.toggle("rt-view-active", isActive);
        });

        // volver al inicio de la página en cada cambio de vista
        window.scrollTo({ top: 0, behavior: "auto" });
    }

    // Navegación genérica con data-rt-go
    document.querySelectorAll("[data-rt-go]").forEach((el) => {
        el.addEventListener("click", (ev) => {
            ev.preventDefault();
            const target = el.getAttribute("data-rt-go");
            if (target) showView(target);
        });
    });

    /* ====== Simulación checklist ====== */
    const checklistView = document.querySelector('[data-view="checklist"]');
    if (checklistView) {
        const items = checklistView.querySelectorAll("[data-rt-check-item]");
        let checked = 0;

        items.forEach((item) => {
            item.addEventListener("click", () => {
                if (item.classList.contains("rt-check-item-checked")) return;

                item.classList.add("rt-check-item-checked");
                checked++;

                // cuando se marcan todos los ítems mostramos la pantalla de checklist completo
                if (checked >= items.length) {
                    showView("checklist-ok");
                }
            });
        });
    }

    /* ====== Simulación evidencias ====== */
    const evidenciasView = document.querySelector('[data-view="evidencias"]');
    if (evidenciasView) {
        const slots = evidenciasView.querySelectorAll("[data-rt-photo-slot]");
        let selected = 0;

        slots.forEach((slot) => {
            slot.addEventListener("click", () => {
                if (slot.classList.contains("rt-photo-selected")) return;

                slot.classList.add("rt-photo-selected");
                selected++;

                if (selected >= slots.length) {
                    showView("evidencias-ok");
                }
            });
        });
    }

    /* ====== Simulación firmas ====== */
    const firmasView = document.querySelector('[data-view="firmas"]');
    if (firmasView) {
        const confirmButtons = firmasView.querySelectorAll(
            "[data-rt-firma-confirm]"
        );
        let confirmed = 0;

        confirmButtons.forEach((btn) => {
            btn.addEventListener("click", () => {
                if (btn.dataset.rtConfirmed === "true") return;

                btn.dataset.rtConfirmed = "true";
                confirmed++;

                // feedback rápido cambiando el texto del botón
                btn.textContent = "Confirmado";

                if (confirmed >= confirmButtons.length) {
                    showView("firmas-ok");
                }
            });
        });
    }
});
