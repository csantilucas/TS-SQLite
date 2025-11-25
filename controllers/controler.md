🔎 O que precisa ter no Controller
O Controller é a camada que orquestra as chamadas e mostra o resultado. Como você vai usar no terminal, o controller deve:

Receber parâmetros (ex.: cliente_id, produto_id).

Chamar o service.

Exibir resultados no console (console.log, console.table).

Tratar erros (try/catch) e mostrar mensagens amigáveis.

Exemplo de métodos no PedidoController:

criarPedido(cliente_id) → chama o service e imprime o ID do pedido criado.

listarPedidos() → chama o service e imprime todos os pedidos em tabela.

listarPedidosPorCliente(cliente_id) → imprime pedidos de um cliente.

adicionarProduto(pedido_id, produto_id, quantidade, preco_unitario) → imprime confirmação.

atualizarStatus(pedido_id, status) → imprime quantos registros foram alterados.

deletarPedido(pedido_id) → imprime confirmação de exclusão.