//importar os recursos necessarios
import { closeDB, getDB } from "./initDB"

/*
comandos usados

db.exec ->  executar create e update
db.run  ->  executar insert
db.all  ->  executar querys

*/


const tables = `
-- Tabela: Hospede
CREATE TABLE IF NOT EXISTS Hospede (
    hospede_id INTEGER PRIMARY KEY AUTOINCREMENT,
    nome TEXT NOT NULL,
    cpf TEXT UNIQUE NOT NULL,
    email TEXT UNIQUE NOT NULL,
    telefone TEXT,
    senha TEXT NOT NULL,
    data_cadastro DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Tabela: Quarto
CREATE TABLE IF NOT EXISTS Quarto (
    quarto_id INTEGER PRIMARY KEY AUTOINCREMENT,
    numero TEXT NOT NULL,
    tipo TEXT NOT NULL,
    capacidade INTEGER,
    preco_diaria REAL NOT NULL,
    status TEXT DEFAULT 'disponível'
);

-- Tabela: Reserva
CREATE TABLE IF NOT EXISTS Reserva (
    reserva_id INTEGER PRIMARY KEY AUTOINCREMENT,
    hospede_id INTEGER NOT NULL,
    quarto_id INTEGER NOT NULL,
    data_checkin DATE NOT NULL,
    data_checkout DATE NOT NULL,
    status TEXT DEFAULT 'ativa',
    FOREIGN KEY (hospede_id) REFERENCES Hospede(hospede_id),
    FOREIGN KEY (quarto_id) REFERENCES Quarto(quarto_id)
);

-- Tabela: Servico
CREATE TABLE IF NOT EXISTS Servico (
    servico_id INTEGER PRIMARY KEY AUTOINCREMENT,
    nome TEXT NOT NULL,
    descricao TEXT,
    preco REAL NOT NULL
);

-- Tabela: Reserva_Servico
CREATE TABLE IF NOT EXISTS Reserva_Servico (
    reserva_id INTEGER NOT NULL,
    servico_id INTEGER NOT NULL,
    quantidade INTEGER DEFAULT 1,
    PRIMARY KEY (reserva_id, servico_id),
    FOREIGN KEY (reserva_id) REFERENCES Reserva(reserva_id),
    FOREIGN KEY (servico_id) REFERENCES Servico(servico_id)
);

-- Tabela: logs
CREATE TABLE IF NOT EXISTS logs (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    usuario_id INTEGER NOT NULL,
    acao TEXT NOT NULL,
    data_hora DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (usuario_id) REFERENCES Hospede(hospede_id)
);
`;

async function createTables() {
    const db = await getDB();

    try {
        await db.exec(tables);
        console.log("Tabelas criadas com sucesso!");
    } catch (error) {
        console.error("Erro ao criar tabelas:", error);
    } finally {
        await closeDB();
    }
}

createTables();


