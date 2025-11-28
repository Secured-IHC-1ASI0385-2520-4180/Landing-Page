// ================================
// NAVEGACIÓN ENTRE VISTAS
// ================================
function showView(viewId) {
    // Ocultar todas las vistas
    document.querySelectorAll('.view').forEach(view => {
        view.classList.remove('active');
    });

    // Mostrar la vista seleccionada
    const targetView = document.getElementById(viewId);
    if (targetView) {
        targetView.classList.add('active');
    }
}

// ================================
// ACCORDION (SECCIONES EXPANDIBLES)
// ================================
function toggleAccordion(header) {
    const accordionItem = header.parentElement;
    const isOpen = accordionItem.classList.contains('open');

    // Cerrar todos los accordions abiertos (opcional, comentar si se quiere múltiples abiertos)
    // document.querySelectorAll('.accordion-item').forEach(item => {
    //     item.classList.remove('open');
    // });

    // Toggle del accordion clickeado
    if (isOpen) {
        accordionItem.classList.remove('open');
    } else {
        accordionItem.classList.add('open');
    }
}

// ================================
// GESTIÓN DE FORMULARIOS
// ================================

// Contador de caracteres para textareas
document.addEventListener('DOMContentLoaded', function() {
    const textareas = document.querySelectorAll('textarea');

    textareas.forEach(textarea => {
        textarea.addEventListener('input', function() {
            const content = this.parentElement;
            const charCount = content.querySelector('.char-count');
            const remainingCount = content.querySelector('.remaining-count');

            if (remainingCount) {
                const maxLength = 2000; // Ajustar según el textarea
                const currentLength = this.value.length;
                remainingCount.textContent = `${currentLength}/${maxLength}`;
            }

            if (charCount) {
                const minLength = this.id === 'hechos-observados' ? 50 : 20;
                const currentLength = this.value.length;
                const remaining = minLength - currentLength;

                if (remaining > 0) {
                    charCount.textContent = `Mínimo ${minLength} caracteres (faltan ${remaining})`;
                    charCount.style.color = '#ff9800';
                } else {
                    charCount.textContent = `✓ Requisito mínimo cumplido`;
                    charCount.style.color = '#4caf50';
                }
            }

            // Actualizar el estado del formulario
            updateFormProgress();
        });
    });

    // Validar campos requeridos
    const requiredInputs = document.querySelectorAll('input[required], textarea[required]');
    requiredInputs.forEach(input => {
        input.addEventListener('change', updateFormProgress);
    });
});

// ================================
// ACTUALIZAR PROGRESO DEL FORMULARIO
// ================================
function updateFormProgress() {
    const totalSections = document.querySelectorAll('.accordion-item').length;
    const completedSections = document.querySelectorAll('.accordion-item.completed').length;

    const progressFill = document.querySelector('.progress-fill');
    const progressCount = document.querySelector('.progress-count');

    if (progressFill && progressCount) {
        const percentage = (completedSections / totalSections) * 100;
        progressFill.style.width = `${percentage}%`;
        progressCount.textContent = `${completedSections}/${totalSections}`;
    }

    // Habilitar botón de firmas
    const allRequired = document.querySelectorAll('.accordion-item.required');
    const allRequiredComplete = Array.from(allRequired).every(item =>
        item.classList.contains('completed')
    );

    const captureBtn = document.querySelector('.btn-capture');
    if (captureBtn) {
        if (allRequiredComplete) {
            captureBtn.classList.remove('disabled');
            captureBtn.style.background = '#2962ff';
            captureBtn.style.color = 'white';
            captureBtn.style.cursor = 'pointer';
        } else {
            captureBtn.classList.add('disabled');
            captureBtn.style.background = '#f0f0f0';
            captureBtn.style.color = '#999';
        }
    }
}

// ================================
// GUARDAR BORRADOR
// ================================
function guardarBorrador() {
    // Simulación de guardado
    const notification = document.createElement('div');
    notification.textContent = 'Borrador guardado correctamente';
    notification.style.cssText = `
        position: fixed;
        top: 70px;
        left: 50%;
        transform: translateX(-50%);
        background: #4caf50;
        color: white;
        padding: 12px 24px;
        border-radius: 8px;
        z-index: 1000;
        box-shadow: 0 2px 8px rgba(0,0,0,0.2);
    `;
    document.body.appendChild(notification);

    setTimeout(() => {
        notification.remove();
    }, 3000);
}

// ================================
// ENVIAR A REVISIÓN
// ================================
function enviarRevision() {
    // Validar que todos los campos requeridos estén completos
    const allRequired = document.querySelectorAll('.accordion-item.required');
    const allRequiredComplete = Array.from(allRequired).every(item =>
        item.classList.contains('completed')
    );

    if (!allRequiredComplete) {
        alert('Por favor, completa todas las secciones requeridas antes de enviar a revisión.');
        return;
    }

    // Simulación de envío
    if (confirm('¿Estás seguro de enviar el acta a revisión?')) {
        const notification = document.createElement('div');
        notification.textContent = 'Acta enviada a revisión correctamente';
        notification.style.cssText = `
            position: fixed;
            top: 70px;
            left: 50%;
            transform: translateX(-50%);
            background: #2962ff;
            color: white;
            padding: 12px 24px;
            border-radius: 8px;
            z-index: 1000;
            box-shadow: 0 2px 8px rgba(0,0,0,0.2);
        `;
        document.body.appendChild(notification);

        setTimeout(() => {
            notification.remove();
            showView('historial-actas');
        }, 2000);
    }
}

// ================================
// DESCARGAR PDF
// ================================
function descargarPDF(actaId) {
    // Log para desarrollo (remover en producción si no se necesita)
    console.log('Descargando acta:', actaId);

    // Simulación de descarga
    const notification = document.createElement('div');
    notification.textContent = 'Descargando PDF...';
    notification.style.cssText = `
        position: fixed;
        top: 70px;
        left: 50%;
        transform: translateX(-50%);
        background: #333;
        color: white;
        padding: 12px 24px;
        border-radius: 8px;
        z-index: 1000;
        box-shadow: 0 2px 8px rgba(0,0,0,0.2);
    `;
    document.body.appendChild(notification);

    setTimeout(() => {
        notification.textContent = 'PDF descargado correctamente';
        notification.style.background = '#4caf50';
    }, 1500);

    setTimeout(() => {
        notification.remove();
    }, 3500);
}

// ================================
// AÑADIR PARTICIPANTE
// ================================
function anadirParticipante() {
    alert('Formulario para añadir participante (por implementar)');
    // Aquí se abriría un modal o formulario para añadir participantes
}

// ================================
// EVENT LISTENERS
// ================================
document.addEventListener('DOMContentLoaded', function() {
    // Botón guardar borrador
    const btnGuardar = document.querySelector('.btn-outline');
    if (btnGuardar) {
        btnGuardar.addEventListener('click', guardarBorrador);
    }

    // Botón enviar a revisión
    const btnEnviar = document.querySelector('.btn-text');
    if (btnEnviar) {
        btnEnviar.addEventListener('click', enviarRevision);
    }

    // Botones de descargar PDF
    const btnsDescargar = document.querySelectorAll('.btn-primary');
    btnsDescargar.forEach(btn => {
        if (btn.textContent.includes('Descargar PDF')) {
            btn.addEventListener('click', () => descargarPDF('acta-id'));
        }
    });

    // Botón añadir participante
    const btnAnadir = document.querySelector('.btn-add');
    if (btnAnadir) {
        btnAnadir.addEventListener('click', anadirParticipante);
    }

    // Inicializar el primer accordion como abierto (opcional)
    const firstAccordion = document.querySelector('.accordion-item');
    if (firstAccordion) {
        firstAccordion.classList.add('open');
    }
});

// ================================
// UTILIDADES
// ================================

// Formatear fecha
function formatDate(date) {
    const options = {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit'
    };
    return new Date(date).toLocaleDateString('es-PE', options);
}

// Validar formulario completo
function isFormValid() {
    const requiredFields = document.querySelectorAll('[required]');
    return Array.from(requiredFields).every(field => {
        if (field.tagName === 'TEXTAREA') {
            const minLength = field.id === 'hechos-observados' ? 50 : 20;
            return field.value.length >= minLength;
        }
        return field.value.trim() !== '';
    });
}

