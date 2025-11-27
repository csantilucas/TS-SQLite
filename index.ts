import readline from "readline";
import { ClienteController } from "./controllers/clienteController";
import { ClienteService } from "./services/clienteService";
import { Cliente } from "./models/modelCliente";
import { Administrador } from "./models/modelAdminstrador";
import { ClienteRepository } from "./repository/clienteRepository";
import { AdministradorController } from "./controllers/admintradorControlle";
import { ProdutoController } from "./controllers/produtoController";
import { PedidoProdutoController } from "./controllers/ppController";
import { ask, closeAsk } from "./utils/input";


async function menuCliente() {
    let exit = false;
    let cliente: Cliente | undefined = undefined
    let adm: Administrador | undefined = undefined

    while (!exit) {

        if (!cliente && !adm) {// nenhum logado

            console.log("\n=== MENU CLIENTE ===");
            console.log("1 - Logar");
            console.log("2 - logar adm")
            console.log("3 - Crir login");

            const opcao = await ask("Escolha uma opção: ");

            switch (opcao) {//submenu Login
                case "1"://logar
                    const emailLogin = await ask("Email: ");
                    const senhaLogin = await ask("Senha: ");
                    cliente = await ClienteController.logar(emailLogin, senhaLogin)
                    break

                case "2"://logar adm
                    const Email = await ask("Email: ");
                    const Senha = await ask("Senha: ");
                    adm = await AdministradorController.logar(Email, Senha)
                    break

                case "3"://criar
                    const nome = await ask("Nome: ");
                    const email = await ask("Email: ");
                    const senha = await ask("Senha: ");
                    const cpf = await ask("CPF: ");
                    const telefone = await ask("Telefone: ");
                    const rua = await ask("Rua: ");
                    const numero = await ask("Número: ");
                    const cidade = await ask("Cidade: ");
                    const estado = await ask("Estado: ");
                    const cep = await ask("CEP: ");
                    const id = await ClienteController.criar(nome, email, senha, cpf, telefone, rua, numero, cidade, estado, cep);
                    if (id && id.clienteId) {
                        // clienteId = id.clienteId
                        // clienteEmail = email;
                        // clienteEndereoco = id.enderecoId
                        cliente = await ClienteService.findById(id.clienteId)
                    }
                    break;
            }

        } else if (cliente && !adm) {//cliente
            //menu
            console.log("1 - meus dados");
            console.log("2 - ver produtos");
            console.log("0 - Sair");
            const opcao1 = await ask("Escolha uma opção: ");

            switch (opcao1) {//submenu
                case "1"://meu dados
                    console.log("1 - Atualizar Dados");
                    console.log("2 - Atualizar Endereço");
                    console.log("3 - Atulizar Senha")
                    console.log("4 - Apagar conta")
                    console.log("0 - voltar");

                    const opcao2 = await ask("Escolha uma opção: ");
                    switch (opcao2) {

                        case "1"://atualizar dados
                            const nomeAtualizar = await ask("Novo nome: ");
                            const emailAtualizar = await ask("Novo email: ");
                            const telefoneAtualizar = await ask("Novo telefone: ");
                            await ClienteController.atualizarDados(cliente.cliente_id, nomeAtualizar, emailAtualizar, telefoneAtualizar);
                            break;

                        case "2"://atulizar endereco
                            const idEndereco = Number(await ask("ID do endereço: "));
                            const clienteIdEndereco = Number(await ask("ID do cliente: "));
                            const ruaAtualizar = await ask("Rua: ");
                            const numeroAtualizar = await ask("Número: ");
                            const cidadeAtualizar = await ask("Cidade: ");
                            const estadoAtualizar = await ask("Estado: ");
                            const cepAtualizar = await ask("CEP: ");
                            await ClienteController.atualizarEndereco(idEndereco, cliente.cliente_id, ruaAtualizar, numeroAtualizar, cidadeAtualizar, estadoAtualizar, cepAtualizar);
                            break;

                        case "3"://Atualizar senha
                            const emailSenha = await ask("Email: ");
                            const novaSenha = await ask("Nova senha: ");
                            await ClienteController.atualizarSenha(cliente.cliente_id, novaSenha, emailSenha);
                            break;

                        case "4"://apagar usuario
                            const senhaDel = await ask("Senha: ");
                            await ClienteController.deletarUsuario(cliente.email, senhaDel);
                            console.log("✅ Conta apagada com sucesso... saindo")
                            cliente = undefined
                            break;
                        case "0"://sair

                            console.log("voltando...");
                            break;
                    }
                    break

                case "2":// produtos

                    console.log("\n--------------------------------------produtos------------------------------------------")
                    console.log("1 - ver todos os produtos")
                    console.log("2 - listar por categoria")
                    console.log("3 - Procurar por nome do produto")

                    let opcao = await ask("Escolha uma opçao: ")
                    switch (opcao) {
                        case "1": // listar todos
                            await ProdutoController.listarTodos()

                            console.log("1 - cria pedido")
                            const opcao = await ask("Escolha uma opção: ");

                            switch (opcao) {

                                case "1":
                                    await PedidoProdutoController.criarPedido(cliente.cliente_id, ask)
                                    break
                            }


                            break


                        case "2":// pela categoria
                            let nomec = await ask("Categoria: ")
                            await ProdutoController.buscarPorCategoria(nomec)
                            break
                        case "3":// pelo nome
                            let nomep = await ask("Produto: ")
                            await ProdutoController.buscarPorNome(nomep)
                            break
                    }
                    break

                case "0"://sair
                    console.log("Logof...");
                    cliente = undefined


                    break;

                default:
                    console.log("❌ Opção inválida");
            }
        } else if (adm && !cliente) {
            console.log("\n=== MENU ADMINISTRADOR ===");
            console.log("1 - Ver todos os clientes");
            console.log("2 - Ver produtos");
            console.log("0 - Logout");

            const opcao = await ask("Escolha uma opção: ");
            switch (opcao) {
                case "1":
                    const clientes = await ClienteRepository.findAll();
                    console.table(clientes);
                    break;

                case "2":
                    console.log("📦 Em breve: listagem de produtos");
                    break;

                case "0":
                    console.log("Logout administrador realizado");
                    adm = undefined;
                    break;

                default:
                    console.log("❌ Opção inválida");
            }
        }
    }
    closeAsk()
}

// Executa o menu
menuCliente();
