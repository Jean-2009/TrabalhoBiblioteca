import JanelaVela from './JanelaVela'

function Inicio({ onMudar }) {
  return (
    <section className="aba">
      <div className="hero">
        <div>
          <h1>Onde cada livro espera por você</h1>
          <p>
            Consulte o acervo, cadastre novos títulos e mantenha o catálogo da
            biblioteca em ordem, tudo à luz de velas.
          </p>
          <div className="acoes">
            <button type="button" className="cheio" onClick={() => onMudar('catalogo')}>
              Explorar o catálogo
            </button>
            <button type="button" onClick={() => onMudar('emprestimos')}>
              Como pedir emprestado
            </button>
          </div>
        </div>
        <div className="moldura">
          <JanelaVela />
        </div>
      </div>

      <h2 className="titulo">O que você encontra aqui</h2>
      <div className="tres">
        <article className="papel">
          <svg className="ico" viewBox="0 0 32 32" aria-hidden="true">
            <path d="M6 6h8a3 3 0 0 1 2 1 3 3 0 0 1 2-1h8v19h-8a3 3 0 0 0-2 1 3 3 0 0 0-2-1H6z" />
            <path d="M16 7v19" />
          </svg>
          <h3>Consultar o acervo</h3>
          <p>Busque por título ou autor e encontre o livro que procura.</p>
          <button type="button" onClick={() => onMudar('catalogo')}>Abrir catálogo</button>
        </article>
        <article className="papel">
          <svg className="ico" viewBox="0 0 32 32" aria-hidden="true">
            <circle cx="16" cy="16" r="11" />
            <path d="M16 9v7l5 3" />
          </svg>
          <h3>Pedir emprestado</h3>
          <p>Alunos levam até 3 livros por 7 dias. Professores, até 5 livros por 15 dias.</p>
          <button type="button" onClick={() => onMudar('emprestimos')}>Ver as regras</button>
        </article>
        <article className="papel">
          <svg className="ico" viewBox="0 0 32 32" aria-hidden="true">
            <path d="M5 26l4-1 15-15-3-3L6 22z" />
            <path d="M19 8l3 3" />
          </svg>
          <h3>Cuidar do acervo</h3>
          <p>Cadastre livros novos, corrija dados e retire títulos do catálogo.</p>
          <button type="button" onClick={() => onMudar('catalogo')}>Gerenciar livros</button>
        </article>
      </div>
    </section>
  )
}

export default Inicio