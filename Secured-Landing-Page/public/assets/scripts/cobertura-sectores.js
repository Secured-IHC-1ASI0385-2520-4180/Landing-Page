// Cobertura de Sectores - Script
// Manejo de navegación entre vistas y acciones

// Ir a la vista de reglas
function irAReglas() {
    document.getElementById('vista-cobertura').classList.remove('active');
    document.getElementById('vista-reglas').classList.add('active');
}

// Volver a la vista de cobertura
function volverACobertura() {
    document.getElementById('vista-reglas').classList.remove('active');
    document.getElementById('vista-cobertura').classList.add('active');
}

// Guardar regla y volver a cobertura
function guardarRegla() {
    // Aquí podrías agregar validación de datos
    const nombreRegla = document.getElementById('nombreRegla').value;
    const umbralIncidentes = document.getElementById('umbralIncidentes').value;
    const ventanaReaccion = document.getElementById('ventanaReaccion').value;

    // Simular guardado
    console.log('Guardando regla:', {
        nombre: nombreRegla,
        umbral: umbralIncidentes,
        ventana: ventanaReaccion
    });

    // Mostrar mensaje de éxito (opcional)
    alert('Regla guardada exitosamente');

    // Volver a la vista de cobertura
    volverACobertura();
}

// Aceptar sugerencia de reequilibrio
function aceptarSugerencia() {
    // Aquí podrías implementar la lógica para aceptar la sugerencia
    console.log('Sugerencia aceptada');
    alert('Sugerencia aceptada. Se ha iniciado el reequilibrio.');

    // Opcional: Ocultar la tarjeta de sugerencia
    const sugerenciaCard = document.querySelector('.sugerencia-card');
    if (sugerenciaCard) {
        sugerenciaCard.style.display = 'none';
    }
}

// Rechazar sugerencia de reequilibrio
function rechazarSugerencia() {
    // Aquí podrías implementar la lógica para rechazar la sugerencia
    console.log('Sugerencia rechazada');

    // Opcional: Ocultar la tarjeta de sugerencia
    const sugerenciaCard = document.querySelector('.sugerencia-card');
    if (sugerenciaCard) {
        sugerenciaCard.style.display = 'none';
    }

    // Actualizar el badge
    const badge = document.querySelector('.badge');
    if (badge) {
        badge.textContent = '0';
    }
}

