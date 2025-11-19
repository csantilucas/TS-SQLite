import { getDB } from "../database/initDB";
import { Pedido } from "../models/modelPedido";

/*
comandos usados

db.exec ->  executar create 
db.run  ->  executar insert e update
db.all  ->  executar querys

*/

export class PedidoRepository {


    //CREATE
    static async create(id: number, status: string, valor: number): Promise<number> {
        const db = await getDB()
        const result = await db.run(`INSERT INTO Pedido (cliente_id,status,valor_total) values (?,?,?)`,
            [id, status, valor])
        return result.lastID ?? 0

    }

    //READ
    static async findAll(): Promise<Pedido[]> {
        const db = await getDB()
        return await db.all(`SELECT * FROM Pedido`)
    
    }
      static async findByIDCliente(id:number): Promise<Pedido[] | undefined> {
        const db = await getDB()
        return await db.get(`SELECT * FROM Pedido WHERE cliente_id=?`,
            [id]
        )
    
    }

    //UPDATE

    static async update(id:number, status:string):Promise <number>{

        const db = await getDB()
        const result = await db.run(`UPDATE Pedido SET status=? WHERE pedido_id=?`,[id,status])
        return result.changes ?? 0
    }

    //DELETE

    static async delete(id:number):Promise<number>{
        const db = await getDB()
    const result = await db.run(`DELETE FROM Pedido WHERE pedido_id=?`,
            [id]
        )
        return result.changes ?? 0}

}




//TESTES

(async () => {
  try {
    const pedidoId = await PedidoRepository.create(999, "aberto", 0);
    console.log("Pedido criado com ID:", pedidoId);
  } catch (error: any) {
    console.error("Erro ao criar pedido:", error.message);
  }
})();


PedidoRepository.findAll().then(res=>console.table(res))
//PedidoRepository.findByIDCliente(10).then(res=>console.table(res))