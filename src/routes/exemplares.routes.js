import { Router } from 'express';
import * as ExemplaresController from '../controllers/exemplares.controller.js';

const router = Router();

router.get('/', ExemplaresController.listar);
router.get('/:id', ExemplaresController.buscar);
router.post('/', ExemplaresController.criar);
router.put('/:id', ExemplaresController.atualizar);
router.delete('/:id', ExemplaresController.remover);

export default router;