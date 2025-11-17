// importa as bibliotecas para a inicialização do banco
import sqlite3 from "sqlite3";
import { open } from "sqlite";
import { createTables } from "./tablesDB";

// cria o banco no arquivo
const dbPromise = open({
  filename: './dataBase.sqlite',
  driver: sqlite3.Database
});

// função para retornar o banco
export function getDB() {
  return dbPromise;
}

// função para fechar o banco depois de uma operação
export async function closeDB() {
  const db = await dbPromise;
  await db.close();
}

// cria as tabelas depois de abrir o banco
(async () => {
  await createTables();
  console.log("Banco inicializado com tabelas e triggers!");
})();
