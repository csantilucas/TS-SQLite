import { PP } from "../models/modelPP";
import { ppRepository } from "../repository/ppRepository";

export class PedidoProdutoService {
  // Criar item de pedido
  static async criar(pedidoId: number, produtoId: number, quantidade: number, precoUnitario: number
  ): Promise<number> {
    if (!pedidoId) throw new Error("Dados ausentes (insira o pedidoId)");
    if (!produtoId) throw new Error("Dados ausentes (insira o produtoId)");
    if (!quantidade) throw new Error("Dados ausentes (insira a quantidade)");
    if (!precoUnitario) throw new Error("Dados ausentes (insira o preço unitário)");

    const id = await ppRepository.create(pedidoId, produtoId,quantidade, precoUnitario );
    if (!id) throw new Error("Erro ao criar item do pedido");

    return id;
  }

  // Atualizar item de pedido
  static async atualizar(id: number,pedidoId: number, produtoId: number,quantidade: number,precoUnitario: number): Promise<number> {
    if (!id) throw new Error("Dados ausentes (insira o id)");

    const pedidoProduto = await ppRepository.findById(id);
    if (!pedidoProduto) throw new Error("Item do pedido não encontrado");

    if (!pedidoId) throw new Error("Dados ausentes (insira o pedidoId)");
    if (!produtoId) throw new Error("Dados ausentes (insira o produtoId)");
    if (!quantidade) throw new Error("Dados ausentes (insira a quantidade)");
    if (!precoUnitario) throw new Error("Dados ausentes (insira o preço unitário)");

    const update = await ppRepository.update(id,pedidoId, produtoId,quantidade,precoUnitario);
    if (update === 0) throw new Error("Item do pedido não encontrado");

    return update;
  }

  // Buscar item por ID
  static async findById(id: number): Promise<PP | undefined> {
    if (!id) throw new Error("Dados ausentes (insira o id)");
    return await ppRepository.findById(id);
  }

  // Listar todos os itens de pedidos
  static async listar(): Promise<PP[]> {
    return await ppRepository.findAll();
  }

  // Buscar itens de um pedido específico
  static async findByPedidoId(pedidoId: number): Promise<PP[]> {
    if (!pedidoId) throw new Error("Dados ausentes (insira o pedidoId)");
    return await ppRepository.findByPedido(pedidoId);
  }

  // Deletar item de pedido
  static async delete(id: number): Promise<string> {
    if (!id) throw new Error("Dados ausentes (insira o id)");

    const linhasAfetadas = await ppRepository.delete(id);
    if (linhasAfetadas === 0) throw new Error("Item do pedido não encontrado");

    return "Item do pedido deletado com sucesso";
  }
}
