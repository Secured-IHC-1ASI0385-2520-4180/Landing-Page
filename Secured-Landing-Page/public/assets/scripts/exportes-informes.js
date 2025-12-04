document.addEventListener('DOMContentLoaded', () => {
    const backBtn = document.getElementById('btn-back');
    const lista = document.getElementById('lista-solicitudes');
    const detalle = document.getElementById('detalle-solicitud');
    const detalleContenido = document.querySelector('#detalle-solicitud .detalle-contenido');
    const vistaMisExportes = document.getElementById('vista-mis-exportes');
    const bandejaExportes = document.getElementById('bandeja-exportes');
    const notificacion = document.getElementById('notificacion-descarga');
    const tabs = document.querySelectorAll('.filtro-tab');
    const btnMisExportes = document.getElementById('btn-mis-exportes');

    let solicitudSeleccionada = null;

    // ---------------- FUNCIONES AUXILIARES ----------------
    function iconForType(tipo) {
        if (tipo === 'Foto') return '📷';
        if (tipo === 'Video') return '🎥';
        return '📄';
    }

    function estadoVisual(estado) {
        if (estado === 'aprobado') return { texto: '✅ Aprobado', clase: 'aprobado' };
        if (estado === 'rechazado') return { texto: '❌ Rechazado', clase: 'rechazado' };
        return { texto: '🟡 Pendiente', clase: 'pendiente' };
    }

    // ---------------- RENDER DETALLE ----------------
    function renderDetalleFromCard(card) {
        const datos = card.dataset;
        const estadoUI = estadoVisual(datos.estado || 'pendiente');
        const archivos = JSON.parse(datos.archivos || '[]');
        const traza = JSON.parse(datos.traza || '[]');

        const archivosHTML = archivos.map(a =>
            `<li>${iconForType(a.tipo)} ${a.nombre} (${a.tipo}) – ${a.peso}</li>`
        ).join('');

        const trazaHTML = traza.map(t =>
            `<p>• <strong>${t.evento}:</strong> ${t.usuario} · ${t.fecha}</p>`
        ).join('');

        const html = `
          <div class="detalle-encabezado">
            <h2>${datos.id}</h2>
            <span class="estado-visual ${estadoUI.clase}">${estadoUI.texto}</span>
          </div>
          <section>
            <h3>Resumen de solicitud</h3>
            <p><strong>Tipo de exporte:</strong> ${datos.tipo}</p>
            <p><strong>Solicitante:</strong> ${datos.solicitante}</p>
            <p><strong>Fecha de solicitud:</strong> ${datos.fecha}</p>
            <p><strong>Rango de datos:</strong> ${datos.rango}</p>
            <p><strong>Tamaño estimado:</strong> ${datos.tamano}</p>
          </section>
          <section>
            <h3>Justificación del solicitante</h3>
            <p>${datos.justificacion || ''}</p>
          </section>
          <section>
            <h3>Contenido incluido</h3>
            <p><strong>${archivos.length} archivos</strong> · <strong>${datos.pesoTotal}</strong> · <strong>${datos.incidentes} incidentes</strong></p>
            <ul>${archivosHTML}</ul>
          </section>
          <section>
            <h3>Trazabilidad</h3>
            ${trazaHTML}
          </section>
          <div class="acciones-detalle">
            <button id="abrir-rechazar" class="btn-secundario">Rechazar</button>
            <button id="abrir-aprobar" class="btn-primario">Aprobar</button>
          </div>
        `;

        detalleContenido.innerHTML = html;
        bindDetalleActions();
    }

    function bindDetalleActions() {
        const btnA = document.getElementById('abrir-aprobar');
        const btnR = document.getElementById('abrir-rechazar');

        if (btnA) btnA.onclick = () => abrirModal('aprobar');
        if (btnR) btnR.onclick = () => abrirModal('rechazar');
    }

    lista.addEventListener('click', (e) => {
        const btn = e.target.closest('.btn-ver-detalle');
        if (!btn) return;
        const card = btn.closest('.solicitud-card');
        if (!card) return;
        solicitudSeleccionada = card;
        renderDetalleFromCard(card);
        lista.style.display = 'none';
        detalle.style.display = 'block';
    });

    // ---------------- MODAL ----------------
    function abrirModal(tipo) {
        const modal = document.getElementById('modal-solicitud');
        const titulo = document.getElementById('modal-titulo');
        const mensaje = document.getElementById('modal-mensaje');
        const resumen = document.getElementById('modal-resumen');
        const nota = document.getElementById('modal-nota');
        const bloqueRechazo = document.getElementById('bloque-rechazo');
        const confirmarBtn = document.getElementById('modal-confirmar');
        const error = document.getElementById('error-rechazo');

        const datos = solicitudSeleccionada.dataset;

        resumen.innerHTML = `
            <p><strong>ID:</strong> ${datos.id}</p>
            <p><strong>Tipo:</strong> ${datos.tipo}</p>
            <p><strong>Solicitante:</strong> ${datos.solicitante}</p>
            <p><strong>Rango:</strong> ${datos.rango}</p>
            <p><strong>Tamaño:</strong> ${datos.tamano}</p>
        `;

        // Limpia evento previo
        confirmarBtn.onclick = null;

        if (tipo === 'aprobar') {
            titulo.textContent = '✅ Aprobar solicitud';
            mensaje.textContent = 'Estás a punto de aprobar la solicitud de exporte. Al confirmar, el solicitante podrá descargar el paquete.';
            nota.textContent = 'El enlace de descarga estará activo por 7 días. Esta acción quedará registrada en el log de auditoría.';
            bloqueRechazo.style.display = 'none';

            confirmarBtn.textContent = 'Confirmar aprobación';
            confirmarBtn.onclick = confirmarAprobacion;
        } else {
            titulo.textContent = '❌ Rechazar solicitud';
            mensaje.textContent = `Estás a punto de rechazar la ${datos.id} de solicitud ${datos.solicitante}`;
            nota.textContent = 'Esta acción quedará registrada en auditoría.';
            bloqueRechazo.style.display = 'block';

            confirmarBtn.textContent = 'Confirmar rechazo';
            confirmarBtn.onclick = confirmarRechazo;
        }

        error.style.display = 'none';
        modal.style.display = 'flex';
    }

    document.getElementById('modal-cancelar').addEventListener('click', () => {
        document.getElementById('modal-solicitud').style.display = 'none';
    });

    // ---------------- CONFIRMAR ----------------
    function confirmarAprobacion() {
        if (!solicitudSeleccionada) return;

        const estadoEl = solicitudSeleccionada.querySelector('.estado-visual, .estado-label');
        if (estadoEl) {
            estadoEl.textContent = '✅ Aprobado';
            estadoEl.className = 'estado-visual aprobado';
        }
        solicitudSeleccionada.dataset.estado = 'aprobado';

        document.getElementById('modal-solicitud').style.display = 'none';
        detalle.style.display = 'none';
        lista.style.display = 'flex';
        renderMisExportes();
    }

    function confirmarRechazo() {
        if (!solicitudSeleccionada) return;

        const motivo = document.getElementById('motivo-rechazo').value.trim();
        const error = document.getElementById('error-rechazo');

        if (!motivo) {
            error.style.display = 'block';
            return;
        }

        const estadoEl = solicitudSeleccionada.querySelector('.estado-visual, .estado-label');
        if (estadoEl) {
            estadoEl.textContent = '❌ Rechazado';
            estadoEl.className = 'estado-visual rechazado';
        }
        solicitudSeleccionada.dataset.estado = 'rechazado';

        alert(`Solicitud rechazada. Motivo: ${motivo}`);

        document.getElementById('modal-solicitud').style.display = 'none';
        detalle.style.display = 'none';
        lista.style.display = 'flex';
        renderMisExportes();
    }

// ---------------- MIS EXPORTES ----------------
    btnMisExportes.addEventListener('click', () => {
        lista.style.display = 'none';
        detalle.style.display = 'none';
        vistaMisExportes.style.display = 'block';
        renderMisExportes();

        btnMisExportes.textContent = '👁️ Bandeja';
        btnMisExportes.classList.add('btn-azul');

        btnMisExportes.onclick = () => {
            vistaMisExportes.style.display = 'none';
            lista.style.display = 'flex';
            btnMisExportes.textContent = 'Mis exportes';
            btnMisExportes.classList.remove('btn-azul'); // limpia estilo al volver
            btnMisExportes.onclick = null;
        };
    });
    // ---------------- RENDER BANDEJA ----------------
    function renderMisExportes(filtro = 'todos') {
        bandejaExportes.innerHTML = '';
        const cards = Array.from(document.querySelectorAll('#lista-solicitudes .solicitud-card'));
        let visibles = cards.filter(c => filtro === 'todos' || c.dataset.estado === filtro);

        visibles.forEach(c => {
            const estadoUI = estadoVisual(c.dataset.estado);
            const tarjeta = document.createElement('div');
            tarjeta.className = 'solicitud-card';
            tarjeta.innerHTML = `
                <div class="solicitud-header">
                  <strong>${c.dataset.id}</strong> | ${c.dataset.tipo}
                  <span class="estado-visual ${estadoUI.clase}">${estadoUI.texto}</span>
                </div>
                <div class="solicitud-detalle">
                  <p><strong>Solicitado:</strong> ${c.dataset.fecha}</p>
                  <p><strong>Rango:</strong> ${c.dataset.rango}</p>
                </div>
                <div class="acciones-detalle">
                  <button class="btn-secundario btn-ver-detalle-exporte">Ver detalle</button>
                  <button class="btn-primario" ${c.dataset.estado === 'aprobado' ? '' : 'disabled'}>
                    ${c.dataset.estado === 'aprobado' ? 'Descargar' : 'No disponible'}
                  </button>
                </div>
            `;
            bandejaExportes.appendChild(tarjeta);

            tarjeta.querySelector('.btn-ver-detalle-exporte').onclick = () => {
                solicitudSeleccionada = c;
                renderDetalleFromCard(c);
                vistaMisExportes.style.display = 'none';
                detalle.style.display = 'block';
            };
        });

        // Mostrar notificación si hay exportes aprobados
        notificacion.style.display = cards.some(c => c.dataset.estado === 'aprobado') ? 'block' : 'none';
    }

    // ---------------- NAVEGACIÓN ----------------
    backBtn.addEventListener('click', () => {
        if (detalle.style.display === 'block') {
            detalle.style.display = 'none';
            lista.style.display = 'flex';
        } else if (vistaMisExportes.style.display === 'block') {
            vistaMisExportes.style.display = 'none';
            lista.style.display = 'flex';
        } else {
            window.location.href = 'variaciones-varias.html'; // tu ruta principal
        }
    });

    // ---------------- FILTROS ----------------
    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            tabs.forEach(t => t.classList.remove('activo'));
            tab.classList.add('activo');
            renderMisExportes(tab.dataset.filtro);
        });
    });
});