// Chat Incidente - JavaScript

// Variables globales
let currentChatId = null;

// Abrir chat individual
function openChat(chatId) {
    currentChatId = chatId;

    // Cambiar vista
    document.getElementById('lista-chats').classList.remove('active');
    document.getElementById('chat-individual').classList.add('active');

    // Actualizar header del chat
    document.getElementById('chat-id').textContent = chatId;

    // Actualizar subtítulo según el chat
    const subtitles = {
        'INC-2024-001': 'Alteración del orden público',
        'INC-2024-002': 'Vehículo sospechoso estacionado',
        'INC-2024-003': 'Ruido excesivo en local comercial'
    };

    document.getElementById('chat-subtitle').textContent = subtitles[chatId] || 'Detalles del incidente';

    // Scroll al final del chat
    scrollToBottom();
}

// Cerrar chat y volver a la lista
function closeChat() {
    document.getElementById('chat-individual').classList.remove('active');
    document.getElementById('lista-chats').classList.add('active');
    currentChatId = null;
}

// Scroll al final del chat
function scrollToBottom() {
    const chatMessages = document.getElementById('chat-messages');
    setTimeout(() => {
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }, 100);
}

// Enviar mensaje
function sendMessage() {
    const input = document.getElementById('message-input');
    const message = input.value.trim();

    if (message === '') return;

    // Crear elemento de mensaje
    const messageElement = document.createElement('div');
    messageElement.className = 'message sent';

    const now = new Date();
    const time = now.getHours().toString().padStart(2, '0') + ':' + now.getMinutes().toString().padStart(2, '0');

    messageElement.innerHTML = `
        <p>${escapeHtml(message)}</p>
        <span class="message-time">${time} ✓✓</span>
    `;

    // Agregar al chat
    const chatMessages = document.getElementById('chat-messages');
    chatMessages.appendChild(messageElement);

    // Limpiar input
    input.value = '';

    // Scroll al final
    scrollToBottom();

    // Simular respuesta (opcional)
    setTimeout(() => {
        sendAutoReply();
    }, 2000);
}

// Enviar respuesta automática (simulación)
function sendAutoReply() {
    const replies = [
        'Mensaje recibido. Estamos en camino.',
        'Entendido. Mantendremos informado.',
        'Gracias por la actualización.',
        'Confirmado. Procedemos según protocolo.'
    ];

    const randomReply = replies[Math.floor(Math.random() * replies.length)];

    const messageGroup = document.createElement('div');
    messageGroup.className = 'message-group';

    const now = new Date();
    const time = now.getHours().toString().padStart(2, '0') + ':' + now.getMinutes().toString().padStart(2, '0');

    messageGroup.innerHTML = `
        <div class="message-header">
            <span class="sender-name">Central</span>
            <span class="sender-role">Despacho</span>
        </div>
        <div class="message received">
            <p>${randomReply}</p>
            <span class="message-time">${time}</span>
        </div>
    `;

    const chatMessages = document.getElementById('chat-messages');
    chatMessages.appendChild(messageGroup);

    scrollToBottom();
}

// Abrir modal de adjuntar
function openAttachModal() {
    const modal = document.getElementById('attach-modal');
    modal.classList.add('active');
}

// Cerrar modal de adjuntar
function closeAttachModal() {
    const modal = document.getElementById('attach-modal');
    modal.classList.remove('active');
}

// Seleccionar tipo de adjunto
function selectAttachment(type) {
    console.log('Seleccionado:', type);

    // Cerrar modal
    closeAttachModal();

    // Simular subida de archivo
    setTimeout(() => {
        addAttachmentToChat(type);
    }, 500);
}

// Agregar adjunto al chat
function addAttachmentToChat(type) {
    const typeNames = {
        'camera': 'Foto',
        'gallery': 'Imagen',
        'voice': 'Nota de voz',
        'files': 'Archivo'
    };

    const now = new Date();
    const time = now.getHours().toString().padStart(2, '0') + ':' + now.getMinutes().toString().padStart(2, '0');

    const messageElement = document.createElement('div');
    messageElement.className = 'message sent';

    if (type === 'camera' || type === 'gallery') {
        messageElement.classList.add('with-image');
        messageElement.innerHTML = `
            <div class="message-image">
                <img src="Secured-Landing-Page/public/assets/images/chat-incidente.png" alt="Adjunto" />
            </div>
            <p>${typeNames[type]} adjuntada</p>
            <span class="message-time">${time} ✓✓</span>
        `;
    } else {
        messageElement.innerHTML = `
            <p>📎 ${typeNames[type]} adjunto</p>
            <span class="message-time">${time} ✓✓</span>
        `;
    }

    const chatMessages = document.getElementById('chat-messages');
    chatMessages.appendChild(messageElement);

    scrollToBottom();
}

// Escape HTML para prevenir XSS
function escapeHtml(text) {
    const map = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#039;'
    };
    return text.replace(/[&<>"']/g, m => map[m]);
}

// Event listeners
document.addEventListener('DOMContentLoaded', function() {
    // Enter para enviar mensaje
    const messageInput = document.getElementById('message-input');
    if (messageInput) {
        messageInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                e.preventDefault();
                sendMessage();
            }
        });
    }

    // Cerrar modal al hacer clic fuera
    const modal = document.getElementById('attach-modal');
    if (modal) {
        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                closeAttachModal();
            }
        });
    }

    // Auto-scroll al cargar un chat
    scrollToBottom();
});

// Simular actualización de mensajes en tiempo real (opcional)
function simulateRealTimeUpdates() {
    setInterval(() => {
        // Actualizar solo si estamos en un chat individual
        if (currentChatId && Math.random() > 0.9) {
            const now = new Date();
            const time = now.getHours().toString().padStart(2, '0') + ':' + now.getMinutes().toString().padStart(2, '0');

            const messageGroup = document.createElement('div');
            messageGroup.className = 'message-group';

            messageGroup.innerHTML = `
                <div class="message-header">
                    <span class="sender-name">Unidad-05</span>
                    <span class="sender-role">Serenazgo</span>
                </div>
                <div class="message received">
                    <p>Situación controlada. Todo en orden.</p>
                    <span class="message-time">${time}</span>
                </div>
            `;

            const chatMessages = document.getElementById('chat-messages');
            chatMessages.appendChild(messageGroup);

            scrollToBottom();
        }
    }, 10000); // Cada 10 segundos
}

// Iniciar simulación (comentado por defecto)
// simulateRealTimeUpdates();

