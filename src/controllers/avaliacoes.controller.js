import * as AvaliacoesService from '../services/avaliacoes.service.js';

export async function criar(req, res) {
  const avaliacao = await AvaliacoesService.criar(req.params.id, req.body);
  res.status(201).json(avaliacao);
}