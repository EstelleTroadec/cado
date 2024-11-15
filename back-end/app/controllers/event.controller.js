import { Event, User, Draw } from "../models/index.js";
import jwt from "jsonwebtoken";
import { sendEmail } from "../utils/sendEmail.js";
import { draw } from "../utils/draw.js";

export default {
  async createEvent(req, res) {
    const { name, date, organizer_id, max_price } = req.body;
    if (!name || !date || !organizer_id) {
      return res.status(400).json({ message: "Missing required fields" });
    }
    try {
      const event = await Event.create({
        name,
        date,
        organizer_id,
        max_price,
      });
      return res.status(201).json(event);
    } catch (error) {
      console.error(error.message);
      res.status(500).json({ message: "Internal server error" });
    }
  },
  async createEventWithParticipants(req, res) {
    const { name, date, participants, organizer_id, max_price } = req.body;
    if (!name || !date || !organizer_id || !participants) {
      return res.status(400).json({ message: "Missing required fields" });
    }
    try {
      const event = await Event.create({ name, date, organizer_id, max_price });
  
      // Add participants to the event
      let eventUsers = [];
      for (const participant of participants) {
        let user = await User.findOne({ where: { email: participant.email } });
  
        if (!user) {
          const token = jwt.sign({ email: participant.email }, process.env.JWT_SECRET);
          user = await User.create({
            name: participant.name,
            email: participant.email,
            is_registered: false,
            token: token
          });
        }
  
        // Link user to the Event
        await event.addParticipant(user);
        eventUsers.push(user); // Collect user for the draw
      }
  
      // Perform the draw
      const userNames = eventUsers.map(user => user.name); // Use names for the draw
      const pairs = draw(userNames);
  
      // Save the pairs in the Draw table and send emails
      for (let [giver, receiver] of Object.entries(pairs)) {
        const giverUser = eventUsers.find(user => user.name === giver);
        const receiverUser = eventUsers.find(user => user.name === receiver);
  
        // Save the draw pair in the Draw table
        await Draw.create({
          event_id: event.id,
          giver_id: giverUser.id,
          receiver_id: receiverUser.id
        });
        
        
        // Send email to giver with the receiver's name
        const signedLink = `http://localhost:5173/resultat/${giverUser.token}`;
        const subject = "Résultat du tirage au sort pour Cad'O";
        const html = `Bonjour ${giverUser.name}, tu dois offrir un cadeau à ${receiverUser.name}. Clique sur le lien pour voir les détails ${signedLink}`;
        sendEmail(giverUser.email, subject, html);
      }
  
      res.status(201).json({
        message: "Event and participants created successfully",
        event,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  },

  async getEvents(req, res) {
    try {
      const allEvents = await Event.findAll({
        include: {
          model: User,
          as: "participants",
          through: { attributes: [] },
          attributes: ["name", "email"],
        },
      });

      const formattedEvents = allEvents.map((event) => {
        const eventData = event.toJSON();
        const { participants, createdAt, updatedAt, ...rest } = eventData;
        return {
          ...rest,
          participants,
          createdAt,
          updatedAt,
        };
      });
      return res.status(200).json(formattedEvents);
    } catch (error) {
      console.error(error.message);
      res.status(500).json({ message: "Internal server error" });
    }
  },

  async getOneEvent(req, res) {
    try {
      const event = await Event.findByPk(req.params.id);
      if (!event) {
        return res.status(404).json({ message: "Event not found" });
      }
      return res.status(200).json(event);
    } catch (error) {
      res.status(404).json({ message: "Event not found" });
    }
  },

  async updateEvent(req, res) {
    const { id } = req.params;
    const { name, date, organizer_id, max_price } = req.body;
    try {
      const event = await Event.findByPk(id);
      if (!event) {
        return res.status(404).json({ message: "Event not found" });
      }

      await event.update({
        name,
        date,
        organizer_id,
        max_price,
      });
      return res.status(200).json({ message: "Event updated", event });
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  },

  async deleteEvent(req, res) {
    try {
      const event = await Event.findByPk(req.params.id);
      if (!event) {
        return res.status(404).json({ message: "Event not found" });
      }
      await event.destroy();
      return res.json({
        message: ` Event: ${event.id} / ${event.name} deleted`,
      });
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  },
};
