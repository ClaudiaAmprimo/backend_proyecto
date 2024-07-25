import { Router } from 'express';
import { getUserViajes, createUsersViajes, deleteUsersViajes } from '../controllers/usersViajesController.js';
import { authenticateToken } from '../middlewares/authenticateToken.js';

const router = Router();

router.get('/', authenticateToken(['user']), getUserViajes);
router.post('/', authenticateToken(['user']), createUsersViajes);
router.delete('/:user_id/:viaje_id', authenticateToken(['user']), deleteUsersViajes);

export default router;
