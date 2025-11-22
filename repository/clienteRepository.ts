/*
comandos usados

db.exec ->  executar create 
db.run  ->  executar insert e update
db.all  ->  executar querys

*/


//import recursos necessarios
import { getDB } from "../database/initDB";
import { Cliente } from "../models/modelCliente";


// CRUD PARA CLIENTE


export class ClienteRepository {


    //CREATE

    static async create(nome: string, email: string, senha: string, cpf: string, telefone: string): Promise<number> {
        const db = await getDB()
        const result = await db.run(`INSERT INTO Cliente (nome,email,senha,cpf,telefone)values(?,?,?,?,?)`,
            [nome, email, senha, cpf, telefone]
        )
        return result.lastID ?? 0
    }

    //READ

    static async findAll(): Promise<Cliente[] | undefined> {
        const db = await getDB();
        return await db.all(`SELECT * FROM Cliente`);
    }

    static async findByName(nome: string): Promise<Cliente[] | undefined> {
        const db = await getDB()
        const result = await db.get(`SELECT * FROM Cliente WHERE nome= ?`,
            [nome]
        )
        return result
    }

    static async findByID(id: number): Promise<Cliente[] | undefined> {
        const db = await getDB()
        return await db.get(`SELECT * FROM Cliente WHERE cliente_id= ?`,
            [id]
        )
    }

    // ✅ FIND BY EMAIL
    static async findByEmail(email: string): Promise<any | undefined> {
        const db = await getDB();
        const cliente = await db.get(
            `SELECT * FROM Cliente WHERE email = ?`,
            [email]
        );
        return cliente; // retorna objeto do cliente ou undefined se não encontrar
    }

    //UPDATE

    static async update(id: number, nome: string, email: string, telefone: string): Promise<number> {
        const db = await getDB()
        const result = await db.run(`UPDATE Cliente SET nome = ?, email = ?, telefone = ? WHERE cliente_id = ?`,
            [nome, email, telefone, id]
        );
        return result.changes ?? 0

    }

    static async updatePassword(id: number, senha: string): Promise<number> {
        const db = await getDB()
        const result = await db.run(`UPDATE Cliente SET senha = ? WHERE cliente_id = ?`,
            [senha, id])
        return result.changes ?? 0
    }

    // DELETE

    static async delete(id: number): Promise<number> {
        const db = await getDB()
        const result = await db.run(`DELETE FROM Cliente WHERE cliente_id=?`,
            [id]
        )
        return result.changes ?? 0
    }

}



// ClienteRepository.create('lucas', 'lucasteste2@gmail.com', 'fq89fF$@F2', '341278788233', '69992162902')
// console.log('usuario inserido')

// console.table(await ClienteRepository.findAll())


// ClienteRepository.updatePassword(1, '@#D@fwQW$3t34')
// console.log('senha atulizada')

// ClienteRepository.delete(1)


