const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

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
  console.log(`SUPABASE_URL: ${process.env.SUPABASE_URL ? '✅ Configurado' : '❌ Não configurado'}`);
  console.log(`SUPABASE_ANON_KEY: ${process.env.SUPABASE_ANON_KEY ? '✅ Configurado' : '❌ Não configurado'}`);
}

// Executar substituição e build
try {
  replaceEnvVars();
  
  // Executar o build do Angular
  console.log('🚀 Iniciando build do Angular...');
  execSync('ng build --configuration production', { stdio: 'inherit' });
  
  console.log('✅ Build concluído com sucesso!');
} catch (error) {
  console.error('❌ Erro durante o build:', error.message);
  process.exit(1);
}
