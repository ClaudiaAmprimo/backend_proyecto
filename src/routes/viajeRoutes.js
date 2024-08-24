import { Router } from 'express';
import { getViajes, getViajeById, createViaje, updateViaje, deleteViaje} from '../controllers/viajeController.js';
import { authenticateToken } from '../middlewares/authenticateToken.js';

const router = Router();

router.get('/', authenticateToken(['user']), getViajes);
router.get('/:id', authenticateToken(['user']), getViajeById);
router.post('/', authenticateToken(['user']), createViaje);
router.patch('/:id', authenticateToken(['user']), updateViaje);
router.delete('/:id', authenticateToken(['user']), deleteViaje);

export default router;
