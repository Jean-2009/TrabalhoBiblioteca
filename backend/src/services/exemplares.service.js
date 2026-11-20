import * as Exemplares from '../models/exemplares.model.js';
import * as Livros from '../models/livros.model.js';
import { AppError } from '../errors/AppError.js';

const ESTADOS_VALIDOS = ['disponivel', 'emprestado', 'manutencao'];

export async function listar(livroId) {
  return Exemplares.buscarTodas(livroId ? { livroId } : {});
}

export async function buscar(id) {
  const exemplar = await Exemplares.buscarPorId(id);
  if (!exemplar) {
    throw new AppError('Exemplar não encontrado', 404);
  }
  return exemplar;
}

export async function criar({ livroId, tombo } = {}) {
  if (!livroId || !tombo) {
    throw new AppError('Campos "livroId" e "tombo" são obrigatórios', 400);
  }
  const livro = await Livros.buscarPorId(String(livroId));
  if (!livro) {
    throw new AppError('Livro informado não existe', 404);
  }
  const existentes = await Exemplares.buscarTodas({ tombo });
  if (existentes.length > 0) {
    throw new AppError('Já existe um exemplar com esse tombo', 409);
  }
  return Exemplares.inserir({ livroId: String(livroId), tombo, estado: 'disponivel' });
}

export async function atualizar(id, { tombo, estado } = {}) {
  const exemplar = await buscar(id);
  if (estado && !ESTADOS_VALIDOS.includes(estado)) {
    throw new AppError(`Estado inválido. Use: ${ESTADOS_VALIDOS.join(', ')}`, 400);
  }
  if (tombo) {
    const existentes = await Exemplares.buscarTodas({ tombo });
    if (existentes.some((e) => String(e._id) !== id)) {
      throw new AppError('Já existe um exemplar com esse tombo', 409);
    }
  }
  const dados = {};
  if (tombo) dados.tombo = tombo;
  if (estado) dados.estado = estado;
  if (Object.keys(dados).length === 0) {
    return exemplar;
  }
  return Exemplares.atualizar(id, dados);
}

export async function remover(id) {
  const exemplar = await buscar(id);
  if (exemplar.estado === 'emprestado') {
    throw new AppError('Não é possível excluir um exemplar que está emprestado', 409);
  }
  await Exemplares.remover(id);
}