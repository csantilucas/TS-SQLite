// service do administrador
import { Administrador } from "../models/modelAdminstrador";
import { AdministradorRepository } from "../repository/adminstradorRepository";
import { compararSenha, hashSenha } from "../utils/cryptoHash";

export class AdministradorService {

    // Criar Administrador
    static async criar(nome: string, email: string, senha: string): Promise<number> {
        const find = await AdministradorRepository.findByEmail(email);
        if (find) {
            throw new Error("Email já cadastrado");
        }

        if (!nome) throw new Error("Dados ausentes (insira um nome)");
        if (!email) throw new Error("Dados ausentes (insira um email)");
        if (!senha) throw new Error("Dados ausentes (insira uma senha)");

        const hash = hashSenha(senha);

        const adminId = await AdministradorRepository.create(nome, email, hash);
        return adminId ?? 0;
    }

    // READ
    static async findByEmail(email: string): Promise<Administrador | undefined> {
        if (!email) throw new Error("Dados ausentes (insira um email)");
        return AdministradorRepository.findByEmail(email);
    }

    static async findById(id: number): Promise<Administrador | undefined> {
        if (!id) throw new Error("Dados ausentes (insira um id)");
        return AdministradorRepository.findByID(id);
    }

    static async findAll(): Promise<Administrador[]> {
        return AdministradorRepository.findAll();
    }

    // UPDATE
    static async atualizar(id: number, nome: string, email: string): Promise<number> {
        if (!id) throw new Error("Dados ausentes (insira um id)");
        if (!nome) throw new Error("Dados ausentes (insira um nome)");
        if (!email) throw new Error("Dados ausentes (insira um email)");

        const admin = await AdministradorRepository.update(id, nome, email);
        return admin;
    }

    // Atualizar senha
    static async atualizarSenha(id: number, senha: string, email: string): Promise<number> {
        if (!id) throw new Error("Dados ausentes (insira um id)");
        if (!senha) throw new Error("Dados ausentes (insira uma senha)");
        if (!email) throw new Error("Dados ausentes (insira um email)");

        const admin = await AdministradorRepository.findByEmail(email);
        if (!admin) throw new Error("Administrador não encontrado");

        const hash = hashSenha(senha);
        const update = await AdministradorRepository.updateSenha(id, hash);
        return update;
    }

    // Login
    static async login(email: string, senha: string): Promise<Administrador> {
        const admin = await AdministradorRepository.findByEmail(email);
        if (!admin) throw new Error("Administrador não encontrado");

        const senhaValida = compararSenha(senha, admin.senha);
        if (!senhaValida) throw new Error("Senha incorreta");

        return admin;
    }

    // Delete
    static async delete(email: string): Promise<number> {
        const admin = await AdministradorRepository.findByEmail(email);
        if (!admin) throw new Error("Administrador não encontrado");
        const update = await AdministradorRepository.delete(admin.administrador_id);
        return update;
    }
}
