import { Produto } from "../models/modelProduto";
import { ProdutoRepository } from "../repository/produtoRepository";


export class ProdutoService {
  // Criar Produto
  static async criar(nome: string, descricao: string, preco: number, estoque: number): Promise<number | undefined> {
    if (!nome) throw new Error("Dados ausentes (insira um nome)");
    if (!preco) throw new Error("Dados ausentes (insira um preço)");
    if (estoque == null) throw new Error("o estoque nao pode ser vazio");

    const produtoId = await ProdutoRepository.create(nome, descricao, preco, estoque);
    return produtoId ?? 0;
  }

  // Atualizar Produto
  static async atualizar(id: number, nome: string, descricao: string, preco: number, estoque: number): Promise<number> {
    if (!id) throw new Error("Dados ausentes (insira o id)");
    if (!nome) throw new Error("Dados ausentes (insira um nome)");
    if (!preco) throw new Error("Dados ausentes (insira um preço)");
    if (estoque == null) throw new Error("Dados ausentes (insira o estoque)");

    const update = await ProdutoRepository.update(id, nome, descricao, preco, estoque);
    if (!update) throw new Error("Produto não encontrado");

    return update;
  }


  static async atualizarEstoque(id: number, estoque: number): Promise<number> {
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

  // Buscar Produto por Nome (retorna lista)
  static async findByNome(nome: string): Promise<Produto[]> {
    if (!nome) throw new Error("Dados ausentes (insira o nome)");
    return await ProdutoRepository.findByName(nome);
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


//ProdutoRepository.create('Placa de video','placa de video', 2000, 20)
// ProdutoService.criar('Placa de video','placa de video', 2000, 20)
// ProdutoService.listar().then(res=>console.table(res))