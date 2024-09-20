import express from 'express';
import {getAllCostDistributions, getCostDistributionById, createCostDistribution,
  updateCostDistribution, deleteCostDistribution, getCostDistributionsByViajeId,
  getTotalPaidByUsers, getSumCostDistributionsByUser, getUserBalanceByTrip, getUserBalanceByUser} from '../controllers/costDistributionController.js';

const router = express.Router();

router.get('/', getAllCostDistributions);
router.get('/:id', getCostDistributionById);
router.get('/viaje/:id_viaje', getCostDistributionsByViajeId);
router.get('/total-paid/:id_viaje', getTotalPaidByUsers);
router.get('/sum-by-user/:id_viaje', getSumCostDistributionsByUser);
router.get('/user-balance/:id_viaje', getUserBalanceByTrip);
router.get('/balance-by-user/:id_viaje/:user_id', getUserBalanceByUser);
router.post('/', createCostDistribution);
router.put('/:id', updateCostDistribution);
router.delete('/:id', deleteCostDistribution);

export default router;
