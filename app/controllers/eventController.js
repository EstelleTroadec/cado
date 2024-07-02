import Event from '../models/Event.js';

const eventController = {
async createEvent (req, res) {
    try {
        const newEvent = await Event.create(req.body);
        return res.status(201).json(newEvent);
    }
    
    catch (error) { res.status(500).json({ message: 'Internal server error' });
    }
},

    async getEvents (req, res) {
        try {
            const allEvents = await Event.findAll();
            return res.status(200).json(allEvents);
        }
        
        catch (error) { res.status(500).json({ message: 'Internal server error' });
        }

    },

    async getOneEvent (req, res) {
        try {
            const event = await Event.findByPk(req.params.id);
            if (!event) {
                return res.status(404).json({ message: 'Event not found' });
            }
            return res.status(200).json(event);

        } 
        
        catch (error) { res.status(404).json({ message: 'Event not found' });
        }

    },

    async updateEvent (req, res) { 
        try {
            const event = await Event.findByPk(req.params.id);
            if (!event) {
                return res.status(404).json({ message: 'Event not found' });
            }
            await event.update(req.body);
            return res.status(200).json({ message: 'Event updated' });

            // const updatedEvent = await event.update(req.body);
            // return res.status(200).json({ message: 'Event updated', updatedEvent });
        } 
        
        catch (error) { res.status(500).json({ message: 'Internal server error' });
        }

    },

    async deleteEvent (req, res) {
        try {
            const event = await Event.findByPk(req.params.id);
            if (!event) {
                return res.status(404).json({ message: 'Event not found' });
            }
            await event.destroy();
            return res.json({ message: 'Event deleted' });

            // await event.destroy();
            // return res.status(200).json({ message: 'Event deleted', event });
        }

        catch (error) { res.status(500).json({ message: 'Internal server error' });
        }

    },
};

export default eventController