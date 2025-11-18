/*
comandos usados

db.exec ->  executar create 
db.run  ->  executar insert e update
db.all  ->  executar querys

*/

// import recursos necessarios
import { Categoria } from "../models/modelCategoria"
import { getDB } from "../database/initDB";


// CRUD PARA categoria


export class CategoriaRepository {

    //CREATE

    static async create(nome: string, descricao: string):Promise<number> {
        const db= await getDB()
        const result = await db.run(`INSERT INTO Categoria(nome, descricao) VALUES(?,?)`,[nome,descricao])
        return result.lastID ?? 0
    }

    //READ
    static async findAll():Promise< Categoria[]| undefined>{
        const db = await getDB()
        return await db.all(`SELECT * FROM Categoria`)
    }


}