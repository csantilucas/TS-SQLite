
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
