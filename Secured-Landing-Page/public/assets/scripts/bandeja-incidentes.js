// Variables globales
let unidadSeleccionada = null;
let countdownInterval = null;

// Función para mostrar una vista específica
function mostrarVista(vistaId) {
    // Ocultar todas las vistas
    document.querySelectorAll('.vista').forEach(vista => {
        vista.classList.remove('active');
    });

    // Cerrar todos los modales
    document.querySelectorAll('.modal').forEach(modal => {
        modal.classList.remove('activo');
    });

    // Mostrar la vista solicitada
    const vista = document.getElementById(vistaId);
    if (vista) {
        vista.classList.add('active');
    }
}

// Función para mostrar un modal
function mostrarModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.add('activo');
    }
}

// Función para cerrar un modal
function cerrarModalGenerico(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.remove('activo');
    }
}

// NAVEGACIÓN ENTRE VISTAS

// Desde vista detalle -> vista selección lista
function mostrarSeleccionUnidad() {
    mostrarVista('vista-seleccion-lista');
}

// Volver a detalle
function volverDetalle() {
    mostrarVista('vista-detalle');
}

// Volver a lista
function volverLista() {
    mostrarVista('vista-seleccion-lista');
}

// TABS
function cambiarTab(tab) {
    if (tab === 'lista') {
        mostrarVista('vista-seleccion-lista');
    } else if (tab === 'mapa') {
        mostrarVista('vista-seleccion-mapa');
    }
}

// IR A MAPA (cuando se selecciona Serenazgo C desde lista)
function irAMapa() {
    unidadSeleccionada = 'serenazgoC';
    mostrarVista('vista-seleccion-mapa');
}

// MOSTRAR CONFIRMACIÓN (Patrulla 7 - sin motivo)
function mostrarConfirmacion(unidad) {
    unidadSeleccionada = unidad;
    mostrarModal('modal-confirmacion');
}

// CERRAR MODAL CONFIRMACIÓN
function cerrarModal() {
    cerrarModalGenerico('modal-confirmacion');
}

// MOSTRAR CONFIRMACIÓN CON MOTIVO (Serenazgo C desde mapa)
function mostrarConfirmacionMotivo() {
    unidadSeleccionada = 'serenazgoC';
    mostrarModal('modal-confirmacion-motivo');
}

// CERRAR MODAL CONFIRMACIÓN CON MOTIVO
function cerrarModalMotivo() {
    cerrarModalGenerico('modal-confirmacion-motivo');
}

// MOSTRAR ESTADO DE REASIGNACIÓN
function mostrarEstado() {
    // Cerrar modales
    cerrarModal();
    cerrarModalMotivo();

    // Mostrar vista de estado
    mostrarVista('vista-estado');

    // Iniciar countdown
    iniciarCountdown();
}

// COUNTDOWN TIMER
function iniciarCountdown() {
    let tiempoRestante = 298; // 4:58 en segundos

    const actualizarTiempo = () => {
        const minutos = Math.floor(tiempoRestante / 60);
        const segundos = tiempoRestante % 60;
        const countdownElement = document.getElementById('countdown');

        if (countdownElement) {
            countdownElement.textContent = `${minutos}:${segundos.toString().padStart(2, '0')}`;
        }

        tiempoRestante--;

        if (tiempoRestante < 0) {
            clearInterval(countdownInterval);
        }
    };

    // Limpiar cualquier countdown previo
    if (countdownInterval) {
        clearInterval(countdownInterval);
    }

    countdownInterval = setInterval(actualizarTiempo, 1000);
}

// MOSTRAR MODAL COMPLETADO
function mostrarCompletado() {
    // Limpiar countdown
    if (countdownInterval) {
        clearInterval(countdownInterval);
    }

    mostrarModal('modal-completado');
}

// FINALIZAR REASIGNACIÓN
function finalizarReasignacion() {
    cerrarModalGenerico('modal-completado');

    // Resetear formulario
    const motivoTextarea = document.getElementById('motivo-textarea');
    if (motivoTextarea) {
        motivoTextarea.value = '';
    }

    const charCount = document.getElementById('char-count');
    if (charCount) {
        charCount.textContent = '0';
    }

    const btnConfirmarMotivo = document.getElementById('btn-confirmar-motivo');
    if (btnConfirmarMotivo) {
        btnConfirmarMotivo.disabled = true;
    }

    // Volver a vista inicial
    mostrarVista('vista-detalle');

    // Mostrar notificación de éxito
    mostrarNotificacionExito();
}

// NOTIFICACIÓN DE ÉXITO
function mostrarNotificacionExito() {
    const notificacion = document.createElement('div');
    notificacion.style.cssText = `
        position: fixed;
        top: 80px;
        left: 50%;
        transform: translateX(-50%);
        background: #34c759;
        color: white;
        padding: 14px 20px;
        border-radius: 12px;
        box-shadow: 0 4px 20px rgba(52, 199, 89, 0.4);
        z-index: 3000;
        animation: slideDown 0.3s ease;
        font-weight: 500;
        font-size: 14px;
        max-width: 90%;
        text-align: center;
    `;
    notificacion.textContent = '✓ Reasignación completada exitosamente';

    // Agregar estilos de animación
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideDown {
            from { transform: translateX(-50%) translateY(-20px); opacity: 0; }
            to { transform: translateX(-50%) translateY(0); opacity: 1; }
        }
        @keyframes slideUp {
            from { transform: translateX(-50%) translateY(0); opacity: 1; }
            to { transform: translateX(-50%) translateY(-20px); opacity: 0; }
        }
    `;

    if (!document.querySelector('style[data-notifications]')) {
        style.setAttribute('data-notifications', 'true');
        document.head.appendChild(style);
    }

    document.body.appendChild(notificacion);

    // Eliminar después de 3 segundos
    setTimeout(() => {
        notificacion.style.animation = 'slideUp 0.3s ease';
        setTimeout(() => {
            notificacion.remove();
        }, 300);
    }, 3000);
}

// MANEJO DE CHIPS/FILTROS
function activarChip(chip) {
    const parent = chip.parentElement;
    const siblings = parent.querySelectorAll('.chip');

    // Deseleccionar todos los hermanos del mismo grupo
    siblings.forEach(s => s.classList.remove('active'));

    // Activar el chip seleccionado
    chip.classList.add('active');
}

// MANEJO DEL TEXTAREA DE MOTIVO
document.addEventListener('DOMContentLoaded', () => {
    const motivoTextarea = document.getElementById('motivo-textarea');
    const charCount = document.getElementById('char-count');
    const btnConfirmarMotivo = document.getElementById('btn-confirmar-motivo');

    if (motivoTextarea && charCount && btnConfirmarMotivo) {
        motivoTextarea.addEventListener('input', () => {
            const length = motivoTextarea.value.length;
            charCount.textContent = length;

            // Habilitar/deshabilitar botón según tenga texto
            btnConfirmarMotivo.disabled = length === 0;
        });
    }

    // Inicializar vista detalle como activa
    mostrarVista('vista-detalle');
});

// Limpiar countdown al salir
window.addEventListener('beforeunload', () => {
    if (countdownInterval) {
        clearInterval(countdownInterval);
    }
});

console.log('Bandeja de incidentes cargada correctamente');

