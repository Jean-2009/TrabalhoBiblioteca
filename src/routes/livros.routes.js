import { Router } from 'express';
import * as LivrosController from '../controllers/livros.controller.js';

const router = Router();

router.get('/', LivrosController.listar);
router.get('/:id/disponibilidade', LivrosController.disponibilidade);
router.get('/:id', LivrosController.buscar);
router.post('/', LivrosController.criar);
router.put('/:id', LivrosController.atualizar);
router.delete('/:id', LivrosController.remover);

export default router;