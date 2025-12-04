// ========= Utilidades =========
function abrirPanel(id) {
    const el = document.getElementById(id);
    if (el) el.classList.remove('oculto');
}
function cerrarPanel(id) {
    const el = document.getElementById(id);
    if (el) el.classList.add('oculto');
}

document.addEventListener('DOMContentLoaded', () => {
// ========= Botón TTD =========
    const pantallaDashboard = document.getElementById('pantalla-dashboard');
    const pantallaTTD = document.getElementById('pantalla-ttd');
    const cardTTD = document.getElementById('ttd-card');
    const volverBtn = document.getElementById('volver-dashboard');

    if (cardTTD && pantallaTTD) {
        cardTTD.addEventListener('click', () => {
            pantallaDashboard.classList.add('oculto');
            pantallaTTD.classList.remove('oculto');
            pantallaTTD.scrollIntoView({ behavior: 'smooth', block: 'start' });
        });
    }

    if (volverBtn) {
        volverBtn.addEventListener('click', () => {
            pantallaTTD.classList.add('oculto');
            pantallaDashboard.classList.remove('oculto');
        });
    }
    if (cardTTD && pantallaTTD) {
    cardTTD.addEventListener('click', () => {
        pantallaTTD.classList.remove('oculto');
        pantallaTTD.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
    }

// ========= Botón Filtros =========
    const btnFiltros = document.getElementById('btn-filtros');
    const panelFiltros = document.getElementById('panel-filtros');
    const btnComparar = document.getElementById('btn-comparar');
    const aplicarFiltros = document.getElementById('aplicar-filtros');
// Botón Filtros → toggle normal
    btnFiltros.addEventListener('click', () => {
        const visible = !panelFiltros.classList.contains('oculto');
        panelFiltros.classList.toggle('oculto');
        btnFiltros.classList.toggle('activo', !visible);
    });

// Botón Comparar período → toggle del mismo panel, pero independiente
    btnComparar.addEventListener('click', () => {
        const visible = !panelFiltros.classList.contains('oculto');
        panelFiltros.classList.toggle('oculto');
        btnComparar.classList.toggle('activo', !visible);
    });
    document.querySelectorAll('.btn-periodo').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('.btn-periodo').forEach(b => b.classList.remove('activo'));
            btn.classList.add('activo');
        });
    });
    if (aplicarFiltros) {
        aplicarFiltros.addEventListener('click', () => {
            panelFiltros.classList.add('oculto');
            btnFiltros.classList.remove('activo');
            btnComparar.classList.remove('activo');
            alert('Filtros aplicados correctamente');
        });
    }


// ========= Botón Guardar vista =========
    const btnGuardar = document.getElementById('btn-guardar');
    const modalGuardar = document.getElementById('modal-guardar-vista');
    const inputNombreVista = document.getElementById('nombre-vista');
    const btnGuardarConfirm = document.getElementById('guardar-vista-confirm');
    const btnCancelarGuardar = document.getElementById('cancelar-guardar');

    // Abrir modal al presionar el botón
    btnGuardar.addEventListener('click', () => {
        modalGuardar.classList.remove('oculto');
    });

// Activar botón solo si hay texto
    inputNombreVista.addEventListener('input', () => {
        btnGuardarConfirm.disabled = inputNombreVista.value.trim() === '';
    });

// Guardar vista
    btnGuardarConfirm.addEventListener('click', () => {
        const nombre = inputNombreVista.value.trim();
        const compartir = document.getElementById('compartir-vista').checked;
        alert(`Vista "${nombre}" guardada${compartir ? ' y compartida' : ''} correctamente`);
        modalGuardar.classList.add('oculto');
        inputNombreVista.value = '';
        btnGuardarConfirm.disabled = true;
    });

// Cancelar
    btnCancelarGuardar.addEventListener('click', () => {
        modalGuardar.classList.add('oculto');
        inputNombreVista.value = '';
        btnGuardarConfirm.disabled = true;
    });

document.querySelectorAll('.card.seleccionable').forEach(card => {
    card.addEventListener('click', () => {
        card.classList.toggle('seleccionada');
    });
});
    const btnCSV = document.getElementById('exportar-csv');
    const btnPDF = document.getElementById('exportar-pdf');

    if (btnCSV) {
        btnCSV.addEventListener('click', () => {
            alert('Exportando CSV...');
        });
    }
    if (btnPDF) {
        btnPDF.addEventListener('click', () => {
            alert('Exportando PDF...');
        });
    }
    btnGuardar.addEventListener('click', () => {
        modalGuardar.classList.remove('oculto');
    });
    // ========= Selección de tarjetas =========
    document.querySelectorAll('.card.seleccionable').forEach(card => {
        card.addEventListener('click', () => {
            card.classList.toggle('seleccionada');
        });
    });
});



