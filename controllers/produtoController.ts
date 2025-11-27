import { ProdutoService } from "../services/produtoService";
import { CategoriaService } from "../services/categoriaService";
import { ProdutoCategoriaService } from "../services/pcService"
import { Produto } from "../models/modelProduto";
import { ProdutoRepository } from "../repository/produtoRepository";

export class ProdutoController {

    // Criar Produto e vincular a uma categoria
    static async criar(nome: string, descricao: string, preco: number, estoque: number, categoriaId: number) {
        try {
            // cria o produto
            const produtoId = await ProdutoService.criar(nome, descricao, preco, estoque);
            console.log("✅ Produto criado com sucesso. ID:", produtoId);

            // valida se a categoria existe
            const categoria = await CategoriaService.findById(categoriaId);
            if (!categoria) {
                console.log("❌ Categoria não encontrada");
                return;
            }

            // vincula produto à categoria
            await ProdutoCategoriaService.criar(produtoId, categoriaId);
            console.log(`✅ Produto ${produtoId} vinculado à categoria ${categoria.nome}`);

            return produtoId;
        } catch (error: any) {
            console.error("Erro ao criar produto:", error.message);
        }
    }

    // Listar todos os produtos
    static async listarTodos() {
        try {
            const produtos = await ProdutoService.listar();
            console.table(produtos);
            return produtos;
        } catch (error: any) {
            console.error("Erro ao listar produtos:", error.message);
        }
    }

    // Buscar produto por ID (inclui categorias vinculadas)
    static async buscarPorId(id: number | undefined) {
        if (id) {
            try {
                const produto = await ProdutoService.findById(id);
                if (!produto) {
                    console.log("Produto não encontrado");
                    return;
                }

                // buscar categorias vinculadas
                const categorias = await ProdutoCategoriaService.categoriasDoProduto(id);
                console.log("Produto encontrado:", produto);
                

                return { produto, categorias };
            } catch (error: any) {
                console.error("Erro ao buscar produto:", error.message);
            }
        }
    }

    // Buscar produto por nome

    static async buscarPorNome(nome: string) {
        if (nome) {
            try {
                const produtos = await ProdutoService.findByNome(nome);
                if (!produtos || produtos.length === 0) {
                    console.log("❌ Nenhum produto encontrado");
                    return [];
                }

                console.log("Produtos encontrados:");
                console.table(produtos);
                return produtos;
            } catch (error: any) {
                console.error("Erro ao buscar produto:", error.message);
            }
        }
    }



    //buscar produtos por categoira
    static async buscarPorCategoria(nome: string) {
        const categoria = await CategoriaService.findByNome(nome);
        if (categoria) {
            // chama o repository corretamente
            const produtos = await ProdutoRepository.findByCategora(categoria.categoria_id);
            return console.table(produtos)
        } else {
            console.log("❌ Categoria não encontrada");
            return [];
        }
    }


    // Atualizar produto e vincular nova categoria
    static async atualizar(
        id: number | undefined,
        nome: string,
        descricao: string,
        preco: number,
        estoque: number,
        categoriaId: number
    ) {
        if (id) {
            try {
                const result = await ProdutoService.atualizar(id, nome, descricao, preco, estoque);
                console.log("✅ Produto atualizado com sucesso");

                // vincula novamente à categoria (se necessário)
                await ProdutoCategoriaService.criar(id, categoriaId);
                console.log(`✅ Produto ${id} vinculado à categoria ${categoriaId}`);

                return result;
            } catch (error: any) {
                console.error("Erro ao atualizar produto:", error.message);
            }
        }
    }

    // Deletar produto
    static async deletar(id: number | undefined) {
        if (id) {
            try {
                const result = await ProdutoService.delete(id);
                console.log("✅ Produto deletado com sucesso");
                return result;
            } catch (error: any) {
                console.error("Erro ao deletar produto:", error.message);
            }
        }
    }
}
