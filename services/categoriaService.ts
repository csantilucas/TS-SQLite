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


    static async findByProduto(produtoId: number): Promise<Categoria[]> {
        if (!produtoId) throw new Error("Nao foi possivel achar essa categoria, insira um produtoId)");
        return await CategoriaRepository.findByProduto(produtoId);
    }

    // Buscar por nome

    static async findByNome(nome: string): Promise<Categoria | undefined> {
        if (!nome) throw new Error("Nao foi possivel achar essa categoria, insira um nome)");
        return await CategoriaRepository.findByName(nome);
    }

    // Listar todas as categorias
    static async listar(): Promise<Categoria[]> {
        return await CategoriaRepository.findAll();
    }

    // Deletar Categoria
    static async deletar(categoriaId: number): Promise<number> {
        if (!categoriaId) throw new Error("ID da categoria ausente");
        // Apagar relações da categoria com outras tabelas
        await CategoriaRepository.deleteRelations(categoriaId);
        // Agora apaga a categoria
        const result = await CategoriaRepository.delete(categoriaId);
        if (result == 0) throw new Error("❌ Categoria não encontrada ou já removida");

        return result;
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
