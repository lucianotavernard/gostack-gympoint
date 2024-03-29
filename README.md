<h1 align="center">
  <img alt="GymPoint" title="#GymPoint" src=".github/logo.png" width="250px" />
</h1>

<h4 align="center">
  🚀 GymPoint
</h4>

<p align="center">
  <img alt="GitHub language count" src="https://img.shields.io/github/languages/count/lucianotavernard/gostack-gympoint">

  <img alt="Repository size" src="https://img.shields.io/github/repo-size/lucianotavernard/gostack-gympoint">

  <a href="https://github.com/lucianotavernard/gostack-gympoint/commits/master">
    <img alt="GitHub last commit" src="https://img.shields.io/github/last-commit/lucianotavernard/gostack-gympoint">
  </a>

  <a href="https://github.com/lucianotavernard/gostack-gympoint/issues">
    <img alt="Repository issues" src="https://img.shields.io/github/issues/lucianotavernard/gostack-gympoint">
  </a>

  <img alt="License" src="https://img.shields.io/badge/license-MIT-brightgreen">
</p>

## 💻 Projeto

GymPoint é uma aplicação que pode ser usado para gerenciamento de academia. A aplicação mobile pode ser usado pelos usuários que querem fazer check in e solicitar auxílio e a versão web deve ser usada pelos administradores da academia.

Essa aplicação foi desenvolvida no desafio final do Bootcamp GoStack 9.0.

## 🚀 Stack de Desenvolvimento

- NodeJS, Yarn, JavaScript, Nodemon, Sucrase, EditorConfig, ESLint, Prettier etc. — core da platforma e ferramentas de desenvolvimento.
- Express, cors, etc. — HTTP-server configurações padrão.
- ReactJS, React Native, etc. — Criação das interfaces Web e Mobile.
- PostgresSQL, Sequelize, pg — SQL, ORM e Migrations.

## 🔥 Como iniciar a aplicação

1. Faça um clone desse repositório;
2. Entre na pasta `cd gympoint`

### Como iniciar a aplicação backend

1. Entre na pasta frontend: `cd backend`.
2. Renomei o arquivo `.env.example` para `.env` e adicione **todas** as variáveis dentro do arquivo.
3. Instale as dependências do projeto: `yarn install`.
4. Rode as migrations: `yarn sequelize db:migrate`.
5. Inicie o servidor: `yarn start`.
6. Inicie a fila: `yarn queue`.

### Como iniciar a aplicação frontend

1. Entre na pasta frontend: `cd frontend`.
2. Instale as dependências do projeto: `yarn install`.
3. Inicie a aplicação web: `yarn start`.

### Como iniciar a aplicação mobile

1. Entre na pasta mobile: `cd mobile`
2. Instale as dependências do projeto: `yarn install`.
3. Inicie a aplicação mobile: `react-native run-android` (ou `run-ios` se preferir)

## 🤔 Como contribuir

1. Faça um fork desse repositório;
2. Cria uma branch com a sua feature: `git checkout -b minha-feature`;
3. Faça commit das suas alterações: `git commit -m 'feat: Minha nova feature'`;
4. Faça push para a sua branch: `git push origin minha-feature`.

Depois que o merge da sua pull request for feito, você pode deletar a sua branch.

## 📝 Licença

Esse projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE.md) para mais detalhes.
