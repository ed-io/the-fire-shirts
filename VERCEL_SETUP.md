# 🚀 Configuração da Vercel com Supabase

Este guia te ajudará a configurar as variáveis de ambiente do Supabase na Vercel.

## 📋 Pré-requisitos

1. Projeto no Supabase configurado
2. Projeto na Vercel
3. Código do projeto já no GitHub (ou outro repositório conectado à Vercel)

## 🔧 Passo a Passo

### 1. Obter as Chaves do Supabase

1. Acesse o [dashboard do Supabase](https://supabase.com/dashboard)
2. Selecione seu projeto
3. Vá em **Settings** → **API**
4. Copie:
   - **Project URL** (exemplo: `https://abcdefgh.supabase.co`)
   - **anon public** key (chave pública)

### 2. Configurar Variáveis na Vercel

#### Opção A: Via Dashboard da Vercel (Recomendado)

1. Acesse o [dashboard da Vercel](https://vercel.com/dashboard)
2. Selecione seu projeto
3. Vá em **Settings** → **Environment Variables**
4. Adicione as seguintes variáveis:

| Nome | Valor | Ambiente |
|------|-------|----------|
| `SUPABASE_URL` | `https://seu-projeto-id.supabase.co` | Production, Preview, Development |
| `SUPABASE_ANON_KEY` | `sua-chave-anon-aqui` | Production, Preview, Development |

#### Opção B: Via CLI da Vercel

```bash
# Instalar Vercel CLI (se não tiver)
npm i -g vercel

# Fazer login
vercel login

# Configurar variáveis
vercel env add SUPABASE_URL
vercel env add SUPABASE_ANON_KEY

# Para cada variável, selecione:
# - Environment: Production, Preview, Development
# - Value: cole o valor correspondente
```

### 3. Configurar Build na Vercel

O projeto já está configurado com:

- **Build Command**: `npm run build:prod`
- **Output Directory**: `dist/thefire-shirts/browser`
- **Framework**: Angular

### 4. Verificar Configuração

1. Após adicionar as variáveis, faça um novo deploy:
   - Via dashboard: clique em **Deployments** → **Redeploy**
   - Via CLI: `vercel --prod`

2. Verifique se o deploy foi bem-sucedido
3. Teste a aplicação para confirmar que está conectando ao Supabase

## 🔍 Como Funciona

O projeto usa um sistema de substituição de variáveis de ambiente:

1. **Durante o build**: O script `scripts/replace-env.js` substitui as variáveis no arquivo `environment.prod.ts`
2. **Variáveis da Vercel**: São automaticamente disponibilizadas como `process.env.SUPABASE_URL` e `process.env.SUPABASE_ANON_KEY`
3. **Build final**: O Angular compila com as variáveis corretas

## 🔍 Troubleshooting

### Problema: "Environment variable not found"

**Solução:**
- Verifique se as variáveis foram adicionadas corretamente na Vercel
- Confirme que estão habilitadas para o ambiente correto (Production/Preview/Development)
- Faça um novo deploy após adicionar as variáveis

### Problema: "Invalid API key"

**Solução:**
- Verifique se copiou a chave correta (anon public key, não a service role)
- Confirme que não há espaços extras no início/fim da chave
- Verifique se o URL do Supabase está correto

### Problema: "CORS error"

**Solução:**
- No Supabase, vá em **Settings** → **API**
- Adicione seu domínio da Vercel na lista de **Allowed Origins**
- Exemplo: `https://seu-projeto.vercel.app`

### Problema: "process is not defined"

**Solução:**
- Este erro foi corrigido! O projeto agora usa substituição de variáveis durante o build
- Certifique-se de usar `npm run build:prod` para produção

## 📝 Estrutura do Projeto

O projeto está configurado com múltiplos ambientes:

```
src/environments/
├── environment.ts              # Base (desenvolvimento)
├── environment.development.ts  # Desenvolvimento local
└── environment.prod.ts         # Produção (Vercel)
```

## 🚀 Deploy

Após configurar as variáveis:

1. **Push para o repositório** (se usando GitHub)
2. **Deploy automático** será iniciado
3. **Verifique os logs** do deploy para confirmar que não há erros
4. **Teste a aplicação** em produção

## 📞 Suporte

Se ainda tiver problemas:

1. Verifique os logs do deploy na Vercel
2. Confirme que as tabelas existem no Supabase
3. Teste a conexão localmente com as mesmas variáveis
4. Verifique se as políticas RLS estão configuradas corretamente no Supabase

## 🔧 Desenvolvimento Local

Para desenvolvimento local, edite os arquivos de ambiente:

```typescript
// src/environments/environment.development.ts
export const environment = {
    SUPABASE_URL: 'sua-url-local',
    SUPABASE_ANON_KEY: 'sua-chave-local',
};
```
