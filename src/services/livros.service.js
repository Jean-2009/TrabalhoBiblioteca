import * as Livros from '../models/livros.model.js';
import * as Exemplares from '../models/exemplares.model.js';
import { AppError } from '../errors/AppError.js';

function escapeRegex(texto) {
  return texto.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

export async function listar(titulo) {
  if (!titulo) {
    return Livros.buscarTodas();
  }
  return Livros.buscarTodas({ titulo: { $regex: escapeRegex(titulo), $options: 'i' } });
}

export async function buscar(id) {
  const livro = await Livros.buscarPorId(id);
  if (!livro) {
    throw new AppError('Livro não encontrado', 404);
  }
  return livro;
}

export async function criar({ titulo, autor, isbn } = {}) {
  if (!titulo || !autor) {
    throw new AppError('Campos "titulo" e "autor" são obrigatórios', 400);
  }
  if (isbn) {
    const existentes = await Livros.buscarTodas({ isbn });
    if (existentes.length > 0) {
      throw new AppError('Já existe um livro com esse ISBN', 409);
    }
  }
  return Livros.inserir({ titulo, autor, isbn: isbn || null });
}

export async function atualizar(id, { titulo, autor, isbn } = {}) {
  await buscar(id);
  if (!titulo || !autor) {
    throw new AppError('Campos "titulo" e "autor" são obrigatórios', 400);
  }
  if (isbn) {
    const existentes = await Livros.buscarTodas({ isbn });
    if (existentes.some((l) => String(l._id) !== id)) {
      throw new AppError('Já existe um livro com esse ISBN', 409);
    }
  }
  return Livros.atualizar(id, { titulo, autor, isbn: isbn || null });
}

export async function remover(id) {
  await buscar(id);
  const copias = await Exemplares.buscarTodas({ livroId: id });
  if (copias.length > 0) {
    throw new AppError('Não é possível excluir um livro que possui exemplares cadastrados', 409);
  }
  await Livros.remover(id);
}

export async function disponibilidade(id) {
  const livro = await buscar(id);
  const copias = await Exemplares.buscarTodas({ livroId: id });
  const disponiveis = copias.filter((e) => e.estado === 'disponivel').length;
  return { livroId: id, titulo: livro.titulo, total: copias.length, disponiveis };
}