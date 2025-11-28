

document.addEventListener("DOMContentLoaded", () => {
    const views = document.querySelectorAll(".pl-view");

    function showView(id) {
        views.forEach(v => v.classList.remove("pl-view-active"));
        const target = document.getElementById(id);
        if (target) {
            target.classList.add("pl-view-active");
            window.scrollTo({ top: 0, behavior: "instant" });
        }
    }

    // BOTONES PRINCIPALES DEL FLUJO
    const btnIniciarCheckin = document.getElementById("pl-btn-iniciar-checkin");
    const btnMarcarCompleto = document.getElementById("pl-btn-marcar-checkin-completo");
    const btnConfirmarCheckin = document.getElementById("pl-btn-confirmar-checkin");
    const btnCambiarEstado = document.getElementById("pl-btn-cambiar-estado");
    const btnFinalizarDisponible = document.getElementById("pl-btn-finalizar-disponible");
    const btnConfirmarEstado = document.getElementById("pl-btn-confirmar-estado");
    const btnFinalizarNoDisponible = document.getElementById("pl-btn-finalizar-no-disponible");
    const btnActualizarCheckin = document.getElementById("pl-btn-actualizar-checkin");

    // 1) Pase de lista -> Check-in personal (pendiente)
    btnIniciarCheckin?.addEventListener("click", () => {
        showView("pl-view-checkin-pendiente");
    });

    // 2) Desde check-in pendiente marcamos todo como verificado
    btnMarcarCompleto?.addEventListener("click", () => {
        showView("pl-view-checkin-completo");
    });

    // 3) Confirmar check-in -> resultado disponible
    btnConfirmarCheckin?.addEventListener("click", () => {
        showView("pl-view-resultado-disponible");
    });

    // 4) Resultado disponible: finalizar -> vuelve a pase de lista (disponible)
    btnFinalizarDisponible?.addEventListener("click", () => {
        showView("pl-view-pase-disponible");
    });

    // 5) Resultado disponible: cambiar estado -> pantalla de cambio
    btnCambiarEstado?.addEventListener("click", () => {
        showView("pl-view-cambiar-estado");
    });

    // LÓGICA DE CAMBIO DE ESTADO (solo activamos flujo para "no disponible")
    const stateButtons = document.querySelectorAll(".pl-state-option");
    const impactoNoDisponible = document.getElementById("pl-impacto-no-disponible");
    const motivoTextarea = document.getElementById("pl-motivo-no-disponible");

    let estadoSeleccionado = null;

    stateButtons.forEach(btn => {
        btn.addEventListener("click", () => {
            estadoSeleccionado = btn.dataset.state || null;

            // Visual: marcar seleccionado
            stateButtons.forEach(b => b.classList.remove("pl-state-option-selected"));
            btn.classList.add("pl-state-option-selected");

            // Solo para "no disponible" mostramos impacto y pedimos motivo
            if (estadoSeleccionado === "no-disponible") {
                impactoNoDisponible?.classList.remove("pl-card-hidden");
                validarMotivo();
            } else {
                impactoNoDisponible?.classList.add("pl-card-hidden");
                btnConfirmarEstado.disabled = true;
            }
        });
    });

    // Habilitar confirmar cuando haya motivo escrito
    function validarMotivo() {
        if (!btnConfirmarEstado || !motivoTextarea) return;

        const texto = motivoTextarea.value.trim();
        btnConfirmarEstado.disabled = !(estadoSeleccionado === "no-disponible" && texto.length > 0);
    }

    motivoTextarea?.addEventListener("input", validarMotivo);

    // 6) Confirmar cambio -> resultado no disponible
    btnConfirmarEstado?.addEventListener("click", () => {
        if (estadoSeleccionado === "no-disponible") {
            showView("pl-view-resultado-no-disponible");
        }
    });

    // 7) Resultado no disponible: finalizar -> pase de lista no disponible
    btnFinalizarNoDisponible?.addEventListener("click", () => {
        showView("pl-view-pase-no-disponible");
    });

    // 8) Pase de lista no disponible: actualizar check-in -> check-in (pendiente)
    btnActualizarCheckin?.addEventListener("click", () => {
        // Reseteamos selección de estado / motivo para un nuevo ciclo
        estadoSeleccionado = null;
        motivoTextarea && (motivoTextarea.value = "");
        impactoNoDisponible?.classList.add("pl-card-hidden");
        btnConfirmarEstado && (btnConfirmarEstado.disabled = true);

        showView("pl-view-checkin-pendiente");
    });
});
