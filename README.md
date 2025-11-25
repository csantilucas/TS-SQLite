# 📘 Sistema de Gestão — Projeto em TypeScript com SQLite

Este projeto é uma aplicação de linha de comando (CLI) desenvolvida em **TypeScript**, com persistência de dados em **SQLite**, aplicando os conceitos da disciplina de Linguagem de Programação e boas práticas de arquitetura em camadas.

---

## 🎯 Objetivo

Criar um sistema de gestão com funcionalidades completas de **CRUD**, **relacionamentos entre entidades**, e **registro automático de logs**, utilizando uma estrutura modular e organizada.

---

## 🏗️ Estrutura de Pastas

```plaintext
project-root/
│
├── src/
│   ├── models/               # Modelos de dados (interfaces/classes)
│   ├── repository/           # Acesso ao banco de dados (CRUD + SQL)
│   ├── services/             # Regras de negócio e lógica da aplicação
│   ├── controllers/          # Entrada e saída de dados (CLI)
│   ├── cli/                  # Interface de linha de comando
│   ├── utils/                # Funções auxiliares (ex: criptografia)
│   └── database/             # Inicialização e arquivo SQLite
│
├── node_modules/
├── package.json
├── package-lock.json
└── README.md
```

## 🧩 Camadas da Aplicação

* **Model** : Define a estrutura das entidades (ex: `Usuario`, `Tarefa`, `Projeto`, etc.).
* **Repository** : Contém funções SQL para `Create`, `Read`, `Update`, `Delete`.
* **Service** : Aplica regras de negócio e registra logs automaticamente.
* **Controller** : Recebe comandos da CLI e chama os serviços.
* **CLI** : Interface interativa para o usuário operar o sistema.

## 🗃️ Banco de Dados SQLite

O banco contém  **no mínimo 5 tabelas** :

* `usuarios`: `id`, `nome`, `email`, `senha` (criptografada), `data_criacao`
* `logs`: `id`, `usuario_id`, `acao`, `data_hora`
* `tarefa`: relacionada com `usuario` (1:N)
* `projeto`: relacionada com `tarefa` (1:N)
* `categoria`: relacionada com `projeto` (N:N via tabela intermediária)

## 🗄️ Estrutura do Banco de Dados

### **Tabela Cliente**

* Armazena os dados principais dos clientes (nome, email, CPF, telefone, senha).
* Cada cliente recebe um `cliente_id` único.
* Relacionamentos:
  * **1:N com Endereco** → um cliente pode ter vários endereços.
  * **1:N com Pedido** → um cliente pode ter vários pedidos.

### **Tabela Endereco**

* Contém os endereços vinculados a cada cliente.
* Campos: rua, bairro, CEP, número, complemento.
* Relacionamentos:
  * **N:1 com Cliente** → cada endereço pertence a um cliente.

### **Tabela Pedido**

* Representa os pedidos feitos pelos clientes.
* Campos: data do pedido, status (aberto, etc.), valor total.
* Relacionamentos:
  * **N:1 com Cliente** → cada pedido pertence a um cliente.
  * **N:M com Produto** (via Pedido_Produto) → um pedido pode conter vários produtos.

### **Tabela Produto**

* Armazena os produtos disponíveis.
* Campos: nome, descrição, preço, estoque.
* Relacionamentos:
  * **N:M com Categoria** (via Produto_Categoria).
  * **N:M com Pedido** (via Pedido_Produto).

### **Tabela Categoria**

* Define categorias de produtos (ex: Eletrônicos, Roupas).
* Campos: nome e descrição.
* Relacionamentos:
  * **N:M com Produto** (via Produto_Categoria).

### **Tabela Produto_Categoria**

* Tabela de junção para a relação  **N:M entre Produto e Categoria** .
* Cada linha associa um produto a uma categoria.

### **Tabela Pedido_Produto**

* Tabela de junção para a relação  **N:M entre Pedido e Produto** .
* Campos: quantidade e preço unitário.
* Cada linha representa um item dentro de um pedido.

### **Tabela Logs**

* Armazena registros de ações realizadas no banco (via triggers).
* Campos: usuário responsável, descrição da ação, data/hora.
* Usada para auditoria e rastreamento.

## 🔗 Relações principais

| Relação            | Tipo | Descrição                                                                             |
| -------------------- | ---- | --------------------------------------------------------------------------------------- |
| Cliente → Endereco  | 1:N  | Um cliente pode ter vários endereços                                                  |
| Cliente → Pedido    | 1:N  | Um cliente pode ter vários pedidos                                                     |
| Pedido ↔ Produto    | N:M  | Um pedido pode conter vários produtos; um produto pode estar em vários pedidos        |
| Produto ↔ Categoria | N:M  | Um produto pode pertencer a várias categorias; uma categoria pode ter vários produtos |
| Logs                 | -    | Registra ações em todas as tabelas via triggers                                       |

## ✅ Resumindo

Esse banco é um  **sistema de e-commerce simplificado** :

* Clientes fazem pedidos.
* Pedidos contêm produtos.
* Produtos pertencem a categorias.
* Endereços vinculam clientes a locais físicos.
* Logs registram todas as operações para auditoria.

## 🔐 Registro Automático de Logs

Toda operação relevante (criação, exclusão, login, atualização) gera um registro na tabela `logs` com:

* `id` (autogerado)
* `usuario_id`
* `acao`
* `data_hora`

## 🛠️ Funcionalidades CRUD

Cada entidade principal possui:

* `Create`: Inserção de novos registros
* `Read`: Listagem e busca por ID
* `Update`: Atualização de dados
* `Delete`: Remoção de registros

## 🖥️ Interface CLI

A interface de linha de comando permite:

* Criar usuários e tarefas
* Listar entidades
* Atualizar e excluir registros
* Visualizar logs
* Navegar por menus interativos

## 🔧 Tecnologias Utilizadas

* TypeScript
* SQLite
* Node.js
* Biblioteca de CLI (ex: `readline-sync`)
* Criptografia (ex: `bcrypt`)

## 🚀 Como Executar

1. Instale as dependências:
   bash

   ```
   npm install
   ```
2. Inicialize o banco de dados:
   bash

   ```
   ts-node src/database/initDB.ts
   ```
3. Execute a interface CLI:
   bash

   ```
   ts-node src/cli/index.ts
   ```

**script rápido de reset** para você rodar sempre que trocar de sistema operacional (Windows ↔ Linux ↔ macOS). Assim você não precisa ficar apagando manualmente `node_modules` e `package-lock.json` toda vez.


- bash npm-reset.sh  # no Linux/macOS
- npm-reset.bat   # no Windows
rm -r node_modules
del package-lock.json
del package.json
npm cache clean --force
npm init -y
npm install tsx typescript @types/node sqlite3 sqlite --no-optional
