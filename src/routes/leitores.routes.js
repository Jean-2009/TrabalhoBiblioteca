import { Router } from 'express';
import * as LeitoresController from '../controllers/leitores.controller.js';

const router = Router();

router.get('/', LeitoresController.listar);
router.get('/:id/historico', LeitoresController.historico);
router.get('/:id', LeitoresController.buscar);
router.post('/', LeitoresController.criar);
router.put('/:id', LeitoresController.atualizar);
router.delete('/:id', LeitoresController.remover);

export default router;