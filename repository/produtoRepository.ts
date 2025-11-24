/*
comandos usados

db.exec ->  executar create 
db.run  ->  executar insert e update
db.all  ->  executar querys

*/

import { closeDB, getDB } from "../database/initDB";
import { Produto } from "../models/modelProduto";
// CRUD PARA PRODUTO

export class ProdutoRepository {

    //CREATE

    static async create(nome: string, descricao: string, preco: number, estoque: number):Promise<number> {
        const db = await getDB()
        const result = await db.run(`
            INSERT INTO Produto (nome, descricao, preco, estoque) values (?,?,?,?)`,
            [nome, descricao, preco, estoque]
        )
        return result.lastID ?? 0
    }

    //READ
    static async findAll():Promise<Produto[]>{
        const db = await getDB()
        const result = await db.all(`select * from Produto `)
        return result
    }
    //READ BY NAME
    static async findByName(nome:string):Promise<Produto[] | undefined>{
        const db = await getDB()
        const result = await db.get(`SELECT * FROM Produto WHERE nome= ?`,
            [nome]
        ) 
        return result
    }
    //READ BY ID
    static async findByID(id:number):Promise<Produto | undefined>{
        const db = await getDB()
        const result = await db.get(`SELECT * FROM Produto WHERE produto_id= ?`,
            [id]
        ) 
        return result 
    }

    // UPDATE

   static async update(id:number, nome: string, descricao: string, preco: number, estoque: number): Promise<number>{
        const db = await getDB()
        const result = await db.run(`UPDATE Produto SET nome = ?, descricao = ?, preco = ?, estoque=? WHERE produto_id = ?`,
            [nome, descricao, preco, estoque, id]
        );
        return result.changes ?? 0

    }

    static async updateEstoque(id:number, estoque: number): Promise<number>{
        const db = await getDB()
        const result = await db.run(`UPDATE Produto SET estoque=? WHERE produto_id = ?`,
            [estoque, id]
        );
        return result.changes ?? 0

    }


    //DELETE

    static async delete(id:number): Promise<number>{
        const db = await getDB()
        const result = await db.run(`DELETE FROM Produto WHERE produto_id= ?`,[id]) 
        return result.changes ?? 0
    }


}


//testes


ProdutoRepository.create("Produto Teste","Descricao Teste",100,50)
    .then(async (id) => {
        console.log(`Produto criado com ID: ${id}`);


        console.table(await ProdutoRepository.findAll());
        const produto = await ProdutoRepository.findByID(id);
        console.log("Produto encontrado:", produto);

        await ProdutoRepository.update(id, "Produto Atualizado", "Descricao Atualizada", 150, 30);
        console.log("Produto atualizado.");

        const produtos = await ProdutoRepository.findAll();
        console.log("Todos os produtos:", produtos);
    })
    .catch((error) => {
        console.error("Erro durante os testes do ProdutoRepository:", error);
    })
    .finally(() => {
        closeDB();
    });
