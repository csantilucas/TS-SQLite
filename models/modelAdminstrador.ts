// models/modelAdministrador.ts
export interface Administrador {
    administrador_id: number;
    nome: string;
    email: string;
    senha: string;
    criado_em?: string; // opcional, se tiver timestamp
}
