import { Router } from 'express';
import { getMapboxToken, geocodeLocation } from '../controllers/mapboxController.js';

const router = Router();

router.get('/token', getMapboxToken);
router.get('/geocode', geocodeLocation);

export default router;
