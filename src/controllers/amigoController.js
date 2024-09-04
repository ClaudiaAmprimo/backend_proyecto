import Amigos from '../models/amigosModel.js';
import User from '../models/userModel.js';
import { Op } from 'sequelize';
import { validationResult } from 'express-validator';
import UsersViajes from '../models/usersViajesModel.js';

export const getAmigos = async (req, res) => {
  try {
    const userId = req.user.id_user;

    const amigos = await User.findByPk(userId, {
      include: [
        {
          model: User,
          as: 'Friends',
          attributes: ['id_user', 'name', 'surname', 'email', 'photo']
        }
      ]
    });

    res.status(200).json(amigos.Friends);
  } catch (error) {
    console.error('Error al obtener amigos:', error);
    res.status(500).json({ message: 'Error al obtener amigos' });
  }
};

export const addAmigo = async (req, res) => {
  try {
    const { amigo_id } = req.body;
    const userId = req.user.id_user;

    if (userId === amigo_id) {
      return res.status(400).json({ message: 'No puedes agregarte a ti mismo como amigo' });
    }

    const existingFriendship = await Amigos.findOne({
      where: {
        [Op.or]: [
          { user_id: userId, amigo_id },
          { user_id: amigo_id, amigo_id: userId }
        ]
      }
    });

    if (existingFriendship) {
      return res.status(400).json({ message: 'Este usuario ya es tu amigo' });
    }

    await Amigos.create({ user_id: userId, amigo_id });
    await Amigos.create({ user_id: amigo_id, amigo_id: userId });

    res.status(201).json({ message: 'Amigo agregado con éxito' });
  } catch (error) {
    console.error('Error al agregar amigo:', error);
    res.status(500).json({ message: 'Error al agregar amigo', error: error.message });
  }
};

export const removeAmigo = async (req, res) => {
  try {
    const { amigo_id } = req.params;
    const userId = req.user.id_user;

    const deleted1 = await Amigos.destroy({ where: { user_id: userId, amigo_id } });
    const deleted2 = await Amigos.destroy({ where: { user_id: amigo_id, amigo_id: userId } });

    if (deleted1 === 0 && deleted2 === 0) {
      return res.status(404).json({ message: 'Amigo no encontrado' });
    }

    res.status(200).json({ message: 'Amigo eliminado con éxito' });
  } catch (error) {
    console.error('Error al eliminar amigo:', error);
    res.status(500).json({ message: 'Error al eliminar amigo', error: error.message });
  }
};

export const getFriendsByViaje = async (req, res) => {
  try {
    const { viajeId } = req.params;

    const usersViajes = await UsersViajes.findAll({
      where: { viaje_id: viajeId },
      include: [
        {
          model: User,
          as: 'User',
          attributes: ['id_user', 'name', 'surname', 'email', 'photo']
        }
      ]
    });

    if (!usersViajes.length) {
      return res.status(404).json({
        message: 'No se encontraron amigos asociados a este viaje'
      });
    }

    const friends = usersViajes.map(uv => uv.User);

    res.status(200).json(friends);

  } catch (error) {
    console.error('Error al obtener los amigos del viaje:', error);
    res.status(500).json({ message: 'Error al obtener los amigos del viaje' });
  }
};

export const searchUsers = async (req, res) => {
  try {
    const query = req.query.q;

    if (!query) {
      return res.status(200).json([]);
    }

    const users = await User.findAll({
      where: {
        [Op.or]: [
          { name: { [Op.like]: `%${query}%` } },
          { surname: { [Op.like]: `%${query}%` } },
          { email: { [Op.like]: `%${query}%` } }
        ]
      },
      attributes: ['id_user', 'name', 'surname', 'email']
    });

    res.status(200).json(users);
  } catch (error) {
    console.error('Error al buscar usuarios:', error);
    res.status(500).json({ message: 'Error al buscar usuarios' });
  }
};
