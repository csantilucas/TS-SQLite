import { PedidoService } from "../services/pedidoService";
import { PedidoProdutoService } from "../services/ppService";
import { PedidoProdutoController } from "./ppController";
import { ProdutoController } from "./produtoController";
import readline from "readline";
export enum StatusPedido {
    ABERTO = "pedido em aberto",
    PENDENTE = "pedido em pendencia",
    FINALIZADO = "pedido concluido"
}

export class PedidoController {

    // Criar item de pedido
    static async criar(clienteId: number, status: StatusPedido, produtos: ppmodel[]) {
        try {
            // 1. calcular total do pedido
            const total = produtos.reduce((acc, item) => acc + item.preco * item.quantidade, 0);

            // 2. criar o pedido com o total calculado
            const pedidoId = await PedidoService.criar(clienteId, status, total);
            console.log("✅ Pedido criado com sucesso. ID:", pedidoId, "Total:", total);

            // 3. vincular os produtos ao pedido
            for (const item of produtos) {
                await PedidoProdutoService.criar(pedidoId, item.produtoId, item.quantidade, item.preco);
            }

            console.log("✅ Produtos vinculados ao pedido");
            return { pedidoId, total };
        } catch (error: any) {
            console.error("Erro ao criar pedido:", error.message);
        }
    }



    // Listar todos os pedidos
    static async listarTodos() {
        try {
            const pedidos = await PedidoService.listar();
            console.table(pedidos);
            return pedidos;
        } catch (error: any) {
            console.error("Erro ao listar pedidos:", error.message);
        }
    }

    // Buscar pedidos por cliente
    static async buscarPorCliente(clienteId: number | undefined) {
        if (clienteId) {
            try {
                const pedidos = await PedidoService.findByClienteId(clienteId);
                if (!pedidos || pedidos.length === 0) {
                    console.log("Nenhum pedido encontrado para este cliente");
                    return;
                }

                // para cada pedido, buscar produtos vinculados
                const resultado = [];
                for (const pedido of pedidos) {
                    const produtos = await PedidoProdutoService.findByPedido(pedido.pedido_id);
                    resultado.push({ pedido, produtos });
                }

                console.log("Pedidos encontrados:", resultado);
                return resultado;
            } catch (error: any) {
                console.error("Erro ao buscar pedidos por cliente:", error.message);
            }
        }
    }

    // Buscar pedido por ID
    static async buscarPorId(pedidoId: number | undefined) {
        if (pedidoId) {
            try {
                const pedido = await PedidoService.findByClienteId(pedidoId);
                if (!pedido) {
                    console.log("Pedido não encontrado");
                    return;
                }

                const produtos = await PedidoProdutoService.findByPedido(pedidoId);
                console.log("Pedido encontrado:", pedido);
                console.table(produtos);

                return { pedido, produtos };
            } catch (error: any) {
                console.error("Erro ao buscar pedido por ID:", error.message);
            }
        }
    }

    // Deletar pedido (e seus produtos vinculados)
    static async deletar(pedidoId: number) {
        try {
            const produtos = await PedidoProdutoService.findByPedido(pedidoId);
            for (const item of produtos) {
                await PedidoProdutoService.delete(item.pedido_id, item.produto_id);
            }

            await PedidoService.delete(pedidoId);
            console.log("✅ Pedido e produtos vinculados deletados com sucesso");
        } catch (error: any) {
            console.error("Erro ao deletar pedido:", error.message);
        }
    }

    // Atualizar pedido (ex: atualizar produtos vinculados)
    static async atualizar(
        pedidoId: number,
        produtos: { produtoId: number, quantidade: number, preco: number }[]
    ) {
        try {
            // remove os produtos antigos
            const antigos = await PedidoProdutoService.findByPedido(pedidoId);
            for (const item of antigos) {
                await PedidoProdutoService.delete(item.pedido_id, item.produto_id);
            }

            // adiciona os novos
            for (const item of produtos) {
                await PedidoProdutoService.criar(pedidoId, item.produtoId, item.quantidade, item.preco);
            }


            console.log("✅ Pedido atualizado com sucesso");
        } catch (error: any) {
            console.error("Erro ao atualizar pedido:", error.message);
        }
    }

}
