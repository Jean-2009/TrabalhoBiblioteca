export function validarLivro(dados = {}) {
  const titulo = (dados.titulo ?? '').trim()
  const autor = (dados.autor ?? '').trim()
  const isbn = (dados.isbn ?? '').trim()

  if (!titulo) {
    throw new Error('O título é obrigatório.')
  }
  if (!autor) {
    throw new Error('O autor é obrigatório.')
  }

  return { titulo, autor, isbn }
}