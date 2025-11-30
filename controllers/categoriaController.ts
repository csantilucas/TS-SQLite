import { CategoriaService } from "../services/categoriaService";

export class CategoriaController {
    // Criar nova categoria
    static async criar(nome: string, descricao: string) {
        try {
            const categoriaId = await CategoriaService.criar(nome, descricao);
            console.log("✅ Categoria criada com sucesso. ID:", categoriaId);
            return categoriaId;
        } catch (error: any) {
            console.error("Erro ao criar categoria:", error.message);
        }
    }

    // Atualizar categoria existente
    static async atualizar(id: number, nome: string, descricao: string) {
        try {
            const atualizado = await CategoriaService.atualizar(id, nome, descricao);
            console.log("✅ Categoria atualizada com sucesso");
            return atualizado;
        } catch (error: any) {
            console.error("Erro ao atualizar categoria:", error.message);
        }
    }

    // Buscar todas as categorias
    static async listarTodas() {
        try {
            const categorias = await CategoriaService.listar();
            console.log("\n📂 Categorias disponíveis:");
            console.table(categorias);
            return categorias;
        } catch (error: any) {
            console.error("Erro ao listar categorias:", error.message);
        }
    }

    // Buscar categoria por ID
    static async buscarPorId(id: number) {
        try {
            const categoria = await CategoriaService.findById(id);
            if (categoria) {
                console.log("Categoria encontrada:");
                console.table([categoria]);
            } else {
                console.log("❌ Categoria não encontrada");
            }
            return categoria;
        } catch (error: any) {
            console.error("Erro ao buscar categoria:", error.message);
        }
    }

    // Buscar por Produto
    static async buscarPorProduto(produtoId: number) {
        try {
            const categorias = await CategoriaService.findByProduto(produtoId);
            if (categorias.length > 0) {
                console.log("Categorias encontradas para o produto:");
                console.table(categorias);
            }
            else {
                console.log("❌ Nenhuma categoria encontrada para esse produto");
            }
            return categorias;
        } catch (error: any) {
            console.error("Erro ao buscar categorias por produto:", error.message);
        }
    }

    // Deletar categoria
    static async deletar(id: number) {
        try {
            const result = await CategoriaService.deletar(id);
            console.log("✅ Categoria deletada com sucesso");
            return result;
        } catch (error: any) {
            console.error("Erro ao deletar categoria:", error.message);
        }
    }

    // Buscar por nome
    static async buscarPorNome(nome: string) {
        try {
            const categorias = await CategoriaService.findByNome(nome);
            if (categorias) {
                console.log("Categorias encontradas:");
                console.table(categorias);
            } else {
                console.log("❌ Nenhuma categoria encontrada com esse nome");
            }
            return categorias;
        } catch (error: any) {
            console.error("Erro ao buscar categoria por nome:", error.message);
        }
    }
}
