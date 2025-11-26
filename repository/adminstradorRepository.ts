/*
comandos usados

db.exec ->  executar create 
db.run  ->  executar insert e update
db.all  ->  executar querys

*/

// import recursos necessários
import { Administrador } from "../models/modelAdminstrador";
import { getDB } from "../database/initDB";

// CRUD PARA administrador
export class AdministradorRepository {

    // CREATE
    static async create(nome: string, email: string, senha: string): Promise<number> {
        const db = await getDB();
        const result = await db.run(
            `INSERT INTO Administrador(nome, email, senha) VALUES(?,?,?)`,
            [nome, email, senha]
        );
        return result.lastID ?? 0;
    }

    // READ - todos
    static async findAll(): Promise<Administrador[]> {
        const db = await getDB();
        return await db.all(`SELECT * FROM Administrador`);
    }

    // READ - por ID
    static async findByID(id: number): Promise<Administrador | undefined> {
        const db = await getDB();
        return await db.get(`SELECT * FROM Administrador WHERE administrador_id = ?`, [id]);
    }

    // READ - por email
    static async findByEmail(email: string): Promise<Administrador | undefined> {
        const db = await getDB();
        return await db.get(`SELECT * FROM Administrador WHERE email = ?`, [email]);
    }

    // UPDATE
    static async update(id: number, nome: string, email: string): Promise<number> {
        const db = await getDB();
        const result = await db.run(
            `UPDATE Administrador SET nome=?, email=? WHERE administrador_id=?`,
            [nome, email, id]
        );
        return result.changes ?? 0;
    }

    // UPDATE senha
    static async updateSenha(id: number, senha: string): Promise<number> {
        const db = await getDB();
        const result = await db.run(
            `UPDATE Administrador SET senha=? WHERE administrador_id=?`,
            [senha, id]
        );
        return result.changes ?? 0;
    }

    // DELETE
    static async delete(id: number): Promise<number> {
        const db = await getDB();
        const result = await db.run(
            `DELETE FROM Administrador WHERE administrador_id=?`,
            [id]
        );
        return result.changes ?? 0;
    }
}
