O Service é a camada de regra de negócio. Ele não fala com o usuário diretamente, apenas organiza a lógica e chama o Repository. No seu caso, o PedidoService deve ter:

Métodos de criação

criarPedido(cliente_id) → chama o repository para criar um pedido com status inicial e valor 0.

adicionarProduto(pedido_id, produto_id, quantidade, preco_unitario) → chama o ppRepository para inserir itens.

Métodos de leitura

listarPedidos() → retorna todos os pedidos.

listarPedidosPorCliente(cliente_id) → retorna pedidos de um cliente específico.

(Opcional) listarProdutosDoPedido(pedido_id) → retorna os itens de um pedido.

Métodos de atualização

atualizarStatus(pedido_id, status) → altera o status do pedido.

(Opcional) atualizarProduto(pedido_id, produto_id, quantidade, preco_unitario) → altera itens do pedido.

Métodos de exclusão

deletarPedido(pedido_id) → remove o pedido.

removerProduto(pedido_id, produto_id) → remove um item do pedido.

👉 O service também pode validar regras, por exemplo:

Não permitir criar pedido se o cliente não existir.

Não permitir adicionar produto se não houver estoque.

Garantir que o status só pode ser alterado para valores válidos (aberto, pago, cancelado).