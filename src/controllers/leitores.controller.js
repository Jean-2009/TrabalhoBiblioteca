import * as LeitoresService from '../services/leitores.service.js';

export async function listar(req, res) {
  const leitores = await LeitoresService.listar(req.query.perfil);
  res.json(leitores);
}

export async function buscar(req, res) {
  const leitor = await LeitoresService.buscar(req.params.id);
  res.json(leitor);
}

export async function criar(req, res) {
  const leitor = await LeitoresService.criar(req.body);
  res.status(201).json(leitor);
}

export async function atualizar(req, res) {
  const leitor = await LeitoresService.atualizar(req.params.id, req.body);
  res.json(leitor);
}

export async function remover(req, res) {
  await LeitoresService.remover(req.params.id);
  res.status(204).send();
}

export async function historico(req, res) {
  const resultado = await LeitoresService.historico(req.params.id);
  res.json(resultado);
}