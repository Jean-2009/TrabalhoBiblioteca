import * as Leitores from '../models/leitores.model.js';
import * as Emprestimos from '../models/emprestimos.model.js';
import { AppError } from '../errors/AppError.js';

const PERFIS_VALIDOS = ['aluno', 'professor'];

function validarDados({ nome, matricula, perfil } = {}) {
  if (!nome || !matricula || !perfil) {
    throw new AppError('Campos "nome", "matricula" e "perfil" são obrigatórios', 400);
  }
  if (!PERFIS_VALIDOS.includes(perfil)) {
    throw new AppError(`Perfil inválido. Use: ${PERFIS_VALIDOS.join(', ')}`, 400);
  }
}

export async function listar(perfil) {
  return Leitores.buscarTodas(perfil ? { perfil } : {});
}

export async function buscar(id) {
  const leitor = await Leitores.buscarPorId(id);
  if (!leitor) {
    throw new AppError('Leitor não encontrado', 404);
  }
  return leitor;
}

export async function criar(dados) {
  validarDados(dados);
  const existentes = await Leitores.buscarTodas({ matricula: dados.matricula });
  if (existentes.length > 0) {
    throw new AppError('Já existe um leitor com essa matrícula', 409);
  }
  const { nome, matricula, perfil } = dados;
  return Leitores.inserir({ nome, matricula, perfil });
}

export async function atualizar(id, dados) {
  await buscar(id);
  validarDados(dados);
  const existentes = await Leitores.buscarTodas({ matricula: dados.matricula });
  if (existentes.some((l) => String(l._id) !== id)) {
    throw new AppError('Já existe um leitor com essa matrícula', 409);
  }
  const { nome, matricula, perfil } = dados;
  return Leitores.atualizar(id, { nome, matricula, perfil });
}

export async function remover(id) {
  await buscar(id);
  const ativos = await Emprestimos.buscarTodas({ leitorId: id, status: 'ativo' });
  if (ativos.length > 0) {
    throw new AppError('Não é possível excluir um leitor com empréstimos ativos', 409);
  }
  await Leitores.remover(id);
}

export async function historico(id) {
  const leitor = await buscar(id);
  const emprestimos = await Emprestimos.buscarTodas({ leitorId: id });
  return { leitor: leitor.nome, total: emprestimos.length, emprestimos };
}