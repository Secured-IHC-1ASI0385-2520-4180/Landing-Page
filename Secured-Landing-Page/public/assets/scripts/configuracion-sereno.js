// ============ UTILIDADES DE VISTAS ============

function showView(viewId) {
    const views = document.querySelectorAll(".cfg-view");
    views.forEach((v) => v.classList.remove("cfg-view-active"));

    const target = document.getElementById(viewId);
    if (target) {
        target.classList.add("cfg-view-active");
    }
}

function setupViewNavigation() {
    // Navegación con data-view-target
    document.querySelectorAll("[data-view-target]").forEach((btn) => {
        btn.addEventListener("click", () => {
            const targetId = btn.getAttribute("data-view-target");
            if (targetId) showView(targetId);
        });
    });

    // Botones de volver
    document.querySelectorAll("[data-back-to]").forEach((btn) => {
        btn.addEventListener("click", () => {
            const viewId = btn.getAttribute("data-back-to");
            if (viewId) showView(viewId);
        });
    });
}

// ============ MODAL AVATAR ============

function setupAvatarModal() {
    const avatarTrigger = document.getElementById("cfgAvatarTrigger");
    const modal = document.getElementById("cfgAvatarModal");

    if (!avatarTrigger || !modal) return;

    const openModal = () => modal.classList.add("cfg-modal-active");
    const closeModal = () => modal.classList.remove("cfg-modal-active");

    avatarTrigger.addEventListener("click", openModal);

    modal.querySelectorAll("[data-close-modal]").forEach((btn) => {
        btn.addEventListener("click", closeModal);
    });

    modal.querySelector(".cfg-modal-backdrop").addEventListener("click", closeModal);
}

// ============ PASTILLAS (ACCIONES RADIO) ============

function setupOptionPills() {
    const groups = document.querySelectorAll("[data-radio-group]");

    groups.forEach((group) => {
        const name = group.getAttribute("data-radio-group");
        const pills = document.querySelectorAll(`[data-radio-group='${name}'] .cfg-option-pill`);

        pills.forEach((pill) => {
            pill.addEventListener("click", () => {
                pills.forEach((p) => p.classList.remove("cfg-option-pill-active"));
                pill.classList.add("cfg-option-pill-active");
            });
        });
    });
}

// ============ BOTONES / ACCIONES SIMULADAS ============

function setupActionButtons() {
    const simpleAlert = (id, message) => {
        const el = document.getElementById(id);
        if (el) {
            el.addEventListener("click", () => alert(message));
        }
    };

    simpleAlert("cfgSavePersonalBtn", "Datos personales guardados correctamente.");
    simpleAlert("cfgSaveNotificationsBtn", "Preferencias de notificación actualizadas.");
    simpleAlert("cfgApplyAccessibilityBtn", "Configuración de accesibilidad aplicada.");
    simpleAlert("cfgSavePasswordBtn", "Contraseña actualizada correctamente.");
    simpleAlert("cfgChange2faMethodBtn", "Aquí podrías cambiar el método (SMS / app, etc.).");
    simpleAlert("cfgCloseAllSessionsBtn", "Se cerraron todas las sesiones remotas.");
    simpleAlert("cfgExportDataBtn", "Se iniciará la descarga de tus datos personales.");
    simpleAlert("cfgClearCacheBtn", "Caché local limpiada (78 MB liberados).");
    simpleAlert("cfgLogoutBtn", "Sesión cerrada en este dispositivo.");
    simpleAlert(
        "cfgDeleteAccountBtn",
        "Se ha enviado la solicitud de eliminación de cuenta. Un administrador deberá aprobarla."
    );

    const sendTestBtn = document.getElementById("cfgSendTestNotificationBtn");
    if (sendTestBtn) {
        sendTestBtn.addEventListener("click", () =>
            alert("Notificación de prueba enviada a tu dispositivo.")
        );
    }

    // Cerrar sesiones individuales
    document.querySelectorAll(".cfg-close-session-btn").forEach((btn) => {
        btn.addEventListener("click", () => {
            alert("Sesión remota cerrada.");
            btn.disabled = true;
            btn.textContent = "Sesión cerrada";
        });
    });
}

// ============ INIT ============

document.addEventListener("DOMContentLoaded", () => {
    setupViewNavigation();
    setupAvatarModal();
    setupOptionPills();
    setupActionButtons();

    // Vista inicial
    showView("cfg-main-view");
});
