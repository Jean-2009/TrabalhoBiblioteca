import { useState } from 'react'
import { validarLivro } from '../utils/validarLivro'

const FORM_VAZIO = { titulo: '', autor: '', isbn: '' }

function formInicial(livro) {
  if (!livro) return FORM_VAZIO
  return { titulo: livro.titulo, autor: livro.autor, isbn: livro.isbn ?? '' }
}

function FormularioLivro({ onSalvar, livroInicial = null, onCancelar }) {
  const [form, setForm] = useState(() => formInicial(livroInicial))
  const [erro, setErro] = useState(null)
  const [enviando, setEnviando] = useState(false)
  const editando = Boolean(livroInicial)

  function alterar(e) {
    setForm((atual) => ({ ...atual, [e.target.name]: e.target.value }))
  }

  async function enviar(e) {
    e.preventDefault()
    setErro(null)

    let dados
    try {
      dados = validarLivro(form)
    } catch (e) {
      setErro(e.message)
      return // validação falhou: a API não é chamada
    }

    try {
      setEnviando(true)
      await onSalvar(dados)
      if (!editando) setForm(FORM_VAZIO)
    } catch (e) {
      setErro(e.message)
    } finally {
      setEnviando(false)
    }
  }

  return (
    <form onSubmit={enviar}>
      <div className="campo">
        <label htmlFor="titulo">Título</label>
        <input id="titulo" name="titulo" value={form.titulo} onChange={alterar} />
      </div>
      <div className="campo">
        <label htmlFor="autor">Autor</label>
        <input id="autor" name="autor" value={form.autor} onChange={alterar} />
      </div>
      <div className="campo">
        <label htmlFor="isbn">ISBN (opcional)</label>
        <input id="isbn" name="isbn" value={form.isbn} onChange={alterar} />
      </div>
      <button type="submit" disabled={enviando}>
        {enviando ? 'Salvando...' : editando ? 'Salvar alterações' : 'Cadastrar'}
      </button>
      {editando && (
        <button type="button" onClick={onCancelar} disabled={enviando}>
          Cancelar
        </button>
      )}
      {erro && <p role="alert" className="erro">{erro}</p>}
    </form>
  )
}

export default FormularioLivro