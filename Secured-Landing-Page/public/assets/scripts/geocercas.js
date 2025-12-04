// Gestión de Geocercas - Script
// Manejo de vistas y funcionalidades de geocercas

// Datos de ejemplo de geocercas
const geocercasData = [
    {
        id: 'geo-ctr-001',
        nombre: 'Zona Centro',
        codigo: 'GEO-CTR-001',
        tipo: 'Jurisdicción',
        sector: 'Centro',
        version: 'v3',
        estado: 'publicado',
        icono: '📍',
        vigencia: '01/11/2024',
        modificado: '28/10/2024 15:30',
        autor: 'Carlos Supervisor'
    },
    {
        id: 'geo-nrt-002',
        nombre: 'Zona de Riesgo',
        codigo: 'GEO-NRT-002',
        tipo: 'Zona de riesgo',
        sector: 'Norte',
        version: 'v2',
        estado: 'publicado',
        icono: '📍',
        vigencia: '15/10/2024 - 31/12/2024',
        modificado: '20/10/2024 10:15',
        autor: 'Ana Jefa'
    },
    {
        id: 'geo-sur-003',
        nombre: 'Perímetro',
        codigo: 'GEO-SUR-003',
        tipo: 'Perímetro escuela',
        sector: 'Sur',
        version: 'v1',
        estado: 'programado',
        icono: '🏫',
        vigencia: '01/11/2024 07:00 - 31/12/2024 18:00',
        modificado: '29/10/2024 09:00',
        autor: 'Luis Admin'
    },
    {
        id: 'geo-est-004',
        nombre: 'Ruta Patrullaje',
        codigo: 'GEO-EST-004',
        tipo: 'Ruta de patrullaje',
        sector: 'Este',
        version: 'v1',
        estado: 'borrador',
        icono: '🧭',
        vigencia: '',
        modificado: '30/10/2024 16:45',
        autor: 'Pedro Operador'
    }
];

let geocercaActual = null;

// Inicialización
document.addEventListener('DOMContentLoaded', () => {
    actualizarContador();
});

// Navegación entre vistas
function mostrarVista(vistaId) {
    document.querySelectorAll('.vista').forEach(v => v.classList.remove('active'));
    document.getElementById(vistaId).classList.add('active');
}

function volverALista() {
    mostrarVista('vista-lista');
}

// Crear nueva geocerca
function crearNuevaGeocerca() {
    geocercaActual = null;
    limpiarFormularioEdicion();
    mostrarVista('vista-editar');
}

// Editar geocerca
function editarGeocerca(id) {
    geocercaActual = geocercasData.find(g => g.id === id);
    if (geocercaActual) {
        cargarDatosFormulario(geocercaActual);
        mostrarVista('vista-editar');
    }
}

// Cargar datos en el formulario
function cargarDatosFormulario(geocerca) {
    document.getElementById('nombre-geocerca').value = geocerca.nombre + ' - Jurisdicción PNP';
    document.getElementById('codigo-geocerca').value = geocerca.codigo;
    document.getElementById('tipo-geocerca').value = geocerca.tipo;
    document.getElementById('sector-geocerca').value = geocerca.sector;
}

// Limpiar formulario
function limpiarFormularioEdicion() {
    document.getElementById('nombre-geocerca').value = '';
    document.getElementById('codigo-geocerca').value = '';
    document.getElementById('tipo-geocerca').value = '';
    document.getElementById('sector-geocerca').value = '';
    document.getElementById('vigencia-desde').value = '';
    document.getElementById('vigencia-hasta').value = '';
    document.getElementById('notas-geocerca').value = '';
}

// Guardar como borrador
function guardarBorrador() {
    const nombre = document.getElementById('nombre-geocerca').value;
    if (!nombre) {
        alert('Por favor completa el nombre de la geocerca');
        return;
    }

    alert('Geocerca guardada como borrador');
    volverALista();
}

// Modal de publicar
function abrirModalPublicar() {
    const nombre = document.getElementById('nombre-geocerca').value;
    const codigo = document.getElementById('codigo-geocerca').value;

    if (!nombre || !codigo) {
        alert('Por favor completa los campos requeridos');
        return;
    }

    document.getElementById('modal-nombre-geocerca').textContent = nombre;
    document.getElementById('modal-publicar').classList.add('active');
}

function cerrarModalPublicar() {
    document.getElementById('modal-publicar').classList.remove('active');
}

function seleccionarModoPublicacion(elemento) {
    document.querySelectorAll('.modo-opcion').forEach(m => m.classList.remove('seleccionada'));
    elemento.classList.add('seleccionada');
}

// Publicar geocerca
function publicarGeocerca() {
    const justificacion = document.getElementById('justificacion-publicar').value;

    console.log('Publicando geocerca:', {
        geocerca: geocercaActual,
        justificacion: justificacion
    });

    cerrarModalPublicar();

    // Mostrar vista de impacto
    setTimeout(() => {
        mostrarVista('vista-impacto');
    }, 300);
}

// Publicar directo desde lista
function publicarDirecto(id) {
    geocercaActual = geocercasData.find(g => g.id === id);
    if (geocercaActual) {
        document.getElementById('modal-nombre-geocerca').textContent = geocercaActual.nombre;
        document.getElementById('modal-publicar').classList.add('active');
    }
}

// Vista de impacto
function verImpacto(id) {
    geocercaActual = geocercasData.find(g => g.id === id);
    if (geocercaActual) {
        mostrarVista('vista-impacto');
    }
}

function confirmarCambios() {
    alert('Cambios confirmados. La geocerca ha sido publicada exitosamente.');
    volverALista();
}

// Historial de versiones
function verHistorial(id) {
    geocercaActual = geocercasData.find(g => g.id === id);
    if (geocercaActual) {
        mostrarVista('vista-historial');
    }
}

function verCambiosVersion(version) {
    alert(`Mostrando cambios de la versión ${version}`);
}

function revertirVersion(version) {
    if (confirm(`¿Estás seguro de revertir a la versión ${version}? Esta acción creará una nueva versión.`)) {
        alert(`Revertido a versión ${version}. Se ha creado una nueva versión.`);
        volverALista();
    }
}

// Importar/Exportar
function irAImportarExportar() {
    mostrarVista('vista-importar-exportar');
}

function descargarExportacion() {
    const formato = document.getElementById('formato-exportar').value;

    if (!formato) {
        alert('Por favor selecciona un formato de exportación');
        return;
    }

    alert(`Descargando geocercas en formato ${formato.toUpperCase()}...`);

    // Simular descarga
    console.log('Exportando geocercas con metadatos seleccionados');
}

function procesarArchivoImportado(input) {
    const archivo = input.files[0];

    if (!archivo) return;

    const extension = archivo.name.split('.').pop().toLowerCase();

    if (!['kml', 'geojson', 'json'].includes(extension)) {
        alert('Formato de archivo no soportado. Por favor sube un archivo KML o GeoJSON.');
        input.value = '';
        return;
    }

    alert(`Archivo ${archivo.name} cargado. Procesando validaciones...`);

    // Simular procesamiento
    setTimeout(() => {
        alert('Validaciones completadas:\n✓ Reproyección exitosa\n✓ Sin autointersecciones\n✓ Códigos únicos verificados\n✓ Estructura válida\n\n3 geocercas listas para importar.');
    }, 1500);
}

// Ver más opciones
function verMas(id) {
    alert(`Mostrando más opciones para la geocerca ${id}`);
}

// Actualizar contador
function actualizarContador() {
    const contador = geocercasData.length;
    document.getElementById('contador-geocercas').textContent = `${contador} geocerca${contador !== 1 ? 's' : ''}`;
}

// Búsqueda de geocercas
document.getElementById('buscar-geocerca')?.addEventListener('input', (e) => {
    const termino = e.target.value.toLowerCase();

    document.querySelectorAll('.geocerca-card').forEach(card => {
        const nombre = card.querySelector('.geocerca-nombre').textContent.toLowerCase();
        const codigo = card.querySelector('.geocerca-codigo').textContent.toLowerCase();

        if (nombre.includes(termino) || codigo.includes(termino)) {
            card.style.display = 'flex';
        } else {
            card.style.display = 'none';
        }
    });
});

