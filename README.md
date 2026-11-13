# TrabalhoBiblioteca

REST API built with Express.js to manage a school library: books, copies, readers, loans and book ratings.

**Team:** Sergio Horta da Silva Júnior and Jean Lucas de Alencar Santana
**Theme:** Library and book loans (PTAS 3)

## Problem

Small school libraries usually track loans in spreadsheets, which causes loss of control over overdue books, fines and the real availability of each copy. Students and teachers also follow different rules (quantity and period). This API lets the librarian manage books, copies, readers and loans while applying those rules automatically, and lets readers rate the books they have already returned.

## Requirements

- Node.js vX (`node -v`)
- Express 5.x (`npm list express`), which requires Node.js X or higher (see expressjs.com)
- Docker (runs the MongoDB container)

## How to run

1. Copy the environment file: `Copy-Item .env.example .env` (PowerShell) or `cp .env.example .env`
2. Install the dependencies: `npm install`
3. Start the database (MongoDB in Docker): `npm run db:up`
4. Start the server: `npm start`

The server runs at `http://localhost:3000`. Example requests are available in `requests.http`.

Other scripts: `npm run dev` (restarts on file changes), `npm run db:down` (stops the container), `npm run db:reset` (removes the container and its data).

## Project structure

The code is organized in layers:

```
src/
├── app.js            Express app: middlewares, routes and error handler
├── server.js         Connects to MongoDB and starts the server
├── config/           Database connection
├── routes/           Maps method + URL to a controller
├── controllers/      Read the request and build the response (no business rules)
├── services/         Business rules and validations
├── models/           MongoDB access (one collection per entity)
├── middlewares/      Request logger and centralized error handler
└── errors/           AppError class (message + HTTP status)
```

Flow of a request: `route -> controller -> service -> model -> MongoDB`. Errors thrown by the services (`AppError`) are converted to HTTP responses by the error handler.


## Entities

- **livros:** book data (title, author, ISBN)
- **exemplares:** physical copies of a book (`tombo`, state: `disponivel`, `emprestado`, `manutencao`)
- **leitores:** readers (name, registration, profile: `aluno` or `professor`)
- **emprestimos:** loans linking a reader and a copy (status: `ativo` or `devolvido`)
- **avaliacoes:** ratings of a book by a reader (grade from 1 to 5 and comment)

Full CRUD: livros, exemplares and leitores. A book can have many copies, a copy can have many loans, and a reader can have many loans and ratings. A loan is for a specific copy, but availability and ratings belong to the book.

All ids are MongoDB ObjectId strings.

## Endpoints

### Livros

| Method | Route | Description |
|---|---|---|
| GET | `/livros` | List books (filter `?titulo=`) |
| GET | `/livros/:id` | Get a book |
| POST | `/livros` | Create a book (`titulo` and `autor` required, unique `isbn`) |
| PUT | `/livros/:id` | Update a book |
| DELETE | `/livros/:id` | Delete a book (blocked if it has copies) |
| GET | `/livros/:id/disponibilidade` | Total and available copies |
| POST | `/livros/:id/avaliacoes` | Rate a book (`leitorId`, `nota` from 1 to 5, optional `comentario`) |
| GET | `/livros/:id/avaliacoes` | List the ratings of a book with the total and the average grade |

### Exemplares

| Method | Route | Description |
|---|---|---|
| GET | `/exemplares` | List copies (filter `?livroId=`) |
| GET | `/exemplares/:id` | Get a copy |
| POST | `/exemplares` | Create a copy (`livroId` and unique `tombo`) |
| PUT | `/exemplares/:id` | Update `tombo` or `estado` |
| DELETE | `/exemplares/:id` | Delete a copy (blocked if borrowed) |

### Leitores

| Method | Route | Description |
|---|---|---|
| GET | `/leitores` | List readers (filter `?perfil=`) |
| GET | `/leitores/:id` | Get a reader |
| POST | `/leitores` | Create a reader (`nome`, unique `matricula`, `perfil`) |
| PUT | `/leitores/:id` | Update a reader |
| DELETE | `/leitores/:id` | Delete a reader (blocked if active loans) |
| GET | `/leitores/:id/historico` | Loan history of a reader |

### Emprestimos

| Method | Route | Description |
|---|---|---|
| GET | `/emprestimos` | List loans (filter `?status=`) |
| GET | `/emprestimos/:id` | Get a loan |
| POST | `/emprestimos` | Create a loan (`leitorId` and `exemplarId`) |
| PATCH | `/emprestimos/:id/devolucao` | Return a loan: frees the copy and calculates the fine |
| PATCH | `/emprestimos/:id/renovacao` | Renew a loan: extends the due date |

Example body for `POST /emprestimos`:

```json
{ "leitorId": "66f1a2b3c4d5e6f7a8b9c0d1", "exemplarId": "66f1a2b3c4d5e6f7a8b9c0d2" }
```

Example body for `POST /livros/:id/avaliacoes`:

```json
{ "leitorId": "66f1a2b3c4d5e6f7a8b9c0d1", "nota": 5, "comentario": "Great book" }
```

Example response of `PATCH /emprestimos/:id/devolucao` for a loan returned 4 days late:

```json
{
  "status": "devolvido",
  "diasAtraso": 4,
  "multa": 2
}
```