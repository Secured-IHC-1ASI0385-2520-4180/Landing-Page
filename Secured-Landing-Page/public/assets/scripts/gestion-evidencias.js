// Gestión de Evidencias - JavaScript

let currentView = 'grid'; // 'grid' o 'list'

// Cambiar entre vista grid y lista
function toggleView() {
    const gridIcon = document.getElementById('grid-icon');
    const listIcon = document.getElementById('list-icon');
    const evidenceGrid = document.getElementById('evidence-grid');
    const evidenceList = document.getElementById('evidence-list');

    if (currentView === 'grid') {
        // Cambiar a vista de lista
        currentView = 'list';
        gridIcon.style.display = 'none';
        listIcon.style.display = 'block';
        evidenceGrid.style.display = 'none';
        evidenceList.style.display = 'flex';
    } else {
        // Cambiar a vista de grid
        currentView = 'grid';
        gridIcon.style.display = 'block';
        listIcon.style.display = 'none';
        evidenceGrid.style.display = 'grid';
        evidenceList.style.display = 'none';
    }
}

// Abrir modal de detalle de evidencia
function openDetailModal(filename, type) {
    const modal = document.getElementById('detail-modal');
    const detailImage = document.getElementById('detail-image');
    const audioPlayer = document.getElementById('audio-player');
    const detailFilename = document.getElementById('detail-filename');
    const detailDescription = document.getElementById('detail-description');

    modal.classList.add('active');
    detailFilename.textContent = filename;

    if (type === 'image') {
        detailImage.style.display = 'block';
        audioPlayer.style.display = 'none';
        detailImage.src = 'Secured-Landing-Page/public/assets/images/gestion-evidencias.png';
        detailDescription.textContent = 'Vehículo sospechoso estacionado en zona prohibida';
    } else if (type === 'audio') {
        detailImage.style.display = 'none';
        audioPlayer.style.display = 'flex';
        detailDescription.textContent = 'Testimonio del testigo presencial';
    }

    // Prevenir scroll del body
    document.body.style.overflow = 'hidden';
}

// Cerrar modal de detalle
function closeDetailModal() {
    const modal = document.getElementById('detail-modal');
    modal.classList.remove('active');
    document.body.style.overflow = 'auto';
}

// Abrir modal para agregar evidencia
function openAddModal() {
    const modal = document.getElementById('add-modal');
    modal.classList.add('active');
}

// Cerrar modal de agregar evidencia
function closeAddModal() {
    const modal = document.getElementById('add-modal');
    modal.classList.remove('active');
}

// Seleccionar tipo de adjunto
function selectAttachment(type) {
    console.log('Seleccionado:', type);

    if (type === 'camera' || type === 'gallery' || type === 'video') {
        // Cerrar modal y simular carga
        closeAddModal();

        // Simular que se está subiendo
        setTimeout(() => {
            alert(`${type === 'camera' ? 'Foto' : type === 'gallery' ? 'Imagen' : 'Video'} adjuntado correctamente`);
        }, 500);
    }
}

// Abrir modal de previsualización de audio
function openAudioModal() {
    // Cerrar modal de agregar
    closeAddModal();

    // Abrir modal de audio
    setTimeout(() => {
        const modal = document.getElementById('audio-preview-modal');
        modal.classList.add('active');
    }, 300);
}

// Cerrar modal de audio
function closeAudioModal() {
    const modal = document.getElementById('audio-preview-modal');
    modal.classList.remove('active');
}

// Subir evidencia de audio
function uploadAudioEvidence() {
    const comment = document.getElementById('audio-comment').value;
    const selectedTags = document.querySelectorAll('.tag-btn.active');

    console.log('Comentario:', comment);
    console.log('Tags seleccionadas:', selectedTags.length);

    // Cerrar modal
    closeAudioModal();

    // Simular subida
    alert('Audio adjuntado correctamente');

    // Limpiar formulario
    document.getElementById('audio-comment').value = '';
    document.querySelectorAll('.tag-btn.active').forEach(btn => {
        btn.classList.remove('active');
    });
}

// Event listeners
document.addEventListener('DOMContentLoaded', function() {
    // Cerrar modales al hacer clic fuera
    const modals = document.querySelectorAll('.modal');
    modals.forEach(modal => {
        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                if (modal.id === 'detail-modal') {
                    closeDetailModal();
                } else if (modal.id === 'add-modal') {
                    closeAddModal();
                } else if (modal.id === 'audio-preview-modal') {
                    closeAudioModal();
                }
            }
        });
    });

    // Tag selector toggle
    const tagButtons = document.querySelectorAll('.tag-btn');
    tagButtons.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();

            // Verificar límite de 3 tags
            const activeTags = document.querySelectorAll('.tag-btn.active');

            if (this.classList.contains('active')) {
                // Desactivar
                this.classList.remove('active');
            } else {
                // Activar solo si no hay 3 ya seleccionadas
                if (activeTags.length < 3) {
                    this.classList.add('active');
                } else {
                    alert('Máximo 3 etiquetas permitidas');
                }
            }
        });
    });

    // Tecla ESC para cerrar modales
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            closeDetailModal();
            closeAddModal();
            closeAudioModal();
        }
    });
});

// Simular progreso de carga (opcional)
function simulateUploadProgress() {
    const progressCircle = document.querySelector('.evidence-card.uploading circle:last-child');
    const progressText = document.querySelector('.progress-text');

    if (!progressCircle || !progressText) return;

    let progress = 65;
    const circumference = 2 * Math.PI * 20; // radio = 20

    const interval = setInterval(() => {
        progress += Math.random() * 5;

        if (progress >= 100) {
            progress = 100;
            clearInterval(interval);

            // Cambiar a completado después de un momento
            setTimeout(() => {
                const uploadingCard = document.querySelector('.evidence-card.uploading');
                if (uploadingCard) {
                    uploadingCard.classList.remove('uploading');
                    uploadingCard.querySelector('.evidence-image').innerHTML = `
                        <img src="Secured-Landing-Page/public/assets/images/gestion-evidencias.png" alt="Evidencia" />
                    `;
                }
            }, 500);
        }

        const offset = circumference - (progress / 100) * circumference;
        progressCircle.style.strokeDashoffset = offset;
        progressText.textContent = `Enviando... ${Math.round(progress)}%`;
    }, 300);
}

// Iniciar simulación de carga (comentado por defecto)
// setTimeout(simulateUploadProgress, 1000);

// Funciones de utilidad
function escapeHtml(text) {
    const map = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#039;'
    };
    return text.replace(/[&<>"']/g, m => map[m]);
}

function formatFileSize(bytes) {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
}

function formatDate(date) {
    const options = {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit'
    };
    return new Date(date).toLocaleString('es-PE', options);
}

// Exportar funciones para uso en HTML
window.toggleView = toggleView;
window.openDetailModal = openDetailModal;
window.closeDetailModal = closeDetailModal;
window.openAddModal = openAddModal;
window.closeAddModal = closeAddModal;
window.selectAttachment = selectAttachment;
window.openAudioModal = openAudioModal;
window.closeAudioModal = closeAudioModal;
window.uploadAudioEvidence = uploadAudioEvidence;

