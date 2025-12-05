// Gestor de internacionalización (i18n)
class I18n {
  constructor() {
    this.currentLang = localStorage.getItem('language') || 'es';
    this.translations = {};
  }

  async loadLanguage(lang) {
    try {
      const response = await fetch(`Secured-Landing-Page/public/assets/i18n/${lang}.json`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      this.translations = await response.json();
      this.currentLang = lang;
      localStorage.setItem('language', lang);
      this.updatePage();
    } catch (error) {
      console.error(`Error loading language ${lang}:`, error);
    }
  }

  t(key) {
    const keys = key.split('.');
    let value = this.translations;

    for (const k of keys) {
      value = value?.[k];
    }

    return value || key;
  }

  updatePage() {
    // Actualizar todos los elementos con data-i18n
    document.querySelectorAll('[data-i18n]').forEach(element => {
      const key = element.getAttribute('data-i18n');
      const translation = this.t(key);

      if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
        if (element.hasAttribute('placeholder')) {
          element.placeholder = translation;
        }
      } else {
        element.innerHTML = translation;
      }
    });

    // Actualizar elementos con data-i18n-placeholder
    document.querySelectorAll('[data-i18n-placeholder]').forEach(element => {
      const key = element.getAttribute('data-i18n-placeholder');
      element.placeholder = this.t(key);
    });

    // Actualizar el documento lang
    document.documentElement.lang = this.currentLang;

    // Actualizar botones de idioma
    this.updateLanguageButtons();
  }

  updateLanguageButtons() {
    document.querySelectorAll('.lang-btn').forEach(btn => {
      const btnLang = btn.getAttribute('data-lang');
      if (btnLang === this.currentLang) {
        btn.classList.add('active');
      } else {
        btn.classList.remove('active');
      }
    });
  }

  switchLanguage(lang) {
    if (lang !== this.currentLang) {
      this.loadLanguage(lang);
    }
  }
}

// Inicializar i18n cuando el DOM esté listo
const i18n = new I18n();

document.addEventListener('DOMContentLoaded', async () => {
  console.log('Inicializando i18n...');
  await i18n.loadLanguage(i18n.currentLang);

  // Event listeners para los botones de idioma
  document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const lang = btn.getAttribute('data-lang');
      console.log('Cambiando idioma a:', lang);
      i18n.switchLanguage(lang);
    });
  });
});

