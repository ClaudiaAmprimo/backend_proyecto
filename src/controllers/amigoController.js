import Amigos from '../models/amigosModel.js';
import User from '../models/userModel.js';
import { Op } from 'sequelize';
import { validationResult } from 'express-validator';

export const getAmigos = async (req, res) => {
  try {
    const userId = req.user.id_user;

    const amigos = await User.findByPk(userId, {
      include: [
        {
          model: User,
          as: 'Friends',
          attributes: ['id_user', 'name', 'surname', 'email']
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

    const existingFriendship = await Amigos.findOne({ where: { user_id: userId, amigo_id } });

    if (existingFriendship) {
      return res.status(400).json({ message: 'Este usuario ya es tu amigo' });
    }

    await Amigos.create({ user_id: userId, amigo_id });
    await Amigos.create({ user_id: amigo_id, amigo_id: userId });
    res.status(201).json({ message: 'Amigo agregado con éxito' });
  } catch (error) {
    console.error('Error al agregar amigo:', error);
    res.status(500).json({ message: 'Error al agregar amigo' });
  }
};


export const removeAmigo = async (req, res) => {
  try {
    const { amigo_id } = req.params;
    const userId = req.user.id_user;

    const amigo = await Amigos.findOne({ where: { user_id: userId, amigo_id } });
    if (!amigo) {
      return res.status(404).json({ message: 'Amigo no encontrado' });
    }

    await amigo.destroy();
    res.status(200).json({ message: 'Amigo eliminado con éxito' });
  } catch (error) {
    console.error('Error al eliminar amigo:', error);
    res.status(500).json({ message: 'Error al eliminar amigo' });
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
