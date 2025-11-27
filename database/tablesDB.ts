//importar os recursos necessarios
import { closeDB, getDB } from "./initDB"

/*
comandos usados

db.exec ->  executar create 
db.run  ->  executar insert e update
db.all  ->  executar querys

*/


const tables = `

-- Tabela de Administradores
CREATE TABLE administrador (
    administrador_id INTEGER PRIMARY KEY AUTOINCREMENT,
    nome TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    senha TEXT NOT NULL,
    criado_em DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Tabela de Log
CREATE TABLE log_administrador (
    log_id INTEGER PRIMARY KEY AUTOINCREMENT,
    administrador_id INTEGER,
    acao TEXT,
    data DATETIME DEFAULT CURRENT_TIMESTAMP,
    detalhes TEXT,
    FOREIGN KEY (administrador_id) REFERENCES administrador(administrador_id)
);


-- Tabela: Endereco
CREATE TABLE IF NOT EXISTS Endereco (
    endereco_id INTEGER PRIMARY KEY AUTOINCREMENT,
    cliente_id INTEGER NOT NULL,
    rua TEXT NOT NULL,
    bairro TEXT NOT NULL,
    cep TEXT UNIQUE,
    numero TEXT NOT NULL,
    complemento TEXT,
    FOREIGN KEY (cliente_id) REFERENCES Cliente(cliente_id)
);


-- Tabela: Cliente
CREATE TABLE IF NOT EXISTS Cliente (
    cliente_id INTEGER PRIMARY KEY AUTOINCREMENT,
    nome TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    cpf TEXT UNIQUE,
    telefone TEXT,
    senha TEXT NOT NULL,
    data_cadastro DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Tabela: Pedido
CREATE TABLE IF NOT EXISTS Pedido (
    pedido_id INTEGER PRIMARY KEY AUTOINCREMENT,
    cliente_id INTEGER NOT NULL,
    data_pedido DATETIME DEFAULT CURRENT_TIMESTAMP,
    status TEXT DEFAULT 'aberto',
    valor_total REAL DEFAULT 0,
    FOREIGN KEY (cliente_id) REFERENCES Cliente(cliente_id)
);

-- Tabela: Produto
CREATE TABLE IF NOT EXISTS Produto (
    produto_id INTEGER PRIMARY KEY AUTOINCREMENT,
    nome TEXT NOT NULL,
    descricao TEXT,
    preco REAL NOT NULL,
    estoque INTEGER DEFAULT 0
);

-- Tabela: Categoria
CREATE TABLE IF NOT EXISTS Categoria (
    categoria_id INTEGER PRIMARY KEY AUTOINCREMENT,
    nome TEXT NOT NULL UNIQUE,
    descricao TEXT
);


-- Tabela:Produto_categoria
CREATE TABLE IF NOT EXISTS Produto_Categoria (
    produto_id INTEGER NOT NULL,
    categoria_id INTEGER NOT NULL,
    PRIMARY KEY (produto_id, categoria_id),
    FOREIGN KEY (produto_id) REFERENCES Produto(produto_id),
    FOREIGN KEY (categoria_id) REFERENCES Categoria(categoria_id)
);


-- Tabela: Pedido_produto

CREATE TABLE IF NOT EXISTS Pedido_Produto (
    pedido_id INTEGER NOT NULL,
    produto_id INTEGER NOT NULL,
    quantidade INTEGER DEFAULT 1,
    preco_unitario REAL NOT NULL,
    PRIMARY KEY (pedido_id, produto_id),
    FOREIGN KEY (pedido_id) REFERENCES Pedido(pedido_id),
    FOREIGN KEY (produto_id) REFERENCES Produto(produto_id)
);

-- Tabela: logs
CREATE TABLE IF NOT EXISTS logs (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    usuario_id INTEGER NOT NULL,
    acao TEXT NOT NULL,
    data_hora DATETIME DEFAULT CURRENT_TIMESTAMP
);


-- Trigger para diminuir estoque ao inserir um item no pedido
CREATE TRIGGER atualizar_estoque_depois_insert
AFTER INSERT ON PedidoItem
FOR EACH ROW
BEGIN
    UPDATE Produto
    SET estoque = estoque - NEW.quantidade
    WHERE produto_id = NEW.produto_id;
END;

-- Trigger para restaurar estoque ao deletar item do pedido
CREATE TRIGGER restaurar_estoque_depois_delete
AFTER DELETE ON PedidoItem
FOR EACH ROW
BEGIN
    UPDATE Produto
    SET estoque = estoque + OLD.quantidade
    WHERE produto_id = OLD.produto_id;
END;


`;
const triggers =`

-- ===========================
-- TRIGGERS PARA CLIENTE
-- ===========================

-- Log de novo cliente
CREATE TRIGGER IF NOT EXISTS log_insert_cliente
AFTER INSERT ON Cliente
BEGIN
    INSERT INTO logs (usuario_id, acao)
    VALUES (NEW.cliente_id, 'INSERT em Cliente: nome=' || NEW.nome || ', email=' || NEW.email);
END;

-- Log de update no Cliente
CREATE TRIGGER IF NOT EXISTS log_update_cliente
AFTER UPDATE ON Cliente
BEGIN 
    INSERT INTO logs (usuario_id, acao)
    VALUES (
        NEW.cliente_id,
        'UPDATE em Cliente: nome antigo=' || OLD.nome || ', novo nome=' || NEW.nome ||
        ', email antigo=' || OLD.email || ', novo email=' || NEW.email
    );
END;

-- Log de delete no Cliente
CREATE TRIGGER IF NOT EXISTS log_delete_cliente
AFTER DELETE ON Cliente
BEGIN
    INSERT INTO logs (usuario_id, acao)
    VALUES (OLD.cliente_id, 'DELETE em Cliente: nome=' || OLD.nome || ', email=' || OLD.email);
END;

-- ===========================
-- TRIGGERS PARA ENDERECO
-- ===========================

CREATE TRIGGER IF NOT EXISTS log_insert_endereco
AFTER INSERT ON Endereco
BEGIN
    INSERT INTO logs (usuario_id, acao)
    VALUES (NEW.cliente_id, 'INSERT em Endereco: rua=' || NEW.rua || ', numero=' || NEW.numero);
END;

CREATE TRIGGER IF NOT EXISTS log_delete_endereco
AFTER DELETE ON Endereco
BEGIN
    INSERT INTO logs (usuario_id, acao)
    VALUES (OLD.cliente_id, 'DELETE em Endereco: rua=' || OLD.rua || ', numero=' || OLD.numero);
END;

-- ===========================
-- TRIGGERS PARA PRODUTO
-- ===========================

CREATE TRIGGER IF NOT EXISTS log_insert_produto
AFTER INSERT ON Produto
BEGIN
    INSERT INTO logs (usuario_id, acao)
    VALUES (0, 'INSERT em Produto: nome=' || NEW.nome || ', preco=' || NEW.preco);
END;

CREATE TRIGGER IF NOT EXISTS log_update_produto
AFTER UPDATE ON Produto
BEGIN
    INSERT INTO logs (usuario_id, acao)
    VALUES (0, 'UPDATE em Produto: nome antigo=' || OLD.nome || ', novo nome=' || NEW.nome);
END;

CREATE TRIGGER IF NOT EXISTS log_delete_produto
AFTER DELETE ON Produto
BEGIN
    INSERT INTO logs (usuario_id, acao)
    VALUES (0, 'DELETE em Produto: nome=' || OLD.nome || ', preco=' || OLD.preco);
END;

-- ===========================
-- TRIGGERS PARA CATEGORIA
-- ===========================

CREATE TRIGGER IF NOT EXISTS log_insert_categoria
AFTER INSERT ON Categoria
BEGIN
    INSERT INTO logs (usuario_id, acao)
    VALUES (0, 'INSERT em Categoria: nome=' || NEW.nome);
END;

CREATE TRIGGER IF NOT EXISTS log_update_categoria
AFTER UPDATE ON Categoria
BEGIN
    INSERT INTO logs (usuario_id, acao)
    VALUES (0, 'UPDATE em Categoria: nome antigo=' || OLD.nome || ', novo nome=' || NEW.nome);
END;

CREATE TRIGGER IF NOT EXISTS log_delete_categoria
AFTER DELETE ON Categoria
BEGIN
    INSERT INTO logs (usuario_id, acao)
    VALUES (0, 'DELETE em Categoria: nome=' || OLD.nome);
END;

-- ===========================
-- TRIGGERS PARA PRODUTO_CATEGORIA
-- ===========================

CREATE TRIGGER IF NOT EXISTS log_insert_categoria_on_produto
AFTER INSERT ON Produto_Categoria
BEGIN
    INSERT INTO logs (usuario_id, acao)
    VALUES (0, 'INSERT em Produto_Categoria: produto_id=' || NEW.produto_id || ', categoria_id=' || NEW.categoria_id);
END;

CREATE TRIGGER IF NOT EXISTS log_remove_categoria_on_produto
AFTER DELETE ON Produto_Categoria
BEGIN
    INSERT INTO logs (usuario_id, acao)
    VALUES (0, 'DELETE em Produto_Categoria: produto_id=' || OLD.produto_id || ', categoria_id=' || OLD.categoria_id);
END;

-- ===========================
-- TRIGGERS PARA PEDIDO_PRODUTO
-- ===========================

CREATE TRIGGER IF NOT EXISTS log_create_pedido_produto
AFTER INSERT ON Pedido_Produto
BEGIN
    INSERT INTO logs (usuario_id, acao)
    VALUES (0, 'INSERT em Pedido_Produto: pedido_id=' || NEW.pedido_id || ', produto_id=' || NEW.produto_id || ', quantidade=' || NEW.quantidade);
END;

CREATE TRIGGER IF NOT EXISTS log_update_pedido_produto
AFTER UPDATE ON Pedido_Produto
BEGIN
    INSERT INTO logs (usuario_id, acao)
    VALUES (0, 'UPDATE em Pedido_Produto: pedido_id=' || NEW.pedido_id || ', produto_id=' || NEW.produto_id || ', quantidade=' || NEW.quantidade);
END;

CREATE TRIGGER IF NOT EXISTS log_delete_pedido_produto
AFTER DELETE ON Pedido_Produto
BEGIN
    INSERT INTO logs (usuario_id, acao)
    VALUES (0, 'DELETE em Pedido_Produto: pedido_id=' || OLD.pedido_id || ', produto_id=' || OLD.produto_id);
END;

CREATE TRIGGER IF NOT EXISTS atualizar_valor_total
AFTER INSERT OR UPDATE OR DELETE ON Pedido_Produto
BEGIN
  UPDATE Pedido
  SET valor_total = (
    SELECT SUM(quantidade * preco_unitario)
    FROM Pedido_Produto
    WHERE pedido_id = NEW.pedido_id
  )
  WHERE pedido_id = NEW.pedido_id;
END;



------- atulizar valores

CREATE TRIGGER IF NOT EXISTS atualizar_valor_total_insert
      AFTER INSERT ON Pedido_Produto
      BEGIN
        UPDATE Pedido
        SET valor_total = (
          SELECT SUM(quantidade * preco_unitario)
          FROM Pedido_Produto
          WHERE pedido_id = NEW.pedido_id
        )
        WHERE pedido_id = NEW.pedido_id;
      END;

      CREATE TRIGGER IF NOT EXISTS atualizar_valor_total_update
      AFTER UPDATE ON Pedido_Produto
      BEGIN
        UPDATE Pedido
        SET valor_total = (
          SELECT SUM(quantidade * preco_unitario)
          FROM Pedido_Produto
          WHERE pedido_id = NEW.pedido_id
        )
        WHERE pedido_id = NEW.pedido_id;
      END;

      CREATE TRIGGER IF NOT EXISTS atualizar_valor_total_delete
      AFTER DELETE ON Pedido_Produto
      BEGIN
        UPDATE Pedido
        SET valor_total = (
          SELECT SUM(quantidade * preco_unitario)
          FROM Pedido_Produto
          WHERE pedido_id = OLD.pedido_id
        )
        WHERE pedido_id = OLD.pedido_id;
      END;

    ------------


-- ===========================
-- TRIGGERS PARA PEDIDO
-- ===========================

CREATE TRIGGER IF NOT EXISTS log_insert_pedido
AFTER INSERT ON Pedido
BEGIN
    INSERT INTO logs (usuario_id, acao)
    VALUES (NEW.cliente_id, 'INSERT em Pedido: pedido_id=' || NEW.pedido_id);
END;

CREATE TRIGGER IF NOT EXISTS log_update_pedido
AFTER UPDATE ON Pedido
BEGIN
    INSERT INTO logs (usuario_id, acao)
    VALUES (NEW.cliente_id, 'UPDATE em Pedido: pedido_id=' || NEW.pedido_id || ', status=' || NEW.status);
END;

CREATE TRIGGER IF NOT EXISTS log_delete_pedido
AFTER DELETE ON Pedido
BEGIN
    INSERT INTO logs (usuario_id, acao)
    VALUES (OLD.cliente_id, 'DELETE em Pedido: pedido_id=' || OLD.pedido_id);
END;


`

const triggersAdm=`


-- Trigger para INSERT
CREATE TRIGGER trg_insert_administrador
AFTER INSERT ON administrador
BEGIN
    INSERT INTO log_administrador(administrador_id, acao, detalhes)
    VALUES (NEW.administrador_id, 'INSERT', 'Administrador criado');
END;

-- Trigger para UPDATE
CREATE TRIGGER trg_update_administrador
AFTER UPDATE ON administrador
BEGIN
    INSERT INTO log_administrador(administrador_id, acao, detalhes)
    VALUES (NEW.administrador_id, 'UPDATE', 'Administrador atualizado');
END;

-- Trigger para DELETE
CREATE TRIGGER trg_delete_administrador
AFTER DELETE ON administrador
BEGIN
    INSERT INTO log_administrador(administrador_id, acao, detalhes)
    VALUES (OLD.administrador_id, 'DELETE', 'Administrador removido');
END;


`


export async function createTables() {
    const db = await getDB();

    try {
        await db.exec(tables);
        await db.exec(triggers);
        await db.exec(triggersAdm)
        console.log("Tabelas criadas com sucesso!");
    } catch (error) {
        console.error("Erro ao criar tabelas:", error);
    } finally {
        await closeDB();
    }
}