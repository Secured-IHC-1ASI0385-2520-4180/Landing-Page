// ====== UTILIDADES PARA VISTAS ======
function showView(id) {
    document.querySelectorAll('.rtu-view').forEach(v => v.classList.remove('rtu-view-active'));
    const view = document.getElementById(id);
    if (view) view.classList.add('rtu-view-active');
}

// ====== LÓGICA PRINCIPAL ======
document.addEventListener('DOMContentLoaded', () => {
    const summaryViewId = 'rtu-summary-view';
    const editorViewId = 'rtu-editor-view';
    const successViewId = 'rtu-success-view';

    const generateReportBtn = document.getElementById('rtuGenerateReportBtn');
    const backToSummaryBtn = document.getElementById('rtuBackToSummaryBtn');
    const signAndSendBtn = document.getElementById('rtuSignAndSendBtn');
    const editorHelper = document.getElementById('rtuEditorHelper');

    const sections = Array.from(document.querySelectorAll('.rtu-editor-section'));

    // --- Cambio de vistas ---
    generateReportBtn?.addEventListener('click', () => {
        showView(editorViewId);
    });

    backToSummaryBtn?.addEventListener('click', () => {
        showView(summaryViewId);
    });

    // ====== SECCIONES: COMPLETADO / PENDIENTE ======
    function updateSectionVisual(section, isCompleted) {
        const pill = section.querySelector('[data-status]');
        const btn = section.querySelector('.rtu-section-toggle-btn');

        section.dataset.completed = isCompleted ? 'true' : 'false';

        if (pill) {
            pill.textContent = isCompleted ? 'Completado' : 'Pendiente';
            pill.classList.toggle('rtu-status-completed', isCompleted);
            pill.classList.toggle('rtu-status-pending', !isCompleted);
        }
        if (btn) {
            btn.textContent = isCompleted ? 'Marcar como pendiente' : 'Marcar como completado';
        }
    }

    function updateGlobalState() {
        const allCompleted = sections.every(sec => {
            const required = sec.dataset.required === 'true';
            const completed = sec.dataset.completed === 'true';
            return !required || completed;
        });

        if (signAndSendBtn) {
            signAndSendBtn.disabled = !allCompleted;
        }
        if (editorHelper) {
            editorHelper.textContent = allCompleted
                ? 'Todo listo. Puedes firmar y enviar el reporte.'
                : 'Completa todas las secciones obligatorias';
        }
    }

    sections.forEach(section => {
        const toggleBtn = section.querySelector('.rtu-section-toggle-btn');
        if (!toggleBtn) return;

        toggleBtn.addEventListener('click', (ev) => {
            ev.stopPropagation();
            const isCompleted = section.dataset.completed === 'true';
            updateSectionVisual(section, !isCompleted);
            updateGlobalState();
        });
    });

    // ====== SUB-FLUJO: CHECKLIST DE ENTREGA ======
    const checklistItems = document.querySelectorAll('[data-checklist-item]');
    checklistItems.forEach(item => {
        item.addEventListener('click', () => {
            item.classList.toggle('rtu-checklist-on');

            const section = item.closest('.rtu-editor-section');
            if (!section) return;

            const allOn = Array.from(section.querySelectorAll('[data-checklist-item]'))
                .every(el => el.classList.contains('rtu-checklist-on'));

            if (allOn) {
                updateSectionVisual(section, true);
            }
            updateGlobalState();
        });
    });

    // ====== SUB-FLUJO: OBSERVACIONES ======
    const obsTextarea = document.getElementById('rtuObsTextarea');
    if (obsTextarea) {
        const obsSection = obsTextarea.closest('.rtu-editor-section');
        obsTextarea.addEventListener('input', () => {
            const hasText = obsTextarea.value.trim().length > 0;
            updateSectionVisual(obsSection, hasText);
            updateGlobalState();
        });
    }

    // ====== SUB-FLUJO: EVIDENCIAS (simulación) ======
    const addEvidenceBtn = document.getElementById('rtuAddEvidenceBtn');
    const evidenceList = document.getElementById('rtuEvidenceList');
    if (addEvidenceBtn && evidenceList) {
        const evidenceSection = addEvidenceBtn.closest('.rtu-editor-section');

        addEvidenceBtn.addEventListener('click', () => {
            const item = document.createElement('div');
            item.className = 'rtu-evidence-item';
            item.innerHTML = `
                <div class="rtu-evidence-thumb"></div>
                <div>
                    <p class="rtu-evidence-name">Foto_Incidente_01.jpg</p>
                    <p class="rtu-evidence-meta">2.5 MB · 29/10/2025 16:00</p>
                </div>
            `;
            evidenceList.appendChild(item);

            updateSectionVisual(evidenceSection, true);
            updateGlobalState();
        });
    }

    // ====== FIRMA Y ENVÍO ======
    const signatureModal = document.getElementById('rtuSignatureModal');
    const declarationCheckbox = document.getElementById('rtuDeclarationCheckbox');
    const confirmSignatureBtn = document.getElementById('rtuConfirmSignatureBtn');
    const closeSignatureBtn = document.getElementById('rtuCloseSignatureBtn');
    const clearSignatureBtn = document.getElementById('rtuClearSignatureBtn');
    const signatureBox = document.getElementById('rtuSignatureBox');

    let hasSignature = false;

    function updateSignatureConfirmState() {
        if (!confirmSignatureBtn) return;
        const hasDeclaration = declarationCheckbox?.checked ?? false;
        const canConfirm = hasSignature && hasDeclaration;
        confirmSignatureBtn.disabled = !canConfirm;
    }

    function resetSignatureState() {
        hasSignature = false;
        if (signatureBox) {
            signatureBox.classList.remove('rtu-signature-box--has-signature');
        }
        if (declarationCheckbox) {
            declarationCheckbox.checked = false;
        }
        updateSignatureConfirmState();
    }

    function openSignatureModal() {
        if (!signatureModal) return;
        resetSignatureState();
        signatureModal.classList.add('rtu-modal-open');
        signatureModal.setAttribute('aria-hidden', 'false');
    }

    function closeSignatureModal() {
        if (!signatureModal) return;
        signatureModal.classList.remove('rtu-modal-open');
        signatureModal.setAttribute('aria-hidden', 'true');
        resetSignatureState();
    }

    // Botón principal "Firmar y enviar"
    signAndSendBtn?.addEventListener('click', () => {
        openSignatureModal();
    });

    // Click en caja de firma -> aparece firma simulada
    signatureBox?.addEventListener('click', () => {
        hasSignature = true;
        signatureBox.classList.add('rtu-signature-box--has-signature');
        updateSignatureConfirmState();
    });

    // Limpiar firma
    clearSignatureBtn?.addEventListener('click', () => {
        resetSignatureState();
    });

    // Cerrar modal con X
    closeSignatureBtn?.addEventListener('click', () => {
        closeSignatureModal();
    });

    // Checkbox declaración
    declarationCheckbox?.addEventListener('change', () => {
        updateSignatureConfirmState();
    });

    // Confirmar firma -> pasa a "Reporte enviado"
    confirmSignatureBtn?.addEventListener('click', () => {
        closeSignatureModal();
        showView(successViewId);
    });

    // ====== REPORTE ENVIADO: ACCIONES ======
    const backToStartBtn = document.getElementById('rtuBackToStartBtn');
    const viewPdfBtn = document.getElementById('rtuViewPdfBtn');
    const shareBtn = document.getElementById('rtuShareBtn');

    backToStartBtn?.addEventListener('click', () => {
        showView(summaryViewId);
    });

    viewPdfBtn?.addEventListener('click', () => {
        alert('Simulación: abrir vista previa de PDF del reporte.');
    });

    shareBtn?.addEventListener('click', () => {
        alert('Simulación: compartir enlace del reporte.');
    });

    // ====== ESTADO INICIAL ======
    sections.forEach(sec => updateSectionVisual(sec, false));
    updateGlobalState();
});
