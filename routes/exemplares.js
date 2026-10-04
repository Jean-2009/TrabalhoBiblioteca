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

module.exports = router;