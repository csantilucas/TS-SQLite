/*
comandos usados

db.exec ->  executar create 
db.run  ->  executar insert e update
db.all  ->  executar querys

*/

import { closeDB, getDB } from "../database/initDB";
import { PP } from "../models/modelPP";
import { Produto } from "../models/modelProduto";
// CRUD PARA PRODUTO

export class ppRepository {
  // CREATE
  static async create(pedido_id: number, produto_id: number, quant: number, preco: number): Promise<number> {
    const db = await getDB();
    const result = await db.run(
      `INSERT INTO Pedido_Produto (pedido_id, produto_id, quantidade, preco_unitario) VALUES (?, ?, ?, ?)`,
      [pedido_id, produto_id, quant, preco]
    );
    return result.lastID ?? 0;
  }

  // READ ALL
  static async findAll(): Promise<PP[]> {
    const db = await getDB();
    return await db.all(`SELECT * FROM Pedido_Produto`);
  }

  // READ BY PEDIDO
  static async findByPedido(pedido_id: number): Promise<PP[]> {
    const db = await getDB();
    return await db.all(`SELECT * FROM Pedido_Produto WHERE pedido_id = ?`, [pedido_id]);
  }

  // UPDATE
  static async update(pedido_id: number, produto_id: number, quant: number, preco: number): Promise<number> {
    const db = await getDB();
    const result = await db.run(
      `UPDATE Pedido_Produto SET quantidade = ?, preco_unitario = ? WHERE pedido_id = ? AND produto_id = ?`,
      [quant, preco, pedido_id, produto_id]
    );
    return result.changes ?? 0;
  }

  // DELETE
  static async delete(pedido_id: number, produto_id: number): Promise<number> {
    const db = await getDB();
    const result = await db.run(
      `DELETE FROM Pedido_Produto WHERE pedido_id = ? AND produto_id = ?`,
      [pedido_id, produto_id]
    );
    return result.changes ?? 0;
  }
}



//testes

