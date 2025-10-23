# GPTzinho

Projeto pequeno que fornece uma interface web local (frontend em `public/`) e um backend Express que encaminha prompts para um modelo rodando via Ollama.

Este repositório oferece uma UI simples de chat e um servidor Node.js/Express com um endpoint `/chat` que envia prompts ao Ollama e retorna as respostas ao frontend.

## Visão geral

- Frontend: arquivos estáticos em `public/` (HTML, CSS, JS). UI minimalista para conversar com o assistente.
- Backend: `server.js` — servidor Express que expõe o endpoint `POST /chat` e serve os arquivos estáticos.
- Integração: depende de um servidor Ollama rodando localmente com o modelo apropriado (ex.: `llama3.2:3b`).
# GPTzinho

Projeto pequeno que fornece uma interface web local (frontend em `public/`) e um backend Express que encaminha prompts para um modelo rodando via Ollama.

Este repositório oferece uma UI simples de chat e um servidor Node.js/Express com um endpoint `POST /chat` que envia prompts ao Ollama e retorna as respostas ao frontend.

## Visão geral

- Frontend: arquivos estáticos em `public/` (HTML, CSS, JS). UI minimalista para conversar com o assistente.
- Backend: `server.js` — servidor Express que expõe o endpoint `POST /chat` e serve os arquivos estáticos.
- Integração: depende de um servidor Ollama rodando localmente com o modelo apropriado (ex.: `llama3.2:3b`).

## Pré-requisitos

- Node.js (v16+ recomendado)
- npm (ou yarn)
- Ollama rodando localmente (padrão: porta 11434) com o modelo configurado (ex.: `llama3.2:3b`).

Observação: o projeto não inclui o modelo. Você precisa ter o Ollama e o(s) modelo(s) instalados/configurados separadamente.

## Instalação

1. Clone o repositório (se ainda não fez):

```bash
git clone https://github.com/andersonrmgomes/gptzinho.git
```

2. Entre na pasta do projeto:

```bash
cd gptzinho
```

3. Instale dependências:

```bash
npm install
```

4. (Opcional) Crie um arquivo `.env` na raiz se quiser ajustar a porta:

```bash
echo "PORT=3000" > .env
```

## Execução

Iniciar o servidor:

```bash
npm start
```

Isso iniciará o servidor Express definido em `server.js`. Abra `http://localhost:3000` no navegador para acessar a interface.

## Estrutura de arquivos

- `server.js` — servidor Express; endpoint principal `POST /chat`.
- `package.json` — dependências e scripts.
- `public/` — frontend:
  - `index.html` — interface do chat
  - `script.js` — lógica do frontend (envia prompt para `/chat` e renderiza respostas)
  - `style.css` — estilos
  - `favicon.ico`
- `docs/` — documentação adicional (uso e API).

## API

Endpoint principal: `POST /chat`

Request JSON:

```json
{
  "prompt": "sua pergunta aqui"
}
```

Resposta JSON de sucesso (exemplo):

```json
{
  "model": "llama3.2:3b",
  "response": "texto de resposta"
}
```

Veja `docs/API.md` para detalhes.

## Observações sobre o comportamento do assistente

O servidor aplica um prompt de sistema que define a persona do assistente (no código atual, a persona é intencionalmente mal-educada e sarcástica). Se quiser alterar o tom/respostas, edite a constante `SYSTEM_PROMPT_RUDE` em `server.js`.

## Problemas comuns / Depuração

- Erro de conexão com Ollama: verifique se o Ollama está rodando e se o modelo está disponível.
- CORS / rede: o frontend faz requisições para `http://localhost:3000/chat` por padrão. Se mudar a porta, atualize `public/script.js` ou use variáveis de ambiente.

## Como contribuir

Pequenas contribuições são bem-vindas: abra issues ou PRs. Veja `CONTRIBUTING.md` para orientações.

## Licença

Projeto com licença ISC (ver `package.json`).

---
Arquivos de documentação adicionais foram adicionados em `docs/`.

