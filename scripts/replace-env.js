const fs = require('fs');
const path = require('path');

// Função para substituir variáveis de ambiente
function replaceEnvVars() {
  const envFile = path.join(__dirname, '../src/environments/environment.prod.ts');
  
  // Ler o arquivo
  let content = fs.readFileSync(envFile, 'utf8');
  
  // Substituir as variáveis
  content = content.replace(
    "'your-supabase-url-here'",
    `'${process.env.SUPABASE_URL || 'your-supabase-url-here'}'`
  );
  
  content = content.replace(
    "'your-supabase-anon-key-here'",
    `'${process.env.SUPABASE_ANON_KEY || 'your-supabase-anon-key-here'}'`
  );
  
  // Escrever o arquivo atualizado
  fs.writeFileSync(envFile, content);
  
  console.log('✅ Variáveis de ambiente substituídas com sucesso!');
}

// Executar apenas se for chamado diretamente
if (require.main === module) {
  replaceEnvVars();
}

module.exports = replaceEnvVars;
