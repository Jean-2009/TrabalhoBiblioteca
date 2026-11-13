import * as EmprestimosService from '../services/emprestimos.service.js';

export async function listar(req, res) {
  const emprestimos = await EmprestimosService.listar(req.query.status);
  res.json(emprestimos);
}

export async function buscar(req, res) {
  const emprestimo = await EmprestimosService.buscar(req.params.id);
  res.json(emprestimo);
}

export async function criar(req, res) {
  const emprestimo = await EmprestimosService.criar(req.body);
  res.status(201).json(emprestimo);
}

export async function devolver(req, res) {
  const emprestimo = await EmprestimosService.devolver(req.params.id);
  res.json(emprestimo);
}