# 📖 Guia de inicialização do backend

> [!WARNING]
> Todas as informações passadas aqui não foram testadas em todos os possíveis casos, então pode ser que hajam problemas.

## Configurando o ambiente

Ao abrir essa pasta, `backend/`, verá que há um arquivo `.env.example`, nele há a seguinte estrutura:

```
export DB_URL=
export DB_USER=
export DB_PASSWORD=
export DB_DRIVER=
export DB_DIALECT=
export JWT_SECRET=
```

As informações necessárias são a seguintes:

- `DB_URL`: link para o banco de dados no formato JDBC.
- `DB_USER`: usuário (ROLE) usado no banco de dados.
- `DB_PASSWORD`: senha para o usuário usuado no banco de dados.
- `DB_DRIVER`: identificador do driver usado no banco de dados.
- `DB_DIALECT`: dialeto usado no banco de dados.
- `JWT_SECRET`: chave usada para gerar tokens JWT.

Após colocar as informações necessárias, renomeie o arquivo para `.env` e, no terminal onde o app será inicializado, use os seguintes comandos:

1. Na pasta root:

`cd backend/`

2. Ativar variáveis de ambiente:

`source .env`

3. Rodar o backend:

`mvn spring-boot:run`
