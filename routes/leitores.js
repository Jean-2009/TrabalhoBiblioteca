const express = require('express');
const router = express.Router();
const { leitores, emprestimos } = require('../data/db');

const PERFIS_VALIDOS = ['aluno', 'professor'];

function proximoId() {
  return leitores.length ? Math.max(...leitores.map((l) => l.id)) + 1 : 1;
}

router.get('/', (req, res) => {
  const { perfil } = req.query;
  if (!perfil) {
    return res.json(leitores);
  }
  res.json(leitores.filter((l) => l.perfil === perfil));
});

router.get('/:id', (req, res) => {
  const leitor = leitores.find((l) => l.id === parseInt(req.params.id));
  if (!leitor) {
    return res.status(404).json({ erro: 'Leitor não encontrado' });
  }
  res.json(leitor);
});

module.exports = router;