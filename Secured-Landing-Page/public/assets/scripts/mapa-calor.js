// Mapa de Calor - Script
// Manejo de modales y funcionalidad del mapa de calor

const modalFilters = document.getElementById("modal-filters");
const modalExport = document.getElementById("modal-export");
const btnFilters = document.getElementById("btn-filters");
const btnExport = document.getElementById("btn-export");
const btnExportFloat = document.getElementById("btn-export-floating");
const applyFilters = document.getElementById("apply-filters");

// Funciones para abrir y cerrar modales
function openModal(m) {
    m.setAttribute("aria-hidden", "false");
    document.body.classList.add("blurred");
}

function closeModal(m) {
    m.setAttribute("aria-hidden", "true");
    document.body.classList.remove("blurred");
}

// Event listeners para abrir modales
btnFilters.addEventListener("click", () => openModal(modalFilters));
btnExport.addEventListener("click", () => openModal(modalExport));
btnExportFloat.addEventListener("click", () => openModal(modalExport));

// Event listeners para cerrar modales
document
    .querySelectorAll("[data-close]")
    .forEach((btn) =>
        btn.addEventListener("click", (e) =>
            closeModal(e.target.closest(".modal"))
        )
    );

document
    .querySelectorAll(".modal .close")
    .forEach((btn) =>
        btn.addEventListener("click", (e) =>
            closeModal(e.target.closest(".modal"))
        )
    );

// Cerrar modal al hacer clic fuera
document.querySelectorAll(".modal").forEach((mod) => {
    mod.addEventListener("click", (e) => {
        if (e.target === mod) closeModal(mod);
    });
});

// Aplicar filtros
applyFilters.addEventListener("click", () => closeModal(modalFilters));

// Toggle de selección de pills (filtros)
document
    .querySelectorAll(".pill")
    .forEach((btn) =>
        btn.addEventListener("click", () => btn.classList.toggle("selected"))
    );

// Exportar vista
document.getElementById("export-now").addEventListener("click", () => {
    const btn = document.getElementById("export-now");
    btn.textContent = "Exportando...";
    btn.disabled = true;

    setTimeout(() => {
        btn.textContent = "Exportar imagen";
        btn.disabled = false;
        closeModal(modalExport);

        // Mostrar toast de confirmación
        const toast = document.createElement("div");
        toast.className = "toast";
        toast.textContent = "Imagen exportada en tu dispositivo (simulado)";
        document.body.appendChild(toast);
        setTimeout(() => toast.remove(), 3000);
    }, 1200);
});
