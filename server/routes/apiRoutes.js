import express from 'express';
import upload from '../middleware/upload.js';
import { classifyWaste } from '../controllers/classificationController.js';
import { getHistory, addHistoryItem, deleteHistoryItem } from '../controllers/historyController.js';

const router = express.Router();

// Classification route
router.post('/classifications', upload.single('image'), classifyWaste);

// History routes
router.get('/history', getHistory);
router.post('/history', addHistoryItem);
router.delete('/history/:id', deleteHistoryItem);

export default router;
