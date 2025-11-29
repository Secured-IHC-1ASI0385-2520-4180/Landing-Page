document.addEventListener('DOMContentLoaded', () => {
 const agenteEl = document.getElementById('agente');
 const desdeEl = document.getElementById('desde');
 const hastaEl = document.getElementById('hasta');
 const aplicarBtn = document.getElementById('btn-aplicar');

 const pantalla1 = document.getElementById('pantalla1');
 const pantallaMapa = document.getElementById('pantalla-mapa');
 const modalExportar = document.getElementById('modal-exportar');

 const infoAgente = document.getElementById('info-agente');
 const cerrarExportBtn = document.getElementById('cerrar-exportar');

 const exportarFinalBtn = document.getElementById('btn-exportar-final');
 const opcionCsvBtn = document.getElementById('opcion-csv');
 const opcionPdfBtn = document.getElementById('opcion-pdf');

 const playBtn = document.getElementById('btn-play');
 const pauseBtn = document.getElementById('btn-pause');
 const progressFill = document.getElementById('progress-fill');


 // utility fechas
 function formatDateYMD(d) {
    const y = d.getFullYear();
    const m = String(d.getMonth()+1).padStart(2,'0');
    const day = String(d.getDate()).padStart(2,'0');
    return `${y}-${m}-${day}`;
 }
 function addDays(d, n){ const r=new Date(d); r.setDate(r.getDate()+n); return r; }

// habilitar aplicar
 function actualizarAplicar() {
    if (agenteEl.value.trim() !== '' && desdeEl.value !== '' && hastaEl.value !== '') {
        aplicarBtn.disabled = false;
        aplicarBtn.classList.remove('disabled');
    } else {
        aplicarBtn.disabled = true;
        aplicarBtn.classList.add('disabled');
    }
 }

// rangos rápidos - comportamiento visual y rellenado fechas
 document.querySelectorAll('.btn-rango').forEach(btn=>{
    btn.addEventListener('click', ()=>{
        // visual
        document.querySelectorAll('.btn-rango').forEach(b=>b.classList.remove('active'));
        btn.classList.add('active');

        const tipo = btn.dataset.rango;
        const hoy = new Date();

        if (tipo === 'hoy') {
            desdeEl.value = formatDateYMD(hoy);
            hastaEl.value = formatDateYMD(hoy);
        } else if (tipo === 'ayer') {
            const ayer = addDays(hoy, -1);
            desdeEl.value = formatDateYMD(ayer);
            hastaEl.value = formatDateYMD(ayer);
        } else if (tipo === '7d') {
            desdeEl.value = formatDateYMD(addDays(hoy, -6));
            hastaEl.value = formatDateYMD(hoy);
        } else if (tipo === 'personalizado') {
            desdeEl.value = '';
            hastaEl.value = '';
            desdeEl.focus();
        }
        actualizarAplicar();
    });
 });

// consultas recientes: al click rellenan agente y rango
 document.querySelectorAll('.consulta-card').forEach(card=>{
    card.addEventListener('click', ()=> {
        const nombre = card.dataset.nombre || card.querySelector('.consulta-nombre').innerText;
        const tipo = card.dataset.rangotype || card.querySelector('.consulta-fecha').innerText.toLowerCase();

        agenteEl.value = nombre;
        // set fechas según tipo
        const hoy = new Date();
        if (tipo === 'hoy' || tipo === 'Hoy' ) {
            desdeEl.value = formatDateYMD(hoy); hastaEl.value = formatDateYMD(hoy);
            document.querySelectorAll('.btn-rango').forEach(b=>b.classList.remove('active'));
            document.querySelector('.btn-rango[data-rango="hoy"]').classList.add('active');
        } else if (tipo === 'ayer' || tipo === 'Ayer') {
            const ayer = addDays(hoy, -1);
            desdeEl.value = formatDateYMD(ayer); hastaEl.value = formatDateYMD(ayer);
            document.querySelectorAll('.btn-rango').forEach(b=>b.classList.remove('active'));
            document.querySelector('.btn-rango[data-rango="ayer"]').classList.add('active');
        } else {
            // 7d / semana
            desdeEl.value = formatDateYMD(addDays(hoy, -6)); hastaEl.value = formatDateYMD(hoy);
            document.querySelectorAll('.btn-rango').forEach(b=>b.classList.remove('active'));
            document.querySelector('.btn-rango[data-rango="7d"]').classList.add('active');
        }

        actualizarAplicar();
    });

    // accesibilidad teclado
    card.addEventListener('keydown', (e)=>{
        if (e.key === 'Enter' || e.key === ' ') card.click();
    });
 });

// inputs para actualizar estado aplicar
 [agenteEl, desdeEl, hastaEl].forEach(el=>{
    el.addEventListener('input', actualizarAplicar);
    el.addEventListener('change', actualizarAplicar);
 });


// aplicar -> ir a pantalla mapa
 aplicarBtn.addEventListener('click', ()=>{
    if (aplicarBtn.disabled) return;
     const nombreAgente = agenteEl.value.trim();
     const desdeTexto = desdeEl.value;
     const hastaTexto = hastaEl.value;

     document.getElementById('nombre-agente-mapa').textContent = nombreAgente;
     document.getElementById('rango-fecha-mapa').textContent = `${desdeTexto} - ${hastaTexto}`;

    pantalla1.classList.remove('active');
    pantallaMapa.classList.add('active');
    window.scrollTo(0,0);
 });


// btn volver desde pantalla mapa a la pantalla 1
    const backBtn = document.getElementById('btn-back');
    backBtn.addEventListener('click', () => {
        if (pantallaMapa.classList.contains('active')) {
            // Estás en pantalla 2 → volver a pantalla 1
            pantallaMapa.classList.remove('active');
            pantalla1.classList.add('active');
            window.scrollTo(0, 0);
        } else if (pantalla1.classList.contains('active')) {
            // Estás en pantalla 1 → ir al menú principal
            const menu = 'variaciones-varias.html';
            fetch(menu, { method: 'HEAD' })
                .then(resp => {
                    if (resp.ok) window.location.href = menu;
                    else history.back();
                })
                .catch(() => history.back());
        }
    });

// player (simulación barra progreso)
    let playInterval = null;
    let progress = 0;

    const progressLabel = document.getElementById('progress-label');

    playBtn.addEventListener('click', () => {
        if (playInterval) return;

        progress = 0;
        progressFill.style.width = '0%';
        progressLabel.innerText = '0%';

        playInterval = setInterval(() => {
            progress += 1;
            progressFill.style.width = progress + '%';
            progressLabel.innerText = progress + '%';

            if (progress >= 100) {
                clearInterval(playInterval);
                playInterval = null;
                playBtn.classList.remove('active');
                pauseBtn.classList.remove('active');
            }
        }, 120);

        // Visual: marcar botón activo
        playBtn.classList.add('active');
        pauseBtn.classList.remove('active');
    });

    pauseBtn.addEventListener('click', () => {
        clearInterval(playInterval);
        playInterval = null;

        // Visual: marcar botón activo
        pauseBtn.classList.add('active');
        playBtn.classList.remove('active');
    });

// exportar: abre pantalla exportar (desde pantalla mapa)
 document.getElementById('btn-exportar').addEventListener('click', ()=>{
    modalExportar.style.display = 'flex';
 });

// Generar CSV simple con los valores visibles
 function generarCSV() {
    const headers = ['Agente','Desde','Hasta','Observaciones'];
    const rows = [];
    const obs = document.getElementById('observaciones') ? document.getElementById('observaciones').value : '';
    rows.push([agenteEl.value, desdeEl.value, hastaEl.value, obs]);
    const csv = [headers.join(','), ...rows.map(r=>r.join(','))].join('\n');
    const blob = new Blob([csv], {type: 'text/csv;charset=utf-8;'});
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `historial_${(agenteEl.value||'agente').replace(/\s+/g,'_')}.csv`;
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
 }

// Generar PDF simple (texto plano convertido a blob - no formateado)
 function generarPDF() {
    const obs = document.getElementById('observaciones') ? document.getElementById('observaciones').value : '';
    const content = `Historial de ${agenteEl.value}\nDesde: ${desdeEl.value}\nHasta: ${hastaEl.value}\n\nObservaciones:\n${obs}`;
    // nota: esto crea un txt con tipo pdf, suficiente para demo sin libreria
    const blob = new Blob([content], {type: 'application/pdf'});
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `historial_${(agenteEl.value||'agente').replace(/\s+/g,'_')}.pdf`;
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
 }
    function volverAlMenu() {
        const menu = 'variaciones-varias.html';
        fetch(menu, {method:'HEAD'}).then(resp=>{
            if (resp.ok) {
                window.location.href = menu;
            } else {
                history.back();
            }
        }).catch(()=> history.back());
    }



// cerrar exportar -> volver a pantalla mapa
 cerrarExportBtn.addEventListener('click', ()=>{
    modalExportar.style.display = 'none';
    exportarFinalBtn.style.display = 'none';
    opcionCsvBtn.classList.remove('active');
    opcionPdfBtn.classList.remove('active');
 });

// Selección CSV
 opcionCsvBtn.addEventListener('click', ()=>{
    opcionCsvBtn.classList.add('active');
    opcionPdfBtn.classList.remove('active');
    exportarFinalBtn.style.display = 'inline-block';
    exportarFinalBtn.textContent = 'Exportar en CSV';
    exportarFinalBtn.onclick = ()=>{ generarCSV(); };
 });

// Selección PDF
    opcionPdfBtn.addEventListener('click', ()=>{
        opcionPdfBtn.classList.add('active');
        opcionCsvBtn.classList.remove('active');
        exportarFinalBtn.style.display = 'inline-block';
        exportarFinalBtn.textContent = 'Exportar en PDF';
        exportarFinalBtn.onclick = ()=>{ generarPDF(); };
    });
});
