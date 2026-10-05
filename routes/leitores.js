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

router.post('/', (req, res) => {
  const { nome, matricula, perfil } = req.body || {};
  if (!nome || !matricula || !perfil) {
    return res.status(400).json({ erro: 'Campos "nome", "matricula" e "perfil" são obrigatórios' });
  }
  if (!PERFIS_VALIDOS.includes(perfil)) {
    return res.status(400).json({ erro: `Perfil inválido. Use: ${PERFIS_VALIDOS.join(', ')}` });
  }
  if (leitores.some((l) => l.matricula === matricula)) {
    return res.status(409).json({ erro: 'Já existe um leitor com essa matrícula' });
  }
  const novoLeitor = { id: proximoId(), nome, matricula, perfil };
  leitores.push(novoLeitor);
  res.status(201).json(novoLeitor);
});

router.put('/:id', (req, res) => {
  const leitor = leitores.find((l) => l.id === parseInt(req.params.id));
  if (!leitor) {
    return res.status(404).json({ erro: 'Leitor não encontrado' });
  }
  const { nome, matricula, perfil } = req.body || {};
  if (!nome || !matricula || !perfil) {
    return res.status(400).json({ erro: 'Campos "nome", "matricula" e "perfil" são obrigatórios' });
  }
  if (!PERFIS_VALIDOS.includes(perfil)) {
    return res.status(400).json({ erro: `Perfil inválido. Use: ${PERFIS_VALIDOS.join(', ')}` });
  }
  if (leitores.some((l) => l.matricula === matricula && l.id !== leitor.id)) {
    return res.status(409).json({ erro: 'Já existe um leitor com essa matrícula' });
  }
  leitor.nome = nome;
  leitor.matricula = matricula;
  leitor.perfil = perfil;
  res.json(leitor);
});

router.delete('/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const indice = leitores.findIndex((l) => l.id === id);
  if (indice === -1) {
    return res.status(404).json({ erro: 'Leitor não encontrado' });
  }
  if (emprestimos.some((e) => e.leitorId === id && e.status === 'ativo')) {
    return res.status(409).json({ erro: 'Não é possível excluir um leitor com empréstimos ativos' });
  }
  leitores.splice(indice, 1);
  res.status(204).send();
});

module.exports = router;