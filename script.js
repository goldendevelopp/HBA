document.addEventListener('DOMContentLoaded', function() {
    // Elementos del DOM
    const chatbotToggle = document.querySelector('.chatbot-toggle');
    const chatbotContainer = document.querySelector('.chatbot-container');
    const chatbotClose = document.querySelector('.chatbot-close');
    const messageInput = document.querySelector('.message-input');
    const sendButton = document.querySelector('.send-button');
    const chatbotMessages = document.querySelector('.chatbot-messages');
    const quickOptions = document.querySelectorAll('.quick-option');

    fetch('hbagoldenprincipal.html')
        .then(response => response.text())
        .then(html => {
            document.body.insertAdjacentHTML('beforeend', html);
            // Ahora carga el JS
            const script = document.createElement('script');
            script.src = 'chatbot.js';
            document.body.appendChild(script);
        });
    // Mostrar/ocultar chatbot
    chatbotToggle.addEventListener('click', function() {
        chatbotContainer.classList.toggle('active');
    });
    
    chatbotClose.addEventListener('click', function() {
        chatbotContainer.classList.remove('active');
    });
    
    // Enviar mensaje al presionar Enter
    messageInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            sendMessage();
        }
    });
    
    // Enviar mensaje al hacer clic en el botón
    sendButton.addEventListener('click', sendMessage);
    
    // Opciones rápidas
    quickOptions.forEach(option => {
        option.addEventListener('click', function() {
            const text = this.textContent;
            addMessage(text, 'user');
            messageInput.value = '';
            
            // Simular respuesta del bot
            setTimeout(() => {
                botResponse(text);
            }, 1000);
        });
    });
    
    // Función para enviar mensaje
    function sendMessage() {
        const message = messageInput.value.trim();
        if (message !== '') {
            addMessage(message, 'user');
            messageInput.value = '';
            
            // Simular respuesta del bot
            setTimeout(() => {
                botResponse(message);
            }, 1000);
        }
    }
    
    // Función para añadir mensaje al chat
    function addMessage(text, sender) {
        const messageDiv = document.createElement('div');
        messageDiv.classList.add('message', `${sender}-message`);
        
        const contentDiv = document.createElement('div');
        contentDiv.classList.add('message-content');
        contentDiv.innerHTML = `<p>${text}</p>`;
        
        const timeDiv = document.createElement('div');
        timeDiv.classList.add('message-time');
        timeDiv.textContent = getCurrentTime();
        
        messageDiv.appendChild(contentDiv);
        messageDiv.appendChild(timeDiv);
        
        chatbotMessages.appendChild(messageDiv);
        scrollToBottom();
    }
    
    // Función para obtener la hora actual
    function getCurrentTime() {
        const now = new Date();
        let hours = now.getHours();
        let minutes = now.getMinutes();
        
        hours = hours < 10 ? `0${hours}` : hours;
        minutes = minutes < 10 ? `0${minutes}` : minutes;
        
        return `${hours}:${minutes}`;
    }
    
    // Función para desplazarse al final del chat
    function scrollToBottom() {
        chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
    }
    
    // Respuestas del bot
    function botResponse(userMessage) {
        let response = '';
        userMessage = userMessage.toLowerCase();
        
        if (userMessage.includes('hola') || userMessage.includes('buenos días') || userMessage.includes('buenas tardes')) {
            response = '¡Hola! 😊 Soy tu asistente virtual de HBA Golden. ¿En qué puedo ayudarte hoy?';
        } 
        else if (userMessage.includes('producto') || userMessage.includes('productos') || userMessage.includes('más vendido')) {
            response = 'Nuestros productos más vendidos son:<br><br>• Protector Solar 50+<br>• Base de Maquillaje FPS 50+<br>• Bálsamo Labial con Color<br><br>¿Te gustaría conocer más detalles de alguno de ellos?';
        }
        else if (userMessage.includes('protector solar') || userMessage.includes('fps')) {
            response = 'Nuestro Protector Solar 50+ es un bestseller por su textura ligera y protección superior. Contiene ingredientes que cuidan tu piel mientras te protege de los rayos UV. ¿Quieres saber sobre su precio o disponibilidad?';
        }
        else if (userMessage.includes('base') || userMessage.includes('maquillaje')) {
            response = 'La Base de Maquillaje FPS 50+ de HBA Golden ofrece cobertura perfecta con protección solar. Está formulada con ácido hialurónico y vitamina E para nutrir tu piel. Tenemos 8 tonos disponibles. ¿Necesitas ayuda para elegir tu tono?';
        }
        else if (userMessage.includes('precio') || userMessage.includes('cuánto cuesta')) {
            response = 'Los precios de nuestros productos premium varían según la línea:<br><br>• Bases: $45.99<br>• Protectores solares: $39.99<br>• Correctores: $29.99<br>• Blush y bronzers: $34.99<br><br>Actualmente tenemos un 10% de descuento en tu primera compra usando el código BIENVENIDA10.';
        }
        else if (userMessage.includes('pedido') || userMessage.includes('compra') || userMessage.includes('envío')) {
            response = 'Para consultar el estado de tu pedido, necesitaré el número de orden. También puedes acceder a tu cuenta en nuestra página web para ver todos los detalles. Los envíos suelen tardar de 2 a 5 días hábiles.';
        }
        else if (userMessage.includes('contacto') || userMessage.includes('servicio al cliente') || userMessage.includes('atención')) {
            response = 'Puedes contactar a nuestro servicio al cliente:<br><br>📧 Email: info@hbagolden.com<br>📞 Teléfono: +1 (555) 123-4567<br>⏰ Horario: Lunes a Viernes de 9am a 6pm<br><br>¿Prefieres que te conecte con un agente ahora?';
        }
        else if (userMessage.includes('skincare') || userMessage.includes('rutina') || userMessage.includes('cuidado')) {
            response = '¡Nos encanta el skincare! 💖 Te recomiendo:<br><br>1. Limpieza suave por la mañana y noche<br>2. Protector solar FPS 50+ todos los días (¡incluso en interiores!)<br>3. Hidratación con nuestros productos que combinan maquillaje y cuidado<br><br>¿Tienes algún tipo de piel específico que quieras tratar?';
        }
        else {
            const randomResponses = [
                'Interesante pregunta. Permíteme consultar esa información para darte una respuesta precisa.',
                '¿Podrías darme más detalles sobre lo que necesitas saber? Así podré ayudarte mejor.',
                'Voy a transferir tu consulta a nuestro equipo de expertos para que te den la mejor respuesta.',
                'Actualmente no tengo esa información, pero puedo conectarte con un especialista si lo deseas.',
                'Esa es una excelente pregunta. Nuestros productos están diseñados para ofrecer resultados visibles mientras cuidan tu piel.'
            ];
            response = randomResponses[Math.floor(Math.random() * randomResponses.length)];
        }
        
        addMessage(response, 'bot');
    }
});