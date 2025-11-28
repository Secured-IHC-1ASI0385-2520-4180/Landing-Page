// Bloqueos Viales - Script
// Manejo de vistas y funcionalidades de bloqueos viales

// Datos de ejemplo de bloqueos viales
const bloqueosData = [
    {
        id: 'blq-001',
        nombre: 'Av. Arequipa',
        estado: 'activo',
        tipo: 'total',
        categoria: 'Obra',
        descripcion: 'Obras de ampliación de veredas. Cierre total entre Jr. Lampa y Jr. Camaná.',
        inicio: '01-nov., 08:00 a. m.',
        fin: '15-nov., 06:00 p. m.',
        desvio: '+5 min · Jr. Lampa → Av. Tacna → Jr. Camaná'
    },
    {
        id: 'blq-002',
        nombre: 'Jr. de la Unión',
        estado: 'activo',
        tipo: 'parcial',
        categoria: 'Manifestación',
        descripcion: 'Manifestación pacífica. Permitir paso solo a vehículos de emergencia.',
        inicio: '01-nov., 02:00 p. m.',
        fin: '01-nov., 06:00 p. m.',
        pasoPermitido: 'Patrulla S-15, Patrulla S-22'
    }
];

// Estado de la aplicación
let vistaActual = 'mapa-bloqueos';

// Inicialización
document.addEventListener('DOMContentLoaded', () => {
    actualizarContadorBloqueos();
});

// Navegación entre vistas
function mostrarVista(vistaId) {
    document.querySelectorAll('.vista').forEach(v => v.classList.remove('active'));
    document.getElementById(vistaId).classList.add('active');
    vistaActual = vistaId;
}

function volverAMapaBloqueos() {
    mostrarVista('vista-mapa-bloqueos');
}

function mostrarVistaFiltrada() {
    mostrarVista('vista-lista-bloqueos');
}

// Abrir formulario de nuevo bloqueo
function abrirNuevoBloqueo() {
    limpiarFormulario();
    mostrarVista('vista-nuevo-bloqueo');
}

// Cerrar formulario de nuevo bloqueo
function cerrarNuevoBloqueo() {
    if (formularioTieneDatos()) {
        if (confirm('¿Deseas salir sin guardar los cambios?')) {
            volverAMapaBloqueos();
        }
    } else {
        volverAMapaBloqueos();
    }
}

// Verificar si el formulario tiene datos
function formularioTieneDatos() {
    const nombre = document.getElementById('nombre-via').value;
    const motivo = document.getElementById('motivo-bloqueo').value;
    const nivel = document.getElementById('nivel-bloqueo').value;
    const sector = document.getElementById('sector-bloqueo').value;

    return nombre || motivo || nivel || sector;
}

// Limpiar formulario
function limpiarFormulario() {
    document.getElementById('nombre-via').value = '';
    document.getElementById('motivo-bloqueo').value = '';
    document.getElementById('nivel-bloqueo').value = '';
    document.getElementById('sector-bloqueo').value = '';
    document.getElementById('inicio-bloqueo').value = '';
    document.getElementById('fin-bloqueo').value = '';
    document.getElementById('notas-bloqueo').value = '';
}

// Publicar bloqueo vial
function publicarBloqueo() {
    const nombre = document.getElementById('nombre-via').value;
    const motivo = document.getElementById('motivo-bloqueo').value;
    const nivel = document.getElementById('nivel-bloqueo').value;
    const sector = document.getElementById('sector-bloqueo').value;
    const inicio = document.getElementById('inicio-bloqueo').value;
    const fin = document.getElementById('fin-bloqueo').value;

    // Validación básica
    if (!nombre) {
        alert('Por favor ingresa el nombre de la vía');
        return;
    }

    if (!motivo) {
        alert('Por favor ingresa el motivo del bloqueo');
        return;
    }

    if (!nivel) {
        alert('Por favor selecciona el nivel del bloqueo');
        return;
    }

    if (!sector) {
        alert('Por favor ingresa el sector');
        return;
    }

    if (!inicio) {
        alert('Por favor ingresa la fecha/hora de inicio');
        return;
    }

    if (!fin) {
        alert('Por favor ingresa la fecha/hora de fin');
        return;
    }

    // Crear nuevo bloqueo
    const nuevoBloqueo = {
        id: `blq-${Date.now()}`,
        nombre: nombre,
        estado: 'activo',
        tipo: nivel.toLowerCase().includes('total') ? 'total' : 'parcial',
        categoria: motivo,
        descripcion: document.getElementById('notas-bloqueo').value || 'Sin descripción adicional',
        inicio: formatearFecha(inicio),
        fin: formatearFecha(fin),
        sector: sector
    };

    // Agregar a la lista
    bloqueosData.push(nuevoBloqueo);

    // Mostrar toast de confirmación
    mostrarToast('ETA creado correctamente');

    // Limpiar formulario
    limpiarFormulario();

    // Volver a la vista de mapa después de 1.5 segundos
    setTimeout(() => {
        volverAMapaBloqueos();
        actualizarContadorBloqueos();
    }, 1500);
}

// Mostrar toast de confirmación
function mostrarToast(mensaje) {
    const toast = document.getElementById('toast-confirmacion');
    const toastTexto = toast.querySelector('.toast-texto');

    toastTexto.textContent = mensaje;
    toast.classList.add('show');

    setTimeout(() => {
        toast.classList.remove('show');
    }, 3000);
}

// Formatear fecha para visualización
function formatearFecha(fechaISO) {
    const fecha = new Date(fechaISO);
    const dia = fecha.getDate().toString().padStart(2, '0');
    const meses = ['ene', 'feb', 'mar', 'abr', 'may', 'jun', 'jul', 'ago', 'sep', 'oct', 'nov', 'dic'];
    const mes = meses[fecha.getMonth()];
    let horas = fecha.getHours();
    const minutos = fecha.getMinutes().toString().padStart(2, '0');
    const ampm = horas >= 12 ? 'p. m.' : 'a. m.';

    horas = horas % 12;
    horas = horas ? horas : 12;

    return `${dia}-${mes}., ${horas}:${minutos} ${ampm}`;
}

// Ver detalle de bloqueo
function verDetalleBloqueo(id) {
    const bloqueo = bloqueosData.find(b => b.id === id);

    if (bloqueo) {
        console.log('Ver detalle del bloqueo:', bloqueo);
        alert(`Detalle del bloqueo:\n\nVía: ${bloqueo.nombre}\nEstado: ${bloqueo.estado}\nTipo: ${bloqueo.tipo}\n${bloqueo.descripcion}`);
    }
}

// Definir desvío sugerido
function definirDesvio() {
    alert('Abriendo herramienta para definir desvío sugerido...');
    // Aquí podrías abrir una vista de mapa para trazar el desvío
}

// Actualizar contador de bloqueos
function actualizarContadorBloqueos() {
    const activos = bloqueosData.filter(b => b.estado === 'activo').length;
    const total = bloqueosData.length;

    const contadores = document.querySelectorAll('#contador-bloqueos');
    contadores.forEach(contador => {
        contador.textContent = `${activos} activo${activos !== 1 ? 's' : ''} · ${total} total`;
    });
}

// Simular clic en formulario para mostrar datos (Imagen 4)
function llenarFormularioEjemplo() {
    document.getElementById('nombre-via').value = 'Av. Abancay';
    document.getElementById('motivo-bloqueo').value = 'R...';

    // Simular nivel con color
    const nivelInput = document.getElementById('nivel-bloqueo');
    nivelInput.value = ''; // Vacío pero con color de fondo rojo en la imagen
    nivelInput.style.backgroundColor = '#ff6b6b';

    document.getElementById('sector-bloqueo').value = 'Centro';
    document.getElementById('inicio-bloqueo').value = '2024-11-04T11:00';
    document.getElementById('fin-bloqueo').value = '2024-11-04T18:00';
    document.getElementById('notas-bloqueo').value = 'Detalles adicionales...';
}

// Event listeners para el campo de motivo (selector de colores)
document.getElementById('motivo-bloqueo')?.addEventListener('focus', function() {
    // Aquí podrías mostrar un selector de tipo de motivo
    console.log('Mostrando selector de motivos');
});

// Event listeners para el campo de nivel (selector de colores)
document.getElementById('nivel-bloqueo')?.addEventListener('focus', function() {
    // Aquí podrías mostrar un selector de nivel con colores
    console.log('Mostrando selector de niveles');
});

// Función auxiliar para simular la imagen 4 (datos llenos)
// Esta función se puede llamar desde la consola para testing
function simularFormularioLleno() {
    llenarFormularioEjemplo();
}

