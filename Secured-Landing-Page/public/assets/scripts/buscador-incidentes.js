// ================================
// CAMBIO DE VISTAS
// ================================
function showView(viewId) {
    document.querySelectorAll('.view').forEach(view => {
        view.classList.remove('active');
    });
    document.getElementById(viewId).classList.add('active');
}

// ================================
// DATOS DE EJEMPLO
// ================================
const incidentesData = [
    {
        codigo: 'INC-2025-082',
        tipo: 'Robo en progreso',
        prioridad: 'alta',
        estado: 'Abierto',
        descripcion: 'Ubicacion en Av. Proceres',
        distrito: 'sur',
        fecha: '2025-03-23',
        unidad: 'PAT-01'
    },
    {
        codigo: 'INC-2025-083',
        tipo: 'Accidente de tránsito',
        prioridad: 'media',
        estado: 'Asignado',
        descripcion: 'Choque en intersección',
        distrito: 'norte',
        fecha: '2025-03-25',
        unidad: 'PAT-02'
    }
];

let incidentesFiltrados = [...incidentesData];

// ================================
// APLICAR FILTROS
// ================================
function aplicarFiltros() {
    const filtros = {
        codigo: document.getElementById('filtro-codigo').value.toLowerCase(),
        texto: document.getElementById('filtro-texto').value.toLowerCase(),
        tipo: document.getElementById('filtro-tipo').value,
        prioridad: document.getElementById('filtro-prioridad').value,
        estado: document.getElementById('filtro-estado').value.toLowerCase(),
        fechaInicio: document.getElementById('filtro-fecha-inicio').value,
        fechaFin: document.getElementById('filtro-fecha-fin').value,
        distrito: document.getElementById('filtro-distrito').value,
        unidad: document.getElementById('filtro-unidad').value.toLowerCase()
    };

    // Filtrar incidentes
    incidentesFiltrados = incidentesData.filter(incidente => {
        let cumple = true;

        if (filtros.codigo && !incidente.codigo.toLowerCase().includes(filtros.codigo)) {
            cumple = false;
        }

        if (filtros.texto) {
            const textoCompleto = `${incidente.tipo} ${incidente.descripcion}`.toLowerCase();
            if (!textoCompleto.includes(filtros.texto)) {
                cumple = false;
            }
        }

        if (filtros.tipo && !incidente.tipo.toLowerCase().includes(filtros.tipo)) {
            cumple = false;
        }

        if (filtros.prioridad && incidente.prioridad !== filtros.prioridad) {
            cumple = false;
        }

        if (filtros.estado && !incidente.estado.toLowerCase().includes(filtros.estado)) {
            cumple = false;
        }

        if (filtros.fechaInicio && incidente.fecha < filtros.fechaInicio) {
            cumple = false;
        }

        if (filtros.fechaFin && incidente.fecha > filtros.fechaFin) {
            cumple = false;
        }

        if (filtros.distrito && incidente.distrito !== filtros.distrito) {
            cumple = false;
        }

        if (filtros.unidad && !incidente.unidad.toLowerCase().includes(filtros.unidad)) {
            cumple = false;
        }

        return cumple;
    });

    // Actualizar vista
    actualizarTabla();
    mostrarFiltrosActivos(filtros);
    showView('buscador');
    actualizarContador();
}

// ================================
// ACTUALIZAR TABLA
// ================================
function actualizarTabla() {
    const tbody = document.getElementById('tabla-body');

    if (incidentesFiltrados.length === 0) {
        tbody.innerHTML = `
            <tr>
                <td colspan="4" style="text-align: center; padding: 40px; color: #6b7280;">
                    No se encontraron incidentes con los filtros aplicados
                </td>
            </tr>
        `;
        return;
    }

    tbody.innerHTML = incidentesFiltrados.map(incidente => {
        const codigoFormateado = incidente.codigo.replace(/INC-/, 'INC-<br>').replace(/-(\d{3})$/, '-<br>$1');
        const prioridadClass = incidente.prioridad;
        const prioridadText = incidente.prioridad.charAt(0).toUpperCase() + incidente.prioridad.slice(1);

        return `
            <tr>
                <td class="codigo">${codigoFormateado}</td>
                <td>${incidente.tipo}</td>
                <td><span class="prioridad ${prioridadClass}">${prioridadText}</span></td>
                <td>${incidente.estado}</td>
            </tr>
        `;
    }).join('');
}

// ================================
// MOSTRAR FILTROS ACTIVOS
// ================================
function mostrarFiltrosActivos(filtros) {
    const container = document.getElementById('filtros-activos');
    const chipsContainer = document.getElementById('filtros-chips');

    const filtrosActivos = [];
    const labels = {
        codigo: 'Código',
        texto: 'Texto',
        tipo: 'Tipo',
        prioridad: 'Prioridad',
        estado: 'Estado',
        fechaInicio: 'Desde',
        fechaFin: 'Hasta',
        distrito: 'Distrito',
        unidad: 'Unidad'
    };

    // Construir chips
    Object.keys(filtros).forEach(key => {
        if (filtros[key]) {
            const label = labels[key];
            let value = filtros[key];

            // Formatear valores
            if (key === 'tipo') {
                const select = document.getElementById('filtro-tipo');
                value = select.options[select.selectedIndex].text;
            }
            if (key === 'prioridad' || key === 'estado' || key === 'distrito') {
                value = value.charAt(0).toUpperCase() + value.slice(1);
            }

            filtrosActivos.push({ key, label, value });
        }
    });

    if (filtrosActivos.length > 0) {
        container.classList.remove('hidden');
        chipsContainer.innerHTML = filtrosActivos.map(filtro => `
            <div class="chip">
                <strong>${filtro.label}:</strong>${filtro.value}
                <button class="chip-close" onclick="removerFiltro('${filtro.key}')">×</button>
            </div>
        `).join('');
    } else {
        container.classList.add('hidden');
    }
}

// ================================
// REMOVER FILTRO INDIVIDUAL
// ================================
function removerFiltro(key) {
    const input = document.getElementById(`filtro-${key}`);
    if (input) {
        input.value = '';
    }
    aplicarFiltros();
}

// ================================
// LIMPIAR TODOS LOS FILTROS
// ================================
function limpiarFiltros() {
    document.getElementById('filtro-codigo').value = '';
    document.getElementById('filtro-texto').value = '';
    document.getElementById('filtro-tipo').value = '';
    document.getElementById('filtro-prioridad').value = '';
    document.getElementById('filtro-estado').value = '';
    document.getElementById('filtro-fecha-inicio').value = '';
    document.getElementById('filtro-fecha-fin').value = '';
    document.getElementById('filtro-distrito').value = '';
    document.getElementById('filtro-unidad').value = '';

    incidentesFiltrados = [...incidentesData];
    actualizarTabla();
    document.getElementById('filtros-activos').classList.add('hidden');
    actualizarContador();
}

// ================================
// ACTUALIZAR CONTADOR
// ================================
function actualizarContador() {
    const contador = document.querySelector('.resultados-count');
    const cantidad = incidentesFiltrados.length;
    contador.textContent = `${cantidad} resultado${cantidad !== 1 ? 's' : ''}`;
}

// ================================
// INICIALIZACIÓN
// ================================
document.addEventListener('DOMContentLoaded', function() {
    actualizarTabla();
    actualizarContador();

    // Búsqueda en tiempo real (opcional)
    const searchInput = document.querySelector('.search-input');
    searchInput.addEventListener('input', function(e) {
        const query = e.target.value.toLowerCase();

        if (query.length === 0) {
            incidentesFiltrados = [...incidentesData];
        } else {
            incidentesFiltrados = incidentesData.filter(incidente => {
                const textoCompleto = `${incidente.codigo} ${incidente.tipo} ${incidente.descripcion}`.toLowerCase();
                return textoCompleto.includes(query);
            });
        }

        actualizarTabla();
        actualizarContador();
    });
});

