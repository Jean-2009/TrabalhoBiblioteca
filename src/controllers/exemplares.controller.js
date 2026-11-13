import * as ExemplaresService from '../services/exemplares.service.js';

export async function listar(req, res) {
  const exemplares = await ExemplaresService.listar(req.query.livroId);
  res.json(exemplares);
}

export async function buscar(req, res) {
  const exemplar = await ExemplaresService.buscar(req.params.id);
  res.json(exemplar);
}

export async function criar(req, res) {
  const exemplar = await ExemplaresService.criar(req.body);
  res.status(201).json(exemplar);
}

export async function atualizar(req, res) {
  const exemplar = await ExemplaresService.atualizar(req.params.id, req.body);
  res.json(exemplar);
}

export async function remover(req, res) {
  await ExemplaresService.remover(req.params.id);
  res.status(204).send();
}
