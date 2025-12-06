// Script para manejar el menú responsive en home-policia.html
document.addEventListener('DOMContentLoaded', function() {
  console.log('Iniciando script home-policia-menu.js');

  // Seleccionar elementos
  const headerMenuToggle = document.querySelector('.header-left .menu-toggle');
  const breadcrumbMenuToggle = document.querySelector('.breadcrumb-bar .menu-toggle');
  const menu = document.querySelector('.header-nav.Menu-Horizontal');
  const sidebar = document.getElementById('sidebar');

  console.log('Elementos encontrados:', {
    headerMenuToggle: !!headerMenuToggle,
    breadcrumbMenuToggle: !!breadcrumbMenuToggle,
    menu: !!menu,
    sidebar: !!sidebar
  });

  // ===== CONFIGURACIÓN DEL MENÚ HORIZONTAL (HEADER) =====
  if (headerMenuToggle && menu) {
    console.log('Configurando menú horizontal');

    headerMenuToggle.addEventListener('click', function(e) {
      e.preventDefault();
      e.stopPropagation();

      if (window.innerWidth <= 768) {
        const isActive = menu.classList.toggle('active');
        headerMenuToggle.classList.toggle('open');
        console.log('Menú horizontal:', isActive ? 'ABIERTO' : 'CERRADO');
      }
    });

    // Cerrar menú al hacer clic en enlaces (no en botones dropdown)
    const menuLinks = menu.querySelectorAll('a');
    menuLinks.forEach(link => {
      link.addEventListener('click', function() {
        if (window.innerWidth <= 768) {
          menu.classList.remove('active');
          headerMenuToggle.classList.remove('open');
          console.log('Menú cerrado por clic en link');
        }
      });
    });

    // Cerrar menú al hacer clic fuera
    document.addEventListener('click', function(event) {
      if (window.innerWidth <= 768 && menu.classList.contains('active')) {
        const isClickOnMenu = menu.contains(event.target);
        const isClickOnToggle = headerMenuToggle.contains(event.target);

        if (!isClickOnMenu && !isClickOnToggle) {
          menu.classList.remove('active');
          headerMenuToggle.classList.remove('open');
          console.log('Menú cerrado por clic fuera');
        }
      }
    });

    // Cerrar menú al redimensionar
    window.addEventListener('resize', function() {
      if (window.innerWidth > 768 && menu.classList.contains('active')) {
        menu.classList.remove('active');
        headerMenuToggle.classList.remove('open');
        console.log('Menú cerrado por resize');
      }
    });
  } else {
    console.error('No se encontró el botón del header o el menú');
  }

  // ===== MANEJO DE DROPDOWNS EN MÓVIL =====
  if (menu) {
    const dropdowns = menu.querySelectorAll('.dropdown');
    console.log(`Encontrados ${dropdowns.length} dropdowns`);

    dropdowns.forEach(dropdown => {
      const toggle = dropdown.querySelector('.dropdown-toggle');
      const dropdownMenu = dropdown.querySelector('.dropdown-menu');

      if (toggle && dropdownMenu) {
        toggle.addEventListener('click', function(e) {
          if (window.innerWidth <= 768) {
            e.preventDefault();
            e.stopPropagation();

            // Cerrar otros dropdowns
            dropdowns.forEach(otherDropdown => {
              if (otherDropdown !== dropdown) {
                otherDropdown.classList.remove('open');
              }
            });

            // Toggle este dropdown
            dropdown.classList.toggle('open');
            console.log('Dropdown toggled:', toggle.textContent.trim());
          }
        });
      }
    });
  }

  // ===== CONFIGURACIÓN DEL SIDEBAR =====
  if (breadcrumbMenuToggle && sidebar) {
    console.log('Configurando sidebar');

    breadcrumbMenuToggle.addEventListener('click', function(e) {
      e.preventDefault();
      e.stopPropagation();

      const isOpen = sidebar.classList.toggle('open');
      console.log('Sidebar:', isOpen ? 'ABIERTO' : 'CERRADO');
    });

    // Cerrar sidebar al hacer clic fuera
    document.addEventListener('click', function(event) {
      if (sidebar.classList.contains('open')) {
        const isClickOnSidebar = sidebar.contains(event.target);
        const isClickOnToggle = breadcrumbMenuToggle.contains(event.target);

        if (!isClickOnSidebar && !isClickOnToggle) {
          sidebar.classList.remove('open');
          console.log('Sidebar cerrado por clic fuera');
        }
      }
    });
  } else {
    console.error('No se encontró el botón del breadcrumb o el sidebar');
  }

  console.log('Script home-policia-menu.js cargado completamente');
});

