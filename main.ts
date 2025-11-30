import { ClienteController } from "./controllers/clienteController";
import { ClienteService } from "./services/clienteService";
import { Cliente } from "./models/modelCliente";
import { Administrador } from "./models/modelAdminstrador";
import { ClienteRepository } from "./repository/clienteRepository";
import { AdministradorController } from "./controllers/admintradorControlle";
import { ProdutoController } from "./controllers/produtoController";
import { PedidoProdutoController } from "./controllers/Pedido_ProdutoControler";
import { ask, closeAsk } from "./utils/input";
import { EnderecoService } from "./services/enderecoService";
import { PedidoController } from "./controllers/pedidoContorller";
import { EnderecoController } from "./controllers/enderecoController";
import { CategoriaRepository } from "./repository/categoriaRepository";
import { CategoriaController } from "./controllers/categoriaController";
import { PedidoComProdutos } from "./models/modelPedido";


export async function menuCliente() {
    let exit = false;
    let cliente: Cliente | undefined = undefined
    let adm: Administrador | undefined = undefined

    while (!exit) {
        //cliente = ClienteController.logar("lucas@gmail.com", "12345")
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
                    console.log("5 - ver meus pedidos")
                    console.log("7 - ver meus endereços")
                    console.log("0 - voltar");

                    const opcao2 = await ask("Escolha uma opção: ");
                    switch (opcao2) {

                        case "1"://atualizar dados
                            console.log("\nSeus dados atuais:");
                            console.table(cliente)
                            const nomeAtualizar = await ask("Novo nome: ");
                            const emailAtualizar = await ask("Novo email: ");
                            const telefoneAtualizar = await ask("Novo telefone: ");
                            await ClienteController.atualizarDados(cliente.cliente_id, nomeAtualizar, emailAtualizar, telefoneAtualizar);
                            break;

                        case "2"://atulizar endereco
                            const enderecos = await EnderecoService.findByClienteId(cliente.cliente_id);
                            console.log("\nSeus endereços atuais:");
                            console.table(enderecos);
                            const idEndereco = Number(await ask("ID do endereço: "));
                            const ruaAtualizar = await ask("Rua: ");
                            const bairroAtualizar = await ask("Bairro: ");
                            const numeroAtualizar = await ask("Número: ");
                            const cepAtualizar = await ask("CEP: ");
                            const complemento = await ask("Complemento: ");
                            await ClienteController.atualizarEndereco(idEndereco, cliente.cliente_id, ruaAtualizar, numeroAtualizar, bairroAtualizar, cepAtualizar, complemento);
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

                        case "5"://ver pedidos
                            const pedidos = await PedidoController.buscarPorCliente(cliente.cliente_id);

                            if (pedidos && pedidos.length > 0) {
                                console.log(`Seus pedidos: total ${pedidos.length}\n`);

                                const tabela = pedidos.map(p => ({
                                    PedidoID: p.pedido.pedido_id,
                                    Data: p.pedido.data_pedido,
                                    Status: p.pedido.status,
                                    ValorTotal: p.pedido.valor_total,
                                    Produtos: p.produtos
                                        .map(prod =>
                                            `${prod.produto_id} (qtd: ${prod.quantidade}, preço: ${prod.valor_unitario})`
                                        )
                                        .join(", ")
                                }));

                                console.table(tabela);
                            } else {
                                console.log("❌ Você não possui pedidos.");
                            }
                            break;

                        case "7"://ver endereços
                            const meusEnderecos = await ClienteController.verEndereco(cliente.cliente_id);
                            console.log("\nSeus endereços atuais:");
                            console.table(meusEnderecos);
                            console.log("Deseja cadastrar mais um endereco?")
                            console.log("1 - sim")
                            console.log("0 - não")
                            const opcaoEnd = await ask("Escolha uma opção: ");
                            switch (opcaoEnd) {
                                case "1":
                                    const rua = await ask("Rua: ");
                                    const numero = await ask("Número: ");
                                    const bairro = await ask("Bairro: ");
                                    const complemento = await ask("Complemento: ");
                                    const cep = await ask("CEP: ");
                                    await EnderecoController.criar(cliente.cliente_id, rua, bairro, cep, numero, complemento);
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

                                    console.log("1 - criar pedido")
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

                                    console.log("1 - criar pedido")
                                    const opcao1 = await ask("Escolha uma opção: ");

                                    switch (opcao1) {

                                        case "1":
                                            await PedidoProdutoController.criarPedido(cliente.cliente_id, ask)
                                            break
                                    }
                                    break
                                case "3":// pelo nome
                                    let nomep = await ask("Produto: ")
                                    await ProdutoController.buscarPorNome(nomep)

                                    console.log("1 - criar pedido")
                                    const opcao2 = await ask("Escolha uma opção: ");

                                    switch (opcao2) {

                                        case "1":
                                            await PedidoProdutoController.criarPedido(cliente.cliente_id, ask)
                                            break
                                    }
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
                    break;
                case "2":// produtos

                    console.log("\n--------------------------------------produtos------------------------------------------\n")
                    console.log("1 - ver todos os produtos")
                    console.log("2 - listar por categoria")
                    console.log("3 - Procurar por nome do produto")

                    let opcao = await ask("Escolha uma opçao: ")
                    switch (opcao) {
                        case "1": // listar todos
                            await ProdutoController.listarTodos()

                            console.log("1 - criar pedido")
                            const opcao = await ask("Escolha uma opção: ");

                            switch (opcao) {

                                case "1":
                                    await PedidoProdutoController.criarPedido(cliente.cliente_id, ask)
                                    break
                            }


                            break
                        case "2":// pela categoria

                            let categorias = await CategoriaRepository.findAll();
                            console.log("\nCategorias disponíveis:\n");
                            let nc = categorias.map(cat => ({ Nome: cat.nome, Descricao: cat.descricao }));

                            console.table(nc);

                            let nomec = await ask("Categoria: ")
                            await ProdutoController.buscarPorCategoria(nomec)

                            console.log("1 - criar pedido")
                            const opcao1 = await ask("Escolha uma opção: ");

                            switch (opcao1) {

                                case "1":
                                    await PedidoProdutoController.criarPedido(cliente.cliente_id, ask)
                                    break
                            }
                            break
                        case "3":// pelo nome
                            let nomep = await ask("Produto: ")
                            await ProdutoController.buscarPorNome(nomep)

                            console.log("1 - criar pedido")
                            const opcao2 = await ask("Escolha uma opção: ");

                            switch (opcao2) {

                                case "1":
                                    await PedidoProdutoController.criarPedido(cliente.cliente_id, ask)
                                    break
                            }
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
            console.log("3 - Ver pedidos");
            console.log("4 - Ver categorias");
            console.log("5 - Ver administradores");
            console.log("0 - Logout");

            const opcao = await ask("Escolha uma opção: ");
            switch (opcao) {
                case "1"://ver todos os clientes
                    const clientes = await ClienteRepository.findAll();
                    console.log(`Total de clientes: ${clientes?.length}\n`);
                    console.table(clientes);
                    console.log("📋 Fim da lista de clientes.");
                    console.log("1 - Ver detalhes de um cliente");
                    const opcaoDetalhes = await ask("Escolha uma opção: ");
                    switch (opcaoDetalhes) {
                        case "1":
                            const clienteId = Number(await ask("ID do cliente: "));
                            const clienteDetalhes = await ClienteService.findById(clienteId);
                            if (clienteDetalhes) {
                                console.log("\nDetalhes do Cliente:");
                                console.table(clienteDetalhes);
                                const enderecos = await EnderecoService.findByClienteId(clienteId);
                                console.log("Endereços:");
                                console.table(enderecos);
                                const pedidos = await PedidoController.buscarPorCliente(clienteId);

                                if (pedidos && pedidos.length > 0) {
                                    console.log(`Pedidos do Cliente (total ${pedidos.length}):\n`);
                                    console.table(pedidos.map(p => ({ PedidoID: p.pedido.pedido_id, Data: p.pedido.data_pedido, })));
                                } else {
                                    console.log("❌ Este cliente não possui pedidos.");
                                }
                            }
                            else {
                                console.log("❌ Cliente não encontrado.");
                            }
                            break;
                    }


                    break;
                case "2"://ver todos os produtos
                    await ProdutoController.listarTodos();
                    console.log("1 - criar produto");
                    console.log("2 - apagar produto");
                    console.log("3 - excluir produto de uma categoria")
                    console.log("4 - desvincular categoria de um produto")
                    console.log("5 - vincular categoria a um produto")
                    console.log("6 - atualizar produto")

                    console.log("0 - voltar")
                    const opcaoProd = await ask("Escolha uma opção: ");
                    switch (opcaoProd) {
                        case "1"://criar produto

                            const nome = await ask("Nome do produto: ");
                            const descricao = await ask("Descrição do produto: ");
                            const preco = Number(await ask("Preço do produto: "));
                            const estoque = Number(await ask("Estoque do produto: "));

                            // lista categorias disponíveis
                            await CategoriaController.listarTodas();

                            // cria produto
                            const produtoId = await ProdutoController.criar(nome, descricao, preco, estoque);

                            // vincula categorias ao produto
                            if (produtoId)
                                await ProdutoController.vincularCategoria(produtoId, ask);

                            break;
                        case "2"://apagar produto
                            const idProd = Number(await ask("ID do produto: "));
                            await ProdutoController.deletar(idProd);
                            break;
                        case "3"://excluir produto de uma categoria

                            const idProduto = Number(await ask("ID do produto: "));
                            await CategoriaController.listarTodas();
                            const idCategoria = Number(await ask("ID da categoria: "));
                            console.log(`Desvinculando produto ${idProduto} da categoria ${idCategoria}...`);

                            await ProdutoController.desvincularCategoria(idProduto, idCategoria);
                            break;
                        case "4"://desvincular categoria de um produto
                            const idProdut = Number(await ask("ID do produto: "));
                            await CategoriaController.buscarPorProduto(idProdut);
                            const idCategori = Number(await ask("ID da categoria: "));
                            console.log(`Desvinculando categoria ${idCategori} do produto ${idProdut}...`);
                            break;

                        case "5"://vincular categoria a um produto
                            const idProdutov = Number(await ask("ID do produto: "));
                            await CategoriaController.listarTodas();
                            await ProdutoController.vincularCategoria(idProdutov, ask);
                            break;

                        case "6"://atualizar produto
                            const idProdutoa = Number(await ask("ID do produto: "));
                            const nomeAtualizar = await ask("Novo nome: ");
                            const descricaoAtualizar = await ask("Nova descrição: ");
                            const precoAtualizar = Number(await ask("Novo preço: "));
                            const estoqueAtualizar = Number(await ask("Novo estoque: "));
                            await ProdutoController.atualizar(idProdutoa, nomeAtualizar, descricaoAtualizar, precoAtualizar, estoqueAtualizar);
                            break;
                        case "0"://sair
                            console.log("voltando...");
                            break;
                    }
                    break;
                case "3"://ver todos os pedidos
                    const todoPedidos = await PedidoController.listarTodos();
                    console.log(`\nTotal de pedidos: ${todoPedidos?.length ?? 0}\n`);

                    await Promise.all(
                        todoPedidos.map(async (p: PedidoComProdutos) => {
                            const cliente = await ClienteService.findById(p.pedido.cliente_id);
                            const nomeCliente = cliente?.nome ?? "N/A";

                            console.log(
                                `Pedido ID: ${p.pedido.pedido_id} | Cliente: ${nomeCliente} | Data: ${p.pedido.data_pedido} | Status: ${p.pedido.status} | Valor Total: ${p.pedido.valor_total}`
                            );

                            console.table(
                                p.produtos.map(prod => ({
                                    ProdutoID: prod.produto_id,
                                    Nome: prod.nome,
                                    Quantidade: prod.quantidade,
                                    PreçoUnitario: prod.preco_unitario
                                }))
                            );
                        })
                    );


                    console.log("📋 Fim da lista de pedidos.");

                    break;
                case "4"://ver categorias
                    const categorias = await CategoriaRepository.findAll();
                    console.log(`\nTotal de categorias: ${categorias?.length}\n`);
                    console.table(categorias);

                    console.log("\n1 - criar categoria");
                    console.log("2 - apagar categoria");
                    console.log("0 - voltar\n")
                    const opcaoCat = await ask("Escolha uma opção: ");
                    switch (opcaoCat) {
                        case "1"://criar categoria
                            const nome = await ask("Nome da categoria: ");
                            const descricao = await ask("Descrição da categoria: ");
                            await CategoriaController.criar(nome, descricao);
                            break;
                        case "2"://apagar categoria}
                            const idCat = Number(await ask("ID da categoria: "));
                            await CategoriaController.deletar(idCat);
                            break;
                        case "0"://sair
                            console.log("voltando...");
                            break;
                    }
                    break;
                case "5"://ver administradores
                    await AdministradorController.listarTodos();

                    console.log("1 - criar administrador");
                    console.log("2 - apagar administrador");
                    console.log("0 - voltar")
                    const opcaoAdm = await ask("Escolha uma opção: ");
                    switch (opcaoAdm) {
                        case "1"://criar adm
                            const nome = await ask("Nome: ");
                            const email = await ask("Email: ");
                            const senha = await ask("Senha: ");
                            await AdministradorController.criar(nome, email, senha);
                            break;
                        case "2"://apagar adm
                            console.log("⚠️ Atenção: Para apagar um administrador, você precisa do email dele.");
                            console.log("Certifique-se de que o email está correto antes de prosseguir.");
                            const emailadm = await ask("Email do administrador: ");
                            await AdministradorController.deletePorId(emailadm);
                            break;

                        case "0"://sair
                            console.log("Logout administrador realizado");
                            adm = undefined;
                            break;
                        default:
                            console.log("❌ Opção inválida");
                            break;
                    }

                    break;
            }
        }
    }
    closeAsk()
}