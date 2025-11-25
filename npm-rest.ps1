Write-Host "🔄 Resetando ambiente npm..."

# Apagar dependências e arquivos de configuração
Remove-Item -Recurse -Force node_modules -ErrorAction SilentlyContinue
Remove-Item -Force package-lock.json -ErrorAction SilentlyContinue
Remove-Item -Force package.json -ErrorAction SilentlyContinue

# Limpar cache
Write-Host "🧹 Limpando cache..."
npm cache clean --force

# Criar novo package.json
Write-Host "📦 Criando novo package.json..."
npm init -y

# Instalar pacotes principais
Write-Host "📦 Instalando dependências..."
npm install tsx typescript @types/node sqlite3 sqlite --no-optional

Write-Host "✅ Ambiente resetado e pacotes reinstalados!"
