import CartaoLivro from './CartaoLivro'

function ListaLivros({ livros }) {
  return (
    <div className="lista">
      {livros.map((livro) => (
        <CartaoLivro key={livro._id} livro={livro} />
      ))}
    </div>
  )
}

export default ListaLivros