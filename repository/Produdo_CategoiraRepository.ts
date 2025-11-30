import { getDB } from "../database/initDB";

export class ProdutoCategoriaRepository {
  // CREATE
  static async create(produtoId: number, categoriaId: number): Promise<number> {
    const db = await getDB();
    const result = await db.run(
      `INSERT INTO Produto_Categoria (produto_id, categoria_id) VALUES (?, ?)`,
      [produtoId, categoriaId]
    );
    return result.lastID ?? 0;
  }

  // READ - listar todas as relações
  static async findAll(): Promise<any[]> {
    const db = await getDB();
    return await db.all(`SELECT * FROM Produto_Categoria`);
  }

  // READ - buscar categorias de um produto
  static async findByProduto(produtoId: number): Promise<any[]> {
    const db = await getDB();
    return await db.all(
      `SELECT c.* FROM Categoria c
       INNER JOIN Produto_Categoria pc ON c.categoria_id = pc.categoria_id
       WHERE pc.produto_id = ?`,
      [produtoId]
    );
  }

  // READ - buscar produtos de uma categoria
  static async findByCategoria(categoriaId: number): Promise<any[]> {
    const db = await getDB();
    return await db.all(
      `SELECT p.* FROM Produto p
       INNER JOIN Produto_Categoria pc ON p.produto_id = pc.produto_id
       WHERE pc.categoria_id = ?`,
      [categoriaId]
    );
  }

  // DELETE - remover relação
  static async deleteByProduto(id: number): Promise<number> {
    const db = await getDB();
    const result = await db.run(`DELETE FROM Produto_Categoria WHERE produto_id = ?`, [id]);
    return result.changes ?? 0;
  }

  static async deleteByCategoria(id: number): Promise<number> {
    const db = await getDB();
    const result = await db.run(`DELETE FROM Produto_Categoria WHERE categoria_id = ?`, [id]);
    return result.changes ?? 0;
  }

  static async deleteByProduto_Categoria(idC: number, idP:number): Promise<number> {
    const db = await getDB();
    const result = await db.run(`DELETE FROM Produto_Categoria WHERE categoria_id = ? AND WHERE produto_id=?`, [idC,idP]);
    return result.changes ?? 0;
  }
}
