import CartaoLivro from './CartaoLivro'

function ListaLivros({ livros, onEditar, onExcluir }) {
  return (
    <div className="lista">
      {livros.map((livro) => (
        <CartaoLivro
          key={livro._id}
          livro={livro}
          onEditar={onEditar}
          onExcluir={onExcluir}
        />
      ))}
    </div>
  )
}

export default ListaLivros