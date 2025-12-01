import { PedidoService } from "../services/pedidoService";
import { PedidoProdutoService } from "../services/Pedido_ProdutoService";
import { ProdutoController } from "./produtoController";
import { StatusPedido } from "../models/modelPP";

export class PedidoProdutoController {



    // Criar pedido com produtos

    static async criarPedido(clienteId: number,ask: (question: string) => Promise<string>) {
        let itensPedido: { produtoId: number; quantidade: number; preco: number }[] = [];
        let Carrinho: { produto: string; quantidade: number; preco: number }[] = [];
        let continuar = "s";

        while (continuar.toLowerCase() === "s") {
            const produtoId = Number(await ask("Insira o ID do produto: "));
            const quantidade = Number(await ask("Quantidade: "));

            const produto = await ProdutoController.buscarPorId(produtoId);
            if (!produto) {
                console.log("❌ Produto não encontrado");
            } else {
                itensPedido.push({
                    produtoId: produto.produto.produto_id,
                    quantidade,
                    preco: produto.produto.preco
                });
                Carrinho.push({
                    produto: produto.produto.nome,
                    quantidade,
                    preco: produto.produto.preco
                });

                console.log("\nCarrinho atualizado:");
                console.table(Carrinho);
            }
            continuar = await ask("Quer adicionar mais produtos? (s/n): ");
        }

        const total = itensPedido.reduce((acc, item) => acc + item.preco * item.quantidade, 0);
        const pedidoId = await PedidoService.criar(clienteId, StatusPedido.Pendente, total);

        for (const item of itensPedido) {
            await PedidoProdutoService.criar(pedidoId, item.produtoId, item.quantidade, item.preco);
        }

        console.log("\n✅ Pedido cadastrado com sucesso!\n");
        console.log("ID do pedido:", pedidoId);
        console.log("Total:", total);
        console.log("\nResumo do carrinho:");
        console.table(Carrinho);

        return { pedidoId, total };
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
