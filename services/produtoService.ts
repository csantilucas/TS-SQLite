import { describe } from "node:test";
import { Produto } from "../models/modelProduto";
import { ProdutoRepository } from "../repository/produtoRepository";

export class ProdutoService {
  // Criar Produto
  static async criar(nome: string, descricao:string, preco: number, estoque: number): Promise<number> {
    if (!nome) throw new Error("Dados ausentes (insira um nome)");
    if (!preco) throw new Error("Dados ausentes (insira um preço)");
    if (estoque == null) throw new Error("o estoque nao pode ser vazio");

    const produtoId = await ProdutoRepository.create(nome, descricao, preco, estoque);
    return produtoId ?? 0;
  }

  // Atualizar Produto
  static async atualizar(id:number, nome: string, descricao:string, preco: number, estoque: number): Promise<number> {
    if (!id) throw new Error("Dados ausentes (insira o id)");
    if (!nome) throw new Error("Dados ausentes (insira um nome)");
    if (!preco) throw new Error("Dados ausentes (insira um preço)");
    if (estoque == null) throw new Error("Dados ausentes (insira o estoque)");

    const update = await ProdutoRepository.update(id, nome, descricao ,preco, estoque);
    if (!update) throw new Error("Produto não encontrado");

    return update;
  }


   static async atualizarEstoque(id:number, estoque: number): Promise<number> {
    if (!id) throw new Error("Dados ausentes (insira o id)");
    if (estoque == null) throw new Error("Dados ausentes (insira o estoque)");

    const update = await ProdutoRepository.updateEstoque(id, estoque);
    if (!update) throw new Error("Produto não encontrado");

    return update;
  }

  // Buscar Produto por ID
  static async findById(id: number): Promise<Produto | undefined> {
    if (!id) throw new Error("Dados ausentes (insira o id)");
    return await ProdutoRepository.findByID(id);
  }

  // Listar todos os produtos
  static async listar(): Promise<Produto[]> {
    return await ProdutoRepository.findAll();
  }

  // Deletar Produto
  static async delete(id: number): Promise<string> {
    if (!id) throw new Error("Dados ausentes (insira o id)");

    const linhasAfetadas = await ProdutoRepository.delete(id);
    if (linhasAfetadas === 0) throw new Error("Produto não encontrado");

    return "Produto deletado com sucesso";
  }
}
