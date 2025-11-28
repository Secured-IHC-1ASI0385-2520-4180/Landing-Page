document.addEventListener('DOMContentLoaded', function() {
  const actionBtns = document.querySelectorAll('.action-btn');
  const views = document.querySelectorAll('.view');
  const mainImg = document.getElementById('mainPreview');
  const previewContainer = document.querySelector('.preview');

  // Mapeo de vistas a imágenes
  const imageMap = {
    'base': 'Secured-Landing-Page/public/assets/images/puntos-interes.png',
    'filtros': 'Secured-Landing-Page/public/assets/images/puntos-interes.png', // imagen 2 (usar la misma por ahora)
    'zonas-criticas': 'Secured-Landing-Page/public/assets/images/puntos-interes.png', // imagen 3
    'administrar': 'Secured-Landing-Page/public/assets/images/puntos-interes.png', // imagen 4
    'cercanos': 'Secured-Landing-Page/public/assets/images/puntos-interes.png' // imagen 5
  };

  function showView(viewName) {
    // Cambiar vista activa
    views.forEach(v => {
      v.classList.remove('active');
    });

    const targetView = document.getElementById('view-' + viewName);
    if (targetView) {
      targetView.classList.add('active');
    }

    // Cambiar imagen si existe en el mapa
    const imgSrc = imageMap[viewName];
    if (imgSrc && mainImg) {
      mainImg.style.opacity = 0;
      setTimeout(() => {
        mainImg.src = imgSrc;
        mainImg.style.opacity = 1;
      }, 180);
    }

    // Mostrar preview (todas las vistas lo muestran en este caso)
    if (previewContainer) {
      previewContainer.classList.remove('hidden');
    }
  }

  // Event listeners para botones de acción
  actionBtns.forEach(btn => {
    btn.addEventListener('click', function() {
      const viewName = this.dataset.view;
      showView(viewName);

      // Highlight del botón activo (opcional)
      actionBtns.forEach(b => b.style.background = '#f3f7fb');
      this.style.background = '#2563eb';
      this.style.color = '#fff';
    });
  });

  // Interacción con chips de categoría
  const chips = document.querySelectorAll('.chip, .chip-sector');
  chips.forEach(chip => {
    chip.addEventListener('click', function() {
      this.classList.toggle('active');
      // Aquí podrías agregar lógica de filtrado
    });
  });

  // Interacción con tabs de visualización
  const vizTabs = document.querySelectorAll('.viz-tab');
  vizTabs.forEach(tab => {
    tab.addEventListener('click', function() {
      vizTabs.forEach(t => t.classList.remove('active'));
      this.classList.add('active');
    });
  });

  // Interacción con botones de tiempo
  const timeBtns = document.querySelectorAll('.time-btn');
  timeBtns.forEach(btn => {
    btn.addEventListener('click', function() {
      timeBtns.forEach(b => b.classList.remove('active'));
      this.classList.add('active');
    });
  });

  // Funcionalidad de búsqueda (simulada)
  const searchInput = document.querySelector('.search-bar input');
  if (searchInput) {
    searchInput.addEventListener('input', function(e) {
      const query = e.target.value.toLowerCase();
      const poiItems = document.querySelectorAll('.poi-item');

      poiItems.forEach(item => {
        const text = item.textContent.toLowerCase();
        if (text.includes(query)) {
          item.style.display = 'flex';
        } else {
          item.style.display = 'none';
        }
      });
    });
  }

  // Botón "Solo críticos"
  const filterBtn = document.querySelector('.filter-btn');
  if (filterBtn) {
    let showOnlyCritical = false;
    filterBtn.addEventListener('click', function() {
      showOnlyCritical = !showOnlyCritical;
      const poiItems = document.querySelectorAll('.poi-item');

      poiItems.forEach(item => {
        const hasCritical = item.querySelector('.badge.critical');
        if (showOnlyCritical) {
          item.style.display = hasCritical ? 'flex' : 'none';
          filterBtn.style.background = '#2563eb';
          filterBtn.style.color = '#fff';
        } else {
          item.style.display = 'flex';
          filterBtn.style.background = '#fff';
          filterBtn.style.color = '#111827';
        }
      });
    });
  }

  // Slider de distancia
  const rangeInput = document.querySelector('input[type="range"]');
  if (rangeInput) {
    const rangeLabel = rangeInput.nextElementSibling;
    rangeInput.addEventListener('input', function() {
      const value = this.value;
      const km = (value / 1000).toFixed(1);
      if (rangeLabel) {
        rangeLabel.textContent = km + ' km';
      }
    });
  }

  // Botones de ruta
  const routeBtns = document.querySelectorAll('.btn-route');
  routeBtns.forEach(btn => {
    btn.addEventListener('click', function(e) {
      e.stopPropagation();
      const nearbyItem = this.closest('.nearby-item');
      const poiName = nearbyItem.querySelector('strong').textContent;
      alert('Calculando ruta a: ' + poiName);
    });
  });

  // Botones "Usar en caso"
  const useBtns = document.querySelectorAll('.btn-use');
  useBtns.forEach(btn => {
    btn.addEventListener('click', function(e) {
      e.stopPropagation();
      const nearbyItem = this.closest('.nearby-item');
      const poiName = nearbyItem.querySelector('strong').textContent;
      alert('POI añadido al caso: ' + poiName);
    });
  });

  // Click en POI items en modo admin
  const adminItems = document.querySelectorAll('.poi-item.admin');
  adminItems.forEach(item => {
    item.addEventListener('click', function() {
      const poiName = this.querySelector('strong').textContent;
      alert('Editando POI: ' + poiName);
    });
  });

  // Botón "Aplicar filtros"
  const applyBtn = document.querySelector('.apply-btn');
  if (applyBtn) {
    applyBtn.addEventListener('click', function() {
      alert('Filtros aplicados');
      showView('base');
    });
  }

  // Botón "Crear POI"
  const createBtn = document.querySelector('.btn-primary');
  if (createBtn) {
    createBtn.addEventListener('click', function() {
      if (this.textContent.includes('Crear POI')) {
        alert('Abriendo formulario para crear nuevo POI...');
      }
    });
  }

  // Botón "Importar CSV"
  const importBtn = document.querySelector('.btn-secondary');
  if (importBtn) {
    importBtn.addEventListener('click', function() {
      if (this.textContent.includes('Importar CSV')) {
        alert('Selecciona un archivo CSV para importar POI...');
      }
    });
  }
});

