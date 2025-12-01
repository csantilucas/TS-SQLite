import { Pedido } from "../models/modelPedido";
import { ClienteRepository } from "../repository/clienteRepository";
import { PedidoRepository } from "../repository/pedidoRepository";

export class PedidoService {
    // Criar Pedido
    static async criar(clienteId: number, status: string, valor_total: number): Promise<number> {
        if (!clienteId) throw new Error("Dados ausentes (insira o clienteId)");

        const cliente = await ClienteRepository.findByID(clienteId);
        if (!cliente) throw new Error("Usuário não encontrado");

        if (valor_total === undefined || valor_total === null) {
            throw new Error("Dados ausentes (insira um valor)");
        }
        if (!status) throw new Error("Dados ausentes (insira um status)");

        const pedidoId = await PedidoRepository.create(clienteId, status, valor_total);
        return pedidoId ?? 0;
    }

    // Atualizar Pedido (status e opcionalmente valor_total)
    static async atualizar(id: number, status: string, valor_total?: number): Promise<number> {
        if (!id) throw new Error("Dados ausentes (insira o id)");
        if (!status) throw new Error("Dados ausentes (insira um status)");

        const linhasAfetadas = await PedidoRepository.update(id, status, valor_total);
        return linhasAfetadas;
    }

    static async atualizarStatus(id: number, status: string): Promise<number> {
        if (!id) throw new Error("Dados ausentes (insira o id)");
        if (!status) throw new Error("Dados ausentes (insira um status)");
        const linhasAfetadas = await PedidoRepository.updateStatus(id, status);
        return linhasAfetadas;
    }

    // Buscar Pedido por ID do cliente
    static async findByClienteId(clienteId: number): Promise<Pedido[]> {
        if (!clienteId) throw new Error("Dados ausentes (insira o clienteId)");
        return await PedidoRepository.findByClienteId(clienteId);
    }

    // Buscar Pedido por ID
    static async findById(pedidoId: number): Promise<Pedido | undefined> {
        if (!pedidoId) throw new Error("Dados ausentes (insira o pedidoId)");
        return await PedidoRepository.findById(pedidoId);
    }

    static async findByStatusPendente(cliente_id:number): Promise<Pedido[]> {
        return await PedidoRepository.findByStatusPendente(cliente_id);
    }

    static async findByStatusConcluido(cliente_id:number): Promise<Pedido[]> {
        return await PedidoRepository.findByStatusConcluido(cliente_id);
    }

    // Listar todos os pedidos
    static async listar(): Promise<Pedido[]> {
        return await PedidoRepository.findAll();
    }

    // Deletar Pedido
    static async delete(pedidoId: number): Promise<string> {
        if (!pedidoId) throw new Error("Dados ausentes (insira o pedidoId)");

        const linhasAfetadas = await PedidoRepository.delete(pedidoId);
        if (!linhasAfetadas) throw new Error("Pedido não encontrado");

        return "✅ Pedido deletado com sucesso";
    }

    // Deletar todos os pedidos de um cliente
    static async deleteByCliente(clienteId: number): Promise<string> {
        if (!clienteId) throw new Error("Dados ausentes (insira o clienteId)");

        const linhasAfetadas = await PedidoRepository.deleteByCliente(clienteId);
        if (!linhasAfetadas) throw new Error("Nenhum pedido encontrado para este cliente");

        return "✅ Todos os pedidos do cliente foram deletados com sucesso";
    }
}
