import app from './app.js';
import { connectDatabase } from './config/database.js';

const PORT = 3000;

async function start() {
  try {
    await connectDatabase();
    app.listen(PORT, () => {
      console.log(`Servidor rodando em http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error('Falha ao iniciar o servidor:', error.message);
    process.exit(1);
  }
}

start();