# Delta

# Delta App - React Native

## 📱 Sobre o Projeto

Aplicativo mobile desenvolvido em React Native para a Delta Global Serviços e Tecnologia S/A. O app permite busca de produtos e cadastro de contatos, com interface responsiva e funcionalidades de filtro e ordenação.

## 🚀 Principais Funcionalidades

- Tela inicial com navegação intuitiva
- Sistema de busca de produtos com filtros
- Paginação e ordenação na listagem de produtos
- Formulário de contato com validação de CPF
- Autopreenchimento de endereço via CEP
- Interface totalmente responsiva
- Compatibilidade cross-platform (iOS e Android)

## 🛠️ Tecnologias Utilizadas

- React Native
- React Navigation
- React Native Masked Text
- React Native Safe Area Context
- Expo (opcional, dependendo da configuração escolhida)

## ⚙️ Pré-requisitos

- Node.js (versão 14 ou superior)
- npm ou yarn
- React Native CLI
- Android Studio (para desenvolvimento Android)
- Xcode (para desenvolvimento iOS - apenas macOS)

## 📥 Instalação

1. Clone o repositório
```bash
git clone [[https://github.com/seu-usuario/delta-app.git](https://github.com/0Augusto/Delta.git)](https://github.com/0Augusto/Delta.git)
cd Delta
```

2. Instale as dependências
```bash
npm install
# ou
yarn install
```

3. Instale as dependências específicas
```bash
npm install @react-navigation/native @react-navigation/native-stack
npm install react-native-safe-area-context
npm install react-native-screens
npm install react-native-masked-text
npm install react-native-gesture-handler
```

## 🎯 Executando o Projeto

### Para Android:

```bash
npm run android
# ou
yarn android
```

### Para iOS:

```bash
npm run ios
# ou
yarn ios
```

## 📁 Estrutura do Projeto

```
delta-app/
├── src/
│   ├── assets/
│   │   └── images/
│   ├── components/
│   │   ├── Button/
│   │   ├── Input/
│   │   └── ProductCard/
│   ├── screens/
│   │   ├── HomeScreen/
│   │   ├── ProductSearchScreen/
│   │   ├── ContactFormScreen/
│   │   └── ReviewDataScreen/
│   ├── services/
│   │   └── api.js
│   └── utils/
│       └── validators.js
├── App.jsx
├── babel.config.js
├── metro.config.js
└── package.json
```

## 🔍 Funcionalidades Detalhadas

### Tela de Busca de Produtos
- Filtros simultâneos por múltiplos critérios
- Mínimo de 20 produtos na listagem
- Paginação integrada com filtros
- Ordenação por coluna (crescente/decrescente)

### Formulário de Contato
- Máscaras de formatação para campos específicos
- Validação de CPF
- Autopreenchimento de endereço via API de CEP
- Revisão dos dados antes do envio

## 🔒 Segurança

- Validação de dados no frontend
- Sanitização de inputs
- Proteção contra injection
- Tratamento adequado de erros

## 📱 Responsividade

O aplicativo foi desenvolvido seguindo o conceito Mobile First e é totalmente responsivo, adaptando-se a diferentes tamanhos de tela e resoluções.

## 🧪 Testes

Para executar os testes:

```bash
npm test
# ou
yarn test
```

## 📝 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

## 👥 Autor

Nome do Desenvolvedor
- Email: seu-email@exemplo.com
- LinkedIn: [Seu LinkedIn](https://linkedin.com/in/seu-perfil)

## 🤝 Contribuições

Contribuições são bem-vindas! Para contribuir:

1. Faça um Fork do projeto
2. Crie uma Branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a Branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📞 Suporte

Em caso de dúvidas ou problemas, abra uma issue ou entre em contato através do email: suporte@exemplo.com
