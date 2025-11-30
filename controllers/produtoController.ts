import { ProdutoService } from "../services/produtoService";
import { CategoriaService } from "../services/categoriaService";
import { ProdutoCategoriaService } from "../services/Produto_CategoriaService"
import { Produto } from "../models/modelProduto";
import { ProdutoRepository } from "../repository/produtoRepository";
import { CategoriaController } from "./categoriaController";

export class ProdutoController {

    // Criar Produto e vincular a uma categoria
    static async criar(nome: string, descricao: string, preco: number, estoque: number) {
        try {
            // 1. Criar o produto
            const produtoId = await ProdutoService.criar(nome, descricao, preco, estoque);
            console.log("✅ Produto criado com sucesso. ID:", produtoId)
            return produtoId;
        } catch (error: any) {
            console.error("Erro ao criar produto:", error.message);
        }
    }


    static async vincularCategoria(produtoId: number, ask: (question: string) => Promise<string>) {
        let continuar = "s";

        if (produtoId) {
            while (continuar.toLowerCase() === "s") {
                try {
                    const categoriaId = Number(await ask("Digite o ID da categoria para vincular: "));
                    const cate = await CategoriaController.buscarPorId(categoriaId);

                    if (!cate) {
                        console.log("❌ Categoria não encontrada.");
                    } else {
                        const relacao = await ProdutoCategoriaService.criar(produtoId, categoriaId);
                        console.log(`✅ Produto vinculado à categoria ${cate.nome} com sucesso. Relação ID: ${relacao}`);
                    }

                    continuar = await ask("Deseja vincular outra categoria? (s/n): ");
                } catch (error: any) {
                    console.error("Erro ao vincular categoria ao produto:", error.message);
                    continuar = "n";
                }
            }
        }
    }

    static async desvincularCategoria(produtoId: number, categoriaId: number) {
        try {
            const resultado = await ProdutoCategoriaService.deleteBy_Produto_Produto(produtoId, categoriaId);
            console.log("✅ Categoria desvinculada do produto com sucesso.");
            return resultado;
        }
        catch (error: any) {
            console.error("Erro ao desvincular categoria do produto:", error.message);
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
    ) {
        if (id) {
            try {
                const result = await ProdutoService.atualizar(id, nome, descricao, preco, estoque);
                console.log("✅ Produto atualizado com sucesso");



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
