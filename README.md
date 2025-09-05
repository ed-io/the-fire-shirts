# The Fire 🔥

Sistema de controle interno para gerenciamento de pedidos de camisetas personalizadas, construído com Angular e Tailwind CSS.

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
- ✅ Tamanhos padrão (PP, P, M, G, GG, EXG)
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
- **Tailwind CSS** - Framework de estilos
- **TypeScript** - Tipagem estática
- **Signals** - Sistema de reatividade do Angular
- **Responsive Design** - Mobile-first approach

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

# Execute a aplicação
npm start
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

## 🗄️ Preparação para Banco de Dados

A aplicação está preparada para integração com banco de dados. Para implementar:

1. **Criar serviço de dados** para persistir os pedidos
2. **Implementar validações** adicionais se necessário
3. **Adicionar relatórios** internos se desejado
4. **Configurar backup** dos dados

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

## 📞 Suporte

Para dúvidas ou suporte interno:
- Abra uma issue no GitHub
- Entre em contato com a equipe The Fire

---

**The Fire** - Controle interno para camisetas personalizadas! 🔥
