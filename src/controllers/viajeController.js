import Viaje from '../models/viajeModel.js';
import UsersViajes from '../models/usersViajesModel.js';
import User from '../models/userModel.js';
import { validationResult } from 'express-validator';

export const getViajes = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const userId = req.user.id_user;

    const userViajes = await UsersViajes.findAll({ where: { user_id: userId } });
    const viajeIds = userViajes.map(uv => uv.viaje_id);

    const viajes = await Viaje.findAll({ where: { id_viaje: viajeIds } });

    res.status(200).json({
      code: 1,
      message: 'Viajes List',
      data: viajes
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      code: -100,
      message: 'Ha ocurrido un error al obtener los viajes'
    });
  }
};

export const getViajeById = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { id } = req.params;
    const viaje = await Viaje.findByPk(id);
    if (!viaje) {
      return res.status(404).json({
        code: -6,
        message: 'Viaje no encontrado'
      });
    }

    const userId = req.user.id_user;
    const userViaje = await UsersViajes.findOne({ where: { user_id: userId, viaje_id: id } });
    if (!userViaje) {
      return res.status(403).json({
        code: -10,
        message: 'No tiene permiso para acceder a este viaje.'
      });
    }

    res.status(200).json({
      code: 1,
      message: 'Viaje Detail',
      data: viaje
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      code: -100,
      message: 'Ha ocurrido un error al obtener el viaje'
    });
  }
};

export const createViaje = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const newViaje = await Viaje.create(req.body);
    const userId = req.user.id_user;

    await UsersViajes.create({
      user_id: userId,
      viaje_id: newViaje.id_viaje
    });

    res.status(201).json({
      code: 1,
      message: 'Viaje Added Successfully and Associated with the User',
      data: newViaje
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      code: -100,
      message: 'Ha ocurrido un error al añadir el viaje'
    });
  }
};

export const updateViaje = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { id } = req.params;
    const viaje = await Viaje.findByPk(id);
    if (!viaje) {
      return res.status(404).json({
        code: -6,
        message: 'Viaje no encontrado'
      });
    }

    await viaje.update(req.body);
    res.status(200).json({
      code: 1,
      message: 'Viaje Updated Successfully',
      data: viaje
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      code: -100,
      message: 'Ha ocurrido un error al actualizar el viaje'
    });
  }
};

export const deleteViaje = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { id } = req.params;
    const viaje = await Viaje.findByPk(id);
    if (!viaje) {
      return res.status(404).json({
        code: -6,
        message: 'Viaje no encontrado'
      });
    }

    await viaje.destroy();
    res.status(200).json({
      code: 1,
      message: 'Viaje Deleted Successfully'
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      code: -100,
      message: 'Ha ocurrido un error al eliminar el viaje'
    });
  }
};
