// service do cliente

import { error } from "console";
import { Cliente } from "../models/modelCliente";
import { ClienteRepository } from "../repository/clienteRepository";
import { compararSenha, hashSenha } from "../utils/cryptoHash";

export class ClienteService {


    //Criar Cliente

    static async criar(nome: string, email: string, senha: string, cpf: string, telefone: string): Promise<number> {

        const find = await ClienteRepository.findByEmail(email)
        if (find) {
            throw new Error("email ja cadastrado")
        }

        if (!nome) throw new Error("Dados ausentes (insira um nome)")
        if (!email) throw new Error("Dados ausentes (insira uma email)")
        if (!senha) throw new Error("Dados ausentes (insira uma senha)")
        if (!cpf) throw new Error("Dados ausentes (insira um cpf)")
        if (!telefone) throw new Error("Dados ausentes (insira um telefone)")

        const hash = hashSenha(senha)

        const clienteId = await ClienteRepository.create(nome, email, hash, cpf, telefone);
        return clienteId ?? 0;
    }


    //Update Cliente


    static async atualizar(id: number, nome: string, email: string, telefone: string): Promise<number> {

        const find = await ClienteRepository.findByEmail(email)
        if (!find) {
            throw new Error("Nenhum cadastro encontrado")
        }
        if (!id) throw new Error("Dados ausentes (insira id)")
        if (!nome) throw new Error("Dados ausentes (insira um nome)")
        if (!email) throw new Error("Dados ausentes (isira uma email)")
        if (!telefone) throw new Error("Dados ausentes (isira um telefone)")

        const cliente = await ClienteRepository.update(id, nome, email, telefone)
        return cliente
    }


    //atualizar senha
    static async atualizarSenha(id: number, senha: string, email: string): Promise<number> {
        if (!id) throw new Error("Dados ausentes (insira um id)");
        if (!senha) throw new Error("Dados ausentes (insira uma senha)");
        if (!email) throw new Error("Dados ausentes (insira um email)");

        const cliente = await ClienteRepository.findByEmail(email);
        if (!cliente) throw new Error("Cliente não encontrado");

        //criptografar antes de salvar
        const hash = hashSenha(senha);

        const update = await ClienteRepository.updatePassword(id, hash);
        return update;
    }



    //logar Cliente

    static async login(email: string, senha: string): Promise<Cliente> {
        const cliente = await ClienteRepository.findByEmail(email);
        if (!cliente) throw new Error("Cliente não encontrado");

        const senhaValida = compararSenha(senha, cliente.senha);
        if (!senhaValida) throw new Error("Senha incorreta");

        return cliente
    }

    //deletar cliente

    static async delete(email:string, senha:string):Promise<number >{

        const cliente = await ClienteRepository.findByEmail(email)
        if(!cliente) throw new Error ("Cliente nao encontrado")
        
        const senhaValida = compararSenha (senha, cliente.senha)
        if(!senhaValida) throw new Error ('senha incorreta')

        const update = await ClienteRepository.delete(cliente.cliente_id)
        return update 
    }


}

//ClienteService.criar("João", "joao@email.com", "123456", "12345678900", "69999999999").then(res => console.log(res)).catch(erro =>{console.log(erro)})
//ClienteService.login('joao@email.com','1234').then(res => console.table(res))
//ClienteService.atualizarSenha(3,'1234','joao@email.com')
// ClienteRepository.findByEmail('joao@email.com').then(res => console.log(res))

