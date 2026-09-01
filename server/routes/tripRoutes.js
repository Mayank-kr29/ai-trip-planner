import express from 'express';
import { generateTripPlan, saveTripPlan, getTrip, getAllTrips, updateTripPlan, deleteTripPlan } from '../controllers/tripController.js';
import { authMiddleware } from '../middleware/authMiddleware.js';

const router = express.Router();

// Generate a new trip plan
router.post('/plan', authMiddleware, generateTripPlan);

// Save a generated trip plan
router.post('/save', authMiddleware, saveTripPlan);

// Update a generated trip plan
router.put('/save/:id', authMiddleware, updateTripPlan);

// Delete a saved trip plan
router.delete('/:id', authMiddleware, deleteTripPlan);

// Get all saved trips (history)
router.get('/', authMiddleware, getAllTrips);

// Get a saved trip by ID
router.get('/:id', authMiddleware, getTrip);

export default router;
