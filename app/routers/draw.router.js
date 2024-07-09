import express from 'express';
import drawController from '../controllers/draw.controller.js';

const router = express.Router();

router.get('/draw', drawController.getParticipants);

export default router;