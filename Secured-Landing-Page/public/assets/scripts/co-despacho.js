document.addEventListener("DOMContentLoaded", () => {
    const views = document.querySelectorAll(".cd-view");

    const state = {
        currentRole: "primaria",
        primary: null,
        support: [],
    };

    const selectors = {
        primariaStatus: document.getElementById("cd-primaria-status"),
        apoyoStatus: document.getElementById("cd-apoyo-status"),
        selectedList: document.getElementById("cd-selected-list"),
        continueBtn: document.getElementById("cd-continue-btn"),
        confirmPrimaria: document.getElementById("cd-confirm-primaria"),
        confirmApoyos: document.getElementById("cd-confirm-apoyos"),
        confirmTotal: document.getElementById("cd-confirm-total"),
    };

    const cancelBtn = document.getElementById("cd-cancel-dispatch");
    const cancelMessage = document.getElementById("cd-cancel-message");

    /* Utilidades */

    function showView(name) {
        views.forEach((v) => {
            v.classList.toggle("cd-view-active", v.dataset.view === name);
        });

        // Cada vez que entro a confirmación oculto el mensaje de anulado
        if (name === "confirmacion" && cancelMessage) {
            cancelMessage.hidden = true;
        }
    }

    function getUnitData(unitId) {
        const card = document.querySelector(
            `.cd-unit-card[data-unit-id="${unitId}"]`
        );
        if (!card) return null;
        return {
            id: unitId,
            label: card.dataset.unitLabel || unitId,
            eta: card.dataset.eta || "",
        };
    }

    function setCurrentRole(role) {
        state.currentRole = role === "apoyo" ? "apoyo" : "primaria";

        // Tabs
        document.querySelectorAll(".cd-role-tab").forEach((btn) => {
            const r = btn.dataset.roleSwitch;
            btn.classList.toggle("cd-role-tab-active", r === state.currentRole);
        });
    }

    function renderSelection() {
        const { primary, support } = state;

        // Header status
        const primaryData = primary ? getUnitData(primary) : null;
        selectors.primariaStatus.textContent = primaryData
            ? `@ ${primaryData.label}`
            : "Requerido";

        selectors.apoyoStatus.textContent =
            support.length === 1
                ? "1 seleccionado"
                : `${support.length} seleccionados`;

        // Lista seleccionados
        const container = selectors.selectedList;
        container.innerHTML = "";

        if (!primary && support.length === 0) {
            const p = document.createElement("p");
            p.className = "cd-muted";
            p.textContent =
                "Aún no has seleccionado unidades. Elige una unidad primaria para continuar.";
            container.appendChild(p);
        } else {
            if (primaryData) {
                const item = document.createElement("div");
                item.className = "cd-selected-item cd-selected-primary";

                const main = document.createElement("div");
                main.className = "cd-selected-main";
                const label = document.createElement("div");
                label.className = "cd-selected-label";
                label.textContent = `Primaria · ${primaryData.label}`;
                const meta = document.createElement("div");
                meta.className = "cd-selected-meta";
                meta.textContent = `ETA ${primaryData.eta}`;

                main.appendChild(label);
                main.appendChild(meta);

                const actions = document.createElement("div");
                actions.className = "cd-selected-actions";
                const btnCambiar = document.createElement("button");
                btnCambiar.type = "button";
                btnCambiar.className = "cd-selected-btn";
                btnCambiar.textContent = "Cambiar";
                btnCambiar.addEventListener("click", () => {
                    setCurrentRole("primaria");
                });
                actions.appendChild(btnCambiar);

                item.appendChild(main);
                item.appendChild(actions);
                container.appendChild(item);
            }

            support.forEach((id) => {
                const data = getUnitData(id);
                if (!data) return;

                const item = document.createElement("div");
                item.className = "cd-selected-item cd-selected-support";

                const main = document.createElement("div");
                main.className = "cd-selected-main";
                const label = document.createElement("div");
                label.className = "cd-selected-label";
                label.textContent = `Apoyo · ${data.label}`;
                const meta = document.createElement("div");
                meta.className = "cd-selected-meta";
                meta.textContent = `ETA ${data.eta}`;
                main.appendChild(label);
                main.appendChild(meta);

                const actions = document.createElement("div");
                actions.className = "cd-selected-actions";
                const btnQuitar = document.createElement("button");
                btnQuitar.type = "button";
                btnQuitar.className = "cd-selected-btn";
                btnQuitar.textContent = "Quitar";
                btnQuitar.addEventListener("click", () => {
                    state.support = state.support.filter((u) => u !== id);
                    renderSelection();
                });
                actions.appendChild(btnQuitar);

                item.appendChild(main);
                item.appendChild(actions);
                container.appendChild(item);
            });
        }

        // Ocultar candidatos ya seleccionados
        document.querySelectorAll(".cd-unit-card").forEach((card) => {
            const id = card.dataset.unitId;
            const selected = id === primary || support.some((u) => u === id);
            card.classList.toggle("cd-unit-card-hidden", selected);
        });

        // Botón continuar
        const total = (primary ? 1 : 0) + support.length;
        selectors.continueBtn.textContent =
            total === 1
                ? "Continuar (1 unidad)"
                : `Continuar (${total} unidades)`;

        const canContinue = !!primary;
        selectors.continueBtn.disabled = !canContinue;
        selectors.continueBtn.classList.toggle("cd-btn-disabled", !canContinue);
    }

    function addUnit(unitId) {
        if (!unitId) return;

        if (state.currentRole === "primaria") {
            state.primary = unitId;
            // Si estaba como apoyo, lo quitamos
            state.support = state.support.filter((u) => u !== unitId);
        } else {
            if (state.primary === unitId) return;
            if (!state.support.includes(unitId)) {
                state.support.push(unitId);
            }
        }
        renderSelection();
    }

    function resetState() {
        state.currentRole = "primaria";
        state.primary = null;
        state.support = [];
        setCurrentRole("primaria");
        renderSelection();
    }

    /* Navegación por data-goto */

    document.querySelectorAll("[data-goto]").forEach((el) => {
        el.addEventListener("click", (ev) => {
            ev.preventDefault();
            const viewName = el.dataset.goto;
            const role = el.dataset.role;
            if (role) {
                setCurrentRole(role);
            }
            if (viewName) {
                showView(viewName);
            }
        });
    });

    /* Switch de rol en selección */

    document.querySelectorAll("[data-role-switch]").forEach((btn) => {
        btn.addEventListener("click", () => {
            const role = btn.dataset.roleSwitch;
            setCurrentRole(role);
        });
    });

    /* Agregar unidades desde candidatos */

    document.querySelectorAll(".cd-unit-add").forEach((btn) => {
        btn.addEventListener("click", () => {
            const card = btn.closest(".cd-unit-card");
            if (!card) return;
            const id = card.dataset.unitId;
            addUnit(id);
        });
    });

    /* Continuar -> confirmación */

    selectors.continueBtn.addEventListener("click", () => {
        if (!state.primary) return;

        const primaryData = getUnitData(state.primary);
        const apoyoLabels = state.support
            .map((id) => getUnitData(id))
            .filter(Boolean)
            .map((u) => u.label);

        selectors.confirmPrimaria.textContent = primaryData
            ? primaryData.label
            : "—";
        selectors.confirmApoyos.textContent =
            apoyoLabels.length > 0 ? apoyoLabels.join(", ") : "Ninguna";

        const total = (state.primary ? 1 : 0) + state.support.length;
        selectors.confirmTotal.textContent = String(total);

        showView("confirmacion");
    });

    /* Botón "Anular co-despacho" */

    if (cancelBtn && cancelMessage) {
        cancelBtn.addEventListener("click", () => {
            cancelMessage.hidden = false;
            resetState();
            // Pequeño delay para que se vea el mensaje en pantalla
            setTimeout(() => {
                showView("inicio");
            }, 800);
        });
    }

    /* Estado inicial */

    setCurrentRole("primaria");
    renderSelection();
    showView("inicio");
});
