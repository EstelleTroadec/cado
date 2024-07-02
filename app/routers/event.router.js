import express from 'express';

import eventController from '../controllers/eventController.js';

const router = express.Router();

router.get('/events', eventController.getEvents);

router.get('/:id', eventController.getOneEvent);

router.post('/', eventController.createEvent);

router.put('/:id', eventController.updateEvent);

router.delete('/:id', eventController.deleteEvent);

export default router;