import { Router } from 'express';
import { getAmigos, addAmigo, removeAmigo, searchUsers, getFriendsByViaje } from '../controllers/amigoController.js';
import { authenticateToken } from '../middlewares/authenticateToken.js';

const router = Router();

router.get('/', authenticateToken(['user']), getAmigos);
router.get('/search', authenticateToken(['user']), searchUsers);
router.post('/', authenticateToken(['user']), addAmigo);
router.delete('/:amigo_id', authenticateToken(['user']), removeAmigo);
router.get('/by-viaje/:viajeId', authenticateToken(['user']), getFriendsByViaje);

export default router;
