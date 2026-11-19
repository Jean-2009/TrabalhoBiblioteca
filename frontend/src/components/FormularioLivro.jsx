import { useState } from 'react'
import { validarLivro } from '../utils/validarLivro'

const FORM_VAZIO = { titulo: '', autor: '', isbn: '' }

function FormularioLivro({ onSalvar }) {
  const [form, setForm] = useState(FORM_VAZIO)
  const [erro, setErro] = useState(null)
  const [enviando, setEnviando] = useState(false)

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
      setForm(FORM_VAZIO)
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
        {enviando ? 'Salvando...' : 'Cadastrar'}
      </button>
      {erro && <p role="alert" className="erro">{erro}</p>}
    </form>
  )
}

export default FormularioLivro