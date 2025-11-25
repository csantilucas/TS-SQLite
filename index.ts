import readline from "readline";
import { ClienteController } from "./controllers/clienteControler";
import { ClienteService } from "./services/clienteService";

async function menuCliente() {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
    });

    function ask(question: string): Promise<string> {
        return new Promise((resolve) => rl.question(question, resolve));
    }

    let exit = false;


    let clienteId: number | null = null
    let clienteEmail: string | null = null
    let clienteEndereoco: number | null = null

    while (!exit) {
        console.log("\n=== MENU CLIENTE ===");
        console.log("1 - Criar Cliente");
        console.log("2 - Logar Cliente");
        console.log("3 - Atualizar Dados");
        console.log("4 - Atualizar Endereço");
        console.log("5 - Atualizar Senha");
        console.log("6 - Deletar Cliente");
        console.log("0 - Sair");

        const opcao = await ask("Escolha uma opção: ");



        switch (opcao) {
            case "1":
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
                if (id) {
                    clienteId = id.clienteId
                    clienteEmail = email;
                    clienteEndereoco = id.enderecoId
                }
                break;

            case "2":
                const emailLogin = await ask("Email: ");
                const senhaLogin = await ask("Senha: ");
                await ClienteController.logar(emailLogin, senhaLogin);
                break;

            case "3":
                const idAtualizar = Number(await ask("ID do cliente: "));
                const nomeAtualizar = await ask("Novo nome: ");
                const emailAtualizar = await ask("Novo email: ");
                const telefoneAtualizar = await ask("Novo telefone: ");
                await ClienteController.atualizarDados(idAtualizar, nomeAtualizar, emailAtualizar, telefoneAtualizar);
                break;

            case "4":
                const idEndereco = Number(await ask("ID do endereço: "));
                const clienteIdEndereco = Number(await ask("ID do cliente: "));
                const ruaAtualizar = await ask("Rua: ");
                const numeroAtualizar = await ask("Número: ");
                const cidadeAtualizar = await ask("Cidade: ");
                const estadoAtualizar = await ask("Estado: ");
                const cepAtualizar = await ask("CEP: ");
                await ClienteController.atualizarEndereco(idEndereco, clienteIdEndereco, ruaAtualizar, numeroAtualizar, cidadeAtualizar, estadoAtualizar, cepAtualizar);
                break;

            case "5":

                const emailSenha = await ask("Email: ");
                const novaSenha = await ask("Nova senha: ");

                // verficar sempre se o id do cliente esta vazio ou qualquer outro antes de inserir usando o id
                if (clienteId !== null) {
                    await ClienteController.atualizarSenha(clienteId, novaSenha, emailSenha);
                } else {
                    console.error("❌ Nenhum clienteId disponível. Crie ou logue um cliente primeiro.");
                }
                break;

            case "6":
                const emailDel = await ask("Email: ");
                const senhaDel = await ask("Senha: ");
                await ClienteController.deletarUsuario(emailDel, senhaDel);
                break;

            case "0":
                exit = true;
                console.log("Saindo...");
                break;

            default:
                console.log("❌ Opção inválida");
        }
    }

    rl.close();
}

// Executa o menu
menuCliente();
