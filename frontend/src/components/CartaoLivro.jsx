function CartaoLivro({ livro }) {
  return (
    <article className="cartao">
      <h3>{livro.titulo}</h3>
      <p>Autor: {livro.autor}</p>
      <p>ISBN: {livro.isbn || 'Não informado'}</p>
    </article>
  )
}

export default CartaoLivro