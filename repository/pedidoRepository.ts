import { getDB } from "../database/initDB";

/*
comandos usados

db.exec ->  executar create 
db.run  ->  executar insert e update
db.all  ->  executar querys

*/

export class PedidoReposiyory{


    //CREATE
    static async create(id:number, status:string, valor:number):Promise <number>{
        const db = await getDB()
        const result = await db.run(`INSERT INTO Pedido (cliente_id,status,valor_total)`,
            [id,status,valor])
        return  result.lastID ?? 0

    }

}