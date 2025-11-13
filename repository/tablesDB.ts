//importar os recursos necessarios
import { closeDB, getDB } from "./initDB"

/*
comandos usados

db.exec ->  executar create e update
db.run  ->  executar insert
db.all  ->  executar querys

*/


//funcao para criar as tabelas
async function createTables() {
    const db = await getDB()

    try {
        await db.exec(
            `
            -- Tabela: Hospede
CREATE TABLE Hospede (
    hospede_id INTEGER PRIMARY KEY AUTOINCREMENT,
    nome TEXT NOT NULL,
    cpf TEXT UNIQUE NOT NULL,
    email TEXT UNIQUE NOT NULL,
    telefone TEXT,
    senha TEXT NOT NULL,
    data_cadastro DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Tabela: Quarto
CREATE TABLE Quarto (
    quarto_id INTEGER PRIMARY KEY AUTOINCREMENT,
    numero TEXT NOT NULL,
    tipo TEXT NOT NULL, -- ex: solteiro, casal, suíte
    capacidade INTEGER,
    preco_diaria REAL NOT NULL,
    status TEXT DEFAULT 'disponível'
);

-- Tabela: Reserva (1:N com Hospede)
CREATE TABLE Reserva (
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
CREATE TABLE Servico (
    servico_id INTEGER PRIMARY KEY AUTOINCREMENT,
    nome TEXT NOT NULL,
    descricao TEXT,
    preco REAL NOT NULL
);

-- Tabela: Reserva_Servico (N:N entre Reserva e Servico)
CREATE TABLE Reserva_Servico (
    reserva_id INTEGER NOT NULL,
    servico_id INTEGER NOT NULL,
    quantidade INTEGER DEFAULT 1,
    PRIMARY KEY (reserva_id, servico_id),
    FOREIGN KEY (reserva_id) REFERENCES Reserva(reserva_id),
    FOREIGN KEY (servico_id) REFERENCES Servico(servico_id)
);


CREATE TABLE logs (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    usuario_id INTEGER NOT NULL,
    acao TEXT NOT NULL,
    data_hora DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (usuario_id) REFERENCES Usuario(user_id)
);
            `
        )
    }
    catch (error) { console.error }

    closeDB()
}


createTables()

