const express = require('express');
const logger = require('./middlewares/logger');

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(logger);

app.get('/', (req, res) => {
  res.send('API da Biblioteca no ar');
});

app.use('/livros', require('./routes/livros'));
app.use('/exemplares', require('./routes/exemplares'));
app.use('/leitores', require('./routes/leitores'));
app.use('/emprestimos', require('./routes/emprestimos'));

app.use((req, res) => {
  res.status(404).json({ erro: 'Rota não encontrada' });
});

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});