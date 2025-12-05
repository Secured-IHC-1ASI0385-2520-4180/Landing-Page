// ============================
// AYUDA Y DOCUMENTACIÓN - JS
// ============================

// Contenido de tutoriales por categoría
const contenidoCategorias = {
    inicio: {
        titulo: 'Primeros Pasos',
        subtitulo: 'Aprende lo básico de Secured',
        temas: [
            {
                titulo: '¿Qué es Secured?',
                descripcion: 'Introducción a la plataforma',
                pasos: [
                    {
                        titulo: 'Bienvenido a Secured',
                        contenido: 'Secured es una plataforma de coordinación inteligente que conecta a policías y personal de serenazgo para una respuesta más rápida y eficiente ante incidentes de seguridad.',
                        tip: 'Secured está diseñada para ser intuitiva y fácil de usar, incluso en situaciones de alta presión.'
                    },
                    {
                        titulo: 'Características principales',
                        contenido: 'La plataforma ofrece gestión de incidentes en tiempo real, comunicación instantánea, mapas interactivos, asignación automática de unidades y análisis de datos para optimizar operaciones.',
                        lista: [
                            'Gestión de incidentes en tiempo real',
                            'Comunicación instantánea entre equipos',
                            'Mapas interactivos con ubicación GPS',
                            'Asignación inteligente de recursos',
                            'Reportes y análisis de datos'
                        ]
                    },
                    {
                        titulo: 'Roles y permisos',
                        contenido: 'Secured cuenta con diferentes roles: Operadores (gestionan incidentes), Agentes de campo (responden a emergencias) y Supervisores (monitorean operaciones).',
                        tip: 'Tu rol determina qué funciones puedes acceder. Contacta a tu supervisor si necesitas permisos adicionales.'
                    },
                    {
                        titulo: 'Interfaz principal',
                        contenido: 'La pantalla principal muestra un mapa central con incidentes activos, panel de notificaciones, menú lateral para acceso rápido y barra superior con tu perfil y configuración.',
                        lista: [
                            'Mapa central con incidentes activos',
                            'Panel de notificaciones en tiempo real',
                            'Menú lateral para acceso rápido',
                            'Barra superior con perfil y configuración'
                        ]
                    },
                    {
                        titulo: '¡Listo para empezar!',
                        contenido: 'Ya conoces lo básico de Secured. Explora las otras secciones de ayuda para aprender funciones específicas o comienza a usar la plataforma directamente.',
                        tip: 'Recuerda: siempre puedes volver a esta sección de ayuda desde cualquier parte de la plataforma.'
                    }
                ]
            },
            {
                titulo: 'Configuración inicial',
                descripcion: 'Configura tu cuenta y preferencias',
                pasos: [
                    {
                        titulo: 'Acceso a configuración',
                        contenido: 'Para acceder a la configuración, haz clic en tu foto de perfil en la esquina superior derecha y selecciona "Configuración" del menú desplegable.',
                        tip: 'También puedes acceder rápidamente con el atajo de teclado Ctrl + Coma (,).'
                    },
                    {
                        titulo: 'Perfil personal',
                        contenido: 'En la sección de Perfil puedes actualizar tu foto, nombre, correo electrónico, teléfono de contacto y cambiar tu contraseña de forma segura.',
                        lista: [
                            'Foto de perfil',
                            'Información personal',
                            'Datos de contacto',
                            'Cambio de contraseña'
                        ]
                    },
                    {
                        titulo: 'Notificaciones',
                        contenido: 'Configura cómo y cuándo recibir notificaciones. Puedes activar alertas por sonido, vibración, notificaciones push y establecer horarios de silencio.',
                        tip: 'Las notificaciones críticas siempre se mostrarán, incluso en modo silencioso.'
                    },
                    {
                        titulo: 'Preferencias del mapa',
                        contenido: 'Personaliza la visualización del mapa: estilo (satélite o calles), zoom predeterminado, capas visibles y actualización automática de posición.',
                        lista: [
                            'Estilo de mapa (satélite/calles)',
                            'Nivel de zoom inicial',
                            'Capas y marcadores visibles',
                            'Actualización automática de GPS'
                        ]
                    },
                    {
                        titulo: 'Guardar cambios',
                        contenido: 'Una vez configurado todo a tu gusto, no olvides hacer clic en "Guardar cambios" en la parte inferior de cada sección. Tus preferencias se sincronizarán en todos tus dispositivos.',
                        tip: 'Los cambios se guardan automáticamente cada 30 segundos.'
                    }
                ]
            }
        ]
    },
    incidentes: {
        titulo: 'Gestión de Incidentes',
        subtitulo: 'Crear, asignar y resolver incidentes',
        temas: [
            {
                titulo: 'Crear un incidente',
                descripcion: 'Cómo reportar un nuevo incidente',
                pasos: [
                    {
                        titulo: 'Acceder al formulario',
                        contenido: 'Haz clic en el botón "+" flotante en la esquina inferior derecha o selecciona "Nuevo incidente" del menú principal.',
                        tip: 'También puedes crear un incidente haciendo clic derecho en el mapa.'
                    },
                    {
                        titulo: 'Datos básicos',
                        contenido: 'Completa el tipo de incidente, nivel de prioridad (baja, media, alta, crítica), ubicación exacta y descripción detallada del evento.',
                        lista: [
                            'Tipo de incidente (robo, accidente, etc.)',
                            'Nivel de prioridad',
                            'Ubicación precisa',
                            'Descripción del evento'
                        ]
                    },
                    {
                        titulo: 'Información adicional',
                        contenido: 'Agrega detalles relevantes como número de personas involucradas, presencia de armas, vehículos implicados y cualquier información que ayude a la respuesta.',
                        tip: 'Cuanto más detallada sea la información, más efectiva será la respuesta.'
                    },
                    {
                        titulo: 'Adjuntar evidencia',
                        contenido: 'Puedes adjuntar fotos, videos, grabaciones de audio o documentos relevantes. Estos archivos se almacenan de forma segura y encriptada.',
                        lista: [
                            'Fotografías del lugar',
                            'Videos de seguridad',
                            'Grabaciones de audio',
                            'Documentos relacionados'
                        ]
                    },
                    {
                        titulo: 'Enviar incidente',
                        contenido: 'Revisa toda la información y haz clic en "Crear incidente". Se asignará un código único y se notificará automáticamente a las unidades disponibles.',
                        tip: 'El sistema priorizará automáticamente incidentes críticos para asignación inmediata.'
                    }
                ]
            },
            {
                titulo: 'Asignar unidades',
                descripcion: 'Cómo asignar personal a un incidente',
                pasos: [
                    {
                        titulo: 'Seleccionar incidente',
                        contenido: 'Desde el panel de incidentes o el mapa, haz clic en el incidente al que deseas asignar una unidad. Se abrirá el detalle completo.',
                        tip: 'Los incidentes sin asignar aparecen en color rojo en el mapa.'
                    },
                    {
                        titulo: 'Ver unidades disponibles',
                        contenido: 'El sistema muestra automáticamente las unidades más cercanas y disponibles, con su distancia estimada, tiempo de llegada y estado actual.',
                        lista: [
                            'Unidades cercanas al incidente',
                            'Distancia y tiempo estimado',
                            'Estado actual de disponibilidad',
                            'Equipamiento disponible'
                        ]
                    },
                    {
                        titulo: 'Seleccionar unidad',
                        contenido: 'Elige la unidad más apropiada considerando distancia, recursos y experiencia. Puedes asignar múltiples unidades si la situación lo requiere.',
                        tip: 'El sistema recomienda automáticamente la mejor opción basándose en múltiples factores.'
                    },
                    {
                        titulo: 'Confirmar asignación',
                        contenido: 'Revisa la información y confirma la asignación. La unidad recibirá una notificación instantánea con todos los detalles del incidente.',
                        lista: [
                            'Notificación push a la unidad',
                            'Información completa del incidente',
                            'Ruta optimizada en el mapa',
                            'Canal de comunicación abierto'
                        ]
                    },
                    {
                        titulo: 'Seguimiento',
                        contenido: 'Una vez asignada, puedes seguir la ubicación de la unidad en tiempo real, ver su ETA actualizado y mantener comunicación constante hasta resolver el incidente.',
                        tip: 'Puedes reasignar o agregar más unidades en cualquier momento si es necesario.'
                    }
                ]
            }
        ]
    },
    mapa: {
        titulo: 'Uso del Mapa',
        subtitulo: 'Navegación y funciones del mapa',
        temas: [
            {
                titulo: 'Navegación básica',
                descripcion: 'Controles esenciales del mapa',
                pasos: [
                    {
                        titulo: 'Movimiento y zoom',
                        contenido: 'Arrastra con el mouse o dedo para moverte por el mapa. Usa la rueda del mouse, botones +/- o pellizca con dos dedos para hacer zoom.',
                        lista: [
                            'Arrastrar para mover el mapa',
                            'Rueda del mouse para zoom',
                            'Doble clic para acercar',
                            'Ctrl + arrastrar para rotar'
                        ]
                    },
                    {
                        titulo: 'Capas del mapa',
                        contenido: 'Cambia entre vista de calles, satélite, tráfico y otras capas. Activa o desactiva capas según necesites: incidentes, unidades, zonas de patrullaje.',
                        tip: 'Personaliza las capas visibles desde el botón de capas en la esquina superior derecha.'
                    },
                    {
                        titulo: 'Búsqueda de ubicación',
                        contenido: 'Usa la barra de búsqueda para encontrar direcciones, puntos de interés o coordenadas específicas. El mapa se centrará automáticamente en el resultado.',
                        lista: [
                            'Buscar por dirección',
                            'Buscar por nombre de lugar',
                            'Buscar por coordenadas GPS',
                            'Historial de búsquedas recientes'
                        ]
                    },
                    {
                        titulo: 'Mi ubicación',
                        contenido: 'Haz clic en el botón "Mi ubicación" para centrar el mapa en tu posición actual. La flecha azul indica tu dirección.',
                        tip: 'Asegúrate de tener el GPS activado y haber dado permisos de ubicación a la app.'
                    },
                    {
                        titulo: 'Marcadores personalizados',
                        contenido: 'Haz clic derecho en cualquier punto del mapa para crear un marcador personalizado, agregar notas o marcar puntos de interés importantes.',
                        tip: 'Los marcadores se sincronizan entre todos los miembros de tu equipo.'
                    }
                ]
            }
        ]
    },
    comunicacion: {
        titulo: 'Comunicación',
        subtitulo: 'Chat, broadcast y coordinación',
        temas: [
            {
                titulo: 'Chat de incidentes',
                descripcion: 'Comunicación en tiempo real',
                pasos: [
                    {
                        titulo: 'Acceder al chat',
                        contenido: 'Dentro de cualquier incidente, encontrarás el botón de chat en la parte inferior. Haz clic para abrir la ventana de conversación.',
                        tip: 'El indicador rojo muestra mensajes no leídos.'
                    },
                    {
                        titulo: 'Enviar mensajes',
                        contenido: 'Escribe tu mensaje en el campo de texto y presiona Enter o el botón de enviar. Todos los participantes del incidente verán tu mensaje instantáneamente.',
                        lista: [
                            'Mensajes de texto',
                            'Compartir ubicación',
                            'Enviar fotos/videos',
                            'Mensajes de voz'
                        ]
                    },
                    {
                        titulo: 'Compartir ubicación',
                        contenido: 'Haz clic en el icono de ubicación para compartir tu posición actual en el chat. Útil para coordinar puntos de encuentro o reportar tu llegada.',
                        tip: 'La ubicación compartida se actualiza en tiempo real durante 5 minutos.'
                    },
                    {
                        titulo: 'Adjuntar archivos',
                        contenido: 'Usa el icono de clip para adjuntar fotos, videos o documentos. Los archivos se comprimen automáticamente para envío rápido.',
                        lista: [
                            'Fotos de evidencia',
                            'Videos del incidente',
                            'Documentos importantes',
                            'Capturas de pantalla'
                        ]
                    },
                    {
                        titulo: 'Mensajes importantes',
                        contenido: 'Marca mensajes como importantes para que se destaquen. Útil para comunicar información crítica que no debe pasarse por alto.',
                        tip: 'Los mensajes marcados como urgentes envían una notificación especial a todos.'
                    }
                ]
            }
        ]
    },
    reportes: {
        titulo: 'Reportes y Análisis',
        subtitulo: 'Generar informes y estadísticas',
        temas: [
            {
                titulo: 'Generar reportes',
                descripcion: 'Crear informes personalizados',
                pasos: [
                    {
                        titulo: 'Acceder a reportes',
                        contenido: 'Desde el menú principal, selecciona "Reportes y Análisis". Aquí encontrarás plantillas predefinidas y la opción de crear reportes personalizados.',
                        tip: 'Los reportes se generan en tiempo real con los datos más actualizados.'
                    },
                    {
                        titulo: 'Seleccionar tipo de reporte',
                        contenido: 'Elige entre diferentes tipos: incidentes por período, desempeño de unidades, análisis geográfico, tiempos de respuesta o reportes personalizados.',
                        lista: [
                            'Reporte de incidentes',
                            'Análisis de tiempos',
                            'Estadísticas por zona',
                            'Desempeño del equipo'
                        ]
                    },
                    {
                        titulo: 'Configurar filtros',
                        contenido: 'Define el rango de fechas, tipos de incidentes, zonas geográficas, unidades específicas y otros criterios para tu reporte.',
                        tip: 'Guarda configuraciones frecuentes como plantillas para uso futuro.'
                    },
                    {
                        titulo: 'Visualización',
                        contenido: 'Los datos se presentan en gráficos interactivos, tablas, mapas de calor y estadísticas clave. Puedes alternar entre diferentes vistas.',
                        lista: [
                            'Gráficos de líneas y barras',
                            'Tablas de datos detalladas',
                            'Mapas de calor',
                            'Indicadores clave (KPIs)'
                        ]
                    },
                    {
                        titulo: 'Exportar reporte',
                        contenido: 'Descarga tu reporte en formato PDF, Excel o CSV. Puedes programar reportes automáticos que se envíen por email periódicamente.',
                        tip: 'Los reportes en PDF incluyen gráficos y son ideales para presentaciones.'
                    }
                ]
            }
        ]
    },
    configuracion: {
        titulo: 'Configuración',
        subtitulo: 'Ajustes de cuenta y sistema',
        temas: [
            {
                titulo: 'Ajustes de cuenta',
                descripcion: 'Personaliza tu experiencia',
                pasos: [
                    {
                        titulo: 'Acceso a configuración',
                        contenido: 'Haz clic en tu avatar en la esquina superior derecha y selecciona "Configuración". Se abrirá el panel de ajustes.',
                        tip: 'Usa Ctrl+, como atajo rápido para abrir configuración.'
                    },
                    {
                        titulo: 'Perfil de usuario',
                        contenido: 'Actualiza tu información personal: nombre, foto de perfil, cargo, contacto de emergencia y preferencias de comunicación.',
                        lista: [
                            'Información personal',
                            'Foto de perfil',
                            'Contactos de emergencia',
                            'Preferencias de idioma'
                        ]
                    },
                    {
                        titulo: 'Seguridad',
                        contenido: 'Gestiona tu seguridad: cambiar contraseña, activar autenticación de dos factores, revisar sesiones activas y configurar bloqueo automático.',
                        tip: 'Se recomienda activar la autenticación de dos factores para mayor seguridad.'
                    },
                    {
                        titulo: 'Notificaciones',
                        contenido: 'Personaliza cómo y cuándo recibir notificaciones: alertas críticas, mensajes de chat, asignaciones, horario de silencio y sonidos personalizados.',
                        lista: [
                            'Alertas de incidentes',
                            'Notificaciones de chat',
                            'Recordatorios de turno',
                            'Horarios de silencio'
                        ]
                    },
                    {
                        titulo: 'Preferencias de la app',
                        contenido: 'Ajusta el tema (claro/oscuro), idioma, unidades de medida, formato de fecha/hora y configuración de rendimiento según tu dispositivo.',
                        tip: 'El modo oscuro ayuda a ahorrar batería en dispositivos móviles.'
                    }
                ]
            }
        ]
    }
};

// Estado de la aplicación
let categoriaActual = null;
let temaActual = null;
let pasoActual = 0;

// Inicialización
document.addEventListener('DOMContentLoaded', function() {
    inicializarEventos();
});

function inicializarEventos() {
    // Botones de categorías
    const botonesCategoria = document.querySelectorAll('.ayuda-category-card');
    botonesCategoria.forEach(btn => {
        btn.addEventListener('click', () => {
            const categoria = btn.getAttribute('data-category');
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
    const datos = contenidoCategorias[categoria];

    if (!datos) return;

    // Actualizar título
    document.getElementById('categoria-titulo').textContent = datos.titulo;
    document.getElementById('categoria-subtitulo').textContent = datos.subtitulo;

    // Crear lista de temas
    const contenedor = document.getElementById('contenido-categoria');
    contenedor.innerHTML = '';

    const lista = document.createElement('ul');
    lista.className = 'ayuda-topics-list';

    datos.temas.forEach((tema, index) => {
        const li = document.createElement('li');
        li.className = 'ayuda-topic-item';
        li.innerHTML = `
            <h3 class="ayuda-topic-title">${tema.titulo}</h3>
            <p class="ayuda-topic-desc">${tema.descripcion}</p>
        `;
        li.addEventListener('click', () => mostrarTutorial(categoria, index));
        lista.appendChild(li);
    });

    contenedor.appendChild(lista);

    // Cambiar vista
    cambiarVista('categoria');
}

function mostrarTutorial(categoria, indexTema) {
    categoriaActual = categoria;
    temaActual = indexTema;
    pasoActual = 0;

    const datos = contenidoCategorias[categoria];
    const tema = datos.temas[indexTema];

    // Actualizar título
    document.getElementById('tutorial-titulo').textContent = tema.titulo;
    document.getElementById('paso-total').textContent = tema.pasos.length;

    // Mostrar primer paso
    actualizarPaso();

    // Cambiar vista
    cambiarVista('tutorial');
}

function actualizarPaso() {
    const datos = contenidoCategorias[categoriaActual];
    const tema = datos.temas[temaActual];
    const paso = tema.pasos[pasoActual];

    // Actualizar progreso
    const progreso = ((pasoActual + 1) / tema.pasos.length) * 100;
    document.getElementById('tutorial-progreso').style.width = progreso + '%';
    document.getElementById('paso-actual').textContent = pasoActual + 1;

    // Crear contenido del paso
    const contenedor = document.getElementById('tutorial-paso');
    contenedor.innerHTML = '';

    const pasoDiv = document.createElement('div');
    pasoDiv.className = 'ayuda-paso';

    let html = `
        <h2 class="ayuda-paso-titulo">${paso.titulo}</h2>
        <div class="ayuda-paso-contenido">${paso.contenido}</div>
    `;

    if (paso.lista) {
        html += '<ul class="ayuda-paso-lista">';
        paso.lista.forEach(item => {
            html += `<li>${item}</li>`;
        });
        html += '</ul>';
    }

    if (paso.tip) {
        html += `
            <div class="ayuda-paso-tip">
                <div class="ayuda-paso-tip-title">💡 Consejo</div>
                <div class="ayuda-paso-tip-text">${paso.tip}</div>
            </div>
        `;
    }

    pasoDiv.innerHTML = html;
    contenedor.appendChild(pasoDiv);

    // Actualizar botones
    document.getElementById('btn-anterior').disabled = pasoActual === 0;

    const btnSiguiente = document.getElementById('btn-siguiente');
    if (pasoActual === tema.pasos.length - 1) {
        btnSiguiente.textContent = 'Finalizar';
    } else {
        btnSiguiente.textContent = 'Siguiente →';
    }
}

function pasoAnterior() {
    if (pasoActual > 0) {
        pasoActual--;
        actualizarPaso();
    }
}

function pasoSiguiente() {
    const datos = contenidoCategorias[categoriaActual];
    const tema = datos.temas[temaActual];

    if (pasoActual < tema.pasos.length - 1) {
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

