// importa as bibliotacas para a inicialização do banco
import sqlite3 from "sqlite3";
import { open } from "sqlite";

//criar o banco no arquivo
const dbPromisse = open({
    filename:'dataBase.sqlite',
    driver: sqlite3.Database
})

//funcao para retornar o banco
export function getDB(){
    return dbPromisse
}

//funcao para fechar o banco depois de uma operacao
export async function closeDB() {
    const db = await dbPromisse;
    await db.close();
  }





