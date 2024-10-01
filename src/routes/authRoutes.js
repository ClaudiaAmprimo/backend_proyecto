import { Router } from 'express';
import { register, login, logout, forgotPassword, changePassword } from '../controllers/authController.js';
import { registerValidator, loginValidator, forgotPasswordValidator, changePasswordValidator } from '../validations/auth.Validation.js'
import { uploadFileMiddleware } from '../middlewares/upload.js';

const router = Router();

// Rutas para registrarse e iniciar sesión
router.post('/register', uploadFileMiddleware, registerValidator, register);
// router.post('/register', registerValidator, register);
router.post('/login', loginValidator, login);
router.post('/forgot-password', forgotPasswordValidator, forgotPassword);
router.post('/change-password', changePasswordValidator, changePassword);
router.get('/logout', logout);

export default router;
