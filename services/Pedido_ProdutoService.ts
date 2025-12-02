import { PedidoProdutoDetalhado, ppmodel } from "../models/modelPP";
import { ppRepository } from "../repository/Pedido_ProdutoRepository";

export class PedidoProdutoService {
  // Criar item de pedido
  static async criar(pedidoId: number, produtoId: number, quantidade: number, precoUnitario: number
  ): Promise<number> {
    if (!pedidoId) throw new Error("Dados ausentes (insira o pedidoId)");
    if (!produtoId) throw new Error("Dados ausentes (insira o produtoId)");
    if (!quantidade) throw new Error("Dados ausentes (insira a quantidade)");
    if (!precoUnitario) throw new Error("Dados ausentes (insira o preço unitário)");

    const id = await ppRepository.create(pedidoId, produtoId, quantidade, precoUnitario);
    if (!id) throw new Error("Erro ao criar item do pedido");

    return id;
  }

  // Atualizar item de pedido
  static async atualizar(id: number, pedidoId: number, produtoId: number, quantidade: number, precoUnitario: number): Promise<number> {
    if (!id) throw new Error("Dados ausentes (insira o id)");

    const pedidoProduto = await ppRepository.findByPedido(id);
    if (!pedidoProduto) throw new Error("Item do pedido não encontrado");

    if (!pedidoId) throw new Error("Dados ausentes (insira o pedidoId)");
    if (!produtoId) throw new Error("Dados ausentes (insira o produtoId)");
    if (!quantidade) throw new Error("Dados ausentes (insira a quantidade)");
    if (!precoUnitario) throw new Error("Dados ausentes (insira o preço unitário)");

    const update = await ppRepository.update(pedidoId, produtoId, quantidade, precoUnitario);
    if (update === 0) throw new Error("Item do pedido não encontrado");

    return update;
  }

  // Buscar item por ID
  static async findByPedido(id: number): Promise<PedidoProdutoDetalhado[]> {
    if (!id) throw new Error("Dados ausentes (insira o id)");
    return await ppRepository.findByPedido(id);
  }


  // Listar todos os itens de pedidos
  static async listar(): Promise<ppmodel[]> {
    return await ppRepository.findAll();
  }


  // Deletar item de pedido
  static async delete(pedidoId: number, produtoId: number): Promise<string> {
    if (!pedidoId) throw new Error("Dados ausentes (insira o pedidoId)");
    if (!produtoId) throw new Error("Dados ausentes (insira o produtoId)");

    const update = await ppRepository.delete(pedidoId, produtoId);
    if (update == 0) throw new Error("Item do pedido não encontrado");

    return "Item do pedido deletado com sucesso";
  }

  static async deleteByPedido(pedidoId: number): Promise<string> {
    if (!pedidoId) throw new Error("Dados ausentes (insira o pedidoId)");
    const update = await ppRepository.deleteByPedido(pedidoId);
    if (update == 0) throw new Error("Item do pedido não encontrado");

    return "Item do pedido deletado com sucesso";
  }

}
