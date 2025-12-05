const btn = document.getElementById("menuBtn");
const sidebar = document.getElementById("sidebar");

// Toggle del menú lateral
if (btn && sidebar) {
    btn.addEventListener("click", () => {
        sidebar.classList.toggle("active");
    });
}

// ===== HEADER RESPONSIVE (DASHBOARD) =====
document.addEventListener('DOMContentLoaded', () => {
  const header = document.querySelector('.dashboard-header');

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

  // ===== MENÚ MÓVIL RESPONSIVE DEL HEADER =====
  const mobileMenuToggle = document.getElementById('mobileMenuToggle');
  const mainNav = document.getElementById('mainNav');

  if (mobileMenuToggle && mainNav) {
    // Toggle menu on button click
    mobileMenuToggle.addEventListener('click', function() {
      this.classList.toggle('active');
      mainNav.classList.toggle('active');
    });

    // Close menu when clicking on a link
    const navLinks = mainNav.querySelectorAll('a');
    navLinks.forEach(link => {
      link.addEventListener('click', function() {
        mobileMenuToggle.classList.remove('active');
        mainNav.classList.remove('active');
      });
    });

    // Close menu when clicking outside
    document.addEventListener('click', function(event) {
      const isClickInsideMenu = mainNav.contains(event.target);
      const isClickOnToggle = mobileMenuToggle.contains(event.target);

      if (!isClickInsideMenu && !isClickOnToggle && mainNav.classList.contains('active')) {
        mobileMenuToggle.classList.remove('active');
        mainNav.classList.remove('active');
      }
    });

    // Close menu on window resize if it's open
    window.addEventListener('resize', function() {
      if (window.innerWidth > 768 && mainNav.classList.contains('active')) {
        mobileMenuToggle.classList.remove('active');
        mainNav.classList.remove('active');
      }
    });
  }
});

