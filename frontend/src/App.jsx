import { useEffect, useState } from 'react'
import { apiGet, apiPost, extrairLista } from './api'
import FormularioLivro from './components/FormularioLivro'
import ListaLivros from './components/ListaLivros'

function App() {
  const [livros, setLivros] = useState([])
  const [carregando, setCarregando] = useState(true)
  const [erro, setErro] = useState(null)

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

  async function cadastrar(dados) {
    // POST /livros devolve 201 com o livro criado (já com _id)
    const criado = await apiPost('/livros', dados)
    // atualiza a lista pelo estado, sem refazer o GET
    setLivros((atual) => [...atual, criado])
  }

  return (
    <>
      <header>
        <h1>Biblioteca</h1>
      </header>

      <main>
        <section>
          <h2>Novo livro</h2>
          <FormularioLivro onSalvar={cadastrar} />
        </section>

        <section>
          <h2>Livros</h2>
          {carregando && <p>Carregando livros...</p>}
          {!carregando && erro && <p role="alert">Erro: {erro}</p>}
          {!carregando && !erro && livros.length === 0 && (
            <p>Nenhum livro cadastrado ainda.</p>
          )}
          {!carregando && !erro && livros.length > 0 && (
            <ListaLivros livros={livros} />
          )}
        </section>
      </main>
    </>
  )
}

export default App