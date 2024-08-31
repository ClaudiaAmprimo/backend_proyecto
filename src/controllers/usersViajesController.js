import UsersViajes from '../models/usersViajesModel.js';
import { validationResult } from 'express-validator';

export const getUserViajes = async (req, res) => {
  try {
    const user_id = req.user.id_user;
    const usersViajes = await UsersViajes.findAll({ where: { user_id } });

    if (usersViajes.length === 0) {
      return res.status(404).json({
        code: -6,
        message: 'No tiene viajes asociados'
      });
    }

    res.status(200).json({
      code: 1,
      message: 'UserViajes List',
      data: usersViajes
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      code: -100,
      message: 'Ha ocurrido un error al obtener los viajes del usuario'
    });
  }
};

export const createUsersViajes = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { user_id, viaje_id } = req.body;

    const existingAssociation = await UsersViajes.findOne({ where: { user_id, viaje_id } });
    if (existingAssociation) {
      return res.status(400).json({
        code: -1,
        message: 'La asociación ya existe'
      });
    }

    const newUserViaje = await UsersViajes.create({ user_id, viaje_id });
    res.status(201).json({
      code: 1,
      message: 'UsersViajes Added Successfully',
      data: newUserViaje
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      code: -100,
      message: 'Ha ocurrido un error al añadir el usuario_viaje'
    });
  }
};

export const deleteUsersViajes = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { user_id, viaje_id } = req.params;
    const usersViajes = await UsersViajes.findOne({ where: { user_id, viaje_id } });
    if (!usersViajes) {
      return res.status(404).json({
        code: -6,
        message: 'Usuario_Viaje no encontrado'
      });
    }

    await usersViajes.destroy();
    res.status(200).json({
      code: 1,
      message: 'Usuario_Viaje Deleted Successfully'
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      code: -100,
      message: 'Ha ocurrido un error al eliminar el usuario_viaje'
    });
  }
};
