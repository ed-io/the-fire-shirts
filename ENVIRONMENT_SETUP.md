# Configuração de Ambiente

## Variáveis de Ambiente

Este projeto usa variáveis de ambiente para configurar a conexão com o Supabase.

### Configuração

1. **Copie os arquivos de exemplo:**
   ```bash
   cp src/environments/environment.example.ts src/environments/environment.ts
   cp src/environments/environment.development.example.ts src/environments/environment.development.ts
   ```

2. **Configure suas credenciais do Supabase:**
   - Acesse o [Supabase Dashboard](https://supabase.com/dashboard)
   - Vá para Settings > API
   - Copie a URL e a chave anônima (anon key)

3. **Atualize os arquivos de environment:**
   - `src/environments/environment.ts` (produção)
   - `src/environments/environment.development.ts` (desenvolvimento)

### Estrutura dos Arquivos

```typescript
export const environment = {
    production: true, // ou false para development
    SUPABASE_URL: 'https://your-project.supabase.co',
    SUPABASE_ANON_KEY: 'your-anon-key-here',
};
```

### Segurança

⚠️ **IMPORTANTE**: Os arquivos `environment.ts` e `environment.development.ts` estão no `.gitignore` e não serão commitados no repositório.

### Variáveis Necessárias

- `SUPABASE_URL`: URL do seu projeto Supabase
- `SUPABASE_ANON_KEY`: Chave anônima do Supabase (pode ser exposta no frontend)

### Estrutura do Banco de Dados

Certifique-se de que o banco de dados tenha as seguintes tabelas:

```sql
-- Tabela orders
CREATE TABLE orders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  full_name TEXT NOT NULL,
  phone TEXT NOT NULL,
  payment_method TEXT NOT NULL,
  payment_date TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Tabela shirts
CREATE TABLE shirts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id UUID REFERENCES orders(id),
  color TEXT NOT NULL,
  size TEXT NOT NULL,
  bust_cm INTEGER,
  waist_cm INTEGER,
  hips_cm INTEGER,
  length_cm INTEGER
);
```
