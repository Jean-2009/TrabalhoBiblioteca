const API_URL = 'http://localhost:3000';

export async function api(caminho, opcoes = {}) {
  const { body, ...resto } = opcoes;
  const resposta = await fetch(`${API_URL}${caminho}`, {
    headers: { 'Content-Type': 'application/json' },
    ...resto,
    body: body ? JSON.stringify(body) : undefined,
  });

  if (resposta.status === 204) {
    return null;
  }

  const dados = await resposta.json();
  if (!resposta.ok) {
    throw new Error(dados.erro || 'Erro na requisição');
  }
  return dados;
}