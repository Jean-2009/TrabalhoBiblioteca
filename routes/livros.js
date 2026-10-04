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

module.exports = router;