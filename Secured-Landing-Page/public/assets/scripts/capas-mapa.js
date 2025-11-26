// Capas de Mapa
// Manejo de capas del mapa y sidebar

// Cambiar imagen del mapa según la vista seleccionada
function cambiarMapa(ruta) {
    document.getElementById("mapImage").src = ruta;
}

// Activar/desactivar botones de filtro
function activar(btn) {
    let grupo = btn.parentElement;
    [...grupo.children].forEach((x) => x.classList.remove("active"));
    btn.classList.add("active");
}

// Toggle del sidebar (plegar/desplegar)
function toggleSidebar() {
    const sidebar = document.getElementById("sidebar");
    const arrow = document.getElementById("toggleArrow");

    sidebar.classList.toggle("collapsed");
    arrow.classList.toggle("collapsed");

    arrow.textContent = sidebar.classList.contains("collapsed") ? "▶" : "◀";
}