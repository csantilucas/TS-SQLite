export interface Pedido{
    pedido_id:number,
    cliente_id:number,
    data_pedido:Date,
    status:string,
    valor_total:number

}

export interface PedidoComProdutos {
  pedido: {
    pedido_id: number;
    cliente_id: number;
    data_pedido: Date; 
    status: string;
    valor_total: number;
    cliente?: { nome: string };
  };
  produtos: {
    produto_id: number;
    nome: string;
    quantidade: number;
    preco_unitario: number;
  }[];
}

