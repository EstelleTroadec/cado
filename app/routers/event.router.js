const express = require('express');

const router = express.Router();

const eventController = require('../controllers/eventController.js');


router.get('/', eventController.getEvents);

router.get('/:id', eventController.getOneEvent);

router.post('/', eventController.createEvent);

router.put('/:id', eventController.updateEvent);

router.delete('/:id', eventController.deleteEvent);

export default { router, eventController };