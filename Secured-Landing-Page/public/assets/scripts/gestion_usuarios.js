// Gestión de usuarios
(function () {

    const screens = {
        users: document.getElementById("screen-users"),
        approvals: document.getElementById("screen-approvals"),
        log: document.getElementById("screen-log"),
        newUser: document.getElementById("screen-new-user"),
    };

    function showScreen(name) {
        Object.values(screens).forEach((sc) =>
            sc.classList.remove("gu-screen--active")
        );
        if (screens[name]) screens[name].classList.add("gu-screen--active");
    }


    const usersCards = document.querySelectorAll("#screen-users .gu-card");
    const usersCountLabel = document.getElementById("guUsersCount");

    const btnNewUser = document.getElementById("guNewUserBtn");
    const btnApprovals = document.getElementById("guApprovalsBtn");
    const btnLog = document.getElementById("guLogBtn");
    const btnFilters = document.getElementById("guFiltersBtn");
    const btnExport = document.getElementById("guExportBtn");

    function updateUsersCount() {
        const total = usersCards.length;
        usersCountLabel.textContent =
            total + (total === 1 ? " usuario" : " usuarios");
    }

    usersCards.forEach((card) => {
        card.querySelectorAll(".gu-icon-btn").forEach((btn) => {
            btn.addEventListener("click", (ev) => {
                ev.stopPropagation();
                const action = btn.dataset.action;

                if (action === "view") {
                    alert(
                        "Aquí iría la pantalla o modal con el detalle del usuario (según tu flujo)."
                    );
                } else if (action === "edit") {
                    alert("Aquí iría la pantalla de edición del usuario.");
                } else if (action === "resend") {
                    alert("Simulación: se reenvía la invitación por correo.");
                } else if (action === "block") {
                    alert("Simulación: usuario bloqueado.");
                } else if (action === "unlock") {
                    alert("Simulación: usuario desbloqueado.");
                }
            });
        });
    });

    btnNewUser.addEventListener("click", () => {
        showScreen("newUser");
    });

    btnApprovals.addEventListener("click", () => {
        showScreen("approvals");
        setElevTabs("pendientes"); // inicia en Pendientes como en la maqueta
    });

    btnLog.addEventListener("click", () => {
        showScreen("log");
        setLogFilter("todos");
    });

    btnFilters.addEventListener("click", () => {
        alert(
            "Aquí puedes abrir un panel de filtros (por rol, estado, entidad, etc.) según el diseño que tengas en Figma."
        );
    });

    btnExport.addEventListener("click", () => {
        alert("Exportar usuarios (CSV/Excel) – lógica pendiente.");
    });

    const backToMainFromUsers = document.getElementById("backToMainFromUsers");
    if (backToMainFromUsers) {
        backToMainFromUsers.addEventListener("click", () => {
            // si el archivo está en otra ruta, ajusta el path
            window.location.href = "variaciones-varias.html";
        });
    }

    updateUsersCount();


    const elevTabs = document.querySelectorAll(".elv-tab");
    const elevCards = document.querySelectorAll(".elv-card");
    const elevEmpty = document.getElementById("elvEmptyMessage");
    const elevCountLabel = document.getElementById("elevCount");
    const juanCard = document.getElementById("elvCardJuan");

    function setElevTabs(filter) {
        elevTabs.forEach((tab) => {
            tab.classList.toggle("elv-tab--active", tab.dataset.filter === filter);
        });

        let visible = 0;

        elevCards.forEach((card) => {
            const status = card.dataset.status;
            const isJuan = card === juanCard;

            let show = false;

            if (filter === "todas") {
                show = status === "pendiente" || isJuan;
            } else if (filter === "pendientes") {
                show = status === "pendiente" || isJuan;
            } else if (filter === "aprobadas") {
                show = status === "aprobada";
            } else if (filter === "rechazadas") {
                show = status === "rechazada";
            }

            card.style.display = show ? "" : "none";
            if (show) visible++;

            const pendingFooter = card.querySelector(".elv-footer--pending");
            const approvedFooter = card.querySelector(".elv-footer--approved");

            if (filter === "aprobadas" && status === "aprobada") {
                if (pendingFooter) pendingFooter.style.display = "none";
                if (approvedFooter) approvedFooter.style.display = "flex";
            } else if ((filter === "todas" || filter === "pendientes") && isJuan) {
                if (pendingFooter) pendingFooter.style.display = "flex";
                if (approvedFooter) approvedFooter.style.display = "none";
            } else {
                if (pendingFooter) pendingFooter.style.display = "flex";
                if (approvedFooter) approvedFooter.style.display = "none";
            }
        });

        if (filter === "rechazadas") {
            elevEmpty.style.display = visible === 0 ? "block" : "none";
        } else {
            elevEmpty.style.display = "none";
        }

        elevCountLabel.textContent =
            visible + (visible === 1 ? " solicitud" : " solicitudes");
    }

    elevTabs.forEach((tab) => {
        tab.addEventListener("click", () => {
            setElevTabs(tab.dataset.filter);
        });
    });

    elevCards.forEach((card) => {
        card.querySelectorAll(".elv-btn").forEach((btn) => {
            btn.addEventListener("click", () => {
                const action = btn.dataset.action;
                if (action === "aprobar") {
                    alert("Simulación: solicitud aprobada.");
                } else if (action === "rechazar") {
                    alert("Simulación: solicitud rechazada.");
                }
            });
        });
    });

    const backFromApprovals = document.getElementById("backFromApprovals");
    backFromApprovals.addEventListener("click", () => {
        showScreen("users");
    });

    setElevTabs("pendientes");


    const logTabs = document.querySelectorAll(".log-tab");
    const logCards = document.querySelectorAll(".log-card");
    const logEmpty = document.getElementById("logEmptyMessage");
    const logCountLabel = document.getElementById("logCount");
    const logSearchInput = document.getElementById("logSearchInput");

    function setLogFilter(filter) {
        logTabs.forEach((tab) => {
            tab.classList.toggle(
                "log-tab--active",
                tab.dataset.logFilter === filter
            );
        });

        const searchText = (logSearchInput.value || "").toLowerCase();
        let visible = 0;

        logCards.forEach((card) => {
            const cat = card.dataset.category;
            const text = card.textContent.toLowerCase();
            const isUnlock =
                card.dataset.logType && card.dataset.logType === "desbloqueo";

            const matchesFilter =
                filter === "todos" ? true : cat === filter;

            const hideUnlockOnBloqueos =
                filter === "bloqueos" && isUnlock;

            const matchesSearch = !searchText || text.includes(searchText);

            const show = matchesFilter && !hideUnlockOnBloqueos && matchesSearch;
            card.style.display = show ? "" : "none";
            if (show) visible++;
        });

        logEmpty.style.display = visible === 0 ? "block" : "none";

        logCountLabel.textContent =
            visible + (visible === 1 ? " evento" : " eventos");
    }

    logTabs.forEach((tab) => {
        tab.addEventListener("click", () => {
            setLogFilter(tab.dataset.logFilter);
        });
    });

    logSearchInput.addEventListener("input", () => {
        const activeTab = document.querySelector(".log-tab--active");
        const filter = activeTab ? activeTab.dataset.logFilter : "todos";
        setLogFilter(filter);
    });

    const backFromLog = document.getElementById("backFromLog");
    backFromLog.addEventListener("click", () => {
        showScreen("users");
    });

    const logExportBtn = document.getElementById("logExportBtn");
    logExportBtn.addEventListener("click", () => {
        alert("Exportar bitácora – aquí iría tu lógica real.");
    });

    setLogFilter("todos");


    const nuForm = document.getElementById("newUserForm");
    const nuName = document.getElementById("nuName");
    const nuEmail = document.getElementById("nuEmail");
    const nuDni = document.getElementById("nuDni");
    const nuSubmitBtn = document.getElementById("nuSubmitBtn");
    const nuCancelBtn = document.getElementById("nuCancelBtn");
    const nuRoleCards = document.querySelectorAll(".nu-role-card");
    const nuSectorCards = document.querySelectorAll(".nu-sector-card");
    const nuSelectedSectors = document.getElementById("nuSelectedSectors");
    const nuSelectedCount = document.getElementById("nuSelectedCount");
    const backFromNewUser = document.getElementById("backFromNewUser");

    let selectedRole = null;
    const selectedSectors = new Set();

    function updateRoleSelection(role) {
        selectedRole = role;
        nuRoleCards.forEach((card) => {
            card.classList.toggle(
                "nu-role-card--active",
                card.dataset.role === role
            );
        });
        validateNewUserForm();
    }

    function renderSelectedSectors() {
        nuSelectedSectors.innerHTML = "";
        selectedSectors.forEach((name) => {
            const tag = document.createElement("span");
            tag.className = "nu-tag";
            tag.innerHTML =
                name +
                ' <span class="nu-tag-remove" data-sector="' +
                name +
                '">✕</span>';
            nuSelectedSectors.appendChild(tag);
        });

        nuSelectedCount.textContent =
            selectedSectors.size +
            (selectedSectors.size === 1
                ? " sector seleccionado"
                : " sectores seleccionados");

        nuSelectedSectors
            .querySelectorAll(".nu-tag-remove")
            .forEach((btn) => {
                btn.addEventListener("click", () => {
                    const sector = btn.dataset.sector;
                    selectedSectors.delete(sector);
                    nuSectorCards.forEach((card) => {
                        if (card.dataset.sector === sector) {
                            card.classList.remove("nu-sector-card--active");
                        }
                    });
                    renderSelectedSectors();
                    validateNewUserForm();
                });
            });
    }

    function toggleSector(card) {
        const sector = card.dataset.sector;
        if (selectedSectors.has(sector)) {
            selectedSectors.delete(sector);
            card.classList.remove("nu-sector-card--active");
        } else {
            selectedSectors.add(sector);
            card.classList.add("nu-sector-card--active");
        }
        renderSelectedSectors();
        validateNewUserForm();
    }

    function validateNewUserForm() {
        const hasBasics =
            nuName.value.trim() &&
            nuEmail.value.trim() &&
            nuDni.value.trim().length === 8;
        const hasRole = !!selectedRole;
        const hasSector = selectedSectors.size > 0;

        const enabled = hasBasics && hasRole && hasSector;
        nuSubmitBtn.disabled = !enabled;
    }

    nuRoleCards.forEach((card) => {
        card.addEventListener("click", () => {
            updateRoleSelection(card.dataset.role);
        });
    });

    nuSectorCards.forEach((card) => {
        card.addEventListener("click", () => {
            toggleSector(card);
        });
    });

    [nuName, nuEmail, nuDni].forEach((field) => {
        field.addEventListener("input", validateNewUserForm);
    });

    nuForm.addEventListener("submit", (ev) => {
        ev.preventDefault();

        alert(
            "Invitación enviada correctamente.\n\n" +
            "- Nombre: " +
            nuName.value +
            "\n- Email: " +
            nuEmail.value
        );

        nuForm.reset();
        selectedRole = null;
        selectedSectors.clear();

        nuRoleCards.forEach((card) =>
            card.classList.remove("nu-role-card--active")
        );
        nuSectorCards.forEach((card) =>
            card.classList.remove("nu-sector-card--active")
        );

        nuSelectedSectors.innerHTML = "";
        nuSelectedCount.textContent = "0 sectores seleccionados";

        nuSubmitBtn.disabled = true;
    });

    nuCancelBtn.addEventListener("click", () => {
        showScreen("users");
    });

    backFromNewUser.addEventListener("click", () => {
        showScreen("users");
    });

    showScreen("users");
})();
