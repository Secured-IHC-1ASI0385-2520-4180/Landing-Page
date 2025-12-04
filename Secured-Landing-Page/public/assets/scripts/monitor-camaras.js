document.addEventListener('DOMContentLoaded', function() {
  const tabs = document.querySelectorAll('.tab-btn');
  const views = document.querySelectorAll('.view');
  const mainImg = document.getElementById('mainPreview');
  const previewContainer = document.querySelector('.preview');

  function setActiveTab(targetBtn) {
    tabs.forEach(t => t.classList.toggle('active', t === targetBtn));
    const view = targetBtn.dataset.view;
    views.forEach(v => v.classList.toggle('active', v.id === 'view-' + view));

    // Ocultar imagen si es vista de Salud
    if (view === 'salud') {
      if (previewContainer) previewContainer.classList.add('hidden');
    } else {
      if (previewContainer) previewContainer.classList.remove('hidden');

      // Cambiar imagen principal si hay data-image
      const img = targetBtn.dataset.image;
      if (img && mainImg) {
        // pequeña transición
        mainImg.style.opacity = 0;
        setTimeout(() => {
          mainImg.src = img;
          mainImg.style.opacity = 1;
        }, 180);
      }
    }
  }

  tabs.forEach(btn => {
    btn.addEventListener('click', () => setActiveTab(btn));
  });

  // Permitir que hacer click en items de la lista cambie la imagen (usa data-image)
  document.querySelectorAll('.list-item').forEach((item) => {
    item.addEventListener('click', () => {
      const src = item.dataset.image;
      if (src && mainImg) {
        mainImg.style.opacity = 0;
        setTimeout(() => {
          mainImg.src = src;
          mainImg.style.opacity = 1;
        }, 160);
      }

      // activar la pestaña cámara
      const camBtn = document.querySelector('.tab-btn[data-view="camara"]');
      if (camBtn) setActiveTab(camBtn);
    });
  });

});

