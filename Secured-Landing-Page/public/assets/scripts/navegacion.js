document.addEventListener("DOMContentLoaded", () => {
    const prepareView = document.getElementById("nav-prepare-view");
    const runningView = document.getElementById("nav-running-view");

    const startBtn = document.getElementById("navStartBtn");
    const endBtn = document.getElementById("navEndBtn");
    const backToPrepareBtn = document.getElementById("navBackToPrepareBtn");
    const recalcBtn = document.getElementById("navRecalcBtn");
    const toast = document.getElementById("navToast");
    const muteBtn = document.getElementById("navMuteBtn");

    const steps = Array.from(document.querySelectorAll("[data-step]"));

    let isMuted = false;
    let currentStepIndex = 0;
    let toastTimeoutId = null;

    function showView(view) {
        if (view === "prepare") {
            prepareView.classList.add("nav-view-active");
            runningView.classList.remove("nav-view-active");
        } else {
            runningView.classList.add("nav-view-active");
            prepareView.classList.remove("nav-view-active");
        }
        window.scrollTo({ top: 0, behavior: "smooth" });
    }

    function showToast(message) {
        if (!toast) return;
        toast.textContent = message;
        toast.classList.add("nav-toast-visible");

        if (toastTimeoutId) {
            clearTimeout(toastTimeoutId);
        }
        toastTimeoutId = setTimeout(() => {
            toast.classList.remove("nav-toast-visible");
        }, 2500);
    }

    function highlightStep(index) {
        steps.forEach((el, i) => {
            el.classList.toggle("nav-step-item-active", i === index);
        });
    }

    // Cambiar a navegación en curso
    startBtn?.addEventListener("click", () => {
        showView("running");
        currentStepIndex = 0;
        highlightStep(currentStepIndex);
    });

    // Finalizar navegación -> volver a preparar navegación
    endBtn?.addEventListener("click", () => {
        showView("prepare");
    });

    backToPrepareBtn?.addEventListener("click", () => {
        showView("prepare");
    });

    // Recalcular ruta (solo simulación visual)
    recalcBtn?.addEventListener("click", () => {
        showToast("Ruta recalculada con información de tráfico actualizada.");
        // Avanza un paso en la lista para simular progreso
        currentStepIndex = Math.min(currentStepIndex + 1, steps.length - 1);
        highlightStep(currentStepIndex);
    });

    // Mute / unmute
    muteBtn?.addEventListener("click", () => {
        isMuted = !isMuted;
        muteBtn.textContent = isMuted ? "🔇" : "🔊";
        showToast(isMuted ? "Indicaciones de voz silenciadas." : "Indicaciones de voz activadas.");
    });
});
