import { Event } from "../models/event.model.js";

export const createEvent = async (req, res) => {
  try {
    const { title, startTime, endTime } = req.body;
    const event = await Event.create({
      title,
      startTime,
      endTime,
      userId: req.user.id
    });
    res.status(201).json({ message: "Event created", event });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getMyEvents = async (req, res) => {
  try {
    const events = await Event.find({ userId: req.user.id });
    res.json(events);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updateEvent = async (req, res) => {
  try {
    const event = await Event.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json({ message: "Event updated", event });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
