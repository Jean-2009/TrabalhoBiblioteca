const livros = [
  { id: 1, titulo: 'Dom Casmurro', autor: 'Machado de Assis', isbn: '9788535911664' },
];
const exemplares = [
  { id: 1, livroId: 1, tombo: 'BIB-0001', estado: 'disponivel' },
];
const leitores = [
  { id: 1, nome: 'Maria Silva', matricula: '2026001', perfil: 'aluno' },
];
const emprestimos = [];
const avaliacoes = [];

module.exports = { livros, exemplares, leitores, emprestimos, avaliacoes };