// service do cliente

import { Cliente } from "../models/modelCliente";
import { ClienteRepository } from "../repository/clienteRepository";
import { compararSenha, hashSenha } from "../utils/cryptoHash";

export class ClienteService {

    static async criar(nome: string, email: string, senha: string, cpf: string, telefone: string):Promise<number>{

        if(!nome)throw new Error ("Dados ausentes (insira um nome)")
        if(!email)throw new Error ("Dados ausentes (isira uma email)")
        if(!senha)throw new Error ("Dados ausentes (isira uma senha)")
        if(!cpf)throw new Error ("Dados ausentes (isira um cpf)")
        if(!telefone)throw new Error ("Dados ausentes (isira um telefone)")
        
        const hash = hashSenha(senha)

        const clienteId = await ClienteRepository.create(nome, email, hash, cpf, telefone);
        return clienteId??0;
    }


    static async loginCliente(email: string, senha: string): Promise<Cliente> {
        const cliente = await ClienteRepository.findByEmail(email);
        if (!cliente) throw new Error("Cliente não encontrado");
    
        const valido = compararSenha(senha, cliente.senha);
        if (!valido) throw new Error("Senha incorreta");
    
        return cliente;
      }


}

//ClienteService.criar("João", "joao@email.com", "123456", "12345678900", "69999999999").then(res => console.log(res)).catch(erro =>{console.log(erro)})
ClienteService.loginCliente('joao@email.com','123456').then(res => console.table(res))
