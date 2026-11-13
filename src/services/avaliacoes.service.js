import * as Avaliacoes from '../models/avaliacoes.model.js';
import * as Livros from '../models/livros.model.js';
import * as Leitores from '../models/leitores.model.js';
import * as Exemplares from '../models/exemplares.model.js';
import * as Emprestimos from '../models/emprestimos.model.js';
import { AppError } from '../errors/AppError.js';

export async function criar(livroId, { leitorId, nota, comentario } = {}) {
  if (!leitorId || nota === undefined) {
    throw new AppError('Campos "leitorId" e "nota" são obrigatórios', 400);
  }
  if (!Number.isInteger(nota) || nota < 1 || nota > 5) {
    throw new AppError('A nota deve ser um número inteiro de 1 a 5', 400);
  }

  const livro = await Livros.buscarPorId(livroId);
  if (!livro) {
    throw new AppError('Livro não encontrado', 404);
  }
  const leitor = await Leitores.buscarPorId(String(leitorId));
  if (!leitor) {
    throw new AppError('Leitor não encontrado', 404);
  }

  // Rule: only readers who already returned a copy of this book can rate it
  const copias = await Exemplares.buscarTodas({ livroId });
  const idsCopias = copias.map((e) => String(e._id));
  const devolvidos = await Emprestimos.buscarTodas({
    leitorId: String(leitorId),
    status: 'devolvido',
    exemplarId: { $in: idsCopias },
  });
  if (devolvidos.length === 0) {
    throw new AppError('Só é possível avaliar um livro que o leitor já devolveu', 403);
  }

  // Rule: each reader rates each book only once
  const existentes = await Avaliacoes.buscarTodas({ livroId, leitorId: String(leitorId) });
  if (existentes.length > 0) {
    throw new AppError('Este leitor já avaliou este livro', 409);
  }

  return Avaliacoes.inserir({
    livroId,
    leitorId: String(leitorId),
    nota,
    comentario: comentario || '',
    data: new Date(),
  });
}