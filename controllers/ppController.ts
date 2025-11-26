import { PedidoProdutoService } from "../services/ppService";

export class PedidoProdutoController {

    // Criar item de pedido
    static async criar(pedidoId: number, produtoId: number, quantidade: number, precoUnitario: number) {
        try {
            const id = await PedidoProdutoService.criar(pedidoId, produtoId, quantidade, precoUnitario);
            console.log("✅ Item do pedido criado com sucesso. ID:", id);
            return id;
        } catch (error: any) {
            console.error("Erro ao criar item do pedido:", error.message);
        }
    }

    // Atualizar item de pedido
    static async atualizar(id: number, pedidoId: number, produtoId: number, quantidade: number, precoUnitario: number) {
        try {
            const update = await PedidoProdutoService.atualizar(id, pedidoId, produtoId, quantidade, precoUnitario);
            console.log("✅ Item do pedido atualizado com sucesso");
            return update;
        } catch (error: any) {
            console.error("Erro ao atualizar item do pedido:", error.message);
        }
    }

    // Buscar itens de um pedido
    static async buscarPorPedido(pedidoId: number) {
        try {
            const itens = await PedidoProdutoService.findByPedido(pedidoId);
            console.log("Itens encontrados para o pedido:", pedidoId);
            console.table(itens);
            return itens;
        } catch (error: any) {
            console.error("Erro ao buscar itens do pedido:", error.message);
        }
    }

    // Listar todos os itens de pedidos
    static async listarTodos() {
        try {
            const itens = await PedidoProdutoService.listar();
            console.table(itens);
            return itens;
        } catch (error: any) {
            console.error("Erro ao listar itens de pedidos:", error.message);
        }
    }

    // Deletar item específico de um pedido
    static async deletar(pedidoId: number, produtoId: number) {
        try {
            const result = await PedidoProdutoService.delete(pedidoId, produtoId);
            console.log("✅", result);
            return result;
        } catch (error: any) {
            console.error("Erro ao deletar item do pedido:", error.message);
        }
    }

    // Deletar todos os itens de um pedido
    static async deletarPorPedido(pedidoId: number) {
        try {
            const result = await PedidoProdutoService.deleteByPedido(pedidoId);
            console.log("✅", result);
            return result;
        } catch (error: any) {
            console.error("Erro ao deletar itens do pedido:", error.message);
        }
    }
}
