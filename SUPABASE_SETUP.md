# 🗄️ Configuração do Supabase

Este guia explica como configurar o Supabase para a aplicação TheFire Shirts.

## 📋 Pré-requisitos

- Conta no [Supabase](https://supabase.com)
- Projeto criado no Supabase
- Node.js e npm instalados

## 🚀 Passo a Passo

### 1. Instalar o Cliente Supabase

```bash
npm install @supabase/supabase-js
```

### 2. Configurar Variáveis de Ambiente

Crie um arquivo `.env` na raiz do projeto:

```env
VITE_SUPABASE_URL=sua_url_do_supabase
VITE_SUPABASE_ANON_KEY=sua_chave_anonima
```

### 3. Atualizar a Configuração

Edite `src/app/supabase.config.ts`:

```typescript
export const SUPABASE_CONFIG = {
  url: import.meta.env.VITE_SUPABASE_URL,
  anonKey: import.meta.env.VITE_SUPABASE_ANON_KEY,
};
```

### 4. Criar as Tabelas no Supabase

Execute os seguintes comandos SQL no SQL Editor do Supabase:

#### Tabela de Pedidos
```sql
CREATE TABLE orders (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  full_name TEXT NOT NULL,
  phone TEXT NOT NULL,
  payment_method TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Trigger para atualizar updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_orders_updated_at 
    BEFORE UPDATE ON orders 
    FOR EACH ROW 
    EXECUTE FUNCTION update_updated_at_column();
```

#### Tabela de Camisetas
```sql
CREATE TABLE shirts (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  order_id UUID REFERENCES orders(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  color TEXT NOT NULL,
  size TEXT NOT NULL,
  bust_cm INTEGER,
  waist_cm INTEGER,
  hips_cm INTEGER,
  length_cm INTEGER,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Índices para melhor performance
CREATE INDEX idx_shirts_order_id ON shirts(order_id);
CREATE INDEX idx_orders_created_at ON orders(created_at);
CREATE INDEX idx_orders_phone ON orders(phone);
```

### 5. Configurar Políticas de Segurança (RLS)

#### Habilitar RLS
```sql
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE shirts ENABLE ROW LEVEL SECURITY;
```

#### Política para Pedidos (Permitir leitura e escrita para todos)
```sql
CREATE POLICY "Allow all operations on orders" ON orders
  FOR ALL USING (true);

CREATE POLICY "Allow all operations on shirts" ON shirts
  FOR ALL USING (true);
```

### 6. Ativar o Serviço

Edite `src/app/app.component.ts`:

```typescript
import { SupabaseService } from './supabase.service';

export class AppComponent implements OnInit {
  private supabase = inject(SupabaseService);
  
  // ... resto do código
}
```

### 7. Testar a Conexão

Adicione este método ao componente para testar:

```typescript
async testConnection() {
  try {
    const { data, error } = await this.supabase.getOrdersWithShirts();
    if (error) {
      console.error('Erro na conexão:', error);
    } else {
      console.log('Conexão bem-sucedida!', data);
    }
  } catch (error) {
    console.error('Erro:', error);
  }
}
```

## 🔐 Configurações de Segurança

### Políticas Mais Restritivas (Opcional)

Se quiser mais segurança, use estas políticas:

```sql
-- Apenas usuários autenticados podem criar pedidos
CREATE POLICY "Users can create orders" ON orders
  FOR INSERT WITH CHECK (auth.role() = 'authenticated');

-- Usuários podem ver apenas seus próprios pedidos
CREATE POLICY "Users can view own orders" ON orders
  FOR SELECT USING (auth.uid()::text = phone);

-- Usuários podem atualizar apenas seus próprios pedidos
CREATE POLICY "Users can update own orders" ON orders
  FOR UPDATE USING (auth.uid()::text = phone);
```

## 📊 Funções Úteis

### Função para Estatísticas
```sql
CREATE OR REPLACE FUNCTION get_order_stats()
RETURNS TABLE (
  total_orders BIGINT,
  total_shirts BIGINT,
  avg_shirts_per_order NUMERIC
) AS $$
BEGIN
  RETURN QUERY
  SELECT 
    COUNT(DISTINCT o.id)::BIGINT as total_orders,
    COUNT(s.id)::BIGINT as total_shirts,
    ROUND(AVG(shirt_count), 2) as avg_shirts_per_order
  FROM orders o
  LEFT JOIN (
    SELECT order_id, COUNT(*) as shirt_count
    FROM shirts
    GROUP BY order_id
  ) s ON o.id = s.order_id;
END;
$$ LANGUAGE plpgsql;
```

### Função para Buscar Pedidos por Cliente
```sql
CREATE OR REPLACE FUNCTION get_customer_orders(customer_phone TEXT)
RETURNS TABLE (
  order_id UUID,
  full_name TEXT,
  payment_method TEXT,
  created_at TIMESTAMP WITH TIME ZONE,
  shirt_count BIGINT
) AS $$
BEGIN
  RETURN QUERY
  SELECT 
    o.id,
    o.full_name,
    o.payment_method,
    o.created_at,
    COUNT(s.id)::BIGINT
  FROM orders o
  LEFT JOIN shirts s ON o.id = s.order_id
  WHERE o.phone = customer_phone
  GROUP BY o.id, o.full_name, o.payment_method, o.created_at
  ORDER BY o.created_at DESC;
END;
$$ LANGUAGE plpgsql;
```

## 🚨 Solução de Problemas

### Erro de Conexão
- Verifique se as variáveis de ambiente estão corretas
- Confirme se o projeto está ativo no Supabase
- Verifique se as políticas RLS estão configuradas corretamente

### Erro de Permissão
- Confirme se as políticas de segurança permitem a operação desejada
- Verifique se o usuário tem as permissões necessárias

### Erro de Schema
- Execute novamente os comandos SQL para criar as tabelas
- Verifique se os nomes das colunas estão corretos

## 📱 Próximos Passos

Após configurar o Supabase:

1. **Implementar Autenticação**: Adicionar login/registro de usuários
2. **Upload de Imagens**: Permitir upload de fotos das camisetas
3. **Notificações**: Enviar emails/SMS de confirmação
4. **Dashboard**: Criar painel administrativo
5. **Relatórios**: Gerar relatórios de vendas

## 🔗 Links Úteis

- [Documentação do Supabase](https://supabase.com/docs)
- [Guia de RLS](https://supabase.com/docs/guides/auth/row-level-security)
- [Cliente JavaScript](https://supabase.com/docs/reference/javascript)
- [SQL Editor](https://supabase.com/docs/guides/database/sql-editor)

---

**Nota**: Mantenha suas chaves de API seguras e nunca as compartilhe publicamente! 
