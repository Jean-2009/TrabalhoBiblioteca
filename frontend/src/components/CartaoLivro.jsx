function CartaoLivro({ livro, onEditar, onExcluir }) {
  return (
    <article className="cartao">
      <span className="selo" aria-hidden="true">
        {livro.titulo.charAt(0).toUpperCase()}
      </span>
      <h3>{livro.titulo}</h3>
      <p>Autor: {livro.autor}</p>
      <p>ISBN: {livro.isbn || 'Não informado'}</p>
      <div className="acoes">
        <button type="button" onClick={() => onEditar?.(livro)}>Editar</button>
        <button type="button" onClick={() => onExcluir?.(livro)}>Excluir</button>
      </div>
    </article>
  )
}

export default CartaoLivro