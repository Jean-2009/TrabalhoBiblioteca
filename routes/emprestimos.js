const express = require('express');
const router = express.Router();
const { leitores, exemplares, emprestimos } = require('../data/db');

const REGRAS = {
  aluno: { limite: 3, prazoDias: 7 },
  professor: { limite: 5, prazoDias: 15 },
};

function proximoId() {
  return emprestimos.length ? Math.max(...emprestimos.map((e) => e.id)) + 1 : 1;
}

router.get('/', (req, res) => {
  const { status } = req.query;
  if (!status) {
    return res.json(emprestimos);
  }
  res.json(emprestimos.filter((e) => e.status === status));
});

module.exports = router;