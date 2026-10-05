const express = require('express');
const router = express.Router();
const { leitores, exemplares, emprestimos } = require('../data/db');

const REGRAS = {
  aluno: { limite: 3, prazoDias: 7 },
  professor: { limite: 5, prazoDias: 15 },
};

  const agora = new Date();
  const temAtraso = ativos.some((e) => new Date(e.dataPrevistaDevolucao) < agora);
  if (temAtraso) {
    return res.status(403).json({ erro: 'Leitor bloqueado: possui empréstimo em atraso' });
  }

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

router.get('/:id', (req, res) => {
  const emprestimo = emprestimos.find((e) => e.id === parseInt(req.params.id));
  if (!emprestimo) {
    return res.status(404).json({ erro: 'Empréstimo não encontrado' });
  }
  res.json(emprestimo);
});

router.post('/', (req, res) => {
  const { leitorId, exemplarId } = req.body || {};
  if (!leitorId || !exemplarId) {
    return res.status(400).json({ erro: 'Campos "leitorId" e "exemplarId" são obrigatórios' });
  }

  const leitor = leitores.find((l) => l.id === leitorId);
  if (!leitor) {
    return res.status(404).json({ erro: 'Leitor não encontrado' });
  }

  const exemplar = exemplares.find((e) => e.id === exemplarId);
  if (!exemplar) {
    return res.status(404).json({ erro: 'Exemplar não encontrado' });
  }

  if (exemplar.estado !== 'disponivel') {
    return res.status(409).json({ erro: `Exemplar indisponível (estado atual: ${exemplar.estado})` });
  }

  const regra = REGRAS[leitor.perfil];
  const ativos = emprestimos.filter((e) => e.leitorId === leitorId && e.status === 'ativo');
  if (ativos.length >= regra.limite) {
    return res.status(409).json({
      erro: `Limite de ${regra.limite} empréstimos ativos atingido para o perfil ${leitor.perfil}`,
    });
  }

  const hoje = new Date();
  const devolucao = new Date(hoje);
  devolucao.setDate(devolucao.getDate() + regra.prazoDias);

  const novoEmprestimo = {
    id: proximoId(),
    leitorId,
    exemplarId,
    dataEmprestimo: hoje.toISOString(),
    dataPrevistaDevolucao: devolucao.toISOString(),
    status: 'ativo',
  };

  emprestimos.push(novoEmprestimo);
  exemplar.estado = 'emprestado';
  res.status(201).json(novoEmprestimo);
});

module.exports = router;