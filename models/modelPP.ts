export interface ppmodel {
  pedido_id: number;
  produto_id: number;
  nome: string;
  quantidade: number;
  preco_unitario: number; // não valor_unitario
}

export interface PedidoProdutoDetalhado {
  pedido_id: number;
  produto_id: number;
  nome: string;
  quantidade: number;
  preco_unitario: number; // não valor_unitario
}





export enum StatusPedido {
    Pendente = "pedido em pendencia de pagamento",
    Concluido= "pedido pago e finalizado"
}

