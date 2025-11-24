@echo off
echo 🔄 Resetando ambiente npm...

rd /s /q node_modules
del package-lock.json
del package.json

echo 🧹 Limpando cache...
npm cache clean --force

echo 📦 Criando novo package.json...
npm init -y

echo 📦 Instalando dependências...
npm install tsx typescript @types/node sqlite3 sqlite --no-optional

echo ✅ Ambiente resetado e pacotes reinstalados!
