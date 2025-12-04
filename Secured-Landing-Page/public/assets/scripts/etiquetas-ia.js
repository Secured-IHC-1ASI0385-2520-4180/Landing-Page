// Etiquetas IA - JavaScript

// Variables globales
let selectedTags = [];
let suggestedTags = [];
let currentFeedbackTag = null;

// Contador de caracteres
const descriptionInput = document.getElementById('description-input');
const charCounter = document.getElementById('char-counter');

if (descriptionInput) {
    descriptionInput.addEventListener('input', function() {
        const length = this.value.length;
        charCounter.textContent = length;

        if (length > 500) {
            this.value = this.value.substring(0, 500);
            charCounter.textContent = 500;
        }
    });
}

// Analizar etiquetas con IA
function analyzeTags() {
    const description = descriptionInput.value.trim();

    if (description === '') {
        alert('Por favor escribe una descripción primero');
        return;
    }

    // Abrir modal de sugerencias
    const modal = document.getElementById('suggestions-modal');
    const analyzingState = document.getElementById('analyzing-state');
    const suggestionsList = document.getElementById('suggestions-list');
    const applyBtn = document.getElementById('apply-suggestions-btn');

    modal.classList.add('active');
    analyzingState.style.display = 'block';
    suggestionsList.style.display = 'none';
    applyBtn.style.display = 'none';

    // Actualizar estado en la página principal
    const suggestionsState = document.getElementById('suggestions-state');
    const suggestionsText = document.getElementById('suggestions-text');
    suggestionsState.classList.add('analyzing');
    suggestionsText.textContent = 'Analizando contenido...';

    // Simular análisis (2 segundos)
    setTimeout(() => {
        // Analizar texto y generar sugerencias
        const tags = detectTags(description);
        suggestedTags = tags;

        // Mostrar sugerencias
        displaySuggestions(tags);

        analyzingState.style.display = 'none';
        suggestionsList.style.display = 'flex';
        applyBtn.style.display = 'block';

        // Actualizar estado
        suggestionsState.classList.remove('analyzing');
        if (tags.length > 0) {
            suggestionsText.innerHTML = `
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" style="stroke: #7b1fa2;">
                    <path d="M12 2L2 7l10 5 10-5-10-5z" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/>
                    <path d="M2 17l10 5 10-5M2 12l10 5 10-5" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/>
                </svg>
                <span style="color: #7b1fa2; font-weight: 600;">Persona</span> <span style="color: #4caf50;">(Alta)</span> + 
                <span style="color: #7b1fa2; font-weight: 600;">Robo</span> <span style="color: #ff9800;">(Media)</span>
            `;
        }
    }, 2000);
}

// Detectar etiquetas del texto
function detectTags(text) {
    const lowerText = text.toLowerCase();
    const tags = [];

    // Diccionario de palabras clave y sus etiquetas
    const keywords = {
        'vehículo': { name: 'Vehículo', confidence: 'Alta' },
        'vehiculo': { name: 'Vehículo', confidence: 'Alta' },
        'carro': { name: 'Vehículo', confidence: 'Alta' },
        'auto': { name: 'Vehículo', confidence: 'Alta' },
        'persona': { name: 'Persona', confidence: 'Alta' },
        'gente': { name: 'Persona', confidence: 'Media' },
        'individuo': { name: 'Persona', confidence: 'Alta' },
        'robo': { name: 'Robo', confidence: 'Media' },
        'robando': { name: 'Robo', confidence: 'Alta' },
        'hurto': { name: 'Robo', confidence: 'Media' },
        'ruido': { name: 'Ruido', confidence: 'Alta' },
        'ruidoso': { name: 'Ruido', confidence: 'Media' },
        'bulla': { name: 'Ruido', confidence: 'Media' },
        'edificio': { name: 'Edificio', confidence: 'Alta' },
        'construccion': { name: 'Edificio', confidence: 'Media' },
        'casa': { name: 'Edificio', confidence: 'Baja' },
        'objeto': { name: 'Objeto', confidence: 'Media' },
        'cosa': { name: 'Objeto', confidence: 'Baja' },
        'accidente': { name: 'Accidente', confidence: 'Alta' },
        'choque': { name: 'Accidente', confidence: 'Media' }
    };

    // Buscar palabras clave
    const foundTags = new Set();
    for (const [keyword, tagData] of Object.entries(keywords)) {
        if (lowerText.includes(keyword) && !foundTags.has(tagData.name)) {
            tags.push(tagData);
            foundTags.add(tagData.name);
        }
    }

    return tags;
}

// Mostrar sugerencias en el modal
function displaySuggestions(tags) {
    const suggestionsList = document.getElementById('suggestions-list');
    suggestionsList.innerHTML = '';

    if (tags.length === 0) {
        suggestionsList.innerHTML = '<p style="text-align: center; color: #86868b;">No se encontraron sugerencias para este texto.</p>';
        return;
    }

    tags.forEach((tag, index) => {
        const item = document.createElement('div');
        item.className = 'suggestion-item';
        item.dataset.index = index;
        item.dataset.tag = tag.name;
        item.dataset.confidence = tag.confidence;

        const confidenceClass = tag.confidence === 'Alta' ? 'confidence-alta' :
                               tag.confidence === 'Media' ? 'confidence-media' :
                               'confidence-baja';

        item.innerHTML = `
            <div class="suggestion-checkbox"></div>
            <div class="suggestion-content">
                <div class="suggestion-name">${tag.name}</div>
                <span class="suggestion-confidence ${confidenceClass}">${tag.confidence}</span>
            </div>
            <button class="suggestion-add" onclick="toggleSuggestion(${index})">+</button>
        `;

        item.addEventListener('click', function(e) {
            if (e.target.classList.contains('suggestion-add')) return;
            toggleSuggestion(index);
        });

        suggestionsList.appendChild(item);
    });
}

// Toggle selección de sugerencia
function toggleSuggestion(index) {
    const item = document.querySelector(`.suggestion-item[data-index="${index}"]`);
    item.classList.toggle('selected');

    const addBtn = item.querySelector('.suggestion-add');
    if (item.classList.contains('selected')) {
        addBtn.textContent = '✓';
        addBtn.style.color = '#4caf50';
    } else {
        addBtn.textContent = '+';
        addBtn.style.color = '#7b1fa2';
    }
}

// Aplicar sugerencias seleccionadas
function applySuggestions() {
    const selectedItems = document.querySelectorAll('.suggestion-item.selected');

    if (selectedItems.length === 0) {
        alert('Selecciona al menos una etiqueta');
        return;
    }

    selectedItems.forEach(item => {
        const tag = {
            name: item.dataset.tag,
            confidence: item.dataset.confidence,
            isIA: true
        };

        // Agregar si no existe ya
        if (!selectedTags.find(t => t.name === tag.name)) {
            selectedTags.push(tag);
        }
    });

    // Actualizar vista
    updateTagsDisplay();
    closeSuggestionsModal();
}

// Actualizar visualización de etiquetas
function updateTagsDisplay() {
    const emptyTags = document.getElementById('empty-tags');
    const appliedTags = document.getElementById('applied-tags');
    const tagsList = document.getElementById('tags-list');
    const feedbackTags = document.getElementById('feedback-tags');

    if (selectedTags.length === 0) {
        emptyTags.style.display = 'block';
        appliedTags.style.display = 'none';
        return;
    }

    emptyTags.style.display = 'none';
    appliedTags.style.display = 'block';

    // Mostrar etiquetas aplicadas
    tagsList.innerHTML = '';
    selectedTags.forEach((tag, index) => {
        const tagElement = document.createElement('div');
        tagElement.className = 'applied-tag';
        tagElement.innerHTML = `
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <path d="M12 2L2 7l10 5 10-5-10-5z" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/>
            </svg>
            ${tag.name}
            ${tag.confidence ? `<span class="confidence">(${tag.confidence})</span>` : ''}
            <button class="remove-tag" onclick="removeTag(${index})">×</button>
        `;
        tagsList.appendChild(tagElement);
    });

    // Mostrar feedback solo para tags de IA
    const iaTags = selectedTags.filter(t => t.isIA);
    feedbackTags.innerHTML = '';

    if (iaTags.length > 0) {
        iaTags.forEach((tag, index) => {
            const feedbackItem = document.createElement('div');
            feedbackItem.className = 'feedback-item';
            feedbackItem.innerHTML = `
                <div class="feedback-item-left">
                    <span>${tag.name}</span>
                </div>
                <div class="feedback-item-actions">
                    <button class="feedback-icon-btn" onclick="openFeedbackModal('${tag.name}')">
                        ¿Útil?
                    </button>
                    <button class="feedback-icon-btn">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                            <path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3" stroke="currentColor" stroke-width="2"/>
                        </svg>
                    </button>
                    <button class="feedback-icon-btn">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                            <path d="M10 15v4a3 3 0 0 0 3 3l4-9V2H5.72a2 2 0 0 0-2 1.7l-1.38 9a2 2 0 0 0 2 2.3zm7-13h2.67A2.31 2.31 0 0 1 22 4v7a2.31 2.31 0 0 1-2.33 2H17" stroke="currentColor" stroke-width="2"/>
                        </svg>
                    </button>
                </div>
            `;
            feedbackTags.appendChild(feedbackItem);
        });
    }

    // Actualizar resumen
    updateSummary();
}

// Actualizar resumen
function updateSummary() {
    const iaTags = selectedTags.filter(t => t.isIA).length;
    const manualTags = selectedTags.filter(t => !t.isIA).length;

    document.getElementById('total-tags').textContent = selectedTags.length;
    document.getElementById('ia-tags').textContent = iaTags;
    document.getElementById('manual-tags').textContent = manualTags;
}

// Remover etiqueta
function removeTag(index) {
    selectedTags.splice(index, 1);
    updateTagsDisplay();
}

// Editar etiquetas
function editTags() {
    alert('Funcionalidad de edición en desarrollo');
}

// Cerrar modal de sugerencias
function closeSuggestionsModal() {
    const modal = document.getElementById('suggestions-modal');
    modal.classList.remove('active');
}

// Abrir modal de feedback
function openFeedbackModal(tagName) {
    currentFeedbackTag = tagName;
    const modal = document.getElementById('feedback-modal');
    document.getElementById('feedback-tag-name').textContent = tagName;
    modal.classList.add('active');
}

// Cerrar modal de feedback
function closeFeedbackModal() {
    const modal = document.getElementById('feedback-modal');
    modal.classList.remove('active');
    currentFeedbackTag = null;
}

// Enviar feedback
function submitFeedback(type) {
    console.log(`Feedback para "${currentFeedbackTag}": ${type}`);
    alert(`Gracias por tu feedback sobre "${currentFeedbackTag}"`);
    closeFeedbackModal();
}

// Event listeners
document.addEventListener('DOMContentLoaded', function() {
    // Cerrar modales al hacer clic fuera
    const modals = document.querySelectorAll('.modal');
    modals.forEach(modal => {
        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                if (modal.id === 'suggestions-modal') {
                    closeSuggestionsModal();
                } else if (modal.id === 'feedback-modal') {
                    closeFeedbackModal();
                }
            }
        });
    });

    // Tecla ESC para cerrar modales
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            closeSuggestionsModal();
            closeFeedbackModal();
        }
    });
});

// Exportar funciones para uso en HTML
window.analyzeTags = analyzeTags;
window.toggleSuggestion = toggleSuggestion;
window.applySuggestions = applySuggestions;
window.removeTag = removeTag;
window.editTags = editTags;
window.closeSuggestionsModal = closeSuggestionsModal;
window.openFeedbackModal = openFeedbackModal;
window.closeFeedbackModal = closeFeedbackModal;
window.submitFeedback = submitFeedback;

