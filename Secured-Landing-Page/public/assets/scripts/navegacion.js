// ============================================
// NAVEGACIÓN - SECURED
// Manejo de flujo de navegación con Google Maps
// ============================================

// Coordenadas de Lima, Perú (referencia)
const LIMA_CENTER = { lat: -12.0464, lng: -77.0428 };
const DESTINO = { lat: -12.0520, lng: -77.0350 }; // Av. Central 892, Sector Centro (ejemplo)
const INICIO = { lat: -12.0380, lng: -77.0520 }; // Posición inicial del móvil

let mapPreview = null;
let mapNavegacion = null;
let mapInstrucciones = null;
let directionsService = null;
let directionsRenderer = null;
let marker = null;

// ============================================
// INICIALIZACIÓN
// ============================================

document.addEventListener('DOMContentLoaded', function() {
    // Si Google Maps no está disponible, usar mock
    if (typeof google === 'undefined' || !google.maps) {
        console.warn('Google Maps no disponible. Usando mapas mock.');
        initMockMaps();
    }

    initNavigation();
});

// Función callback para Google Maps API
window.initMap = function() {
    initGoogleMaps();
};

// ============================================
// INICIALIZAR NAVEGACIÓN
// ============================================

function initNavigation() {
    // Botones de navegación entre vistas
    const btnIniciarNavegacion = document.getElementById('btnIniciarNavegacion');
    const btnVolverPreparar = document.getElementById('btnVolverPreparar');
    const btnAbrirInstrucciones = document.getElementById('btnAbrirInstrucciones');
    const btnCerrarInstrucciones = document.getElementById('btnCerrarInstrucciones');
    const btnCerrarPanel = document.getElementById('btnCerrarPanel');

    // Botones de acción
    const btnFinalizar = document.getElementById('btnFinalizar');
    const btnFinalizarInstrucciones = document.getElementById('btnFinalizarInstrucciones');
    const btnRecalcular = document.getElementById('btnRecalcular');
    const btnRecalcularInstrucciones = document.getElementById('btnRecalcularInstrucciones');

    // Iniciar navegación
    if (btnIniciarNavegacion) {
        btnIniciarNavegacion.addEventListener('click', function() {
            changeView('navegando');
            if (mapNavegacion) {
                google.maps.event.trigger(mapNavegacion, 'resize');
                mapNavegacion.setCenter(INICIO);
            }
        });
    }

    // Volver a preparar
    if (btnVolverPreparar) {
        btnVolverPreparar.addEventListener('click', function() {
            changeView('preparar');
        });
    }

    // Abrir instrucciones paso a paso
    if (btnAbrirInstrucciones) {
        btnAbrirInstrucciones.addEventListener('click', function() {
            changeView('instrucciones');
            if (mapInstrucciones) {
                google.maps.event.trigger(mapInstrucciones, 'resize');
                mapInstrucciones.setCenter(INICIO);
            }
        });
    }

    // Cerrar instrucciones
    if (btnCerrarInstrucciones) {
        btnCerrarInstrucciones.addEventListener('click', function() {
            changeView('navegando');
        });
    }

    if (btnCerrarPanel) {
        btnCerrarPanel.addEventListener('click', function() {
            changeView('navegando');
        });
    }

    // Finalizar navegación
    if (btnFinalizar) {
        btnFinalizar.addEventListener('click', finalizarNavegacion);
    }

    if (btnFinalizarInstrucciones) {
        btnFinalizarInstrucciones.addEventListener('click', finalizarNavegacion);
    }

    // Recalcular ruta
    if (btnRecalcular) {
        btnRecalcular.addEventListener('click', recalcularRuta);
    }

    if (btnRecalcularInstrucciones) {
        btnRecalcularInstrucciones.addEventListener('click', recalcularRuta);
    }
}

// ============================================
// CAMBIAR VISTA
// ============================================

function changeView(viewName) {
    // Ocultar todas las vistas
    const views = document.querySelectorAll('.nav-view');
    views.forEach(view => {
        view.classList.remove('nav-view-active');
    });

    // Mostrar vista seleccionada
    const targetView = document.querySelector(`[data-view="${viewName}"]`);
    if (targetView) {
        targetView.classList.add('nav-view-active');
    }
}

// ============================================
// INICIALIZAR GOOGLE MAPS
// ============================================

function initGoogleMaps() {
    if (typeof google === 'undefined' || !google.maps) {
        console.error('Google Maps no está disponible');
        return;
    }

    directionsService = new google.maps.DirectionsService();
    directionsRenderer = new google.maps.DirectionsRenderer({
        suppressMarkers: false,
        polylineOptions: {
            strokeColor: '#2563eb',
            strokeWeight: 5,
            strokeOpacity: 0.8
        }
    });

    // Mapa de vista previa
    const mapPreviewElement = document.getElementById('mapPreview');
    if (mapPreviewElement) {
        mapPreview = new google.maps.Map(mapPreviewElement, {
            center: LIMA_CENTER,
            zoom: 14,
            mapTypeControl: false,
            streetViewControl: false,
            fullscreenControl: false,
            styles: getMapStyles()
        });

        // Agregar marcadores de inicio y destino
        new google.maps.Marker({
            position: INICIO,
            map: mapPreview,
            icon: {
                path: google.maps.SymbolPath.CIRCLE,
                scale: 8,
                fillColor: '#2563eb',
                fillOpacity: 1,
                strokeColor: '#ffffff',
                strokeWeight: 2
            },
            title: 'Posición actual'
        });

        new google.maps.Marker({
            position: DESTINO,
            map: mapPreview,
            icon: {
                path: google.maps.SymbolPath.CIRCLE,
                scale: 10,
                fillColor: '#dc2626',
                fillOpacity: 1,
                strokeColor: '#ffffff',
                strokeWeight: 3
            },
            title: 'Destino'
        });

        // Dibujar ruta
        calculateAndDisplayRoute(mapPreview, false);
    }

    // Mapa de navegación activa
    const mapNavegacionElement = document.getElementById('mapNavegacion');
    if (mapNavegacionElement) {
        mapNavegacion = new google.maps.Map(mapNavegacionElement, {
            center: INICIO,
            zoom: 16,
            mapTypeControl: false,
            streetViewControl: false,
            fullscreenControl: false,
            styles: getMapStyles()
        });

        // Marcador de posición actual (móvil)
        marker = new google.maps.Marker({
            position: INICIO,
            map: mapNavegacion,
            icon: {
                path: google.maps.SymbolPath.FORWARD_CLOSED_ARROW,
                scale: 6,
                fillColor: '#2563eb',
                fillOpacity: 1,
                strokeColor: '#ffffff',
                strokeWeight: 2,
                rotation: 0
            },
            title: 'Tu posición'
        });

        // Marcador de destino
        new google.maps.Marker({
            position: DESTINO,
            map: mapNavegacion,
            icon: {
                path: google.maps.SymbolPath.CIRCLE,
                scale: 10,
                fillColor: '#dc2626',
                fillOpacity: 1,
                strokeColor: '#ffffff',
                strokeWeight: 3
            },
            title: 'Destino'
        });

        // Dibujar ruta
        calculateAndDisplayRoute(mapNavegacion, true);
    }

    // Mapa de instrucciones (pequeño)
    const mapInstruccionesElement = document.getElementById('mapInstrucciones');
    if (mapInstruccionesElement) {
        mapInstrucciones = new google.maps.Map(mapInstruccionesElement, {
            center: INICIO,
            zoom: 15,
            mapTypeControl: false,
            streetViewControl: false,
            fullscreenControl: false,
            styles: getMapStyles()
        });

        // Marcador de posición actual
        new google.maps.Marker({
            position: INICIO,
            map: mapInstrucciones,
            icon: {
                path: google.maps.SymbolPath.FORWARD_CLOSED_ARROW,
                scale: 5,
                fillColor: '#2563eb',
                fillOpacity: 1,
                strokeColor: '#ffffff',
                strokeWeight: 2
            },
            title: 'Tu posición'
        });

        // Marcador de destino
        new google.maps.Marker({
            position: DESTINO,
            map: mapInstrucciones,
            icon: {
                path: google.maps.SymbolPath.CIRCLE,
                scale: 8,
                fillColor: '#dc2626',
                fillOpacity: 1,
                strokeColor: '#ffffff',
                strokeWeight: 2
            },
            title: 'Destino'
        });

        // Dibujar ruta
        calculateAndDisplayRoute(mapInstrucciones, false);
    }
}

// ============================================
// CALCULAR Y MOSTRAR RUTA
// ============================================

function calculateAndDisplayRoute(map, animate = false) {
    if (!directionsService) return;

    const request = {
        origin: INICIO,
        destination: DESTINO,
        travelMode: google.maps.TravelMode.DRIVING,
        drivingOptions: {
            departureTime: new Date(),
            trafficModel: 'bestguess'
        }
    };

    directionsService.route(request, function(result, status) {
        if (status === google.maps.DirectionsStatus.OK) {
            const renderer = new google.maps.DirectionsRenderer({
                map: map,
                directions: result,
                suppressMarkers: true,
                polylineOptions: {
                    strokeColor: '#2563eb',
                    strokeWeight: 5,
                    strokeOpacity: 0.8
                }
            });

            if (animate) {
                // Simular movimiento del marcador
                animateMarker(result.routes[0].overview_path);
            }
        } else {
            console.error('Error al calcular la ruta:', status);
        }
    });
}

// ============================================
// ANIMAR MARCADOR
// ============================================

function animateMarker(path) {
    if (!marker || !path || path.length === 0) return;

    let index = 0;
    const speed = 100; // ms entre cada punto

    function moveMarker() {
        if (index < path.length) {
            marker.setPosition(path[index]);
            index++;
            setTimeout(moveMarker, speed);
        }
    }

    // Iniciar animación después de 2 segundos
    setTimeout(moveMarker, 2000);
}

// ============================================
// ESTILOS DEL MAPA
// ============================================

function getMapStyles() {
    return [
        {
            featureType: 'poi',
            elementType: 'labels',
            stylers: [{ visibility: 'off' }]
        },
        {
            featureType: 'transit',
            elementType: 'labels.icon',
            stylers: [{ visibility: 'off' }]
        }
    ];
}

// ============================================
// MAPAS MOCK (FALLBACK)
// ============================================

function initMockMaps() {
    const mapContainers = [
        'mapPreview',
        'mapNavegacion',
        'mapInstrucciones'
    ];

    mapContainers.forEach(containerId => {
        const container = document.getElementById(containerId);
        if (container) {
            container.innerHTML = `
                <div style="width: 100%; height: 100%; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); display: flex; align-items: center; justify-content: center; color: white; font-weight: 600; text-align: center; padding: 20px;">
                    <div>
                        <div style="font-size: 40px; margin-bottom: 10px;">🗺️</div>
                        <div>Mapa de navegación</div>
                        <div style="font-size: 12px; opacity: 0.8; margin-top: 8px;">Lima, Perú</div>
                    </div>
                </div>
            `;
        }
    });
}

// ============================================
// FINALIZAR NAVEGACIÓN
// ============================================

function finalizarNavegacion() {
    const confirmar = confirm('¿Estás seguro de finalizar la navegación?');
    if (confirmar) {
        changeView('preparar');
        alert('Navegación finalizada');
    }
}

// ============================================
// RECALCULAR RUTA
// ============================================

function recalcularRuta() {
    alert('Recalculando ruta con tráfico actualizado...');

    if (mapNavegacion && directionsService) {
        calculateAndDisplayRoute(mapNavegacion, true);
    }

    // Simular actualización de tiempo
    const timeElements = document.querySelectorAll('.nav-active-text');
    timeElements.forEach(el => {
        el.textContent = '5 min • 3.2 km';
    });
}

// ============================================
// ACTUALIZAR ETA EN TIEMPO REAL (SIMULACIÓN)
// ============================================

function updateETASimulation() {
    let minutes = 6;

    setInterval(() => {
        if (minutes > 0) {
            minutes--;
            const timeElements = document.querySelectorAll('.nav-active-text');
            timeElements.forEach(el => {
                el.textContent = `${minutes} min • 3.2 km`;
            });

            const arrivalElements = document.querySelectorAll('.nav-arrival-time');
            arrivalElements.forEach(el => {
                const now = new Date();
                now.setMinutes(now.getMinutes() + minutes);
                el.textContent = now.toLocaleTimeString('es-PE', {
                    hour: '2-digit',
                    minute: '2-digit'
                });
            });
        }
    }, 60000); // Cada minuto
}

// Iniciar simulación de ETA
updateETASimulation();

