import 'dotenv/config';
import { MongoClient } from 'mongodb';

const uri = process.env.MONGODB_URI;
const dbName = process.env.MONGO_DB;

if (!uri || !dbName) {
  throw new Error('As variáveis MONGODB_URI e MONGO_DB precisam estar definidas no .env');
}

const client = new MongoClient(uri);
let db;

export async function connectDatabase() {
  if (db) {
    return db;
  }
  await client.connect();
  db = client.db(dbName);
  console.log(`Conectado ao MongoDB (banco: ${dbName})`);
  return db;
}

export function getDb() {
  if (!db) {
    throw new Error('Banco não conectado. Chame connectDatabase() antes.');
  }
  return db;
}

export async function closeDatabase() {
  await client.close();
  db = undefined;
}