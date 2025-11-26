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
  static async findByClienteId(id: number): Promise<Pedido[]> {
    const db = await getDB()
    return await db.all(`SELECT * FROM Pedido WHERE cliente_id=?`, [id])
  }

  static async findById(id: number): Promise<Pedido | undefined> {
    if (!id) throw new Error("Dados ausentes (insira o id)");
    const db = await getDB();
    const pedido = await db.get(`SELECT * FROM Pedido WHERE pedido_id=?`, [id]);
    return pedido;
}


  //UPDATE

  static async update(id: number, status: string): Promise<number> {

    const db = await getDB()
    const result = await db.run(`UPDATE Pedido SET status=? WHERE pedido_id=?`, [status, id])
    return result.changes ?? 0
  }

  

  //DELETE

  static async delete(id: number): Promise<number> {
    const db = await getDB()
    const result = await db.run(`DELETE FROM Pedido WHERE pedido_id=?`,
      [id]
    )
    return result.changes ?? 0
  }

  static async deleteByCliente(id: number): Promise<number> {
    const db = await getDB()
    const result = await db.run(`DELETE FROM Pedido WHERE cliente_id=?`,
      [id]
    )
    return result.changes ?? 0
  }

}




