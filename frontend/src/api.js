const BASE_URL = 'http://localhost:3000'

export class ApiError extends Error {
  constructor(status, statusText, message) {
    super(message || `${status} ${statusText}`)
    this.name = 'ApiError'
    this.status = status
    this.statusText = statusText
  }
}

async function requisicao(caminho, opcoes = {}) {
  const { signal, headers, body, ...resto } = opcoes

  const configuracoes = {
    ...resto,
    headers: { 'Content-Type': 'application/json', ...headers },
    ...(signal ? { signal } : {}),
  }
  if (body !== undefined) {
    configuracoes.body = JSON.stringify(body)
  }

   let resp
  try {
    resp = await fetch(`${BASE_URL}${caminho}`, configuracoes)
  } catch (e) {
    if (e.name === 'AbortError') throw e
    throw new Error(
      'Não foi possível conectar à API. Verifique se o servidor está rodando.',
      { cause: e }
    )
  }

  if (resp.status === 204) return null

    const dados = await resp.json().catch(() => null)
    
  if (!resp.ok) {
    throw new ApiError(resp.status, resp.statusText, dados?.erro ?? dados?.message)
  }
  return dados
}

export function extrairLista(resposta) {
  if (Array.isArray(resposta)) return resposta
  if (resposta && Array.isArray(resposta.data)) return resposta.data
  return []
}

export function apiGet(caminho, opcoes = {}) {
  return requisicao(caminho, { method: 'GET', ...opcoes })
}

export function apiPost(caminho, body, opcoes = {}) {
  return requisicao(caminho, { method: 'POST', body, ...opcoes })
}

export function apiPut(caminho, body, opcoes = {}) {
  return requisicao(caminho, { method: 'PUT', body, ...opcoes })
}

export function apiDelete(caminho, opcoes = {}) {
  return requisicao(caminho, { method: 'DELETE', ...opcoes })
}