export interface ppmodel{
    pedido_nome:string
    pedido_id:number
    produto_id:number
    quantidade:number
    valor_unitario:number
}

enum StatusPedido {
    ABERTO = "pedido em aberto",
    PENDENTE = "pedido em pendencia",
    FINALIZADO = "pedido concluido"
}

