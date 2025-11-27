// Crear Incidente JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Estado de la aplicación
    const state = {
        currentStep: 1,
        incidentData: {
            type: '',
            description: '',
            priority: '',
            location: 'Av. Larco 345, Miraflores, Lima',
            evidences: []
        }
    };

    // Referencias a elementos del DOM
    const steps = {
        step1: document.getElementById('step1'),
        step2: document.getElementById('step2'),
        step3: document.getElementById('step3'),
        step4: document.getElementById('step4')
    };

    const modals = {
        incidentType: document.getElementById('incidentTypeModal'),
        microphonePermission: document.getElementById('microphonePermissionModal'),
        evidenceOptions: document.getElementById('evidenceOptionsModal'),
        draftSaved: document.getElementById('draftSavedModal'),
        reportSent: document.getElementById('reportSentModal')
    };

    // ===== PASO 1: Formulario inicial =====

    // Selector de tipo de incidente
    const incidentTypeField = document.getElementById('incidentTypeField');
    const incidentTypeInput = document.getElementById('incidentType');

    incidentTypeField.addEventListener('click', () => {
        showModal('incidentType');
    });

    document.getElementById('closeIncidentTypeModal').addEventListener('click', () => {
        hideModal('incidentType');
    });

    document.querySelectorAll('.incident-type-item').forEach(item => {
        item.addEventListener('click', () => {
            const type = item.dataset.type;
            state.incidentData.type = type;
            incidentTypeInput.value = type;
            incidentTypeField.querySelector('.select-placeholder').textContent = type;
            incidentTypeField.classList.add('selected');
            hideModal('incidentType');
            validateStep1();
        });
    });

    // Descripción
    const descriptionInput = document.getElementById('description');
    descriptionInput.addEventListener('input', () => {
        state.incidentData.description = descriptionInput.value;
        validateStep1();
    });

    // Selector de prioridad
    document.querySelectorAll('.priority-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('.priority-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            state.incidentData.priority = btn.dataset.priority;
        });
    });

    // Validar paso 1
    function validateStep1() {
        const continueBtn = document.getElementById('continueBtn');
        const isValid = state.incidentData.type && state.incidentData.description.trim().length > 0;
        continueBtn.disabled = !isValid;
    }

    // Botón continuar
    document.getElementById('continueBtn').addEventListener('click', () => {
        goToStep(2);
    });

    // ===== PASO 2: Confirmar ubicación =====

    document.getElementById('backToStep1').addEventListener('click', () => {
        goToStep(1);
    });

    document.getElementById('changeLocationBtn').addEventListener('click', () => {
        alert('Funcionalidad de cambiar ubicación - Se abriría un mapa interactivo');
    });

    document.getElementById('confirmLocationBtn').addEventListener('click', () => {
        goToStep(3);
    });

    // ===== PASO 3: Adjuntar evidencias =====

    document.getElementById('backToStep2').addEventListener('click', () => {
        goToStep(2);
    });

    document.getElementById('addEvidenceBtn').addEventListener('click', () => {
        showModal('evidenceOptions');
    });

    document.getElementById('addMoreEvidencesBtn').addEventListener('click', () => {
        showModal('evidenceOptions');
    });

    document.getElementById('closeEvidenceOptionsModal').addEventListener('click', () => {
        hideModal('evidenceOptions');
    });

    // Opciones de evidencia
    document.getElementById('takePhotoOption').addEventListener('click', () => {
        hideModal('evidenceOptions');
        simulatePhotoCapture();
    });

    document.getElementById('recordAudioOption').addEventListener('click', () => {
        hideModal('evidenceOptions');
        showModal('microphonePermission');
    });

    document.getElementById('uploadFileOption').addEventListener('click', () => {
        hideModal('evidenceOptions');
        document.getElementById('fileInput').click();
    });

    // Permiso de micrófono
    document.getElementById('allowMicrophoneBtn').addEventListener('click', () => {
        hideModal('microphonePermission');
        simulateAudioRecording();
    });

    document.getElementById('denyMicrophoneBtn').addEventListener('click', () => {
        hideModal('microphonePermission');
    });

    // File input
    document.getElementById('fileInput').addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (file) {
            addEvidence({
                name: file.name,
                size: formatFileSize(file.size),
                type: file.type.startsWith('image/') ? 'image' : 'audio'
            });
        }
        e.target.value = '';
    });

    // Simular captura de foto
    function simulatePhotoCapture() {
        setTimeout(() => {
            addEvidence({
                name: 'evidencia_foto.jpg',
                size: '603.6 KB',
                type: 'image'
            });
        }, 500);
    }

    // Simular grabación de audio
    function simulateAudioRecording() {
        setTimeout(() => {
            addEvidence({
                name: 'evidencia_audio.m4a',
                size: '971.8 KB',
                type: 'audio'
            });
        }, 1000);
    }

    // Agregar evidencia
    function addEvidence(evidence) {
        state.incidentData.evidences.push(evidence);
        renderEvidences();
        updateEvidenceCount();
        validateStep3();
    }

    // Renderizar evidencias
    function renderEvidences() {
        const evidenceList = document.getElementById('evidenceList');
        evidenceList.innerHTML = '';

        state.incidentData.evidences.forEach((evidence, index) => {
            const evidenceItem = document.createElement('div');
            evidenceItem.className = 'evidence-item';

            const icon = evidence.type === 'image'
                ? '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>'
                : '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M12 1a3 3 0 00-3 3v8a3 3 0 006 0V4a3 3 0 00-3-3zM19 10v2a7 7 0 01-14 0v-2M12 19v4M8 23h8"/></svg>';

            evidenceItem.innerHTML = `
                <div class="evidence-icon">
                    ${icon}
                </div>
                <div class="evidence-details">
                    <div class="evidence-name">${evidence.name}</div>
                    <div class="evidence-meta">
                        <span>${evidence.size}</span>
                        <span>•</span>
                        <span class="evidence-status">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                <path d="M22 11.08V12a10 10 0 11-5.93-9.14"/>
                                <polyline points="22 4 12 14.01 9 11.01"/>
                            </svg>
                            Listo
                        </span>
                    </div>
                </div>
                <button class="remove-evidence" data-index="${index}">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                        <line x1="18" y1="6" x2="6" y2="18"/>
                        <line x1="6" y1="6" x2="18" y2="18"/>
                    </svg>
                </button>
            `;

            evidenceList.appendChild(evidenceItem);
        });

        // Event listeners para botones de eliminar
        document.querySelectorAll('.remove-evidence').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const index = parseInt(e.currentTarget.dataset.index);
                removeEvidence(index);
            });
        });
    }

    // Eliminar evidencia
    function removeEvidence(index) {
        state.incidentData.evidences.splice(index, 1);
        renderEvidences();
        updateEvidenceCount();
        validateStep3();
    }

    // Actualizar contador de evidencias
    function updateEvidenceCount() {
        const count = state.incidentData.evidences.length;
        document.getElementById('evidenceCount').textContent =
            `${count} archivo${count !== 1 ? 's' : ''} adjunto${count !== 1 ? 's' : ''}`;

        const addMoreBtn = document.getElementById('addMoreEvidencesBtn');
        if (count > 0) {
            addMoreBtn.style.display = 'flex';
        } else {
            addMoreBtn.style.display = 'none';
        }
    }

    // Validar paso 3
    function validateStep3() {
        const nextBtn = document.getElementById('nextToSummaryBtn');
        nextBtn.disabled = state.incidentData.evidences.length === 0;
    }

    document.getElementById('nextToSummaryBtn').addEventListener('click', () => {
        updateSummary();
        goToStep(4);
    });

    // ===== PASO 4: Resumen =====

    document.getElementById('backToStep3').addEventListener('click', () => {
        goToStep(3);
    });

    // Actualizar resumen
    function updateSummary() {
        document.getElementById('summaryIncidentType').textContent = state.incidentData.type;
        document.getElementById('summaryDescription').textContent = state.incidentData.description;
        document.getElementById('summaryLocation').textContent = state.incidentData.location;

        const evidenceCount = state.incidentData.evidences.length;
        document.getElementById('summaryEvidences').textContent =
            `${evidenceCount} archivo${evidenceCount !== 1 ? 's' : ''} adjunto${evidenceCount !== 1 ? 's' : ''}`;

        // Prioridad
        const priorityElement = document.getElementById('summaryPriority');
        if (state.incidentData.priority) {
            const priorityText = {
                'alta': 'Alta',
                'media': 'Media',
                'baja': 'Baja'
            };
            priorityElement.textContent = priorityText[state.incidentData.priority];
            priorityElement.className = '';
            priorityElement.classList.add(`priority-${state.incidentData.priority === 'alta' ? 'high' : state.incidentData.priority === 'media' ? 'medium' : 'low'}`);
        } else {
            priorityElement.textContent = 'No especificada';
            priorityElement.className = '';
        }
    }

    // Enviar reporte
    document.getElementById('sendReportBtn').addEventListener('click', () => {
        console.log('Enviando reporte:', state.incidentData);
        showModal('reportSent');
    });

    // Guardar como borrador
    document.getElementById('saveDraftBtn').addEventListener('click', () => {
        console.log('Guardando borrador:', state.incidentData);
        showModal('draftSaved');
    });

    // Acciones del modal de borrador guardado
    document.getElementById('createAnotherDraft').addEventListener('click', () => {
        hideModal('draftSaved');
        resetForm();
        goToStep(1);
    });

    document.getElementById('backToHomeFromDraft').addEventListener('click', () => {
        window.location.href = 'index.html';
    });

    // Acciones del modal de reporte enviado
    document.getElementById('viewOnMapBtn').addEventListener('click', () => {
        window.location.href = 'mapa-incidentes.html';
    });

    document.getElementById('createAnotherReport').addEventListener('click', () => {
        hideModal('reportSent');
        resetForm();
        goToStep(1);
    });

    document.getElementById('backToHomeFromReport').addEventListener('click', () => {
        window.location.href = 'index.html';
    });

    // ===== Funciones de navegación =====

    function goToStep(stepNumber) {
        // Ocultar todos los pasos
        Object.values(steps).forEach(step => {
            if (step) step.classList.remove('active');
        });

        // Mostrar el paso actual
        const currentStepElement = steps[`step${stepNumber}`];
        if (currentStepElement) {
            currentStepElement.classList.add('active');
            state.currentStep = stepNumber;
            window.scrollTo(0, 0);
        }
    }

    function showModal(modalName) {
        const modal = modals[modalName];
        if (modal) {
            modal.classList.add('active');
            document.body.style.overflow = 'hidden';
        }
    }

    function hideModal(modalName) {
        const modal = modals[modalName];
        if (modal) {
            modal.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
    }

    // Cerrar modales al hacer clic fuera
    Object.values(modals).forEach(modal => {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.classList.remove('active');
                document.body.style.overflow = 'auto';
            }
        });
    });

    // Resetear formulario
    function resetForm() {
        state.incidentData = {
            type: '',
            description: '',
            priority: '',
            location: 'Av. Larco 345, Miraflores, Lima',
            evidences: []
        };

        // Resetear campo de tipo de incidente
        incidentTypeInput.value = '';
        incidentTypeField.querySelector('.select-placeholder').textContent = 'Selecciona el tipo de incidente';
        incidentTypeField.classList.remove('selected');

        // Resetear descripción
        descriptionInput.value = '';

        // Resetear prioridad
        document.querySelectorAll('.priority-btn').forEach(btn => btn.classList.remove('active'));

        // Resetear evidencias
        renderEvidences();
        updateEvidenceCount();

        // Resetear validaciones
        validateStep1();
        validateStep3();
    }

    // ===== Utilidades =====

    function formatFileSize(bytes) {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return Math.round((bytes / Math.pow(k, i)) * 10) / 10 + ' ' + sizes[i];
    }

    // Inicialización
    validateStep1();
    validateStep3();
    updateEvidenceCount();
});

