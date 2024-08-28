import { Router } from 'express';
import { getAmigos, addAmigo, removeAmigo, searchUsers } from '../controllers/amigoController.js';
import { authenticateToken } from '../middlewares/authenticateToken.js';

const router = Router();

router.get('/', authenticateToken(['user']), getAmigos);
router.get('/search', authenticateToken(['user']), searchUsers);
router.post('/', authenticateToken(['user']), addAmigo);
router.delete('/:amigo_id', authenticateToken(['user']), removeAmigo);

export default router;
