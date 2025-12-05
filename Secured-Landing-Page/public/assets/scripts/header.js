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
});

