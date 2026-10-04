const express = require('express');
const router = express.Router();
const { livros, exemplares } = require('../data/db');

function proximoId() {
  return livros.length ? Math.max(...livros.map((l) => l.id)) + 1 : 1;
}

router.get('/', (req, res) => {
  const { titulo } = req.query;
  if (!titulo) {
    return res.json(livros);
  }
  const resultado = livros.filter((l) =>
    l.titulo.toLowerCase().includes(titulo.toLowerCase())
  );
  res.json(resultado);
});

router.get('/:id', (req, res) => {
  const livro = livros.find((l) => l.id === parseInt(req.params.id));
  if (!livro) {
    return res.status(404).json({ erro: 'Livro não encontrado' });
  }
  res.json(livro);
});

router.post('/', (req, res) => {
  const { titulo, autor, isbn } = req.body;
  if (!titulo || !autor) {
    return res.status(400).json({ erro: 'Campos "titulo" e "autor" são obrigatórios' });
  }
  if (isbn && livros.some((l) => l.isbn === isbn)) {
    return res.status(409).json({ erro: 'Já existe um livro com esse ISBN' });
  }
  const novoLivro = { id: proximoId(), titulo, autor, isbn: isbn || null };
  livros.push(novoLivro);
  res.status(201).json(novoLivro);
});

router.put('/:id', (req, res) => {
  const livro = livros.find((l) => l.id === parseInt(req.params.id));
  if (!livro) {
    return res.status(404).json({ erro: 'Livro não encontrado' });
  }
  const { titulo, autor, isbn } = req.body;
  if (!titulo || !autor) {
    return res.status(400).json({ erro: 'Campos "titulo" e "autor" são obrigatórios' });
  }
  livro.titulo = titulo;
  livro.autor = autor;
  livro.isbn = isbn || null;
  res.json(livro);
});

router.delete('/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const indice = livros.findIndex((l) => l.id === id);
  if (indice === -1) {
    return res.status(404).json({ erro: 'Livro não encontrado' });
  }
  if (exemplares.some((e) => e.livroId === id)) {
    return res.status(409).json({ erro: 'Não é possível excluir um livro que possui exemplares cadastrados' });
  }
  livros.splice(indice, 1);
  res.status(204).send();
});

router.get('/:id/disponibilidade', (req, res) => {
  const id = parseInt(req.params.id);
  const livro = livros.find((l) => l.id === id);
  if (!livro) {
    return res.status(404).json({ erro: 'Livro não encontrado' });
  }
  const copias = exemplares.filter((e) => e.livroId === id);
  const disponiveis = copias.filter((e) => e.estado === 'disponivel').length;
  res.json({ livroId: id, titulo: livro.titulo, total: copias.length, disponiveis });
});

module.exports = router;