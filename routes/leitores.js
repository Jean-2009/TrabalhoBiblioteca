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

module.exports = router;