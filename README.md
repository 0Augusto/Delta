# Delta

# Estrutura App Delta

DesafioAPP/
├── android/
├── ios/
├── src/
│   ├── components/
│   │   ├── Button.js
│   │   ├── InputField.js
│   │   └── ProductItem.js
│   ├── screens/
│   │   ├── HomeScreen.js
│   │   ├── ProductSearchScreen.js
│   │   └── ContactFormScreen.js
│   ├── utils/
│   │   ├── api.js
│   │   ├── masks.js
│   │   └── validation.js
│   ├── navigation/
│   │   └── AppNavigator.js
│   └── assets/
├── App.js
└── package.json



# Desafio APP React Native

Este projeto é a solução para o desafio de programação em React Native.

## Funcionalidades Implementadas

- **Tela Inicial**: Com dois botões funcionais para navegação
- **Tela de Busca por Produto**:
  - Filtros simultâneos por nome e categoria
  - Listagem de 20 produtos com paginação
  - Ordenação por coluna (clique no cabeçalho)
  - Contador de produtos e páginas
- **Tela de Formulário de Contato**:
  - Máscaras de formatação para CPF e CEP
  - Validação de CPF
  - Autocomplete de endereço via API ViaCEP
  - Validação de campos obrigatórios
- **Responsividade**: Layout adaptável para diferentes tamanhos de tela

## Pré-requisitos

- Node.js (v18 ou superior)
- npm (v9 ou superior)
- Xcode (v15 ou superior) para iOS
- Android Studio para Android
- Apple Silicon (M1/M2)





# Decisões de Projeto

Arquitetura: Componentes reutilizáveis e separação de responsabilidades
Navegação: React Navigation para gestão de rotas
Formulários: Validação em tempo real e máscaras customizadas
Responsividade: Uso de Flexbox e Dimension API para adaptação a diferentes telas
Performance: Virtualização de listas com FlatList
API: ViaCEP para busca de endereços
Segurança: Validação de CPF no cliente
Possíveis Melhorias

Implementar testes unitários e de integração
Adicionar internacionalização (i18n)
Implementar autenticação de usuários
Adicionar persistência local com AsyncStorage
Melhorar acessibilidade (VoiceOver, TalkBack)
Implementar dark mode
