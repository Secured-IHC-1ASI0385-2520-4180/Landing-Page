// Script para mejorar el comportamiento del header sticky
document.addEventListener('DOMContentLoaded', () => {
    const header = document.querySelector('.main-header');

    if (header) {
        let lastScrollTop = 0;

        window.addEventListener('scroll', () => {
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

            // Agregar clase cuando se hace scroll
            if (scrollTop > 10) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }

            lastScrollTop = scrollTop;
        });
    }

    // ===== MENÚ MÓVIL RESPONSIVE =====
    // Buscar el botón hamburguesa con múltiples selectores
    const mobileMenuToggle = document.getElementById('mobileMenuToggle') ||
                             document.querySelector('.mobile-menu-toggle') ||
                             document.querySelector('.menu-toggle');

    // Buscar el menú con múltiples selectores
    const mainNav = document.getElementById('mainNav') ||
                    document.querySelector('.main-nav') ||
                    document.querySelector('.Menu-Horizontal');

    if (mobileMenuToggle && mainNav) {
        console.log('✅ Menú móvil inicializado correctamente');

        // Toggle menu on button click
        mobileMenuToggle.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();

            // Toggle clases en ambos elementos
            this.classList.toggle('active');
            this.classList.toggle('open');
            mainNav.classList.toggle('active');

            const isActive = mainNav.classList.contains('active');
            console.log('🍔 Menú hamburguesa:', isActive ? 'ABIERTO' : 'CERRADO');
        });

        // Close menu when clicking on a link
        const navLinks = mainNav.querySelectorAll('a');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                mobileMenuToggle.classList.remove('active');
                mobileMenuToggle.classList.remove('open');
                mainNav.classList.remove('active');
                console.log('🔗 Menú cerrado por clic en link');
            });
        });

        // Close menu when clicking outside
        document.addEventListener('click', function(event) {
            const isClickInsideMenu = mainNav.contains(event.target);
            const isClickOnToggle = mobileMenuToggle.contains(event.target);

            if (!isClickInsideMenu && !isClickOnToggle && mainNav.classList.contains('active')) {
                mobileMenuToggle.classList.remove('active');
                mobileMenuToggle.classList.remove('open');
                mainNav.classList.remove('active');
                console.log('👆 Menú cerrado por clic fuera');
            }
        });

        // Close menu on window resize if it's open
        window.addEventListener('resize', function() {
            if (window.innerWidth > 768 && mainNav.classList.contains('active')) {
                mobileMenuToggle.classList.remove('active');
                mobileMenuToggle.classList.remove('open');
                mainNav.classList.remove('active');
                console.log('📱 Menú cerrado por resize');
            }
        });
    } else {
        console.error('❌ Error: No se encontró el botón o el menú');
        console.log('Botón encontrado:', !!mobileMenuToggle);
        console.log('Menú encontrado:', !!mainNav);
    }
});
