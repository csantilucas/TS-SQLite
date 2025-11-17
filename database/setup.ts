
// cria as tabelas depois de abrir o banco

import { createTables } from "./tablesDB";

async function setup() {
  try {
    await createTables();
    console.log("Banco inicializado com tabelas e triggers!");
  } catch (error) {
    console.error("Erro ao inicializar o banco:", error);
  }
}

setup();

