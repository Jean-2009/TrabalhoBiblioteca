import { Router } from 'express';
import * as EmprestimosController from '../controllers/emprestimos.controller.js';

const router = Router();

router.get('/', EmprestimosController.listar);
router.get('/:id', EmprestimosController.buscar);
router.post('/', EmprestimosController.criar);

export default router;