function BuscaLivros({ valor, onChange }) {
  return (
    <div className="campo">
      <label htmlFor="busca">Buscar livro</label>
      <input
        id="busca"
        type="search"
        placeholder="Título ou autor"
        value={valor}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  )
}

export default BuscaLivros