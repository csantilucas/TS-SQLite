//importar os recursos necessarios
import { closeDB, getDB } from "./initDB"

/*
comandos usados

db.exec ->  executar create e update
db.run  ->  executar insert
db.all  ->  executar querys

*/


//funcao para criar as tabelas
async function createTables() {
    const db = await getDB()

    try {
        await db.exec(
            `coloque aqui os comando da criacao das tabelas
            
            5 tabelas + tabela de log`
        )
    }
    catch (error) { console.error }
0
    closeDB()
}

