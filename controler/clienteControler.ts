import { ClienteService } from "../services/clienteService";
import { EnderecoService } from "../services/enderecoService";
import { PedidoService } from "../services/pedidoService";
import { PedidoProdutoService } from "../services/ppService";


export class ClienteController {

    static async criar(nome: string, email: string, senha: string, cpf: string, telefone: string, rua: string, numero: string, cidade: string, estado: string, cep: string) {
        try {
            const clienteId = await ClienteService.criar(nome, email, senha, cpf, telefone);
            let enderecoId: number | null = null
            if (clienteId) {
                try {
                    enderecoId = await EnderecoService.criar(clienteId, rua, numero, cidade, estado, cep)
                    console.log("Endereço criado com sucesso. ID:", enderecoId)
                } catch (error: any) {
                    console.error("erro ao criar o endereco ", error.message)
                }
            }
            console.log("Cliente criado com sucesso. ID:", clienteId)
            return { clienteId, enderecoId }
        } catch (error: any) {
            console.error("Erro ao criar cliente:", error.message);
        }
    }



    static async logar(email: string, senha: string) {

        try {
            await ClienteService.login(email, senha)
        } catch (error: any) {
            console.error("erro ao logar:", error.message)
        }
    }


    static async atulizarDados(id: number, nome: string, email: string, telefone: string) {

        try {
            await ClienteService.atualizar(id, nome, email, telefone)
        } catch (error: any) {
            console.error("erro ao atulizar dados:", error.message)
        }


    }

    static async atulizarEndereco(id: number, clienteId: number, rua: string, numero: string, cidade: string, estado: string, cep: string) {
        try {
            await EnderecoService.atualizar(id, clienteId, rua, numero, cidade, estado, cep)
        } catch (error: any) {
            console.log("erro ao atulizar dados:", error.message)
        }
    }





    static async deletarUsuario(email: string, senha: string) {
        try {
            const cliente = await ClienteService.login(email, senha);
            if (!cliente) throw new Error("Cliente não encontrado ou credenciais inválidas");

            //busca as dependencias
            const clienteId = cliente.cliente_id;
            const enderecos = await EnderecoService.findByClienteId(clienteId);
            const pedidos = await PedidoService.findByClienteId(clienteId);

            //achar todos os pedidos e todos os pedidos_produtos vinculados ao cliente
            for (const pedido of pedidos) {
                const pp = await PedidoProdutoService.findByPedido(pedido.id);
                for (const itens of pp) {
                    await PedidoProdutoService.delete(itens.pedido_id, itens.produto_id);
                }
                await PedidoService.delete(pedido.id);
            }

            //acha todos os esderecos vinculados ao usuario e exlui eles
            for (const endereco of enderecos) {
                await EnderecoService.delete(endereco.enderco_id);
            }

            await ClienteService.delete(email, senha);
            console.log("Cliente e todas as dependências deletados com sucesso");
        } catch (error: any) {
            console.error("Erro ao deletar usuário:", error.message);
        }
    }
}