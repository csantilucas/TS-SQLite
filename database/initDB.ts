// importa as bibliotecas para a inicialização do banco
import sqlite3 from "sqlite3";
import { open } from "sqlite";


// cria o banco no arquivo
const dbPromise = open({
  filename: './database/dataBase.sqlite',
  driver: sqlite3.Database
});

// função para retornar o banco
export async function getDB() {
  const db = await dbPromise
  await db.exec("PRAGMA foreign_keys = ON;");
  return dbPromise;
}

// função para fechar o banco depois de uma operação
export async function closeDB() {
  const db = await dbPromise;
  await db.close();
}



