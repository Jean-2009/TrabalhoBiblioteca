import * as LivrosService from '../services/livros.service.js';

export async function listar(req, res) {
  const livros = await LivrosService.listar(req.query.titulo);
  res.json(livros);
}

export async function buscar(req, res) {
  const livro = await LivrosService.buscar(req.params.id);
  res.json(livro);
}

export async function criar(req, res) {
  const livro = await LivrosService.criar(req.body);
  res.status(201).json(livro);
}

export async function atualizar(req, res) {
  const livro = await LivrosService.atualizar(req.params.id, req.body);
  res.json(livro);
}

export async function remover(req, res) {
  await LivrosService.remover(req.params.id);
  res.status(204).send();
}

export async function disponibilidade(req, res) {
  const resultado = await LivrosService.disponibilidade(req.params.id);
  res.json(resultado);
}