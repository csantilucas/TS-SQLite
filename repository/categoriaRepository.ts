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

    static async findByProduto(produtoId: number): Promise<Categoria[]> {
        const db = await getDB();
        return await db.all(
            `SELECT c.* FROM Categoria c
             INNER JOIN Produto_Categoria pc ON c.categoria_id = pc.categoria_id
             WHERE pc.produto_id = ?`,
            [produtoId]
        );
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

    static async deleteRelations(categoriaId: number): Promise<void> {
        const db = await getDB();
        // Remove vínculos da categoria com produtos
        await db.run(`DELETE FROM Produto_Categoria WHERE categoria_id = ?`, [categoriaId]);
        // Se houver outras tabelas relacionadas, faça o mesmo aqui
    }
}

