# Uso - GPTzinho

Este documento descreve, passo-a-passo, como configurar e executar o projeto localmente.

## Pré-requisitos rápidos

- Node.js (v16+)
- npm
- Ollama rodando localmente com o(s) modelo(s) desejado(s) (ex.: `llama3.2:3b`). O Ollama geralmente escuta na porta 11434 por padrão.

## Passos

1. Instale dependências:

   npm install

2. (Opcional) Configure a porta do servidor na raiz criando um arquivo `.env` com, por exemplo:

   PORT=3000

3. Garanta que o Ollama esteja rodando e que o modelo desejado esteja disponível. Exemplo (depende da sua instalação do Ollama):

   # comandos do Ollama NÃO são fornecidos aqui — siga a documentação do Ollama para baixar/rodar modelos

4. Inicie o servidor Node/Express:

   npm start

5. Abra no navegador:

   http://localhost:3000

6. Teste via curl (exemplo):

   curl -X POST http://localhost:3000/chat -H "Content-Type: application/json" -d "{\"prompt\":\"Escreva um haicai sobre código\"}"

## Dicas de depuração

- Se receber erro relacionado ao Ollama: verifique se ele está em execução e se o modelo foi carregado.
- Se houver erro CORS, confirme que o frontend e o backend estão na mesma origem (ou ajuste CORS no `server.js`).
- Logs do servidor: o `server.js` já imprime no console quando recebe requisições e em caso de erros.

## Alterar o comportamento do assistente

O tom/persona do assistente é definido por um prompt de sistema em `server.js` (`SYSTEM_PROMPT_RUDE`). Edite esse texto para ajustar como o LLM deve responder.
