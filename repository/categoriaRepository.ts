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
    static async findAll():Promise<Categoria[]>{
        const db = await getDB()
        return await db.all(`SELECT * FROM Categoria`)
    }

    static async findByID(id:number):Promise<Categoria | undefined>{
        const db = await getDB()
        return await db.get(`SELECT * FROM Categoria WHERE categoria_id = ?`,
        [id])
    }

    static async findByName(name:string):Promise<Categoria | undefined>{
        const db = await getDB()
        return await db.get(`SELECT * FROM Categoria WHERE nome=?`,
            [name])
    }

    //UPDATE

    static async update(id:number, nome: string, descricao: string):Promise<number>{
        const db = await getDB()
        const result = await db.run(`UPDATE Categoria SET nome=?,descricao=? WHERE categoria_id=?`,
            [nome,descricao, id]
        )
        return result.changes ?? 0
    }

    //DELETE

    static async delete(id:number):Promise<number>{
        const db = await getDB()
        const result = await db.run(`DELETE FROM Categoria WHERE categoria_id=?`,
            [id]
        )
        return result.changes ?? 0
    }
}


// await CategoriaRepository.create('limpeza','produtos de limpeza')
// await CategoriaRepository.create('tecnologia','produtos tecnologicos')
// await CategoriaRepository.create('academia','produtos academia')
CategoriaRepository.findAll().then(res => console.table(res))