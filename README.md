# TS-SQLite

Desenvolvimento com TypeScript e SQLite

project-root/
│
├── src/
│   ├── models/              # Define os modelos de dados (interfaces/classes)
│   │   ├── Usuario.ts
│   │   ├── Log.ts
│   │   ├── Entidade1.ts     # Ex: Tarefa, Produto, etc.
│   │   ├── Entidade2.ts
│   │   └── Entidade3.ts
│   │
│   ├── repository/          # Interação direta com SQLite (SQL + funções)
│   │   ├── db.ts            # Conexão com o banco
│   │   ├── UsuarioRepo.ts
│   │   ├── LogRepo.ts
│   │   ├── Entidade1Repo.ts
│   │   └── ...
│   │
│   ├── services/            # Regras de negócio
│   │   ├── UsuarioService.ts
│   │   ├── LogService.ts
│   │   ├── Entidade1Service.ts
│   │   └── ...
│   │
│   ├── controllers/         # Entrada e saída de dados (CLI)
│   │   ├── UsuarioController.ts
│   │   ├── Entidade1Controller.ts
│   │   └── ...
│   │
│   ├── cli/                 # Interface de linha de comando
│   │   └── index.ts         # Menu principal e chamadas de controller
│   │
│   └── utils/               # Funções auxiliares (ex: criptografia)
│       └── crypto.ts
│
├── data/                    # Banco SQLite
│   └── database.sqlite
│
├── package.json
├── tsconfig.json
└── README.md
