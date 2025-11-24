#!/bin/bash
echo "🔄 Resetando ambiente npm..."

# Apagar dependências e arquivos de configuração
rm -rf node_modules
rm -f package-lock.json
rm -f package.json

# Limpar cache
echo "🧹 Limpando cache..."
npm cache clean --force

# Criar novo package.json
echo "📦 Criando novo package.json..."
npm init -y

# Instalar pacotes principais
echo "📦 Instalando dependências..."
npm install tsx typescript @types/node sqlite3 sqlite --no-optional

echo "✅ Ambiente resetado e pacotes reinstalados!"
