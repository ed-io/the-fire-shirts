# Conferência The Fire 🔥

Sistema de controle interno para gerenciamento de pedidos de camisetas personalizadas da Conferência The Fire, construído com Angular, Supabase e deployado na Vercel.

## ✨ Características

- **Controle Interno**: Sistema para uso interno da equipe The Fire
- **Design Moderno**: Interface limpa e responsiva com tema vermelho/laranja
- **Layout Intuitivo**: Camisetas organizadas em grid com funcionalidades de adicionar/remover
- **Formulário Inteligente**: Validação e campos condicionais para tamanhos personalizados
- **Responsivo**: Funciona perfeitamente em dispositivos móveis e desktop

## 🚀 Funcionalidades

### Pedidos Internos
- ✅ Cadastro de cliente (nome, telefone, forma de pagamento)
- ✅ Múltiplas camisetas por pedido (até 5)
- ✅ Tamanhos padrão (P, M, G, GG, EXG, G1, G2, G3, G4)
- ✅ Tamanhos personalizados com medidas em centímetros
- ✅ Cores disponíveis (Off White, Preto)

### Interface
- ✅ Botão de adicionar camiseta no topo da seção
- ✅ Botão de remover para cada camiseta individual
- ✅ Layout em grid responsivo para as camisetas
- ✅ Tema "The Fire" com cores vermelho/laranja
- ✅ Animações e transições suaves

## 🛠️ Tecnologias

- **Angular 18** - Framework principal
- **Supabase** - Backend como serviço (BaaS) para banco de dados
- **Vercel** - Plataforma de deploy e hospedagem
- **Tailwind CSS** - Framework de estilos
- **TypeScript** - Tipagem estática
- **ngx-mask** - Máscaras para inputs
- **Responsive Design** - Mobile-first approach

## 🤖 Desenvolvimento

Este projeto foi desenvolvido com a assistência do **Cursor AI**, utilizando suas capacidades avançadas de geração de código, refatoração e debugging para acelerar o processo de desenvolvimento.

## 📱 Layout Responsivo

- **Mobile**: Layout em coluna única
- **Tablet**: Grid de 2 colunas para camisetas
- **Desktop**: Grid de 3 colunas para camisetas
- **Wide**: Layout otimizado para telas grandes

## 🔧 Instalação e Uso

### Pré-requisitos
- Node.js 18+ 
- Angular CLI 18+

### Instalação
```bash
# Clone o repositório
git clone [url-do-repositorio]
cd thefire-shirts

# Instale as dependências
npm install

# Configure as variáveis de ambiente
# Edite src/environments/environment.ts com suas credenciais do Supabase

# Execute a aplicação
npm start
```

### Configuração do Supabase

1. **Crie um projeto** no [Supabase](https://supabase.com)
2. **Execute os scripts SQL** (veja seção Banco de Dados)
3. **Configure as variáveis** em `src/environments/environment.ts`:
   ```typescript
   export const environment = {
     SUPABASE_URL: 'sua-url-do-supabase',
     SUPABASE_ANON_KEY: 'sua-chave-anonima',
   };
   ```

### Desenvolvimento
```bash
# Modo de desenvolvimento com hot reload
npm start

# Build para produção
npm run build

# Testes
npm test
```

## 🎨 Tema The Fire

A aplicação usa um tema personalizado com as cores da equipe:

- **Vermelho Principal**: #dc2626
- **Laranja Accent**: #ea580c
- **Gradientes**: Vermelho para laranja
- **Foco**: Anéis vermelhos nos campos de entrada

## 📊 Uso Interno

Este sistema é projetado para:

1. **Controle de Produção**: Acompanhar pedidos de camisetas
2. **Gestão de Clientes**: Manter cadastro de clientes
3. **Especificações Técnicas**: Detalhar tamanhos e medidas
4. **Controle de Pagamento**: Registrar formas de pagamento

## 🗄️ Banco de Dados (Supabase)

A aplicação utiliza o **Supabase** como backend, oferecendo:

- **PostgreSQL** - Banco de dados relacional
- **API REST** - Endpoints automáticos
- **Row Level Security** - Segurança a nível de linha
- **Real-time** - Atualizações em tempo real
- **Dashboard** - Interface administrativa

### Estrutura das Tabelas

```sql
-- Tabela de Pedidos
CREATE TABLE orders (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  full_name TEXT NOT NULL,
  phone TEXT NOT NULL,
  payment_method TEXT NOT NULL,
  payment_date DATE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tabela de Camisetas
CREATE TABLE shirts (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  order_id UUID REFERENCES orders(id) ON DELETE CASCADE,
  color TEXT NOT NULL,
  size TEXT NOT NULL,
  bust_cm INTEGER,
  waist_cm INTEGER,
  hips_cm INTEGER,
  length_cm INTEGER,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

## 🚀 Deploy (Vercel)

O projeto está configurado para deploy automático na **Vercel**:

- **Deploy automático** via Git
- **Build otimizado** para produção
- **CDN global** para performance
- **HTTPS** automático
- **Domínio personalizado** disponível

## 🎯 Estrutura do Sistema

```
Pedido
├── Dados do Cliente
│   ├── Nome Completo
│   ├── Telefone (WhatsApp)
│   └── Forma de Pagamento
└── Camisetas
    ├── Cor
    ├── Tamanho (Padrão ou Personalizado)
    └── Medidas Personalizadas (se aplicável)
        ├── Busto (cm)
        ├── Cintura (cm)
        ├── Quadril (cm)
        └── Comprimento (cm)
```

## 📱 Screenshots

### Desktop
- Formulário de pedido com layout em grid
- Seção de camisetas organizada em linhas
- Tema vermelho/laranja "The Fire"

### Mobile
- Layout responsivo em coluna única
- Navegação otimizada para touch
- Formulários adaptados para dispositivos móveis

## 🤝 Contribuição

1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo `LICENSE` para mais detalhes.

## 🔗 Links Úteis

- **Supabase Dashboard**: [supabase.com/dashboard](https://supabase.com/dashboard)
- **Vercel Dashboard**: [vercel.com/dashboard](https://vercel.com/dashboard)
- **Angular Docs**: [angular.io](https://angular.io)
- **Tailwind CSS**: [tailwindcss.com](https://tailwindcss.com)

## 📞 Suporte

Para dúvidas ou suporte interno:
- Abra uma issue no GitHub
- Entre em contato com a equipe The Fire
- Consulte a documentação do Supabase e Vercel

---

**Conferência The Fire** - Sistema de pedidos de camisetas personalizadas! 🔥

*Desenvolvido com Angular, Supabase, Vercel e assistência do Cursor AI*
