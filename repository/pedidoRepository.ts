import { getDB } from "../database/initDB";
import { Pedido } from "../models/modelPedido";
import { StatusPedido } from "../models/modelPP";

export class PedidoRepository {

  // CREATE
  static async create(clienteId: number, status: string, valor_total: number): Promise<number> {
    const db = await getDB();
    const result = await db.run(
      `INSERT INTO Pedido (cliente_id, status, valor_total) VALUES (?, ?, ?)`,
      [clienteId, status, valor_total]
    );
    return result.lastID ?? 0;
  }

  // READ
  static async findAll(): Promise<Pedido[]> {
    const db = await getDB();
    return await db.all<Pedido[]>(`SELECT * FROM Pedido`);
  }

  static async findByClienteId(clienteId: number): Promise<Pedido[]> {
    const db = await getDB();
    return await db.all<Pedido[]>(`SELECT * FROM Pedido WHERE cliente_id = ?`, [clienteId]);
  }

  static async findById(pedidoId: number): Promise<Pedido | undefined> {
    if (!pedidoId) throw new Error("Dados ausentes (insira o id)");
    const db = await getDB();
    return await db.get<Pedido>(`SELECT * FROM Pedido WHERE pedido_id = ?`, [pedidoId]);
  }

  static async findByPedido(pedidoId: number): Promise<{ produto_id: number; nome: string; quantidade: number; preco_unitario: number; }[]> {
  const db = await getDB();
  return await db.all(
    `SELECT pp.produto_id, p.nome, pp.quantidade, pp.preco_unitario AS preco_unitario
     FROM Pedido_Produto pp
     JOIN Produto p ON pp.produto_id = p.produto_id
     WHERE pp.pedido_id = ?`,
    [pedidoId]
  );
}


  // Atualizar status
  static async updateStatus(pedidoId: number, status: string): Promise<number> {
    const db = await getDB();
    const result = await db.run(
      `UPDATE Pedido SET status = ? WHERE pedido_id = ?`,
      [status, pedidoId]
    );
    return result.changes ?? 0;
  }

  // Buscar pendentes
static async findByStatusPendente(clienteId: number): Promise<Pedido[]> {
  const db = await getDB();
  return await db.all<Pedido[]>(
    `SELECT * FROM Pedido WHERE status = ? AND cliente_id = ?`,
    [StatusPedido.Pendente, clienteId]
  );
}

// Buscar concluidos
static async findByStatusConcluido(clienteId: number): Promise<Pedido[]> {
  const db = await getDB();
  return await db.all<Pedido[]>(
    `SELECT * FROM Pedido WHERE status = ? AND cliente_id = ?`,
    [StatusPedido.Concluido, clienteId]
  );
}
  

  // UPDATE
  static async update(pedidoId: number, status: string, valor_total?: number): Promise<number> {
    const db = await getDB();
    if (valor_total !== undefined) {
      const result = await db.run(
        `UPDATE Pedido SET status = ?, valor_total = ? WHERE pedido_id = ?`,
        [status, valor_total, pedidoId]
      );
      return result.changes ?? 0;
    } else {
      const result = await db.run(
        `UPDATE Pedido SET status = ? WHERE pedido_id = ?`,
        [status, pedidoId]
      );
      return result.changes ?? 0;
    }
  }

  // DELETE
  static async delete(pedidoId: number): Promise<number> {
    const db = await getDB();
    const result = await db.run(
      `DELETE FROM Pedido WHERE pedido_id = ?`,
      [pedidoId]
    );
    return result.changes ?? 0;
  }

  static async deleteByCliente(clienteId: number): Promise<number> {
    const db = await getDB();
    const result = await db.run(
      `DELETE FROM Pedido WHERE cliente_id = ?`,
      [clienteId]
    );
    return result.changes ?? 0;
  }
}
