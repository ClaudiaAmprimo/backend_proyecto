// src/middlewares/authenticateToken.js
import jwt from 'jsonwebtoken';
import User from '../models/userModel.js';

export const authenticateToken = (allowedRoles) => async (req, res, next) => {
  try {
    const { cookies } = req;
    const accessToken = cookies.token;

    console.log('Token received in backend:', accessToken);
    if (!accessToken) {
      return res.status(401).json({
        code: -50,
        message: 'No se ha proporcionado un token de acceso'
      });
    }

    const decodedToken = jwt.verify(accessToken, process.env.JWT_SECRET);
    console.log('Token decoded:', decodedToken);

    const user = await User.findByPk(decodedToken.id_user);
    console.log("User found:", user);
    if (!user) {
      return res.status(401).json({
        code: -70,
        message: 'Token de acceso no válido'
      });
    }

    const hasPermission = user.roles.some(role => allowedRoles.includes(role));
    console.log("User has permission:", hasPermission);
    if (!hasPermission) {
      return res.status(403).json({
        code: -10,
        message: 'No tiene los permisos necesarios.'
      });
    }

    req.user = user;
    next();
  } catch (error) {
    console.error(error);
    console.error("Error in authenticateToken middleware:", error); 
    res.status(500).json({
      code: -100,
      message: 'Ha ocurrido un error al autenticar el token de acceso'
    });
  }
};
