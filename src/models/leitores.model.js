import { ObjectId } from 'mongodb';
import { getDb } from '../config/database.js';

const colecao = () => getDb().collection('leitores');

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

export async function atualizar(id, dados) {
  if (!ObjectId.isValid(id)) {
    return null;
  }
  return colecao().findOneAndUpdate(
    { _id: new ObjectId(id) },
    { $set: dados },
    { returnDocument: 'after' }
  );
}

export async function remover(id) {
  if (!ObjectId.isValid(id)) {
    return false;
  }
  const resultado = await colecao().deleteOne({ _id: new ObjectId(id) });
  return resultado.deletedCount > 0;
}