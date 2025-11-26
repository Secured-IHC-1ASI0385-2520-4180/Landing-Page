// Mapa de Incidentes - Script
// Manejo de vistas, filtros y funcionalidades del mapa

// Datos de incidentes de ejemplo
const incidentesData = [
    {
        id: 'INC-2024-004',
        codigo: 'INC-2024-004',
        titulo: 'Accidente de tránsito menor',
        tipo: 'accidente',
        prioridad: 'alta',
        icono: '🚗',
        ubicacion: 'Av. Aviación 234',
        distrito: 'San Borja',
        distancia: '0.3 km',
        tiempo: 'Ahora',
        tiempoRelativo: 0,
        estado: 'Activo',
        lat: -12.0897,
        lng: -77.0028
    },
    {
        id: 'INC-2024-001',
        codigo: 'INC-2024-001',
        titulo: 'Alteración del orden público',
        tipo: 'alteracion',
        prioridad: 'alta',
        icono: '⚠️',
        ubicacion: 'Av. Javier Prado 890',
        distrito: 'San Isidro',
        distancia: '0.8 km',
        tiempo: 'Hace 15 min',
        tiempoRelativo: 15,
        estado: 'Activo',
        lat: -12.0879,
        lng: -77.0339
    },
    {
        id: 'INC-2024-005',
        codigo: 'INC-2024-005',
        titulo: 'Robo en establecimiento',
        tipo: 'robo',
        prioridad: 'alta',
        icono: '🛍',
        ubicacion: 'Av. Benavides 1234',
        distrito: 'Miraflores',
        distancia: '1.2 km',
        tiempo: 'Hace 30 min',
        tiempoRelativo: 30,
        estado: 'En proceso',
        lat: -12.1195,
        lng: -77.0301
    },
    {
        id: 'INC-2024-002',
        codigo: 'INC-2024-002',
        titulo: 'Vehículo sospechoso estacionado',
        tipo: 'sospechoso',
        prioridad: 'media',
        icono: '👁',
        ubicacion: 'Calle Las Orquídeas 567',
        distrito: 'Miraflores',
        distancia: '2.3 km',
        tiempo: 'Hace 1h 30min',
        tiempoRelativo: 90,
        estado: 'Activo',
        lat: -12.1097,
        lng: -77.0312
    },
    {
        id: 'INC-2024-003',
        codigo: 'INC-2024-003',
        titulo: 'Ruido excesivo - local comercial',
        tipo: 'ruido',
        prioridad: 'baja',
        icono: '🔊',
        ubicacion: 'Av. Conquistadores 890',
        distrito: 'San Isidro',
        distancia: '1.5 km',
        tiempo: 'Hace 14h',
        tiempoRelativo: 840,
        estado: 'Pendiente',
        lat: -12.0912,
        lng: -77.0389
    }
];

// Estado de la aplicación
let filtrosActivos = {
    prioridad: [],
    tipo: [],
    tiempo: null,
    jurisdiccion: null
};

let incidentesFiltrados = [...incidentesData];
let vistaActual = 'mapa';

// Inicialización
document.addEventListener('DOMContentLoaded', () => {
    actualizarContadorIncidentes();
    generarListaIncidentes();
});

// Navegación entre vistas
function mostrarVistaLista() {
    document.getElementById('vista-mapa').classList.remove('active');
    document.getElementById('vista-lista').classList.add('active');
    vistaActual = 'lista';
    generarListaIncidentes();
}

function volverAMapa() {
    document.getElementById('vista-lista').classList.remove('active');
    document.getElementById('vista-sin-resultados').classList.remove('active');
    document.getElementById('vista-mapa').classList.add('active');
    vistaActual = 'mapa';
}

// Filtrado por prioridad (botones rápidos)
function filtrarPorPrioridad(prioridad) {
    const btn = document.querySelector(`.priority-btn[data-prioridad="${prioridad}"]`);

    if (btn.classList.contains('active')) {
        btn.classList.remove('active');
        filtrosActivos.prioridad = filtrosActivos.prioridad.filter(p => p !== prioridad);
    } else {
        // Remover active de otros botones
        document.querySelectorAll('.priority-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        filtrosActivos.prioridad = [prioridad];
    }

    aplicarFiltrosActivos();
}

function filtrarEnLista(prioridad) {
    filtrarPorPrioridad(prioridad);
}

// Aplicar filtros activos
function aplicarFiltrosActivos() {
    incidentesFiltrados = incidentesData.filter(incidente => {
        // Filtro de prioridad
        if (filtrosActivos.prioridad.length > 0 && !filtrosActivos.prioridad.includes(incidente.prioridad)) {
            return false;
        }

        // Filtro de tipo
        if (filtrosActivos.tipo.length > 0 && !filtrosActivos.tipo.includes(incidente.tipo)) {
            return false;
        }

        // Filtro de jurisdicción
        if (filtrosActivos.jurisdiccion && incidente.distrito !== getDistritoNombre(filtrosActivos.jurisdiccion)) {
            return false;
        }

        // Filtro de tiempo
        if (filtrosActivos.tiempo) {
            const limite = getTiempoLimite(filtrosActivos.tiempo);
            if (incidente.tiempoRelativo > limite) {
                return false;
            }
        }

        return true;
    });

    actualizarContadorIncidentes();

    if (vistaActual === 'lista') {
        generarListaIncidentes();
    }

    // Mostrar vista sin resultados si no hay incidentes
    if (incidentesFiltrados.length === 0) {
        mostrarSinResultados();
    }
}

// Actualizar contador de incidentes
function actualizarContadorIncidentes() {
    const contador = incidentesFiltrados.length;
    const texto = `Mostrando ${contador} ${contador === 1 ? 'incidente' : 'incidentes'}`;

    const contadorMapa = document.getElementById('contador-incidentes');
    const contadorLista = document.getElementById('lista-mostrando');
    const listaContador = document.getElementById('lista-contador');

    if (contadorMapa) contadorMapa.textContent = texto;
    if (contadorLista) contadorLista.textContent = texto;
    if (listaContador) listaContador.textContent = `${contador} resultado${contador !== 1 ? 's' : ''}`;
}

// Generar lista de incidentes
function generarListaIncidentes() {
    const listaContainer = document.getElementById('incidentes-lista');
    if (!listaContainer) return;

    listaContainer.innerHTML = '';

    incidentesFiltrados.forEach(incidente => {
        const card = document.createElement('div');
        card.className = 'incidente-card';
        card.onclick = () => abrirDetalleIncidente(incidente);

        card.innerHTML = `
            <div class="incidente-icono ${incidente.prioridad}">
                ${incidente.icono}
            </div>
            <div class="incidente-info">
                <div class="incidente-header">
                    <span class="incidente-codigo">${incidente.codigo}</span>
                    <span class="badge-${incidente.prioridad}">${capitalize(incidente.prioridad)}</span>
                </div>
                <div class="incidente-titulo">${incidente.titulo}</div>
                <div class="incidente-meta">
                    <span>⏰ ${incidente.tiempo}</span>
                    <span>📍 ${incidente.distancia}</span>
                    <span>${incidente.distrito}</span>
                </div>
            </div>
            <div class="incidente-arrow">›</div>
        `;

        listaContainer.appendChild(card);
    });
}

// Mostrar vista sin resultados
function mostrarSinResultados() {
    document.getElementById('vista-mapa').classList.remove('active');
    document.getElementById('vista-lista').classList.remove('active');
    document.getElementById('vista-sin-resultados').classList.add('active');
}

// Modal de filtros
function toggleFiltrosModal() {
    const modal = document.getElementById('modal-filtros');
    modal.classList.toggle('active');
}

// Toggle de chips en filtros
function toggleChip(elemento) {
    elemento.classList.toggle('active');
}

function toggleChipUnico(elemento) {
    const chips = elemento.parentElement.querySelectorAll('.chip');
    chips.forEach(chip => chip.classList.remove('active'));
    elemento.classList.add('active');
}

// Toggle de opciones en filtros
function toggleOpcion(elemento) {
    elemento.classList.toggle('active');
    const check = elemento.querySelector('.opcion-check');
    check.textContent = elemento.classList.contains('active') ? '☑' : '☐';
}

// Aplicar filtros desde el modal
function aplicarFiltros() {
    // Recoger prioridades
    filtrosActivos.prioridad = [];
    document.querySelectorAll('.filtro-chips .chip.active').forEach(chip => {
        const valor = chip.textContent.trim().toLowerCase();
        if (['alta', 'media', 'baja'].includes(valor)) {
            filtrosActivos.prioridad.push(valor);
        }
    });

    // Recoger tipos de incidente
    filtrosActivos.tipo = [];
    document.querySelectorAll('.opcion-btn.active').forEach(btn => {
        const valor = btn.getAttribute('data-valor');
        if (valor) {
            filtrosActivos.tipo.push(valor);
        }
    });

    // Recoger tiempo
    const tiempoChip = document.querySelector('.filtro-section:nth-child(3) .chip.active');
    if (tiempoChip) {
        filtrosActivos.tiempo = tiempoChip.textContent.trim().toLowerCase();
    }

    // Recoger jurisdicción
    const jurisdiccionRadio = document.querySelector('input[name="jurisdiccion"]:checked');
    if (jurisdiccionRadio) {
        filtrosActivos.jurisdiccion = jurisdiccionRadio.value;
    }

    // Aplicar filtros
    aplicarFiltrosActivos();

    // Sincronizar botones de prioridad
    sincronizarBotonesPrioridad();

    // Cerrar modal
    toggleFiltrosModal();

    // Mostrar vista de lista si hay resultados
    if (incidentesFiltrados.length > 0) {
        mostrarVistaLista();
    }
}

// Sincronizar botones de prioridad con filtros del modal
function sincronizarBotonesPrioridad() {
    document.querySelectorAll('.priority-btn').forEach(btn => {
        const prioridad = btn.getAttribute('data-prioridad');
        if (prioridad) {
            if (filtrosActivos.prioridad.includes(prioridad)) {
                btn.classList.add('active');
            } else {
                btn.classList.remove('active');
            }
        }
    });
}

// Limpiar filtros del modal
function limpiarFiltrosModal() {
    document.querySelectorAll('.chip.active').forEach(chip => chip.classList.remove('active'));
    document.querySelectorAll('.opcion-btn.active').forEach(btn => {
        btn.classList.remove('active');
        btn.querySelector('.opcion-check').textContent = '☐';
    });
}

// Quitar todos los filtros
function quitarFiltros() {
    filtrosActivos = {
        prioridad: [],
        tipo: [],
        tiempo: null,
        jurisdiccion: null
    };

    // Limpiar botones
    document.querySelectorAll('.priority-btn').forEach(btn => btn.classList.remove('active'));

    // Limpiar modal
    limpiarFiltrosModal();

    // Aplicar filtros (sin filtros = mostrar)
    aplicarFiltrosActivos();
}

function limpiarFiltros() {
    quitarFiltros();
    volverAMapa();
}

// Abrir detalle de incidente
function abrirDetalleIncidente(incidente) {
    const modal = document.getElementById('modal-detalle');

    // Actualizar contenido del modal
    document.getElementById('detalle-codigo').textContent = incidente.codigo;
    document.getElementById('detalle-badge').textContent = capitalize(incidente.prioridad);
    document.getElementById('detalle-badge').className = `badge-${incidente.prioridad}`;
    document.getElementById('detalle-titulo').textContent = incidente.titulo;
    document.getElementById('detalle-tipo').textContent = getTipoNombre(incidente.tipo);
    document.getElementById('detalle-ubicacion').textContent = incidente.ubicacion;
    document.getElementById('detalle-distrito').textContent = `${incidente.distrito} • ${incidente.distancia}`;
    document.getElementById('detalle-hora').textContent = incidente.tiempo;
    document.getElementById('detalle-estado').textContent = incidente.estado;

    // Actualizar icono del header
    const detalleIcono = document.querySelector('.detalle-icono');
    detalleIcono.textContent = incidente.icono;
    detalleIcono.className = `detalle-icono ${incidente.prioridad}`;

    modal.classList.add('active');
}

function cerrarDetalle() {
    document.getElementById('modal-detalle').classList.remove('active');
}

// Navegar a incidente
function navegarAIncidente() {
    alert('Abriendo navegación al incidente...');
    // Aquí podrías integrar con Google Maps o similar
}

function verDetalleCompleto() {
    alert('Abriendo detalle completo del incidente...');
    // Aquí podrías navegar a una página de detalle completo
}

// Ordenar incidentes
function ordenarPor(criterio) {
    document.querySelectorAll('.orden-btn').forEach(btn => btn.classList.remove('active'));
    event.target.classList.add('active');

    if (criterio === 'reciente') {
        incidentesFiltrados.sort((a, b) => a.tiempoRelativo - b.tiempoRelativo);
    } else if (criterio === 'distancia') {
        incidentesFiltrados.sort((a, b) => {
            const distA = parseFloat(a.distancia);
            const distB = parseFloat(b.distancia);
            return distA - distB;
        });
    }

    generarListaIncidentes();
}

// Controles de zoom
function zoomIn() {
    console.log('Zoom in');
}

function zoomOut() {
    console.log('Zoom out');
}

function centrarUbicacion() {
    console.log('Centrar en ubicación actual');
}

function toggleMenu() {
    console.log('Abrir menú');
}

// Utilidades
function capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

function getTipoNombre(tipo) {
    const tipos = {
        'accidente': 'Accidente de tránsito',
        'alteracion': 'Alteración del orden público',
        'robo': 'Robo',
        'sospechoso': 'Actividad sospechosa',
        'ruido': 'Ruido excesivo'
    };
    return tipos[tipo] || tipo;
}

function getDistritoNombre(jurisdiccion) {
    const distritos = {
        'san-isidro': 'San Isidro',
        'miraflores': 'Miraflores',
        'san-borja': 'San Borja',
        'surco': 'Surco',
        'la-molina': 'La Molina'
    };
    return distritos[jurisdiccion] || jurisdiccion;
}

function getTiempoLimite(tiempo) {
    const limites = {
        'ultima hora': 60,
        'hoy': 1440,
        'esta semana': 10080,
        'todos': Infinity
    };
    return limites[tiempo] || Infinity;
}

