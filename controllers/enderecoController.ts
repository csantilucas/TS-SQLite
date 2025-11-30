import { EnderecoService } from "../services/enderecoService";

export class EnderecoController {
    // Criar novo endereço para um cliente
    static async criar(cliente_id:number, rua:string, bairro:string, cep:string, numero:string, complemento:string) {
        try {
            const enderecoId = await EnderecoService.criar(cliente_id, rua, bairro, cep, numero, complemento);
            console.log("✅ Endereço criado com sucesso. ID:", enderecoId);
            return enderecoId;
        } catch (error: any) {
            console.error("Erro ao criar endereço:", error.message);
        }
    }

    // Atualizar endereço existente
    static async atualizar(id:number,cliente_id:number,rua:string, bairro:string, cep:string, numero:string, complemento:string   ) {
        try {
            const atualizado = await EnderecoService.atualizar(id,cliente_id, rua, bairro, cep, numero, complemento);
            console.log("✅ Endereço atualizado com sucesso");
            return atualizado;
        } catch (error: any) {
            console.error("Erro ao atualizar endereço:", error.message);
        }
    }

    // Buscar todos os endereços de um cliente
    static async buscarPorCliente(clienteId: number) {
        try {
            const enderecos = await EnderecoService.findByClienteId(clienteId);
            console.log(`Endereços encontrados para cliente ${clienteId}:`);
            console.table(enderecos);
            return enderecos;
        } catch (error: any) {
            console.error("Erro ao buscar endereços:", error.message);
        }
    }


    // Deletar endereço
    static async deletar(enderecoId: number) {
        try {
            const result = await EnderecoService.delete(enderecoId);
            console.log("✅ Endereço deletado com sucesso");
            return result;
        } catch (error: any) {
            console.error("Erro ao deletar endereço:", error.message);
        }
    }
}
