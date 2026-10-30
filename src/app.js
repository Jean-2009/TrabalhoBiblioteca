import express from 'express';
import logger from './middlewares/logger.js';
import livrosRoutes from './routes/livros.js';
import exemplaresRoutes from './routes/exemplares.js';
import leitoresRoutes from './routes/leitores.js';
import emprestimosRoutes from './routes/emprestimos.js';

const app = express();

app.use(express.json());
app.use(logger);

app.get('/', (req, res) => {
  res.send('API da Biblioteca no ar');
});

app.use('/livros', livrosRoutes);
app.use('/exemplares', exemplaresRoutes);
app.use('/leitores', leitoresRoutes);
app.use('/emprestimos', emprestimosRoutes);

// generic 404: must be the last one
app.use((req, res) => {
  res.status(404).json({ erro: 'Rota não encontrada' });
});

export default app;