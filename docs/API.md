# API - Endpoints

## POST /chat

Envia um prompt para o backend, que o encaminha ao Ollama e retorna a resposta do modelo.

- URL: `/chat`
- Método: `POST`
- Content-Type: `application/json`

Request body (JSON):

```
{
  "prompt": "Texto com a pergunta ou instrução"
}
```

Resposta de sucesso (200):

```
{
  "model": "llama3.2:3b",
  "response": "Texto gerado pelo modelo"
}
```

Erros comuns:

- 400 Bad Request: quando o campo `prompt` não é enviado.
- 503 Service Unavailable: quando não foi possível conectar/obter resposta do Ollama.
