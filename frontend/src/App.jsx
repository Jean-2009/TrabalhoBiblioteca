import { useEffect, useState } from 'react'
import { apiGet, apiPost, apiPut, apiDelete, extrairLista } from './api'
import Cabecalho from './components/Cabecalho'
import Inicio from './components/Inicio'
import Emprestimos from './components/Emprestimos'
import Rodape from './components/Rodape'
import FormularioLivro from './components/FormularioLivro'
import BuscaLivros from './components/BuscaLivros'
import ListaLivros from './components/ListaLivros'
import { filtrarLivros } from './utils/filtrarLivros'

function App() {
  const [aba, setAba] = useState('inicio')
  const [livros, setLivros] = useState([])
  const [carregando, setCarregando] = useState(true)
  const [erro, setErro] = useState(null)
  const [editando, setEditando] = useState(null)
  const [erroAcao, setErroAcao] = useState(null)
  const [busca, setBusca] = useState('')

  useEffect(() => {
    const controle = new AbortController()

    async function carregar() {
      try {
        setCarregando(true)
        setErro(null)
        const resposta = await apiGet('/livros', { signal: controle.signal })
        setLivros(extrairLista(resposta))
      } catch (e) {
        if (e.name !== 'AbortError') {
          setErro(e.message)
        }
      } finally {
        if (!controle.signal.aborted) {
          setCarregando(false)
        }
      }
    }

    carregar()
    return () => controle.abort()
  }, [])

  function mudarAba(id) {
    setAba(id)
    window.scrollTo({ top: 0 })
  }

  async function salvar(dados) {
    if (editando) {
      const atualizado = await apiPut(`/livros/${editando._id}`, dados)
      setLivros((atual) =>
        atual.map((l) => (l._id === atualizado._id ? atualizado : l))
      )
      setEditando(null)
    } else {
      const criado = await apiPost('/livros', dados)
      setLivros((atual) => [...atual, criado])
    }
  }

  async function excluir(livro) {
    if (!window.confirm(`Excluir "${livro.titulo}"?`)) return
    setErroAcao(null)
    try {
      await apiDelete(`/livros/${livro._id}`)
      setLivros((atual) => atual.filter((l) => l._id !== livro._id))
      if (editando?._id === livro._id) setEditando(null)
    } catch (e) {
      setErroAcao(e.message)
    }
  }

  function iniciarEdicao(livro) {
    setErroAcao(null)
    setEditando(livro)
  }

  const livrosFiltrados = filtrarLivros(livros, busca)

  return (
    <>
      <Cabecalho aba={aba} onMudar={mudarAba} />

      <main>
        {aba === 'inicio' && <Inicio onMudar={mudarAba} />}
        {aba === 'emprestimos' && <Emprestimos />}

        {aba === 'catalogo' && (
          <div className="aba catalogo">
            <section className="painel">
              <h2>{editando ? 'Editar livro' : 'Novo livro'}</h2>
              <FormularioLivro
                key={editando?._id ?? 'novo'}
                livroInicial={editando}
                onSalvar={salvar}
                onCancelar={() => setEditando(null)}
              />
            </section>

            <section>
              <h2 className="titulo">Catálogo do acervo</h2>
              {carregando && <p className="estado">Carregando livros...</p>}
              {!carregando && erro && <p role="alert">Erro: {erro}</p>}
              {erroAcao && <p role="alert">{erroAcao}</p>}
              {!carregando && !erro && livros.length === 0 && (
                <p className="estado">Nenhum livro cadastrado ainda.</p>
              )}
              {!carregando && !erro && livros.length > 0 && (
                <BuscaLivros valor={busca} onChange={setBusca} />
              )}
              {!carregando && !erro && livros.length > 0 && livrosFiltrados.length === 0 && (
                <p className="estado">Nenhum livro encontrado para a busca.</p>
              )}
              {!carregando && !erro && livrosFiltrados.length > 0 && (
                <ListaLivros
                  livros={livrosFiltrados}
                  onEditar={iniciarEdicao}
                  onExcluir={excluir}
                />
              )}
            </section>
          </div>
        )}
      </main>

      <Rodape />
    </>
  )
}

export default App