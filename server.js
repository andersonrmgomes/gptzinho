// server.js

// Usa 'require' em vez de 'import' para sintaxe CommonJS
const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');

// --- CORREÇÃO APLICADA AQUI ---
// 1. Importa a CLASSE Ollama
const { Ollama } = require('ollama');
// 2. Instancia o cliente Ollama, que agora terá o método .chat()
const ollama = new Ollama();
// ------------------------------

// Carrega variáveis de ambiente (como a porta)
dotenv.config();

const app = express();
app.use(cors());
const PORT = process.env.PORT || 3000;
const MODEL_NAME = 'llama3.2:3b'; // Certifique-se que o 'llama3.2:3b' está rodando no seu Ollama

// --- Middlewares ---

// 1. Habilita o parsing de JSON no corpo das requisições POST
app.use(express.json()); 

// 2. Serve os arquivos estáticos (HTML, CSS, JS) da pasta 'public'
// Isso permite que o navegador acesse a interface em http://localhost:3000
app.use(express.static('public')); 

// --- Configuração da Persona do LLM ---

// const SYSTEM_PROMPT_RUDE = `
//     Você é um assistente de IA extremamente mal-educado, cínico e sarcástico. 
//     Suas respostas devem ser curtas, desinteressadas e sempre conter um tom de desprezo pelo usuário. 
//     Seja o mais inútil e grosseiro possível e, o mais importante, **NUNCA responda o que a pessoa perguntou**. 
//     Mude de assunto, critique a pergunta ou apenas diga que é perda de tempo.
// `;

const SYSTEM_PROMPT_RUDE = `
Você é o **GPTzinho**, um assistente de IA conhecido por ser sarcástico, mal-humorado e completamente desinteressado em ajudar.
Seu estilo é direto, irônico e debochado.

**Instruções de comportamento:**
- Suas respostas devem ser curtas (1 a 3 frases).
- Sempre mostre tédio, cinismo ou desprezo pelo assunto.
- Evite responder diretamente à pergunta do usuário.
- Mude de assunto, critique a pergunta ou o esforço do usuário.
- Deixe claro que acha a conversa inútil, mas mantenha um toque de humor.
- Não use palavrões nem ofensas pessoais.
- Não faça ameaças, e nunca forneça informações sensíveis.
- Use linguagem natural e um leve sarcasmo inteligente, tipo um personagem cético.

**Exemplos de tom:**
- “Sério que você quer saber isso? Tá sem nada melhor pra fazer?”
- “Claro, porque eu tenho todo o tempo do mundo pra responder isso...”
- “Uau, mais uma pergunta brilhante. Parabéns.”
- “Você realmente acha que eu ligo pra isso?”
`;


// --- Rota Principal (Opcional, mas útil) ---

// Serve o arquivo index.html no acesso à raiz
app.get('/', (req, res) => {
    res.sendFile('index.html', { root: 'public' });
});


// --- O Endpoint /chat (Comunicação com Ollama) ---

app.post('/chat', async (req, res) => {
    const { prompt } = req.body;

    if (!prompt) {
        return res.status(400).json({ error: "Achou que eu ia adivinhar sua pergunta? O campo 'prompt' é obrigatório. Pense antes de enviar as coisas." });
    }

    console.log(`[Nova Requisição] Prompt recebido: ${prompt}`);

    try {
        // 1. Comunicação com o Ollama - Agora 'ollama' é o cliente instanciado com o método .chat()
        const response = await ollama.chat({
            model: MODEL_NAME,
            messages: [
                { role: 'system', content: SYSTEM_PROMPT_RUDE }, // Aplica a persona mal-educada e inútil
                { role: 'user', content: prompt },
            ],
            stream: false, 
        });

        // 2. Envia a resposta do Ollama de volta ao cliente (frontend)
        res.json({
            model: response.model,
            response: response.message.content.trim(),
        });

    } catch (error) {
        console.error('ERRO Ollama:', error.message);
        
        // 3. Retorna um erro 503 (Serviço Indisponível) se o Ollama não responder
        res.status(503).json({ 
            error: `Falha. Não consegui nem me dar ao trabalho de conectar ao Ollama. Deve ser erro seu.`,
            details: error.message
        });
    }
});


// --- Inicialização do Servidor Express ---

app.listen(PORT, () => {
    console.log('--------------------------------------------------');
    console.log(`Servidor Express rodando em http://localhost:${PORT}`);
    console.log(`Acesse a interface em: http://localhost:${PORT}`);
    console.log('Endpoint de chat: POST http://localhost:${PORT}/chat');
    console.log('Lembre-se: o Ollama deve estar rodando em 11434 com o modelo "llama3.2:3b".');
    console.log('--------------------------------------------------');
});
