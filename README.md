# # TrabalhoBiblioteca

REST API built with Express.js to manage a school library: books, copies, readers and loans.

**Team:** Sergio Horta da Silva Júnior and Jean Lucas de Alencar Santana
**Theme:** Library and book loans (PTAS 3)

## Problem

Small school libraries usually track loans in spreadsheets, which causes loss of control over overdue books and real availability of each copy. Students and teachers also follow different rules (quantity and period). This API lets the librarian manage books, copies, readers and loans while applying those rules automatically.

## Requirements

- Node.js [versão, ex: v22.x] (`node -v`)
- Express [versão, ex: 5.x] (`npm list express`)

## How to run

```bash
npm install
npm start
```

The server runs at `http://localhost:3000`. Example requests are available in `requests.http`.

## Entities

- **livros:** book data (title, author, ISBN)
- **exemplares:** physical copies of a book (`tombo`, state: `disponivel`, `emprestado`, `manutencao`)
- **leitores:** readers (name, registration, profile: `aluno` or `professor`)
- **emprestimos:** loans linking a reader and a copy

Full CRUD: livros, exemplares and leitores.

## Endpoints

### Livros

| Method | Route | Description |
|---|---|---|
| GET | `/livros` | List books (filter `?titulo=`) |
| GET | `/livros/:id` | Get a book |
| POST | `/livros` | Create a book (`titulo` and `autor` required, unique ISBN) |
| PUT | `/livros/:id` | Update a book |
| DELETE | `/livros/:id` | Delete a book (blocked if it has copies) |
| GET | `/livros/:id/disponibilidade` | Total and available copies |

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

Example body for `POST /emprestimos`:

```json
{ "leitorId": 1, "exemplarId": 1 }
```

## Business rules

1. **Loan limit by profile:** students can have up to 3 active loans (7 days) and teachers up to 5 (15 days). Example: a student with 3 active loans trying to borrow a fourth gets `409`.
2. **Block by overdue loan:** a reader with an overdue loan cannot borrow new books. Example: a loan due yesterday still active returns `403` on a new loan.

## Planned for the final delivery

Return and renewal of loans, fine calculation for late returns and book ratings.