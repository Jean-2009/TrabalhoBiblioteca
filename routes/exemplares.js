const express = require('express');
const router = express.Router();
const { livros, exemplares } = require('../data/db');

const ESTADOS_VALIDOS = ['disponivel', 'emprestado', 'manutencao'];

function proximoId() {
  return exemplares.length ? Math.max(...exemplares.map((e) => e.id)) + 1 : 1;
}

router.get('/', (req, res) => {
  const { livroId } = req.query;
  if (!livroId) {
    return res.json(exemplares);
  }
  res.json(exemplares.filter((e) => e.livroId === parseInt(livroId)));
});

router.get('/:id', (req, res) => {
  const exemplar = exemplares.find((e) => e.id === parseInt(req.params.id));
  if (!exemplar) {
    return res.status(404).json({ erro: 'Exemplar não encontrado' });
  }
  res.json(exemplar);
});

router.post('/', (req, res) => {
  const { livroId, tombo } = req.body;
  if (!livroId || !tombo) {
    return res.status(400).json({ erro: 'Campos "livroId" e "tombo" são obrigatórios' });
  }
  if (!livros.some((l) => l.id === livroId)) {
    return res.status(404).json({ erro: 'Livro informado não existe' });
  }
  if (exemplares.some((e) => e.tombo === tombo)) {
    return res.status(409).json({ erro: 'Já existe um exemplar com esse tombo' });
  }
  const novoExemplar = { id: proximoId(), livroId, tombo, estado: 'disponivel' };
  exemplares.push(novoExemplar);
  res.status(201).json(novoExemplar);
});

module.exports = router;