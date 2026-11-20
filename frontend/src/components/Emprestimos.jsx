function Emprestimos() {
  return (
    <section className="aba">
      <h2 className="titulo">Como pedir emprestado</h2>
      <p className="lead">As regras mudam conforme o seu perfil de leitor.</p>
      <div className="duas">
        <article className="papel">
          <h3>Alunos</h3>
          <ul>
            <li>Até 3 livros ao mesmo tempo</li>
            <li>Prazo de 7 dias por empréstimo</li>
            <li>Renovação permitida, sem atrasos</li>
          </ul>
        </article>
        <article className="papel">
          <h3>Professores</h3>
          <ul>
            <li>Até 5 livros ao mesmo tempo</li>
            <li>Prazo de 15 dias por empréstimo</li>
            <li>Renovação permitida, sem atrasos</li>
          </ul>
        </article>
      </div>
      <ol className="passos">
        <li><strong>Escolha o livro.</strong> Confira no catálogo se ele está no acervo.</li>
        <li><strong>Retire no balcão.</strong> Informe sua matrícula e o código de tombo do exemplar.</li>
        <li><strong>Devolva ou renove.</strong> Antes do prazo acabar, volte ao balcão para devolver ou estender o empréstimo.</li>
      </ol>
      <div className="nota">
        <h3>Atrasos</h3>
        <p>
          Cada dia de atraso gera multa de R$ 0,50. Enquanto houver um livro
          vencido, não é possível pegar outro nem renovar.
        </p>
      </div>
    </section>
  )
}

export default Emprestimos