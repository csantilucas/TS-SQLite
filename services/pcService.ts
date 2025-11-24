import { ProdutoCategoriaRepository } from "../repository/pcRepository";
import { CategoriaService } from "./categoriaService";
import {ProdutoService} from './produtoService'

export class ProdutoCategoriaService {
  // Criar relação produto-categoria
  static async criar(produtoId: number, categoriaId: number): Promise<number> {
    if (!produtoId) throw new Error("Dados ausentes (insira o produtoId)");
    if (!categoriaId) throw new Error("Dados ausentes (insira o categoriaId)");

    const relacaoId = await ProdutoCategoriaRepository.create(produtoId, categoriaId);
    if (!relacaoId) throw new Error("Erro ao criar relação produto-categoria");

    return relacaoId;
  }

  // Listar todas as relações
  static async listar(): Promise<any[]> {
    return await ProdutoCategoriaRepository.findAll();
  }

  // Buscar categorias de um produto
  static async categoriasDoProduto(produtoId: number): Promise<any[]> {
    if (!produtoId) throw new Error("Dados ausentes (insira o produtoId)");
    return await ProdutoCategoriaRepository.findByProduto(produtoId);
  }

  // Buscar produtos de uma categoria
  static async produtosDaCategoria(categoriaId: number): Promise<any[]> {
    if (!categoriaId) throw new Error("Dados ausentes (insira o categoriaId)");
    return await ProdutoCategoriaRepository.findByCategoria(categoriaId);
  }

  // Deletar relação
  static async delete(id: number): Promise<string> {
    if (!id) throw new Error("Dados ausentes (insira o id)");

    const linhasAfetadas = await ProdutoCategoriaRepository.delete(id);
    if (linhasAfetadas === 0) throw new Error("Relação produto-categoria não encontrada");

    return "Relação produto-categoria deletada com sucesso";
  }
}

// ProdutoService.listar().then(res => console.table(res))
// CategoriaService.listar().then(res => console.table(res))
// ProdutoCategoriaService.criar(10,7)
// ProdutoCategoriaService.criar(10,8)
// ProdutoCategoriaService.listar().then(res => console.table(res))
