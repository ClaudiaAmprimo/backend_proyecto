import { Router } from 'express';
import { getEvents, getEventById, createEvent, updateEvent, deleteEvent } from '../controllers/eventController.js';
import { authenticateToken } from '../middlewares/authenticateToken.js';

const router = Router();

router.get('/', authenticateToken(['user']), getEvents);
router.get('/:id', authenticateToken(['user']), getEventById);
router.post('/', authenticateToken(['user']), createEvent);
router.patch('/:id', authenticateToken(['user']), updateEvent);
router.delete('/:id', authenticateToken(['user']), deleteEvent);

export default router;
