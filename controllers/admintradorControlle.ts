import { AdministradorService } from "../services/adminstradorService";

export class AdministradorController {

    // Criar Administrador
    static async criar(nome: string, email: string, senha: string) {
        try {
            const adminId = await AdministradorService.criar(nome, email, senha);
            console.log("Administrador criado com sucesso. ID:", adminId);
            return { adminId };
        } catch (error: any) {
            console.error("Erro ao criar administrador:", error.message);
        }
    }

    // Logar Administrador
    static async logar(email: string, senha: string) {
        try {
            const admin = await AdministradorService.login(email, senha);
            if (admin) {
                console.log("Login realizado com sucesso");
                return admin;
            }
        } catch (error: any) {
            console.error("Erro ao logar administrador:", error.message);
        }
    }

    // Atualizar dados
    static async atualizarDados(id: number | undefined, nome: string, email: string) {
        if (id !== undefined) {
            try {
                await AdministradorService.atualizar(id, nome, email);
                console.log("Dados do administrador atualizados com sucesso");
            } catch (error: any) {
                console.error("Erro ao atualizar dados:", error.message);
            }
        }
    }

    // Atualizar senha
    static async atualizarSenha(id: number | undefined, senha: string, email: string) {
        if (id !== undefined) {
            try {
                await AdministradorService.atualizarSenha(id, senha, email);
                console.log("Senha atualizada com sucesso");
            } catch (error: any) {
                console.error("Erro ao atualizar senha:", error.message);
            }
        }
    }

    // Deletar Administrador
    static async deletarUsuario(email: string, senha: string) {
        try {
            const adm = await AdministradorService.findByEmail(email);
            if (!adm) {
                console.error("Administrador não encontrado");
                return;
            }
            const result = await AdministradorService.delete(senha);
            if (result) {
                console.log("Administrador deletado com sucesso");
            }
        } catch (error: any) {
            console.error("Erro ao deletar administrador:", error.message);
        }
    }

    // Listar todos
    static async listarTodos() {
        try {
            const admins = await AdministradorService.findAll();
            console.table(admins);
            return admins;
        } catch (error: any) {
            console.error("Erro ao listar administradores:", error.message);
        }
    }

    // Buscar por ID
    static async buscarPorId(id: number) {
        try {
            const admin = await AdministradorService.findById(id);
            console.log("Administrador encontrado:", admin);
            return admin;
        } catch (error: any) {
            console.error("Erro ao buscar administrador:", error.message);
        }
    }

    static async buscarPorEmail(email: string) {
        try {
            const admin = await AdministradorService.findByEmail(email);
            console.log("Administrador encontrado:", admin);
            return admin;
        } catch (error: any) {
            console.error("Erro ao buscar administrador:", error.message);
        }
    }

    static async deletePorId(email: string) {
        try {
            const result = await AdministradorService.delete(email);;
            if (result) {
                console.log("Administrador deletado com sucesso");
            }
        } catch (error: any) {
            console.error("Erro ao deletar administrador:", error.message);
        }
    }

}


AdministradorController.criar("ADM","adm@gmail.com","1234")
