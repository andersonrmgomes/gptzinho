document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('chat-form');
    const input = document.getElementById('user-input');
    const messagesArea = document.getElementById('messages-area');
    const sendButton = document.getElementById('send-button');
    
    // URL do seu endpoint Node.js/Express
    const API_ENDPOINT = 'http://localhost:3000/chat';

    /**
     * Adiciona uma mensagem na área de chat
     * @param {string} sender 'user' ou 'bot'
     * @param {string} content O texto da mensagem
     */
    function addMessage(sender, content) {
        const messageDiv = document.createElement('div');
        messageDiv.classList.add('message', `${sender}-message`);
        
        const userNameSpan = document.createElement('span');
        userNameSpan.classList.add('user-name');
        userNameSpan.textContent = sender === 'user' ? 'Você' : 'GPTzinho';

        const contentP = document.createElement('p');
        contentP.textContent = content;

        messageDiv.appendChild(userNameSpan);
        messageDiv.appendChild(contentP);
        messagesArea.appendChild(messageDiv);
        
        // Mantém o scroll no final
        messagesArea.scrollTop = messagesArea.scrollHeight;
    }

    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        const prompt = input.value.trim();

        if (prompt === "") return;

        // 1. Adiciona a mensagem do usuário
        addMessage('user', prompt);
        
        // Limpa o input e desabilita o botão
        input.value = '';
        sendButton.disabled = true;
        sendButton.textContent = 'Pensando (e xingando)...';

        try {
            // 2. Faz a requisição POST para o seu backend
            const response = await fetch(API_ENDPOINT, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ prompt: prompt }),
            });

            const data = await response.json();

            // 3. Verifica se a API retornou um erro (status 4xx ou 5xx)
            if (!response.ok) {
                // Mensagem de erro do assistente, ainda que grosseira
                const errorMessage = data.error || 'A API falhou. Como esperado.';
                addMessage('bot', `ERRO: ${errorMessage}`);
                return;
            }

            // 4. Adiciona a resposta do Ollama (mal-educada)
            addMessage('bot', data.response);

        } catch (error) {
            // Erro de rede ou CORS
            console.error('Erro de comunicação com o servidor:', error);
            addMessage('bot', 'Não consigo nem te responder. Algum problema de rede. Culpa sua, claro.');
        } finally {
            // 5. Habilita o botão novamente
            sendButton.disabled = false;
            sendButton.textContent = 'Enviar';
        }
    });
});