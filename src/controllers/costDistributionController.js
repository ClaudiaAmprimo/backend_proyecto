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
      SELECT
        SUM(CostDistributions.amount) AS total_amount,
        CostDistributions.user_id,
        Users.name,
        Users.surname
      FROM CostDistributions
      LEFT JOIN Events ON CostDistributions.event_id = Events.id_event
      LEFT JOIN Users ON CostDistributions.user_id = Users.id_user
      WHERE Events.viaje_id = :id_viaje
      GROUP BY CostDistributions.user_id, Users.name, Users.surname;
    `, {
      replacements: { id_viaje },
      type: sequelize.QueryTypes.SELECT
    });

    const formattedSumCostDistributions = sumCostDistributions.map(sum => ({
      ...sum,
      total_amount: parseFloat(sum.total_amount) || 0
    }));

    if (!formattedSumCostDistributions || formattedSumCostDistributions.length === 0) {
      return res.status(404).json({ message: 'No se encontraron distribuciones de costos para este viaje' });
    }

    res.status(200).json({ message: 'Sumas de distribuciones por usuario', data: formattedSumCostDistributions });
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
        cd.id AS cost_distribution_id,
        cd.amount,
        deudor.id_user AS deudor_id,
        deudor.name AS deudor_name,
        deudor.surname AS deudor_surname,
        acreedor.id_user AS acreedor_id,
        acreedor.name AS acreedor_name,
        acreedor.surname AS acreedor_surname,
        (cd.amount - cd.paid_amount) AS net_balance,
        cd.paid_amount
      FROM CostDistributions cd
      JOIN Events e ON cd.event_id = e.id_event
      JOIN Users deudor ON cd.user_id = deudor.id_user
      JOIN Users acreedor ON e.user_id_paid = acreedor.id_user
      WHERE e.viaje_id = :id_viaje
        AND deudor.id_user <> acreedor.id_user
        AND (cd.amount - cd.paid_amount) > 0
    `, {
      replacements: { id_viaje },
      type: sequelize.QueryTypes.SELECT
    });

    const formattedBalances = userBalances.map(balance => ({
      ...balance,
      net_balance: parseFloat(balance.net_balance),
      paid_amount: parseFloat(balance.paid_amount),
      cost_distribution_id: parseInt(balance.cost_distribution_id, 10),
      amount: parseFloat(balance.amount)
    }));

    console.log('Formatted Balances:', formattedBalances);

    res.status(200).json({ message: 'Balance por usuario', data: formattedBalances });
  } catch (error) {
    console.error('Error al obtener el balance por usuario:', error);
    res.status(500).json({ message: 'Error al obtener el balance por usuario', error });
  }
};

export const getUserBalanceByUser = async (req, res) => {
  const { user_id, id_viaje } = req.params;

  try {
    const userBalances = await sequelize.query(`
      SELECT
        cd.id AS cost_distribution_id,
        cd.paid_amount,
        deudor.id_user AS deudor_id,
        acreedor.id_user AS acreedor_id,
        deudor.name AS deudor_name,
        deudor.surname AS deudor_surname,
        acreedor.name AS acreedor_name,
        acreedor.surname AS acreedor_surname,
        SUM(CASE
            WHEN cd.user_id = deudor.id_user THEN cd.amount
            ELSE 0
            END) AS balance_deudor_a_acreedor,
        SUM(CASE
            WHEN cd.user_id = acreedor.id_user THEN cd.amount
            ELSE 0
            END) AS balance_acreedor_a_deudor,
        SUM(CASE
            WHEN cd.user_id = deudor.id_user THEN cd.amount
            ELSE -cd.amount
            END) AS net_balance,
        SUM(CASE
            WHEN e.user_id_paid = deudor.id_user THEN e.costo
            ELSE 0
            END) AS total_pagado_deudor,
        SUM(CASE
            WHEN e.user_id_paid = acreedor.id_user THEN e.costo
            ELSE 0
            END) AS total_pagado_acreedor,
        (SUM(CASE
            WHEN cd.user_id = deudor.id_user THEN cd.amount
            ELSE -cd.amount
            END) - SUM(CASE
            WHEN e.user_id_paid = deudor.id_user THEN e.costo
            ELSE 0
            END)) AS balance_final
      FROM CostDistributions cd
      JOIN Events e ON cd.event_id = e.id_event
      JOIN Users deudor ON cd.user_id = deudor.id_user
      JOIN Users acreedor ON e.user_id_paid = acreedor.id_user
      WHERE e.viaje_id = :id_viaje
        AND deudor.id_user <> acreedor.id_user
      GROUP BY deudor.id_user, acreedor.id_user, cd.id
      HAVING balance_final <> 0;
    `, {
      replacements: { id_viaje, user_id },
      type: sequelize.QueryTypes.SELECT
    });

    const formattedBalances = userBalances.map(balance => ({
      ...balance,
      balance_deudor_a_acreedor: parseFloat(balance.balance_deudor_a_acreedor),
      balance_acreedor_a_deudor: parseFloat(balance.balance_acreedor_a_deudor),
      net_balance: parseFloat(balance.net_balance)
    }));

    if (userBalances.length === 0) {
      return res.status(200).json({ message: 'No hay deudas o acreencias para este usuario.', data: [] });
    }

    res.status(200).json({ message: 'Deudas y acreencias del usuario', data: userBalances });
  } catch (error) {
    console.error('Error al obtener balance de usuario:', error);
    res.status(500).json({ message: 'Error al obtener balance de usuario', error });
  }
};

export const payDebt = async (req, res) => {
  const { id } = req.params;
  const { paymentAmount } = req.body;

  try {
    const costDistribution = await CostDistribution.findOne({ where: { id } });

    if (!costDistribution) {
      return res.status(404).json({ message: 'Distribución de costos no encontrada.' });
    }

    const remainingAmount = parseFloat(costDistribution.amount) - parseFloat(costDistribution.paid_amount);
    const parsedPaymentAmount = parseFloat(paymentAmount);

    if (parsedPaymentAmount > remainingAmount) {
      return res.status(400).json({ message: 'El monto a pagar excede la deuda restante.' });
    }

    costDistribution.paid_amount = parseFloat(costDistribution.paid_amount) + parsedPaymentAmount;

    await costDistribution.save();

    return res.status(200).json({ message: 'Deuda pagada con éxito.', data: costDistribution });
  } catch (error) {
    console.error('Error al procesar el pago de la deuda:', error);
    return res.status(500).json({ message: 'Error al procesar el pago de la deuda.', error });
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
