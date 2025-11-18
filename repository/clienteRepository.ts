/*
comandos usados

db.exec ->  executar create 
db.run  ->  executar insert e update
db.all  ->  executar querys

*/

import { getDB } from "../database/initDB";


// CRUD PARA CLIENTE


export class ClienteRepository {


    //CREATE

    static async create(nome: string, email: string, senha: string, cpf: string, telefone: string) {
        const db = await getDB()
        const result = await db.run(`INSERT INTO Cliente (nome,email,senha,cpf,telefone)values(?,?,?,?,?)`,
            [nome, email, senha, cpf, telefone]
        )
        return result.lastID
    }

    //READ

    static async findAll() {
        const db = await getDB();
        return await db.all(`SELECT * FROM Cliente`);
    }

    static async findByName(nome:string){
        const db = await getDB()
        db.get(`SELECT * FROM Cliente WHERE nome= ?`,
            [nome]
        ) 
    }

    static async findByID(id:number){
        const db = await getDB()
        db.get(`SELECT * FROM Cliente WHERE cliente_id= ?`,
            [id]
        ) 
    }

    //UPDATE

    static async update(id:number,nome: string, email: string, telefone: string){
        const db = await getDB()
        await db.run(`UPDATE Cliente SET nome = ?, email = ?, telefone = ? WHERE cliente_id = ?`,
            [nome, email, telefone, id]
        );
       
    }

    static async updatePassword(id:number, senha:string){
        const db = await getDB()
        await db.run(`UPDATE Cliente SET senha = ? WHERE cliente_id = ?`,
        [senha, id])
       
    }

    // DELETE

    static async delete(id:number){
        const db = await getDB()
        await db.run(`DELETE FROM Cliente WHERE cliente_id=?`,
            [id]
        )
       
    }

}



ClienteRepository.create('lucas','lucasteste2@gmail.com','fq89fF$@F2','341278788233','69992162902')
console.log('usuario inserido')

console.table( await ClienteRepository.findAll())


ClienteRepository.updatePassword(1,'@#D@fwQW$3t34')
console.log('senha atulizada')

ClienteRepository.delete(1)


