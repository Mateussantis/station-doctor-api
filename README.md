# 🩺 Station Doctor API

## 🎯 Sobre

A Station Doctor API é uma solução para agendamento de consultas clínicas, permitindo o cadastro de clientes e médicos, a criação e listagem de consultas, com regras específicas para o intervalo entre agendamentos com o mesmo médico e horário de funcionamento definido.

**Observação:** Este projeto foi desenvolvido em um período de um dia, portanto, algumas funcionalidades e detalhes podem não estar totalmente aperfeiçoados.

## ✨ Funcionalidades

✔️ Cadastro de Clientes;  
✔️ Cadastro de Medicos;  
✔️ Listagem de Médicos;  
✔️ Criação de Consultas com validação de intervalo de 1 hora entre agendamentos com o mesmo médico;  
✔️ Listagem de Consultas por Cliente;  
✔️ Listagem de Consultas por Médico;  
✔️ Horário de funcionamento das 9h às 17h.

## 🚀 Tecnologias

Tecnologias utilizadas no desenvolvimento desta API:

  - [Node.js](https://nodejs.org/)
  - [TypeScript](https://www.typescriptlang.org/)
  - [Express](https://expressjs.com/)
  - [Prisma](https://www.prisma.io/)
  - [Tsyringe](https://github.com/microsoft/tsyringe)
  - [Docker Compose](https://docs.docker.com/compose/)
  - [dotenv](https://github.com/motdotla/dotenv)
  - [reflect-metadata](https://github.com/rbuckton/reflect-metadata)
  - [celebrate](https://github.com/arb/celebrate)
  - [zod](https://zod.dev/)
  - [luxon](https://moment.github.io/luxon/)
  - [Yarn](https://yarnpkg.com/)

## ⚙️ Rotas da API

### Cliente

  - **Cadastro de Cliente:** `POST /client`

    ```json
    {
      "name": "Nome do Cliente",
      "cpf": "Número do CPF",
      "birth": "AAAA-MM-DDTHH:MM:SS.ZZZ"
    }
    ```

    **Exemplo de requisição:**

    `POST http://localhost:3333/client`

    ```json
    {
      "name": "Gustavo",
      "cpf": "125",
      "birth": "2026-04-25T00:00:00.000Z"
    }
    ```

### Médico

  - **Cadastro de Médico:** `POST /doctor`

    ```json
    {
      "name": "Nome do Médico",
      "crm": "Número do CRM",
      "specialty": "Especialidade"
    }
    ```

    **Exemplo de requisição:**

    `POST http://localhost:3333/doctor`

    ```json
    {
      "name": "Beto",
      "crm": "143",
      "specialty": "Pediatra"
    }
    ```

  - **Listagem de Médicos:** `GET /doctor`

    **Exemplo de requisição:**

    `GET http://localhost:3333/doctor`

### Consultas

  - **Criação de Consulta:** `POST /consultation`

    ```json
    {
      "clientId": "ID do Cliente",
      "doctorId": "ID do Médico",
      "date": "AAAA-MM-DD",
      "time": "HH:MM"
    }
    ```

    **Exemplo de requisição:**

    `POST http://localhost:3333/consultation`

    ```json
    {
      "clientId": 1,
      "doctorId": 1,
      "date": "2025-05-28",
      "time": "15:00"
    }
    ```

  - **Listagem de Consultas por Médico:** `GET /consultation/doctor/:doctorId`

    **Exemplo de requisição (para o médico com ID 1):**

    `GET http://localhost:3333/consultation/doctor/1`

  - **Listagem de Consultas por Cliente:** `GET /consultation/client/:clientId`

    **Exemplo de requisição (para o cliente com ID 1):**

    `GET http://localhost:3333/consultation/client/1`

## 💻 Começando

### Requisitos

Certifique-se de ter o [Node.js](https://nodejs.org/), o [Docker](https://www.docker.com/) e o [Yarn](https://yarnpkg.com/) instalados em sua máquina para executar este projeto de forma eficiente.

### Execução

1.  **Clone o repositório:**

    ```bash
    git clone https://github.com/Mateussantis/station-doctor-api.git
    ```

2.  **Configure as variáveis de ambiente:**
    Crie um arquivo `.env` na raiz do projeto e configure as variáveis necessárias, conforme o .env.example (ex: URL do banco de dados).

3.  **Inicie e construa os containers Docker:**

    ```bash
    docker-compose up --build
    ```

    Este comando irá criar o container, iniciar o banco de dados, executar as migrations do Prisma e sincronizar tudo automaticamente.

4.  **Caso os containers já tenham sido construídos:**

    Se você já construiu os containers anteriormente e apenas deseja iniciá-los, utilize o seguinte comando:

    ```bash
    docker-compose up
    ```

    Este comando irá iniciar os containers previamente criados.

O servidor estará rodando em `http://localhost:3333` dentro do container Docker.

-----

Feito com 💜 em um dia por [Mateussantis] 👋