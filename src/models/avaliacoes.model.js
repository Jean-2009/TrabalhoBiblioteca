import { ObjectId } from 'mongodb';
import { getDb } from '../config/database.js';

const colecao = () => getDb().collection('avaliacoes');

export async function inserir(dados) {
  const documento = { ...dados };
  await colecao().insertOne(documento);
  return documento;
}

export async function buscarTodas(filtro = {}) {
  return colecao().find(filtro).toArray();
}

export async function buscarPorId(id) {
  if (!ObjectId.isValid(id)) {
    return null;
  }
  return colecao().findOne({ _id: new ObjectId(id) });
}