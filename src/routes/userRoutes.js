// src/routes/userRoutes.js
import { Router } from 'express';
import { getUser, uploadPhoto, updateUserProfile, deleteUser } from '../controllers/userController.js';
import { authenticateToken } from '../middlewares/authenticateToken.js';
import { uploadFileMiddleware } from '../middlewares/upload.js';


const router = Router();

// Rutas para obtener y modificar los datos de los usuarios
router.get('/', authenticateToken(['user']), getUser);
router.post("/upload-photo", authenticateToken(['user']), uploadFileMiddleware, uploadPhoto);
router.put('/profile', authenticateToken(['user']), uploadFileMiddleware, updateUserProfile);
router.delete('/profile', authenticateToken(['user']), deleteUser);

export default router;
