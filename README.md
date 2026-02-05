## Estudo: API REST com NestJS, TypeORM e PostgreSQL

Este projeto foi desenvolvido como parte dos meus estudos sobre o ecossistema
NestJS, focando na construção de uma API robusta, integração com banco de dados
relacional e boas práticas de segurança.

## Tecnologias

- NestJS
- TypeScript
- TypeORM
- PostgreSQL

## Configuracao Inicial

Para rodar este projeto localmente, configure as variaveis de ambiente.

1. Instale as dependencias: npm install

2. Crie um arquivo .env na raiz do projeto. Você pode usar o arquivo
   .env.exemplo como modelo:

   ```bash
   DB_TYPE=postgres
   DB_HOST=localhost
   DB_PORT=5432
   DB_USERNAME=seu_usuario
   DB_PASSWORD=sua_senha
   DB_DATABASE=nome_do_banco
   ```

3. Agora para o nest gerenciar as variaveis de ambiente do seu .env execute o
   comando:

```bash
$ npm i @nestjs/config
```

## Executando o Projeto

Para iniciar o servidor em modo de desenvolvimento:

`npm run start:dev`

A API estara disponivel em http://localhost:3000.

## Funcionalidades Estudadas

- Operacoes CRUD completas (Create, Read, Update, Delete).
- Validacao de dados com class-validator e class-transformer.
- Uso de DTOs (Data Transfer Objects) para entrada de dados.
- Configuracao de variaveis de ambiente para protecao de credenciais sensiveis.
- Relacionamentos entre entidades usando os decoradores do TypeORM.

Desenvolvido por Mateus Nasc

## Run tests

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```
