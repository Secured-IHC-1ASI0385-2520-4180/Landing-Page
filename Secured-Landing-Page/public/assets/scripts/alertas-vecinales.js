// Alertas Vecinales - Script
// Manejo de vistas y funcionalidades de alertas vecinales

// Datos de las alertas
const alertasData = {
    'alert-001': {
        id: 'alert-001',
        codigo: 'ALR-001',
        titulo: 'Sirena activada - Robo/Intento de hurto',
        ubicacion: 'Av. Los Próceres 12',
        direccionCompleta: 'Av. Los Próceres 123',
        distrito: 'San Juan de Lurigancho, Lima',
        tiempo: '20:41',
        mapa: 'alertas-vecinales-1.png',
        contacto: {
            nombre: 'Junta Vecinal Las Flores',
            telefono: '987-654-321',
            avatar: 'JV'
        }
    },
    'alert-002': {
        id: 'alert-002',
        codigo: 'ALR-002',
        titulo: 'Sirena activada - Disturbio público',
        ubicacion: 'Jr. Las Palmas 456',
        direccionCompleta: 'Jr. Las Palmas 456',
        distrito: 'San Juan de Lurigancho, Lima',
        tiempo: '19:30',
        mapa: 'alertas-vecinales-2.png',
        contacto: {
            nombre: 'Junta Vecinal Las Palmas',
            telefono: '987-123-456',
            avatar: 'JP'
        }
    }
};

// Estado de la aplicación
let alertaActual = null;
let incidenteActual = null;
let prioridadSeleccionada = 'alta';

// Inicialización
document.addEventListener('DOMContentLoaded', () => {
    // Configurar contador de caracteres
    const descripcionTextarea = document.getElementById('descripcion-incidente');
    if (descripcionTextarea) {
        descripcionTextarea.addEventListener('input', actualizarContadorCaracteres);
    }
});

// Navegación entre vistas
function mostrarVista(vistaId) {
    document.querySelectorAll('.vista').forEach(v => v.classList.remove('active'));
    document.getElementById(vistaId).classList.add('active');
}

function volverAListaAlertas() {
    mostrarVista('vista-lista-alertas');
}

// Ver detalle de alerta (botón de arriba derecha en lista)
function verDetalleAlerta(alertaId) {
    alertaActual = alertasData[alertaId];
    if (!alertaActual) return;

    // Por ahora, redirigir a validar
    validarAlerta(alertaId);
}

// Validar alerta (abre formulario de crear incidente)
function validarAlerta(alertaId) {
    alertaActual = alertasData[alertaId];
    if (!alertaActual) return;

    // Cargar datos de la alerta en el formulario
    document.getElementById('alerta-titulo-crear').textContent = alertaActual.titulo;
    document.getElementById('alerta-ubicacion-crear').textContent = alertaActual.ubicacion;
    document.getElementById('alerta-tiempo-crear').textContent = `Recibida a las ${alertaActual.tiempo}`;

    // Determinar tipo de incidente basado en el título
    const tipoSelect = document.getElementById('tipo-incidente');
    if (alertaActual.titulo.includes('Disturbio')) {
        tipoSelect.value = 'hurto'; // Cambiar de disturbio a hurto como se solicita
    } else if (alertaActual.titulo.includes('Robo')) {
        tipoSelect.value = 'robo-arrebato';
    }

    // Limpiar formulario
    limpiarFormularioIncidente();

    // Mostrar vista de crear incidente
    mostrarVista('vista-crear-incidente');
}

// Cerrar crear incidente
function cerrarCrearIncidente() {
    if (confirm('¿Deseas salir sin crear el incidente?')) {
        volverAListaAlertas();
    }
}

// Limpiar formulario de incidente
function limpiarFormularioIncidente() {
    document.getElementById('descripcion-incidente').value = '';
    document.getElementById('contador').textContent = '0';
    prioridadSeleccionada = 'alta';

    // Resetear botones de prioridad
    document.querySelectorAll('.prioridad-btn').forEach(btn => btn.classList.remove('active'));
    document.querySelector('.prioridad-btn.alta').classList.add('active');
}

// Actualizar contador de caracteres
function actualizarContadorCaracteres() {
    const textarea = document.getElementById('descripcion-incidente');
    const contador = document.getElementById('contador');
    const length = textarea.value.length;
    contador.textContent = length;

    if (length > 500) {
        textarea.value = textarea.value.substring(0, 500);
        contador.textContent = '500';
    }
}

// Seleccionar prioridad
function seleccionarPrioridad(prioridad) {
    prioridadSeleccionada = prioridad;

    // Actualizar UI
    document.querySelectorAll('.prioridad-btn').forEach(btn => btn.classList.remove('active'));
    document.querySelector(`.prioridad-btn.${prioridad}`).classList.add('active');
}

// Actualizar tipo de incidente
function actualizarTipoIncidente() {
    const tipoSelect = document.getElementById('tipo-incidente');
    console.log('Tipo seleccionado:', tipoSelect.value);
}

// Adjuntar evidencias
function adjuntarFoto() {
    alert('Abriendo cámara para tomar foto...');
}

function adjuntarAudio() {
    alert('Iniciando grabación de audio...');
}

// Crear incidente desde alerta
function crearIncidenteDesdeAlerta() {
    const tipo = document.getElementById('tipo-incidente').value;
    const descripcion = document.getElementById('descripcion-incidente').value;

    // Validaciones
    if (!descripcion.trim()) {
        alert('Por favor ingresa una descripción del incidente');
        return;
    }

    // Mapear tipo de incidente a nombre legible
    const tiposIncidente = {
        'robo-al-paso': 'Robo al paso',
        'hurto': 'Hurto',
        'disturbio': 'Disturbio público',
        'robo-arrebato': 'Robo/Arrebato'
    };

    // Generar código de incidente
    const codigoIncidente = 'SEC-' + Math.floor(Math.random() * 90000 + 10000);

    // Crear objeto de incidente
    incidenteActual = {
        codigo: codigoIncidente,
        tipo: tiposIncidente[tipo] || tipo,
        descripcion: descripcion,
        prioridad: prioridadSeleccionada,
        alerta: alertaActual,
        estado: 'Pendiente asignación',
        creado: 'Hoy a las 20:45'
    };

    // Cargar datos en la vista de detalle
    cargarDetalleIncidente();

    // Mostrar vista de detalle con mensaje de éxito
    mostrarVista('vista-detalle-incidente');

    // Mostrar mensaje de éxito temporalmente
    mostrarMensajeExito();
}

// Cargar datos del incidente en la vista de detalle
function cargarDetalleIncidente() {
    if (!incidenteActual) return;

    // Header
    document.getElementById('codigo-incidente').textContent = incidenteActual.codigo;
    document.getElementById('titulo-incidente').textContent = incidenteActual.tipo;

    // Tab Resumen
    document.getElementById('detalle-codigo').textContent = incidenteActual.codigo;
    document.getElementById('detalle-tipo').textContent = incidenteActual.tipo;
    document.getElementById('detalle-creado').textContent = incidenteActual.creado;

    // Tab Ubicación
    if (alertaActual) {
        const mapaImg = document.getElementById('mapa-alerta');
        mapaImg.src = `Secured-Landing-Page/public/assets/images/${alertaActual.mapa}`;

        document.getElementById('direccion-ubicacion').textContent = alertaActual.direccionCompleta;
        document.getElementById('distrito-ubicacion').textContent = alertaActual.distrito;
    }
}

// Mostrar mensaje de éxito
function mostrarMensajeExito() {
    const mensajeExito = document.getElementById('mensaje-exito');
    if (mensajeExito) {
        mensajeExito.style.display = 'flex';

        // Ocultar después de 4 segundos
        setTimeout(() => {
            mensajeExito.style.display = 'none';
        }, 4000);
    }
}

// Cambiar tab
function cambiarTab(tabName) {
    // Actualizar tabs
    document.querySelectorAll('.tab').forEach(tab => tab.classList.remove('active'));
    document.querySelectorAll('.tab-content').forEach(content => content.classList.remove('active'));

    // Activar tab seleccionado
    event.target.classList.add('active');
    document.getElementById(`tab-${tabName}`).classList.add('active');
}

// Acciones de botones
function asignarUnidad() {
    if (incidenteActual) {
        alert(`Abriendo vista para asignar unidad al incidente ${incidenteActual.codigo}...`);
        // Aquí podrías navegar a la vista de asignación de unidades
    }
}

function solicitarApoyo() {
    if (incidenteActual) {
        alert(`Solicitando apoyo para el incidente ${incidenteActual.codigo}...`);
    }
}

function verEvidencias() {
    if (incidenteActual) {
        alert(`Mostrando evidencias del incidente ${incidenteActual.codigo}...`);
    }
}

// Función para simular diferentes escenarios desde la consola
function simularIncidente(tipo) {
    if (tipo === 'robo') {
        validarAlerta('alert-001');
        document.getElementById('tipo-incidente').value = 'robo-arrebato';
    } else if (tipo === 'hurto') {
        validarAlerta('alert-002');
        document.getElementById('tipo-incidente').value = 'hurto';
    }
}

