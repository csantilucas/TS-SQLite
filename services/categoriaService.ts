import { error } from "console";
import { Categoria } from "../models/modelCategoria";
import { CategoriaRepository } from "../repository/categoriaRepository";

export class CategoriaService {
    // Criar Categoria
    static async criar(nome: string, descricao: string): Promise<number> {

        if (!nome) throw new Error("Dados ausentes (insira o nome da categoria)");
        if (!descricao) throw new Error("Dados ausentes (insira a descrição)");

        const categoriaExistente = await CategoriaRepository.findByName(nome);
        if (categoriaExistente) throw new Error("Categoria já cadastrada");
        
        const categoriaId = await CategoriaRepository.create(nome, descricao);
        if (!categoriaId) throw new Error("Erro ao criar categoria");

        return categoriaId;
    }


    // Atualizar Categoria
    static async atualizar(id: number, nome: string, descricao: string): Promise<number> {
        if (!id) throw new Error("Dados ausentes (insira o id)");
        if (!nome) throw new Error("Dados ausentes (insira o nome da categoria)");
        if (!descricao) throw new Error("Dados ausentes (insira a descrição)");

        const update = await CategoriaRepository.update(id, nome, descricao);
        if (update == 0) throw new Error("Categoria não encontrada");

        return update
    }

    // Buscar Categoria por ID
    static async findById(id: number): Promise<Categoria | undefined> {
        if (!id) throw new Error("Dados ausentes (insira o id)");
        return await CategoriaRepository.findByID(id);
    }

    // Listar todas as categorias
    static async listar(): Promise<Categoria[]> {
        return await CategoriaRepository.findAll();
    }

    // Deletar Categoria
    static async delete(id: number): Promise<string> {
        if (!id) throw new Error("Dados ausentes (insira o id)");

        const linhasAfetadas = await CategoriaRepository.delete(id);
        if (linhasAfetadas === 0) throw new Error("Categoria não encontrada");

        return "Categoria deletada com sucesso";
    }
}

// (async () => {
//   const id1 = await CategoriaService.criar('jardinagem', 'produtos de tecnologia');
//   console.log("Categoria criada com ID:", id1);

//   const id2 = await CategoriaService.criar('construcao', 'produtos de tecnologia');
//   console.log("Categoria criada com ID:", id2);

//   const categorias = await CategoriaService.listar();
//   console.table(categorias);
// })();
