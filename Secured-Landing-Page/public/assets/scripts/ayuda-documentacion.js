// ============================
// AYUDA Y DOCUMENTACIÓN - JS
// ============================

// Obtener idioma actual
function getLang() {
    return (window.i18n && window.i18n.currentLang) || localStorage.getItem('language') || 'es';
}

// Contenido en español
const contenidoES = {
    inicio: {
        title: 'Primeros Pasos',
        subtitle: 'Aprende lo básico de Secured',
        whatIsSecured: {
            title: '¿Qué es Secured?',
            description: 'Introducción a la plataforma',
            steps: {
                welcome: {
                    title: 'Bienvenido a Secured',
                    content: 'Secured es una plataforma de coordinación inteligente que conecta a policías y personal de serenazgo para una respuesta más rápida y eficiente ante incidentes de seguridad.',
                    tip: 'Secured está diseñada para ser intuitiva y fácil de usar, incluso en situaciones de alta presión.'
                },
                features: {
                    title: 'Características principales',
                    content: 'La plataforma ofrece gestión de incidentes en tiempo real, comunicación instantánea, mapas interactivos, asignación automática de unidades y análisis de datos para optimizar operaciones.',
                    list: [
                        'Gestión de incidentes en tiempo real',
                        'Comunicación instantánea entre equipos',
                        'Mapas interactivos con ubicación GPS',
                        'Asignación inteligente de recursos',
                        'Reportes y análisis de datos'
                    ]
                },
                roles: {
                    title: 'Roles y permisos',
                    content: 'Secured cuenta con diferentes roles: Operadores (gestionan incidentes), Agentes de campo (responden a emergencias) y Supervisores (monitorean operaciones).',
                    tip: 'Tu rol determina qué funciones puedes acceder. Contacta a tu supervisor si necesitas permisos adicionales.'
                },
                interface: {
                    title: 'Interfaz principal',
                    content: 'La pantalla principal muestra un mapa central con incidentes activos, panel de notificaciones, menú lateral para acceso rápido y barra superior con tu perfil y configuración.',
                    list: [
                        'Mapa central con incidentes activos',
                        'Panel de notificaciones en tiempo real',
                        'Menú lateral para acceso rápido',
                        'Barra superior con perfil y configuración'
                    ]
                },
                ready: {
                    title: '¡Listo para empezar!',
                    content: 'Ya conoces lo básico de Secured. Explora las otras secciones de ayuda para aprender funciones específicas o comienza a usar la plataforma directamente.',
                    tip: 'Recuerda: siempre puedes volver a esta sección de ayuda desde cualquier parte de la plataforma.'
                }
            }
        },
        config: {
            title: 'Configuración inicial',
            description: 'Configura tu cuenta y preferencias',
            steps: {
                access: {
                    title: 'Acceso a configuración',
                    content: 'Para acceder a la configuración, haz clic en tu foto de perfil en la esquina superior derecha y selecciona "Configuración" del menú desplegable.',
                    tip: 'También puedes acceder rápidamente con el atajo de teclado Ctrl + Coma (,).'
                },
                profile: {
                    title: 'Perfil personal',
                    content: 'En la sección de Perfil puedes actualizar tu foto, nombre, correo electrónico, teléfono de contacto y cambiar tu contraseña de forma segura.',
                    list: [
                        'Foto de perfil',
                        'Información personal',
                        'Datos de contacto',
                        'Cambio de contraseña'
                    ]
                },
                notifications: {
                    title: 'Notificaciones',
                    content: 'Configura cómo y cuándo recibir notificaciones. Puedes activar alertas por sonido, vibración, notificaciones push y establecer horarios de silencio.',
                    tip: 'Las notificaciones críticas siempre se mostrarán, incluso en modo silencioso.'
                },
                mapPrefs: {
                    title: 'Preferencias del mapa',
                    content: 'Personaliza la visualización del mapa: estilo (satélite o calles), zoom predeterminado, capas visibles y actualización automática de posición.',
                    list: [
                        'Estilo de mapa (satélite/calles)',
                        'Nivel de zoom inicial',
                        'Capas y marcadores visibles',
                        'Actualización automática de GPS'
                    ]
                },
                save: {
                    title: 'Guardar cambios',
                    content: 'Una vez configurado todo a tu gusto, no olvides hacer clic en "Guardar cambios" en la parte inferior de cada sección. Tus preferencias se sincronizarán en todos tus dispositivos.',
                    tip: 'Los cambios se guardan automáticamente cada 30 segundos.'
                }
            }
        }
    },
    incidentes: {
        title: 'Gestión de Incidentes',
        subtitle: 'Crear, asignar y resolver incidentes',
        crear: {
            title: 'Crear un incidente',
            description: 'Cómo reportar un nuevo incidente',
            steps: {
                acceso: {
                    title: 'Acceder al formulario',
                    content: 'Haz clic en el botón "+" flotante en la esquina inferior derecha o selecciona "Nuevo incidente" del menú principal.',
                    tip: 'También puedes crear un incidente haciendo clic derecho en el mapa.'
                },
                basico: {
                    title: 'Datos básicos',
                    content: 'Completa el tipo de incidente, nivel de prioridad (baja, media, alta, crítica), ubicación exacta y descripción detallada del evento.',
                    list: ['Tipo de incidente', 'Nivel de prioridad', 'Ubicación precisa', 'Descripción del evento']
                },
                adicional: {
                    title: 'Información adicional',
                    content: 'Agrega detalles relevantes como número de personas involucradas, presencia de armas, vehículos implicados y cualquier información que ayude a la respuesta.',
                    tip: 'Cuanto más detallada sea la información, más efectiva será la respuesta.'
                }
            }
        }
    },
    mapa: {
        title: 'Uso del Mapa',
        subtitle: 'Navegación y funciones del mapa',
        navegacion: {
            title: 'Navegación básica',
            description: 'Controles esenciales del mapa',
            steps: {
                movimiento: {
                    title: 'Movimiento y zoom',
                    content: 'Arrastra con el mouse o dedo para moverte por el mapa. Usa la rueda del mouse, botones +/- o pellizca con dos dedos para hacer zoom.',
                    list: ['Arrastrar para mover', 'Rueda del mouse para zoom', 'Doble clic para acercar']
                },
                capas: {
                    title: 'Capas del mapa',
                    content: 'Cambia entre vista de calles, satélite, tráfico y otras capas. Activa o desactiva capas según necesites.',
                    tip: 'Personaliza las capas visibles desde el botón de capas en la esquina superior derecha.'
                }
            }
        }
    },
    comunicacion: {
        title: 'Comunicación',
        subtitle: 'Chat, broadcast y coordinación',
        chat: {
            title: 'Chat de incidentes',
            description: 'Comunicación en tiempo real',
            steps: {
                acceso: {
                    title: 'Acceder al chat',
                    content: 'Dentro de cualquier incidente, encontrarás el botón de chat en la parte inferior. Haz clic para abrir la ventana de conversación.',
                    tip: 'El indicador rojo muestra mensajes no leídos.'
                },
                enviar: {
                    title: 'Enviar mensajes',
                    content: 'Escribe tu mensaje en el campo de texto y presiona Enter o el botón de enviar.',
                    list: ['Mensajes de texto', 'Compartir ubicación', 'Enviar fotos/videos']
                }
            }
        }
    },
    reportes: {
        title: 'Reportes y Análisis',
        subtitle: 'Generar informes y estadísticas',
        generar: {
            title: 'Generar reportes',
            description: 'Crear informes personalizados',
            steps: {
                acceso: {
                    title: 'Acceder a reportes',
                    content: 'Desde el menú principal, selecciona "Reportes y Análisis". Aquí encontrarás plantillas predefinidas.',
                    tip: 'Los reportes se generan en tiempo real con los datos más actualizados.'
                },
                tipo: {
                    title: 'Seleccionar tipo de reporte',
                    content: 'Elige entre diferentes tipos: incidentes por período, desempeño de unidades, análisis geográfico.',
                    list: ['Reporte de incidentes', 'Análisis de tiempos', 'Estadísticas por zona']
                }
            }
        }
    },
    configuracion: {
        title: 'Configuración',
        subtitle: 'Ajustes de cuenta y sistema',
        ajustes: {
            title: 'Ajustes de cuenta',
            description: 'Personaliza tu experiencia',
            steps: {
                acceso: {
                    title: 'Acceso a configuración',
                    content: 'Haz clic en tu avatar en la esquina superior derecha y selecciona "Configuración".',
                    tip: 'Usa Ctrl+, como atajo rápido para abrir configuración.'
                },
                perfil: {
                    title: 'Perfil de usuario',
                    content: 'Actualiza tu información personal: nombre, foto de perfil, cargo, contacto de emergencia.',
                    list: ['Información personal', 'Foto de perfil', 'Contactos de emergencia']
                }
            }
        }
    }
};

// Contenido en inglés
const contenidoEN = {
    inicio: {
        title: 'First Steps',
        subtitle: 'Learn the basics of Secured',
        whatIsSecured: {
            title: 'What is Secured?',
            description: 'Introduction to the platform',
            steps: {
                welcome: {
                    title: 'Welcome to Secured',
                    content: 'Secured is an intelligent coordination platform that connects police and security personnel for faster and more efficient response to security incidents.',
                    tip: 'Secured is designed to be intuitive and easy to use, even in high-pressure situations.'
                },
                features: {
                    title: 'Main Features',
                    content: 'The platform offers real-time incident management, instant communication, interactive maps, automatic unit assignment and data analysis to optimize operations.',
                    list: [
                        'Real-time incident management',
                        'Instant communication between teams',
                        'Interactive maps with GPS location',
                        'Intelligent resource allocation',
                        'Reports and data analysis'
                    ]
                },
                roles: {
                    title: 'Roles and Permissions',
                    content: 'Secured has different roles: Operators (manage incidents), Field agents (respond to emergencies) and Supervisors (monitor operations).',
                    tip: 'Your role determines which functions you can access. Contact your supervisor if you need additional permissions.'
                },
                interface: {
                    title: 'Main Interface',
                    content: 'The main screen shows a central map with active incidents, notification panel, side menu for quick access and top bar with your profile and settings.',
                    list: [
                        'Central map with active incidents',
                        'Real-time notification panel',
                        'Side menu for quick access',
                        'Top bar with profile and settings'
                    ]
                },
                ready: {
                    title: 'Ready to Start!',
                    content: 'You now know the basics of Secured. Explore the other help sections to learn specific functions or start using the platform directly.',
                    tip: 'Remember: you can always return to this help section from anywhere in the platform.'
                }
            }
        },
        config: {
            title: 'Initial Configuration',
            description: 'Configure your account and preferences',
            steps: {
                access: {
                    title: 'Access to Settings',
                    content: 'To access settings, click on your profile picture in the upper right corner and select "Settings" from the drop-down menu.',
                    tip: 'You can also access quickly with the keyboard shortcut Ctrl + Comma (,).'
                },
                profile: {
                    title: 'Personal Profile',
                    content: 'In the Profile section you can update your photo, name, email, contact phone and change your password securely.',
                    list: [
                        'Profile picture',
                        'Personal information',
                        'Contact details',
                        'Password change'
                    ]
                },
                notifications: {
                    title: 'Notifications',
                    content: 'Configure how and when to receive notifications. You can activate alerts by sound, vibration, push notifications and set quiet hours.',
                    tip: 'Critical notifications will always be displayed, even in silent mode.'
                },
                mapPrefs: {
                    title: 'Map Preferences',
                    content: 'Customize map display: style (satellite or streets), default zoom, visible layers and automatic position update.',
                    list: [
                        'Map style (satellite/streets)',
                        'Initial zoom level',
                        'Visible layers and markers',
                        'Automatic GPS update'
                    ]
                },
                save: {
                    title: 'Save Changes',
                    content: 'Once everything is configured to your liking, don\'t forget to click "Save changes" at the bottom of each section. Your preferences will sync across all your devices.',
                    tip: 'Changes are saved automatically every 30 seconds.'
                }
            }
        }
    },
    incidentes: {
        title: 'Incident Management',
        subtitle: 'Create, assign and resolve incidents',
        crear: {
            title: 'Create an Incident',
            description: 'How to report a new incident',
            steps: {
                acceso: {
                    title: 'Access the Form',
                    content: 'Click the floating "+" button in the lower right corner or select "New incident" from the main menu.',
                    tip: 'You can also create an incident by right-clicking on the map.'
                },
                basico: {
                    title: 'Basic Data',
                    content: 'Complete the incident type, priority level (low, medium, high, critical), exact location and detailed description of the event.',
                    list: ['Incident type', 'Priority level', 'Precise location', 'Event description']
                },
                adicional: {
                    title: 'Additional Information',
                    content: 'Add relevant details such as number of people involved, presence of weapons, vehicles involved and any information that helps the response.',
                    tip: 'The more detailed the information, the more effective the response will be.'
                }
            }
        }
    },
    mapa: {
        title: 'Map Usage',
        subtitle: 'Navigation and map features',
        navegacion: {
            title: 'Basic Navigation',
            description: 'Essential map controls',
            steps: {
                movimiento: {
                    title: 'Movement and Zoom',
                    content: 'Drag with mouse or finger to move around the map. Use mouse wheel, +/- buttons or pinch with two fingers to zoom.',
                    list: ['Drag to move', 'Mouse wheel for zoom', 'Double click to zoom in']
                },
                capas: {
                    title: 'Map Layers',
                    content: 'Switch between street, satellite, traffic and other views. Activate or deactivate layers as needed.',
                    tip: 'Customize visible layers from the layers button in the upper right corner.'
                }
            }
        }
    },
    comunicacion: {
        title: 'Communication',
        subtitle: 'Chat, broadcast and coordination',
        chat: {
            title: 'Incident Chat',
            description: 'Real-time communication',
            steps: {
                acceso: {
                    title: 'Access Chat',
                    content: 'Inside any incident, you\'ll find the chat button at the bottom. Click to open the conversation window.',
                    tip: 'The red indicator shows unread messages.'
                },
                enviar: {
                    title: 'Send Messages',
                    content: 'Type your message in the text field and press Enter or the send button.',
                    list: ['Text messages', 'Share location', 'Send photos/videos']
                }
            }
        }
    },
    reportes: {
        title: 'Reports and Analysis',
        subtitle: 'Generate reports and statistics',
        generar: {
            title: 'Generate Reports',
            description: 'Create custom reports',
            steps: {
                acceso: {
                    title: 'Access Reports',
                    content: 'From the main menu, select "Reports and Analysis". Here you\'ll find predefined templates.',
                    tip: 'Reports are generated in real time with the most up-to-date data.'
                },
                tipo: {
                    title: 'Select Report Type',
                    content: 'Choose between different types: incidents by period, unit performance, geographic analysis.',
                    list: ['Incident report', 'Time analysis', 'Statistics by zone']
                }
            }
        }
    },
    configuracion: {
        title: 'Configuration',
        subtitle: 'Account and system settings',
        ajustes: {
            title: 'Account Settings',
            description: 'Customize your experience',
            steps: {
                acceso: {
                    title: 'Access Settings',
                    content: 'Click on your avatar in the upper right corner and select "Settings".',
                    tip: 'Use Ctrl+, as a quick shortcut to open settings.'
                },
                perfil: {
                    title: 'User Profile',
                    content: 'Update your personal information: name, profile photo, position, emergency contact.',
                    list: ['Personal information', 'Profile photo', 'Emergency contacts']
                }
            }
        }
    }
};

// Función para obtener contenido según idioma
function getContenidoCategorias() {
    const lang = getLang();
    console.log('Idioma actual:', lang);
    return lang === 'en' ? contenidoEN : contenidoES;
}

// Función auxiliar para textos de UI
function t(key) {
    const lang = getLang();
    const translations = {
        es: {
            'tip': '💡 Consejo',
            'finish': 'Finalizar',
            'next': 'Siguiente →',
            'previous': '← Anterior'
        },
        en: {
            'tip': '💡 Tip',
            'finish': 'Finish',
            'next': 'Next →',
            'previous': '← Previous'
        }
    };
    return translations[lang]?.[key] || key;
}

// Estado de la aplicación
let categoriaActual = null;
let temaActual = null;
let pasoActual = 0;

// Inicialización
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOMContentLoaded - ayuda-documentacion.js');

    // Inicializar eventos inmediatamente
    inicializarEventos();

    // Escuchar cambios de idioma para recargar contenido
    window.addEventListener('languageChanged', function() {
        console.log('Idioma cambiado, recargando contenido...');
        // Recargar contenido si hay una categoría activa
        if (categoriaActual !== null) {
            if (temaActual !== null) {
                // Estamos en un tutorial, recargar paso actual
                actualizarPaso();
            } else {
                // Estamos en la lista de categorías, recargar
                mostrarCategoria(categoriaActual);
            }
        }
    });
});

function inicializarEventos() {
    console.log('Inicializando eventos...');

    // Botones de categorías
    const botonesCategoria = document.querySelectorAll('.ayuda-category-card');
    console.log('Botones de categoría encontrados:', botonesCategoria.length);

    botonesCategoria.forEach(btn => {
        btn.addEventListener('click', () => {
            const categoria = btn.getAttribute('data-category');
            console.log('Click en categoría:', categoria);
            mostrarCategoria(categoria);
        });
    });

    // Botones de navegación
    document.querySelectorAll('[data-action="volver-menu"]').forEach(btn => {
        btn.addEventListener('click', volverAlMenu);
    });

    document.querySelectorAll('[data-action="volver-categoria"]').forEach(btn => {
        btn.addEventListener('click', volverACategoria);
    });

    // Navegación del tutorial
    document.getElementById('btn-anterior')?.addEventListener('click', pasoAnterior);
    document.getElementById('btn-siguiente')?.addEventListener('click', pasoSiguiente);
}

function mostrarCategoria(categoria) {
    categoriaActual = categoria;
    const contenidoCategorias = getContenidoCategorias();
    const datos = contenidoCategorias[categoria];

    if (!datos || !datos.title) return;

    // Actualizar título
    document.getElementById('categoria-titulo').textContent = datos.title;
    document.getElementById('categoria-subtitulo').textContent = datos.subtitle;

    // Crear lista de temas
    const contenedor = document.getElementById('contenido-categoria');
    contenedor.innerHTML = '';

    const lista = document.createElement('ul');
    lista.className = 'ayuda-topics-list';

    // Los temas están como propiedades del objeto, no como array
    // Por ejemplo: whatIsSecured, config, create, assign, navigation, chat, generate, settings
    const temas = Object.keys(datos).filter(key =>
        key !== 'title' && key !== 'subtitle' && typeof datos[key] === 'object'
    );

    temas.forEach((temaKey) => {
        const tema = datos[temaKey];
        if (!tema.title) return; // Skip si no tiene título

        const li = document.createElement('li');
        li.className = 'ayuda-topic-item';
        li.innerHTML = `
            <h3 class="ayuda-topic-title">${tema.title}</h3>
            <p class="ayuda-topic-desc">${tema.description || ''}</p>
        `;
        li.addEventListener('click', () => mostrarTutorial(categoria, temaKey));
        lista.appendChild(li);
    });

    contenedor.appendChild(lista);

    // Cambiar vista
    cambiarVista('categoria');
}

function mostrarTutorial(categoria, temaKey) {
    categoriaActual = categoria;
    temaActual = temaKey;
    pasoActual = 0;

    const contenidoCategorias = getContenidoCategorias();
    const datos = contenidoCategorias[categoria];
    const tema = datos[temaKey];

    // Los pasos están en tema.steps como objeto
    const stepsObj = tema.steps || {};
    const stepKeys = Object.keys(stepsObj);

    // Guardar las claves de pasos para navegación
    tema._stepKeys = stepKeys;
    tema._steps = stepKeys.map(key => stepsObj[key]);

    // Actualizar título
    document.getElementById('tutorial-titulo').textContent = tema.title;
    document.getElementById('paso-total').textContent = tema._steps.length;

    // Mostrar primer paso
    actualizarPaso();

    // Cambiar vista
    cambiarVista('tutorial');
}

function actualizarPaso() {
    const contenidoCategorias = getContenidoCategorias();
    const datos = contenidoCategorias[categoriaActual];
    const tema = datos[temaActual];
    const paso = tema._steps[pasoActual];

    // Actualizar progreso
    const progreso = ((pasoActual + 1) / tema._steps.length) * 100;
    document.getElementById('tutorial-progreso').style.width = progreso + '%';
    document.getElementById('paso-actual').textContent = pasoActual + 1;

    // Crear contenido del paso
    const contenedor = document.getElementById('tutorial-paso');
    contenedor.innerHTML = '';

    const pasoDiv = document.createElement('div');
    pasoDiv.className = 'ayuda-paso';

    let html = `
        <h2 class="ayuda-paso-titulo">${paso.title}</h2>
        <div class="ayuda-paso-contenido">${paso.content}</div>
    `;

    if (paso.list) {
        html += '<ul class="ayuda-paso-lista">';
        paso.list.forEach(item => {
            html += `<li>${item}</li>`;
        });
        html += '</ul>';
    }

    if (paso.tip) {
        html += `
            <div class="ayuda-paso-tip">
                <div class="ayuda-paso-tip-title">${t('tip')}</div>
                <div class="ayuda-paso-tip-text">${paso.tip}</div>
            </div>
        `;
    }

    pasoDiv.innerHTML = html;
    contenedor.appendChild(pasoDiv);

    // Actualizar botones
    document.getElementById('btn-anterior').disabled = pasoActual === 0;

    const btnSiguiente = document.getElementById('btn-siguiente');
    if (pasoActual === tema._steps.length - 1) {
        btnSiguiente.textContent = t('finish');
    } else {
        btnSiguiente.textContent = t('next');
    }
}

function pasoAnterior() {
    if (pasoActual > 0) {
        pasoActual--;
        actualizarPaso();
    }
}

function pasoSiguiente() {
    const contenidoCategorias = getContenidoCategorias();
    const datos = contenidoCategorias[categoriaActual];
    const tema = datos[temaActual];

    if (pasoActual < tema._steps.length - 1) {
        pasoActual++;
        actualizarPaso();
    } else {
        // Finalizar tutorial
        volverACategoria();
    }
}

function volverAlMenu() {
    cambiarVista('menu');
}

function volverACategoria() {
    if (categoriaActual) {
        mostrarCategoria(categoriaActual);
    } else {
        volverAlMenu();
    }
}

function cambiarVista(vista) {
    document.querySelectorAll('.ayuda-view').forEach(v => {
        v.classList.remove('ayuda-view-active');
    });
    document.querySelector(`[data-view="${vista}"]`).classList.add('ayuda-view-active');
}

