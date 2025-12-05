// Esperar a que el DOM esté completamente cargado
document.addEventListener('DOMContentLoaded', function() {
  // Selecciona el botón de hamburguesa
  const btn = document.querySelector(".menu-toggle");

  // Selecciona el menú horizontal
  const menu = document.querySelector(".Menu-Horizontal");

  // Verificar que ambos elementos existen
  if (btn && menu) {
    // Al hacer clic en el botón de hamburguesa
    btn.addEventListener("click", function(e) {
      e.preventDefault();
      e.stopPropagation();

      // Alterna (agrega o quita) la clase "active" en el menú
      // Esto hace que se muestre o se oculte
      menu.classList.toggle("active");

      // También alternar una clase en el botón para cambiar su apariencia
      btn.classList.toggle("open");

      console.log('Menu toggled. Active:', menu.classList.contains('active'));
    });

    // Cerrar menú al hacer clic en un enlace
    const menuLinks = menu.querySelectorAll('a');
    menuLinks.forEach(link => {
      link.addEventListener('click', function() {
        menu.classList.remove('active');
        btn.classList.remove('open');
      });
    });

    // Cerrar menú al hacer clic fuera
    document.addEventListener('click', function(event) {
      if (!menu.contains(event.target) && !btn.contains(event.target)) {
        menu.classList.remove('active');
        btn.classList.remove('open');
      }
    });
  } else {
    console.error('No se encontró el botón .menu-toggle o el menú .Menu-Horizontal');
  }
});
