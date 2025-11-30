import { Endereco } from "../models/modelEndereco";
import { EnderecoRepository } from "../repository/enderecoRepository";

export class EnderecoService {
    // Criar Endereço
    static async criar(cliente_id:number, rua:string, bairro:string, cep:string, numero:string, complemento:string): Promise<number> {
        if (!cliente_id) throw new Error("Dados ausentes (insira o clienteId)");
        if (!rua) throw new Error("Dados ausentes (insira a rua)");
        if (!numero) throw new Error("Dados ausentes (insira o número)");
        if (!cep) throw new Error("Dados ausentes (insira o CEP)");

        const id = await EnderecoRepository.create(cliente_id, rua, bairro, cep, numero, complemento);
        if (!id) throw new Error("Erro ao criar endereço");

        return id;
    }

    // Atualizar Endereço
    static async atualizar(id:number,cliente_id:number,rua:string, bairro:string, cep:string, numero:string, complemento:string): Promise<number> {

        if (!id) throw new Error("Dados ausentes (insira o id)");
        if (!cliente_id) throw new Error("Dados ausentes (insira o clienteId)");
        if (!rua) throw new Error("Dados ausentes (insira a rua)");
        if (!cep) throw new Error("Dados ausentes (insira o CEP)");
        if (!numero) throw new Error("Dados ausentes (insira o número)");
        if (!cep) throw new Error("Dados ausentes (insira o CEP)");

        const endereco = await EnderecoRepository.findById(id);
        if (!endereco) throw new Error("Endereço não encontrado");

        const update = await EnderecoRepository.update(id, rua, bairro, cep, numero, complemento);
        if (update == 0) throw new Error("falha ao atualizar o endereço");
        return update;
    }

    // Listar todos os endereços
    static async listar(): Promise<Endereco[]> {
        return await EnderecoRepository.findAll();
    }

    // Buscar endereços de um cliente
    static async findByClienteId(clienteId: number): Promise<Endereco[]> {
        if (!clienteId) throw new Error("Dados ausentes (insira o clienteId)");
        return await EnderecoRepository.findByClienteId(clienteId);
    }

    // Deletar Endereço
    static async delete(id: number): Promise<string> {
        if (!id) throw new Error("erro ao exluir o endereco. Dados ausentes (insira o id)");

        const update = await EnderecoRepository.delete(id);
        if (update == 0) throw new Error("Endereço não encontrado");

        return "Endereço deletado com sucesso";
    }
}





// (async () => {
//   try {
//     const enderecoId = await EnderecoService.criar(
//       3, // clienteId (exemplo: cliente com id 1)
//       "Av. Brasil", // rua
//       "1234",       // número
//       "Vilhena",    // cidade
//       "RO",         // estado
//       "76980-000"   // cep
//     );

//     console.log("Endereço criado com ID:", enderecoId);
//   } catch (error: any) {
//     console.error("Erro:", error.message);
//   }
// })();


// EnderecoService.listar().then(res => console.table(res))
