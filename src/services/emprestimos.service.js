import * as Emprestimos from '../models/emprestimos.model.js';
import * as Leitores from '../models/leitores.model.js';
import * as Exemplares from '../models/exemplares.model.js';
import { AppError } from '../errors/AppError.js';

// Business rule: loan limit and loan period by reader profile
const REGRAS = {
  aluno: { limite: 3, prazoDias: 7 },
  professor: { limite: 5, prazoDias: 15 },
};

// Business rule: fine of R$ 0.50 per day of delay (any started day counts)
const MULTA_POR_DIA = 0.5;
const MS_POR_DIA = 24 * 60 * 60 * 1000;

function calcularAtraso(dataPrevista, dataDevolucao) {
  const diferenca = dataDevolucao - new Date(dataPrevista);
  if (diferenca <= 0) {
    return { diasAtraso: 0, multa: 0 };
  }
  const diasAtraso = Math.ceil(diferenca / MS_POR_DIA);
  return { diasAtraso, multa: Number((diasAtraso * MULTA_POR_DIA).toFixed(2)) };
}

export async function listar(status) {
  return Emprestimos.buscarTodas(status ? { status } : {});
}

export async function buscar(id) {
  const emprestimo = await Emprestimos.buscarPorId(id);
  if (!emprestimo) {
    throw new AppError('Empréstimo não encontrado', 404);
  }
  return emprestimo;
}

export async function criar({ leitorId, exemplarId } = {}) {
  if (!leitorId || !exemplarId) {
    throw new AppError('Campos "leitorId" e "exemplarId" são obrigatórios', 400);
  }

  const leitor = await Leitores.buscarPorId(String(leitorId));
  if (!leitor) {
    throw new AppError('Leitor não encontrado', 404);
  }

  const exemplar = await Exemplares.buscarPorId(String(exemplarId));
  if (!exemplar) {
    throw new AppError('Exemplar não encontrado', 404);
  }

  if (exemplar.estado !== 'disponivel') {
    throw new AppError(`Exemplar indisponível (estado atual: ${exemplar.estado})`, 409);
  }

  // Rule 1: loan limit by reader profile
  const regra = REGRAS[leitor.perfil];
  const ativos = await Emprestimos.buscarTodas({ leitorId: String(leitorId), status: 'ativo' });
  if (ativos.length >= regra.limite) {
    throw new AppError(
      `Limite de ${regra.limite} empréstimos ativos atingido para o perfil ${leitor.perfil}`,
      409
    );
  }

  // Rule 2: readers with overdue loans are blocked
  const agora = new Date();
  if (ativos.some((e) => new Date(e.dataPrevistaDevolucao) < agora)) {
    throw new AppError('Leitor bloqueado: possui empréstimo em atraso', 403);
  }

  const devolucao = new Date(agora);
  devolucao.setDate(devolucao.getDate() + regra.prazoDias);

  const emprestimo = await Emprestimos.inserir({
    leitorId: String(leitorId),
    exemplarId: String(exemplarId),
    dataEmprestimo: agora,
    dataPrevistaDevolucao: devolucao,
    status: 'ativo',
    renovacoes: 0,
  });
  await Exemplares.atualizar(String(exemplarId), { estado: 'emprestado' });
  return emprestimo;
}

export async function devolver(id) {
  const emprestimo = await buscar(id);
  if (emprestimo.status !== 'ativo') {
    throw new AppError('Empréstimo já foi devolvido', 409);
  }

  const dataDevolucao = new Date();
  const { diasAtraso, multa } = calcularAtraso(emprestimo.dataPrevistaDevolucao, dataDevolucao);

  const atualizado = await Emprestimos.atualizar(id, {
    status: 'devolvido',
    dataDevolucao,
    diasAtraso,
    multa,
  });
  await Exemplares.atualizar(emprestimo.exemplarId, { estado: 'disponivel' });
  return atualizado;
}