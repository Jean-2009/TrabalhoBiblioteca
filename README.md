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