// Remove acentos e deixa em minúsculas, para a busca ignorar "Cortiço" x "cortico"
function normalizar(texto) {
  return String(texto ?? '')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .trim()
}

// Função pura: devolve os livros cujo título ou autor contém o termo.
// Termo vazio devolve a lista inteira.
export function filtrarLivros(lista, termo) {
  const busca = normalizar(termo)
  if (!busca) return lista
  return lista.filter(
    (livro) =>
      normalizar(livro.titulo).includes(busca) ||
      normalizar(livro.autor).includes(busca)
  )
}