// ============================================
// TABLERO DE ASIGNACIONES - SECURED
// Manejo de flujo de vistas y filtros
// ============================================

document.addEventListener('DOMContentLoaded', function() {
    initTableroAsignacion();
});

// ============================================
// INICIALIZACIÓN
// ============================================

function initTableroAsignacion() {
    // Botones de navegación
    const btnVolverEsperando = document.getElementById('btnVolverEsperando');
    const btnVolverRecordatorio = document.getElementById('btnVolverRecordatorio');
    const btnVolverRecibidas = document.getElementById('btnVolverRecibidas');

    // Botones de "Ver pendientes"
    const btnVerPendientes = document.getElementById('btnVerPendientes');
    const btnVerPendientes2 = document.getElementById('btnVerPendientes2');
    const btnVerPendientes3 = document.getElementById('btnVerPendientes3');
    const btnVerPendientes4 = document.getElementById('btnVerPendientes4');

    // Tabs de filtro
    const filterTabs = document.querySelectorAll('.ta-filter-tab');

    // Event listeners para volver a vista principal
    if (btnVolverEsperando) {
        btnVolverEsperando.addEventListener('click', function() {
            changeView('todas');
            resetFilters();
        });
    }

    if (btnVolverRecordatorio) {
        btnVolverRecordatorio.addEventListener('click', function() {
            changeView('todas');
            resetFilters();
        });
    }

    if (btnVolverRecibidas) {
        btnVolverRecibidas.addEventListener('click', function() {
            changeView('todas');
            resetFilters();
        });
    }

    // Event listeners para "Ver pendientes"
    const verPendientesBtns = [btnVerPendientes, btnVerPendientes2, btnVerPendientes3, btnVerPendientes4];
    verPendientesBtns.forEach(btn => {
        if (btn) {
            btn.addEventListener('click', function() {
                alert('Mostrando todas las asignaciones pendientes de acuse');
                changeView('esperando');
            });
        }
    });

    // Event listeners para tabs de filtro
    filterTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            const filter = this.getAttribute('data-filter');
            const fromView = this.getAttribute('data-from');

            // Actualizar tabs activos en la vista actual
            const parentFilters = this.closest('.ta-filters');
            const siblingTabs = parentFilters.querySelectorAll('.ta-filter-tab');
            siblingTabs.forEach(t => t.classList.remove('ta-filter-tab-active'));
            this.classList.add('ta-filter-tab-active');

            // Cambiar vista
            changeView(filter);
        });
    });

    // Inicializar contador de tiempo
    updateTimeStamps();
    setInterval(updateTimeStamps, 60000); // Actualizar cada minuto
}

// ============================================
// CAMBIAR VISTA
// ============================================

function changeView(viewName) {
    // Ocultar todas las vistas
    const views = document.querySelectorAll('.ta-view');
    views.forEach(view => {
        view.classList.remove('ta-view-active');
    });

    // Mostrar vista seleccionada
    const targetView = document.querySelector(`[data-view="${viewName}"]`);
    if (targetView) {
        targetView.classList.add('ta-view-active');

        // Scroll al inicio de la página
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
}

// ============================================
// RESETEAR FILTROS
// ============================================

function resetFilters() {
    // Resetear todos los tabs a "Todas" activo
    const allFilterTabs = document.querySelectorAll('.ta-filter-tab');
    allFilterTabs.forEach(tab => {
        tab.classList.remove('ta-filter-tab-active');
        if (tab.getAttribute('data-filter') === 'todas') {
            tab.classList.add('ta-filter-tab-active');
        }
    });
}

// ============================================
// ACTUALIZAR TIMESTAMPS
// ============================================

function updateTimeStamps() {
    const timeElements = document.querySelectorAll('.ta-assignment-time');

    timeElements.forEach((element, index) => {
        // Simular actualización de tiempo
        // En producción, esto vendría del servidor
        const minutes = [2, 15, 8, 20, 30];
        if (minutes[index]) {
            element.textContent = `Hace ${minutes[index]} min`;
        }
    });
}

// ============================================
// MENÚ CONTEXTUAL DE TARJETAS
// ============================================

document.addEventListener('click', function(e) {
    if (e.target.classList.contains('ta-menu-button')) {
        e.preventDefault();
        showContextMenu(e.target);
    }
});

function showContextMenu(button) {
    const card = button.closest('.ta-assignment-card');
    const incidentId = card.querySelector('.ta-assignment-id').textContent;

    const options = [
        'Ver detalles',
        'Enviar recordatorio',
        'Reasignar unidad',
        'Ver en mapa',
        'Cancelar asignación'
    ];

    // Crear menú contextual simple con alert
    // En producción, esto sería un menú dropdown personalizado
    const choice = confirm(`Opciones para ${incidentId}:\n\n${options.join('\n')}\n\n¿Deseas ver más opciones?`);

    if (choice) {
        alert(`Abriendo opciones para ${incidentId}`);
    }
}

// ============================================
// FILTRADO DE ASIGNACIONES (SIMULADO)
// ============================================

function filterAssignments(status) {
    const allCards = document.querySelectorAll('.ta-assignment-card');
    let visibleCount = 0;

    allCards.forEach(card => {
        const badge = card.querySelector('.ta-status-badge');
        let shouldShow = false;

        if (status === 'todas') {
            shouldShow = true;
        } else if (status === 'esperando' && badge.classList.contains('ta-status-esperando')) {
            shouldShow = true;
        } else if (status === 'recordatorio' && badge.classList.contains('ta-status-recordatorio')) {
            shouldShow = true;
        } else if (status === 'recibidas' && badge.classList.contains('ta-status-recibida')) {
            shouldShow = true;
        }

        if (shouldShow) {
            card.style.display = 'block';
            visibleCount++;
        } else {
            card.style.display = 'none';
        }
    });

    // Actualizar contador
    const countElement = document.querySelector('.ta-assignments-count');
    if (countElement) {
        const plural = visibleCount !== 1 ? 'asignaciones' : 'asignación';
        countElement.textContent = `${visibleCount} ${plural}`;
    }
}

// ============================================
// NOTIFICACIÓN DE NUEVAS ASIGNACIONES
// ============================================

function notifyNewAssignment() {
    // Simular nueva asignación
    const notification = document.createElement('div');
    notification.className = 'ta-notification';
    notification.innerHTML = `
        <div class="ta-notification-content">
            <strong>Nueva asignación</strong>
            <p>INC-2025-043 - Robo de vehículo</p>
        </div>
    `;

    // Agregar estilos inline (en producción estarían en CSS)
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: #ffffff;
        border: 1px solid #d7e0f0;
        border-radius: 12px;
        padding: 16px 20px;
        box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);
        z-index: 1000;
        animation: slideIn 0.3s ease-out;
    `;

    document.body.appendChild(notification);

    // Remover después de 5 segundos
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease-in';
        setTimeout(() => notification.remove(), 300);
    }, 5000);
}

// ============================================
// SIMULAR ACTUALIZACIONES EN TIEMPO REAL
// ============================================

// Simular cambios de estado cada 30 segundos
let simulationInterval;

function startSimulation() {
    simulationInterval = setInterval(() => {
        // Simular cambio aleatorio de estado
        const cards = document.querySelectorAll('.ta-assignment-card');
        if (cards.length > 0) {
            const randomCard = cards[Math.floor(Math.random() * cards.length)];
            const badge = randomCard.querySelector('.ta-status-badge');

            if (badge && badge.classList.contains('ta-status-esperando')) {
                // Cambiar a "Recordatorio enviado"
                badge.className = 'ta-status-badge ta-status-recordatorio';
                badge.innerHTML = '<span class="ta-status-icon">🔔</span>Recordatorio enviado';

                console.log('Estado actualizado: Recordatorio enviado');
            }
        }
    }, 30000); // Cada 30 segundos
}

function stopSimulation() {
    if (simulationInterval) {
        clearInterval(simulationInterval);
    }
}

// Iniciar simulación (descomentar para activar)
// startSimulation();

// ============================================
// EXPORTAR DATOS
// ============================================

function exportAssignments() {
    const assignments = [];
    const cards = document.querySelectorAll('.ta-assignment-card');

    cards.forEach(card => {
        const id = card.querySelector('.ta-assignment-id').textContent;
        const type = card.querySelector('.ta-assignment-type').textContent;
        const unit = card.querySelector('.ta-unit-value').textContent;
        const code = card.querySelector('.ta-assignment-code').textContent;
        const time = card.querySelector('.ta-assignment-time').textContent;
        const status = card.querySelector('.ta-status-badge').textContent.trim();

        assignments.push({
            id,
            type,
            unit,
            code,
            time,
            status
        });
    });

    console.log('Asignaciones exportadas:', assignments);

    // En producción, esto generaría un archivo CSV o Excel
    alert(`Exportando ${assignments.length} asignaciones...\n\nFormato: CSV\nDestino: Descargas`);
}

// ============================================
// BÚSQUEDA DE ASIGNACIONES
// ============================================

function searchAssignments(query) {
    const cards = document.querySelectorAll('.ta-assignment-card');
    let visibleCount = 0;

    cards.forEach(card => {
        const id = card.querySelector('.ta-assignment-id').textContent.toLowerCase();
        const type = card.querySelector('.ta-assignment-type').textContent.toLowerCase();
        const unit = card.querySelector('.ta-unit-value').textContent.toLowerCase();
        const code = card.querySelector('.ta-assignment-code').textContent.toLowerCase();

        const searchTerm = query.toLowerCase();

        if (id.includes(searchTerm) || type.includes(searchTerm) ||
            unit.includes(searchTerm) || code.includes(searchTerm)) {
            card.style.display = 'block';
            visibleCount++;
        } else {
            card.style.display = 'none';
        }
    });

    // Actualizar contador
    const countElement = document.querySelector('.ta-assignments-count');
    if (countElement) {
        const plural = visibleCount !== 1 ? 'asignaciones' : 'asignación';
        countElement.textContent = `${visibleCount} ${plural}`;
    }

    return visibleCount;
}

// ============================================
// ESTADÍSTICAS DEL TABLERO
// ============================================

function getAssignmentStats() {
    const esperando = document.querySelectorAll('.ta-status-esperando').length;
    const recordatorio = document.querySelectorAll('.ta-status-recordatorio').length;
    const recibidas = document.querySelectorAll('.ta-status-recibida').length;
    const total = esperando + recordatorio + recibidas;

    return {
        total,
        esperando,
        recordatorio,
        recibidas,
        pendientes: esperando + recordatorio
    };
}

// Exponer funciones globalmente para debugging
window.tableroAsignacion = {
    changeView,
    filterAssignments,
    exportAssignments,
    searchAssignments,
    getAssignmentStats,
    startSimulation,
    stopSimulation
};

// ============================================
// LOG DE INICIALIZACIÓN
// ============================================

console.log('Tablero de Asignaciones inicializado');
console.log('Estadísticas:', getAssignmentStats());

