import CostDistribution from '../models/costDistributionModel.js';
import User from '../models/userModel.js';
import Event from '../models/eventsModel.js';
import { sequelize } from '../db.js';


export const getAllCostDistributions = async (req, res) => {
  try {
    const costDistributions = await CostDistribution.findAll({
      include: [
        { model: User, attributes: ['name', 'surname'] },
        { model: Event, attributes: ['titulo'] }
      ]
    });
    res.status(200).json({ code: 1, message: 'Lista de distribuciones de costo', data: costDistributions });
  } catch (error) {
    res.status(500).json({ code: -100, message: 'Error al obtener las distribuciones de costo', error });
  }
};

export const getCostDistributionById = async (req, res) => {
  try {
    const { id } = req.params;
    const costDistribution = await CostDistribution.findByPk(id, {
      include: [
        { model: User, attributes: ['name', 'surname'] },
        { model: Event, attributes: ['titulo'] }
      ]
    });
    if (!costDistribution) {
      return res.status(404).json({ code: -6, message: 'Distribución de costos no encontrada' });
    }
    res.status(200).json({ code: 1, message: 'Distribución de costos encontrada', data: costDistribution });
  } catch (error) {
    res.status(500).json({ code: -100, message: 'Error al obtener la distribución de costos', error });
  }
};

export const getCostDistributionsByViajeId = async (req, res) => {
  const { id_viaje } = req.params;

  try {
    const costDistributions = await CostDistribution.findAll({
      include: [
        {
          model: Event,
          where: { viaje_id: id_viaje },
          attributes: ['titulo', 'costo', 'user_id_paid']
        },
        {
          model: User,
          attributes: ['name', 'surname', 'id_user']
        }
      ]
    });

    if (costDistributions.length === 0) {
      return res.status(404).json({ message: 'No se encontraron distribuciones de costos para este viaje' });
    }

    res.status(200).json({ message: 'Distribuciones de costos', data: costDistributions });
  } catch (error) {
    console.error("Error al obtener las distribuciones de costos: ", error);
    res.status(500).json({ message: 'Error al obtener distribuciones de costos', error });
  }
};

export const getTotalPaidByUsers = async (req, res) => {
  const { id_viaje } = req.params;

  try {
    const totalPaidByUsers = await sequelize.query(`
      SELECT
        Event.user_id_paid AS user_id,
        SUM(Event.costo) AS total_paid,
        User.name,
        User.surname
      FROM Events AS Event
      INNER JOIN Users AS User ON Event.user_id_paid = User.id_user
      WHERE Event.viaje_id = :id_viaje
      GROUP BY Event.user_id_paid, User.name, User.surname;
    `, {
      replacements: { id_viaje },
      type: sequelize.QueryTypes.SELECT
    });

    console.log('Pagos totales encontrados:', totalPaidByUsers);

    if (!totalPaidByUsers || totalPaidByUsers.length === 0) {
      return res.status(404).json({ message: 'No se encontraron pagos para este viaje' });
    }

    res.status(200).json({ message: 'Pagos totales por usuario', data: totalPaidByUsers });
  } catch (error) {
    console.error('Error al obtener pagos totales:', error);
    res.status(500).json({ message: 'Error al obtener pagos totales', error });
  }
};

export const getSumCostDistributionsByUser = async (req, res) => {
  const { id_viaje } = req.params;

  try {
    const sumCostDistributions = await sequelize.query(`
      SELECT SUM(CostDistributions.amount) AS total_amount, CostDistributions.user_id
      FROM CostDistributions
      LEFT JOIN Events ON CostDistributions.event_id = Events.id_event
      WHERE Events.viaje_id = :id_viaje
      GROUP BY CostDistributions.user_id;
    `, {
      replacements: { id_viaje },
      type: sequelize.QueryTypes.SELECT
    });

    if (!sumCostDistributions || sumCostDistributions.length === 0) {
      return res.status(404).json({ message: 'No se encontraron distribuciones de costos para este viaje' });
    }

    res.status(200).json({ message: 'Sumas de distribuciones por usuario', data: sumCostDistributions });
  } catch (error) {
    console.error('Error al obtener la suma de las distribuciones:', error);
    res.status(500).json({ message: 'Error al obtener la suma de las distribuciones', error });
  }
};

export const createCostDistribution = async (req, res) => {
  try {
    const { event_id, user_id, amount } = req.body;
    const newCostDistribution = await CostDistribution.create({ event_id, user_id, amount });
    res.status(201).json({ code: 1, message: 'Distribución de costos creada', data: newCostDistribution });
  } catch (error) {
    res.status(500).json({ code: -100, message: 'Error al crear la distribución de costos', error });
  }
};

export const getUserBalanceByTrip = async (req, res) => {
  const { id_viaje } = req.params;

  try {
    const userBalances = await sequelize.query(`
      SELECT
        u.id_user,
        u.name,
        u.surname,
        COALESCE((SELECT SUM(e.costo)
                  FROM Events e
                  WHERE e.user_id_paid = u.id_user
                  AND e.viaje_id = :id_viaje), 0) AS total_pagado,
        COALESCE((SELECT SUM(cd.amount)
                  FROM CostDistributions cd
                  LEFT JOIN Events e2 ON cd.event_id = e2.id_event
                  WHERE cd.user_id = u.id_user
                  AND e2.viaje_id = :id_viaje), 0) AS total_deuda,
        COALESCE((SELECT SUM(e.costo)
                  FROM Events e
                  WHERE e.user_id_paid = u.id_user
                  AND e.viaje_id = :id_viaje), 0) -
        COALESCE((SELECT SUM(cd.amount)
                  FROM CostDistributions cd
                  LEFT JOIN Events e2 ON cd.event_id = e2.id_event
                  WHERE cd.user_id = u.id_user
                  AND e2.viaje_id = :id_viaje), 0) AS balance
      FROM Users u
      WHERE EXISTS (SELECT 1 FROM Events e WHERE e.viaje_id = :id_viaje AND e.user_id_paid = u.id_user)
         OR EXISTS (SELECT 1 FROM CostDistributions cd LEFT JOIN Events e2 ON cd.event_id = e2.id_event WHERE e2.viaje_id = :id_viaje AND cd.user_id = u.id_user)
    `, {
      replacements: { id_viaje },
      type: sequelize.QueryTypes.SELECT
    });

    res.status(200).json({ message: 'Balance por usuario', data: userBalances });
  } catch (error) {
    console.error('Error al obtener el balance por usuario:', error);
    res.status(500).json({ message: 'Error al obtener el balance por usuario', error });
  }
};


export const updateCostDistribution = async (req, res) => {
  try {
    const { id } = req.params;
    const { event_id, user_id, amount } = req.body;
    const costDistribution = await CostDistribution.findByPk(id);
    if (!costDistribution) {
      return res.status(404).json({ code: -6, message: 'Distribución de costos no encontrada' });
    }
    await costDistribution.update({ event_id, user_id, amount });
    res.status(200).json({ code: 1, message: 'Distribución de costos actualizada', data: costDistribution });
  } catch (error) {
    res.status(500).json({ code: -100, message: 'Error al actualizar la distribución de costos', error });
  }
};

export const deleteCostDistribution = async (req, res) => {
  try {
    const { id } = req.params;
    const costDistribution = await CostDistribution.findByPk(id);
    if (!costDistribution) {
      return res.status(404).json({ code: -6, message: 'Distribución de costos no encontrada' });
    }
    await costDistribution.destroy();
    res.status(200).json({ code: 1, message: 'Distribución de costos eliminada' });
  } catch (error) {
    res.status(500).json({ code: -100, message: 'Error al eliminar la distribución de costos', error });
  }
};
