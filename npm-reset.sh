#!/bin/bash
echo "🔄 Resetando ambiente npm..."

# Remover node_modules e arquivos de lock/config
rm -rf node_modules
rm -f package-lock.json
rm -f package.json

echo "🧹 Limpando cache..."
npm cache clean --force

echo "📦 Criando novo package.json..."
npm init -y

echo "📦 Instalando dependências..."
npm install tsx typescript @types/node sqlite sqlite3 --no-optional

echo "🔨 Recompilando sqlite3 do zero..."
npm rebuild sqlite3 --build-from-source

echo "✅ Ambiente resetado e pacotes reinstalados!"
