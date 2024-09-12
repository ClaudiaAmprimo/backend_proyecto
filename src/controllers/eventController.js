import Event from '../models/eventsModel.js';
import UsersViajes from '../models/usersViajesModel.js';
import { validationResult } from 'express-validator';

export const getEvents = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const userId = req.user.id_user;
    const { categoria } = req.query;

    const userViajes = await UsersViajes.findAll({ where: { user_id: userId } });
    const viajeIds = userViajes.map(userViaje => userViaje.viaje_id);

    // const events = await Event.findAll({ where: { viaje_id: viajeIds } });
    const whereClause = { viaje_id: viajeIds };
    if (categoria) {
      whereClause.categoria = categoria;
    }
    const events = await Event.findAll({ where: whereClause });


    res.status(200).json({
      code: 1,
      message: 'Events List',
      data: events
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      code: -100,
      message: 'Ha ocurrido un error al obtener los eventos'
    });
  }
};

export const getEventById = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { id } = req.params;
    const event = await Event.findByPk(id);
    if (!event) {
      return res.status(404).json({
        code: -6,
        message: 'Evento no encontrado'
      });
    }

    const userId = req.user.id_user;
    const userViaje = await UsersViajes.findOne({ where: { user_id: userId, viaje_id: event.viaje_id } });
    if (!userViaje) {
      return res.status(403).json({
        code: -10,
        message: 'No tiene permiso para acceder a este evento.'
      });
    }

    res.status(200).json({
      code: 1,
      message: 'Event Detail',
      data: event
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      code: -100,
      message: 'Ha ocurrido un error al obtener el evento'
    });
  }
};

export const getEventsByViajeId = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { id_viaje } = req.params;
    const userId = req.user.id_user;

    console.log(`Obteniendo eventos para viaje: ${id_viaje}`);

    const userViaje = await UsersViajes.findOne({ where: { user_id: userId, viaje_id: id_viaje } });
    if (!userViaje) {
      return res.status(403).json({
        code: -10,
        message: 'No tiene permiso para acceder a los eventos de este viaje.'
      });
    }

    const events = await Event.findAll({ where: { viaje_id: id_viaje } });

    if (events.length === 0) {
      return res.status(404).json({
        code: -6,
        message: 'No se encontraron eventos para el viaje especificado'
      });
    }

    res.status(200).json({
      code: 1,
      message: 'Events List',
      data: events
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      code: -100,
      message: 'Ha ocurrido un error al obtener los eventos'
    });
  }
};

export const createEvent = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { titulo, ubicacion, fecha_inicio, fecha_fin, costo, comentarios, categoria, viaje_id, user_id_create } = req.body;

    if (!user_id_create) {
      return res.status(400).json({
        code: -5,
        message: 'User ID is required'
      });
    }

    const newEvent = await Event.create({
      titulo,
      ubicacion,
      fecha_inicio,
      fecha_fin,
      costo,
      comentarios,
      categoria,
      viaje_id,
      user_id_create
    });

    res.status(201).json({
      code: 1,
      message: 'Event Added Successfully',
      data: newEvent
    });
  } catch (error) {
    console.error('Error creating event:', error);
    res.status(500).json({
      code: -100,
      message: 'Ha ocurrido un error al añadir el evento'
    });
  }
};

export const updateEvent = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { id } = req.params;
    const event = await Event.findByPk(id);
    if (!event) {
      return res.status(404).json({
        code: -6,
        message: 'Evento no encontrado'
      });
    }

    await event.update(req.body);
    res.status(200).json({
      code: 1,
      message: 'Event Updated Successfully',
      data: event
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      code: -100,
      message: 'Ha ocurrido un error al actualizar el evento'
    });
  }
};

export const deleteEvent = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { id } = req.params;
    const event = await Event.findByPk(id);
    if (!event) {
      return res.status(404).json({
        code: -6,
        message: 'Evento no encontrado'
      });
    }

    await event.destroy();
    res.status(200).json({
      code: 1,
      message: 'Event Deleted Successfully'
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      code: -100,
      message: 'Ha ocurrido un error al eliminar el evento'
    });
  }
};
