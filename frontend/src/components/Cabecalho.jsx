import Coruja from './Coruja'

const ABAS = [
  { id: 'inicio', rotulo: 'Início' },
  { id: 'catalogo', rotulo: 'Catálogo' },
  { id: 'emprestimos', rotulo: 'Empréstimos' },
]

function Cabecalho({ aba, onMudar }) {
  return (
    <header className="topo">
      <button type="button" className="marca" onClick={() => onMudar('inicio')}>
        <Coruja />
        <span>
          Athenaeum
          <small>Biblioteca escolar</small>
        </span>
      </button>
      <nav className="abas" aria-label="Seções do site">
        {ABAS.map((a) => (
          <button
            key={a.id}
            type="button"
            aria-current={aba === a.id ? 'page' : undefined}
            onClick={() => onMudar(a.id)}
          >
            {a.rotulo}
          </button>
        ))}
      </nav>
    </header>
  )
}

export default Cabecalho