import express from 'express';
import logger from './middlewares/logger.js';
import { errorHandler } from './middlewares/errorHandler.js';
import livrosRoutes from './routes/livros.routes.js';
import exemplaresRoutes from './routes/exemplares.routes.js';
import leitoresRoutes from './routes/leitores.routes.js';
import emprestimosRoutes from './routes/emprestimos.routes.js';

const app = express();

app.use(express.json());
app.use(logger);
app.use(errorHandler);
app.get('/', (req, res) => {
  res.send('API da Biblioteca no ar');
});

app.use('/livros', livrosRoutes);
app.use('/exemplares', exemplaresRoutes);
app.use('/leitores', leitoresRoutes);
app.use('/emprestimos', emprestimosRoutes);

// generic 404: must be the last route handler
app.use((req, res) => {
  res.status(404).json({ erro: 'Rota não encontrada' });
});

app.use(errorHandler);

export default app;