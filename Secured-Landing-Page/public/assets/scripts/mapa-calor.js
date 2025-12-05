// Mapa de Calor - Script
// Manejo de modales y funcionalidad del mapa de calor

const modalFilters = document.getElementById("modal-filters");
const modalExport = document.getElementById("modal-export");
const btnFilters = document.getElementById("btn-filters");
const btnExport = document.getElementById("btn-export");
const applyFilters = document.getElementById("apply-filters");

// Funciones para abrir y cerrar modales
function openModal(m) {
    if (!m) return;
    m.setAttribute("aria-hidden", "false");
    document.body.classList.add("blurred");
}

function closeModal(m) {
    if (!m) return;
    m.setAttribute("aria-hidden", "true");
    document.body.classList.remove("blurred");
}

// Event listeners para abrir modales
if (btnFilters) {
    btnFilters.addEventListener("click", () => openModal(modalFilters));
}

if (btnExport) {
    btnExport.addEventListener("click", () => openModal(modalExport));
}

// Event listeners para cerrar modales con botones [data-close]
document.querySelectorAll("[data-close]").forEach((btn) => {
    btn.addEventListener("click", (e) => {
        const modal = e.target.closest(".modal");
        if (modal) closeModal(modal);
    });
});

// Event listeners para cerrar modales con botón X (.close)
document.querySelectorAll(".modal .close").forEach((btn) => {
    btn.addEventListener("click", (e) => {
        const modal = e.target.closest(".modal");
        if (modal) closeModal(modal);
    });
});

// Cerrar modal al hacer clic fuera
document.querySelectorAll(".modal").forEach((mod) => {
    mod.addEventListener("click", (e) => {
        if (e.target === mod) closeModal(mod);
    });
});

// Aplicar filtros
if (applyFilters) {
    applyFilters.addEventListener("click", () => closeModal(modalFilters));
}

// Toggle de selección de pills (filtros)
document.querySelectorAll(".pill").forEach((btn) => {
    btn.addEventListener("click", () => btn.classList.toggle("selected"));
});

// Exportar vista
const exportNowBtn = document.getElementById("export-now");
if (exportNowBtn) {
    exportNowBtn.addEventListener("click", () => {
        exportNowBtn.textContent = "Exportando...";
        exportNowBtn.disabled = true;

        setTimeout(() => {
            exportNowBtn.textContent = "Exportar imagen";
            exportNowBtn.disabled = false;
            closeModal(modalExport);

            // Mostrar toast de confirmación
            const toast = document.createElement("div");
            toast.className = "toast";
            toast.textContent = "Imagen exportada en tu dispositivo (simulado)";
            document.body.appendChild(toast);
            setTimeout(() => toast.remove(), 3000);
        }, 1200);
    });
}

// Funcionalidad de puntos de calor
const heatPoints = document.querySelectorAll(".heat-point");
heatPoints.forEach((point) => {
    point.addEventListener("click", (e) => {
        // Determinar la intensidad del punto
        let intensity = "Baja";
        let color = "#facc15";
        let incidents = Math.floor(Math.random() * 5) + 1;

        if (point.classList.contains("heat-high")) {
            intensity = "Alta";
            color = "#ef4444";
            incidents = Math.floor(Math.random() * 8) + 8;
        } else if (point.classList.contains("heat-medium")) {
            intensity = "Media";
            color = "#f97316";
            incidents = Math.floor(Math.random() * 5) + 4;
        }

        // Crear y mostrar tooltip
        const tooltip = document.createElement("div");
        tooltip.className = "heat-tooltip";
        tooltip.innerHTML = `
            <div style="font-weight: 600; margin-bottom: 4px; color: ${color};">
                Intensidad: ${intensity}
            </div>
            <div style="font-size: 13px; color: #6b7280;">
                ${incidents} incidentes en esta zona
            </div>
        `;
        tooltip.style.cssText = `
            position: fixed;
            top: ${e.clientY + 10}px;
            left: ${e.clientX + 10}px;
            background: white;
            padding: 12px 16px;
            border-radius: 8px;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
            z-index: 10000;
            pointer-events: none;
            font-size: 14px;
        `;

        document.body.appendChild(tooltip);

        // Remover tooltip después de 2 segundos
        setTimeout(() => tooltip.remove(), 2000);
    });
});

