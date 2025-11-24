import { Pedido } from "../models/modelPedido";
import { ClienteRepository } from "../repository/clienteRepository";
import { PedidoRepository } from "../repository/pedidoRepository";

export class PedidoService {
    // Criar Pedido
    static async criar(clienteId: number, status: string, valor: number): Promise<number> {

        if (!clienteId) throw new Error("Dados ausentes (insira o clienteId)");
        const cliente = await ClienteRepository.findByID(clienteId)
        if (!cliente) throw new Error("Usuario nao encontrado")

        if (!valor) throw new Error("Dados ausentes (insira um valor)");
        if (!status) throw new Error("Dados ausentes (insira um status)");

        const pedidoId = await PedidoRepository.create(clienteId, status, valor);
        return pedidoId ?? 0;
    }

    // Atualizar Pedido
    static async atualizar(id: number, status: string): Promise<number> {
        if (!id) throw new Error("Dados ausentes (insira o id)");
        if (!status) throw new Error("Dados ausentes (insira um status)");

        const linhasAfetadas = await PedidoRepository.update(id, status);
        return linhasAfetadas;
    }

    // Buscar Pedido por ID
    static async findByClienteId(id: number): Promise<Pedido[]> {
        if (!id) throw new Error("Dados ausentes (insira o id)");
        const pedidos = await PedidoRepository.findByClienteId(id);
        return pedidos
    }


    // Listar todos os pedidos
    static async listar(): Promise<Pedido[]> {
        return await PedidoRepository.findAll();
    }

    // Deletar Pedido
    static async delete(id: number): Promise<string> {
        if (!id) throw new Error("Dados ausentes (insira o id)");

        const pedidos = await PedidoRepository.delete(id);
        if (!pedidos) throw new Error("Pedido não encontrado");

        return "Pedido deletado com sucesso";
    }

     static async deleteByCliente(id: number): Promise<string> {
        if (!id) throw new Error("Dados ausentes (insira o id)");

        const pedidos = await PedidoRepository.deleteByCliente(id);
        if (!pedidos) throw new Error("Pedido não encontrado");

        return "Pedido deletado com sucesso";
    }
}



//PedidoRepository.create(3,'aberto',0)
//PedidoService.findByClienteId(3)
//PedidoService.deleteByCliente(3)

PedidoRepository.findByClienteId(3).then(res => console.table(res))