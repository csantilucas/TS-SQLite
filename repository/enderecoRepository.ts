/*
comandos usados

db.exec ->  executar create 
db.run  ->  executar insert e update
db.all  ->  executar querys

*/

// import recursos necessarios
import { Categoria } from "../models/modelCategoria"
import { getDB } from "../database/initDB";
import { Endereco } from "../models/modelEndereco";
import { ClienteRepository } from "./clienteRepository";


// CRUD PARA categoria


export class 
EnderecoRepository {

    //CREATE

    static async create(cliente_id:number, rua:string, bairro:string, cep:string, numero:string, complemento:string):Promise<number> {
        const db= await getDB()
        const result = await db.run(`INSERT INTO Endereco(cliente_id,rua,bairro,cep,numero,complemento) VALUES(?,?,?,?,?,?)`,
            [cliente_id, rua, bairro, cep, numero, complemento])
        return result.lastID ?? 0
    }

    //READ
    static async findAll():Promise<Endereco[]>{
        const db = await getDB()
        return await db.all(`SELECT * FROM Endereco`)
    }

    static async findByIDCliente(id:number):Promise<Endereco | undefined>{
        const db = await getDB()
        return await db.get(`SELECT * FROM Endereco WHERE cliente_id=?`,
            [id])
    }

    //UPDATE

    static async update(id:number,cliente_id:number,rua:string,bairro:string,cep:string,numero:string,complemento:string):Promise<number>{
        const db = await getDB()
        const result = await db.run(`UPDATE Endereco SET cliente_id=?,rua=?,bairro=?,cep=?,numero=?,complemento=? WHERE endereco_id=?`,
            [cliente_id,rua,bairro,cep,numero,complemento,id]
        )
        return result.changes ?? 0
    }

    //DELETE

    static async delete(id:number):Promise<number>{
        const db = await getDB()
        const result = await db.run(`DELETE FROM Endereco WHERE endereco_id=?`,
            [id]
        )
        return result.changes ?? 0
    }
}


//ClienteRepository.findAll().then(res => console.table(res))

EnderecoRepository.create(2,'rua dos parecis','jardim america', '4323454', '2341','casa de esquina').then(res=> {console.log(res)})

EnderecoRepository.findAll().then(res => console.table(res))
//EnderecoRepository.findByIDCleinte(2).then(res=>console.table(res))