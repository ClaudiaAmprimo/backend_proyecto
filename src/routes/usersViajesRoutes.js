import { Router } from 'express';
import { getUsersViajes, createUsersViajes, deleteUsersViajes } from '../controllers/usersViajesController.js';
import { authenticateToken } from '../middlewares/authenticateToken.js';

const router = Router();

router.get('/', authenticateToken(['user']), getUsersViajes);
router.post('/', authenticateToken(['user']), createUsersViajes);
router.delete('/:user_id/:viaje_id', authenticateToken(['user']), deleteUsersViajes);

export default router;
