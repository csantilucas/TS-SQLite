import { Endereco } from "../models/modelEndereco";
import { EnderecoRepository } from "../repository/enderecoRepository";

export class EnderecoService {
    // Criar Endereço
    static async criar(clienteId: number, rua: string, numero: string, cidade: string, estado: string, cep: string): Promise<number> {
        if (!clienteId) throw new Error("Dados ausentes (insira o clienteId)");
        if (!rua) throw new Error("Dados ausentes (insira a rua)");
        if (!numero) throw new Error("Dados ausentes (insira o número)");
        if (!cidade) throw new Error("Dados ausentes (insira a cidade)");
        if (!estado) throw new Error("Dados ausentes (insira o estado)");
        if (!cep) throw new Error("Dados ausentes (insira o CEP)");

        const id = await EnderecoRepository.create(clienteId, rua, numero, cidade, estado, cep);
        if (!id) throw new Error("Erro ao criar endereço");

        return id;
    }

    // Atualizar Endereço
    static async atualizar(id: number, clienteId: number, rua: string, numero: string, cidade: string, estado: string, cep: string): Promise<number> {

        if (!id) throw new Error("Dados ausentes (insira o id)");
        if (!clienteId) throw new Error("Dados ausentes (insira o clienteId)");
        if (!rua) throw new Error("Dados ausentes (insira a rua)");
        if (!numero) throw new Error("Dados ausentes (insira o número)");
        if (!cidade) throw new Error("Dados ausentes (insira a cidade)");
        if (!estado) throw new Error("Dados ausentes (insira o estado)");
        if (!cep) throw new Error("Dados ausentes (insira o CEP)");

        const endereco = await EnderecoRepository.findById(id);
        if (!endereco) throw new Error("Endereço não encontrado");

        const update = await EnderecoRepository.update(id, clienteId, rua, numero, cidade, estado, cep);
        if (update == 0) throw new Error("Endereço não encontrado");
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
        if (!id) throw new Error("Dados ausentes (insira o id)");

        const update = await EnderecoRepository.delete(id);
        if (update == 0) throw new Error("Endereço não encontrado");

        return "Endereço deletado com sucesso";
    }
}





(async () => {
  try {
    const enderecoId = await EnderecoService.criar(
      3, // clienteId (exemplo: cliente com id 1)
      "Av. Brasil", // rua
      "1234",       // número
      "Vilhena",    // cidade
      "RO",         // estado
      "76980-000"   // cep
    );

    console.log("Endereço criado com ID:", enderecoId);
  } catch (error: any) {
    console.error("Erro:", error.message);
  }
})();


EnderecoService.listar().then(res => console.table(res))
