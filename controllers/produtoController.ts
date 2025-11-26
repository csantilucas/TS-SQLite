import { ProdutoService } from "../services/produtoService";

export class ProdutoController {

    // Criar Produto
    static async criar(nome: string, descricao: string, preco: number, estoque: number,) {
        try {
            const produtoId = await ProdutoService.criar(nome, descricao, preco, estoque);
            console.log("✅ Produto criado com sucesso. ID:", produtoId);
            return produtoId;
        } catch (error: any) {
            console.error("Erro ao criar produto:", error.message);
        }
    }

    // Listar todos os produtos
    static async listarTodos() {
        try {
            const produtos = await ProdutoService.listar
            console.table(produtos);
            return produtos;
        } catch (error: any) {
            console.error("Erro ao listar produtos:", error.message);
        }
    }

    // Buscar produto por ID
    static async buscarPorId(id: number| undefined) {
       if (id){
         try {
            const produto = await ProdutoService.findById(id);
            if (!produto) {
                console.log("Produto não encontrado");
                return;
            }
            console.log("Produto encontrado:", produto);
            return produto;
        } catch (error: any) {
            console.error("Erro ao buscar produto:", error.message);
        }
       }
    }

    // Atualizar produto
    static async atualizar(id: number | undefined, nome: string, descricao: string, preco: number, estoque: number) {
        if (id){
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
      if(id){
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
