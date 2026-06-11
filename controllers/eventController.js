const Event = require("../models/Event");

class EventController {
    async bookEvent(req, res) {
        const { userId, eventType, date } = req.body;
        const event = new Event({ userId, name: eventType, date });
        await event.save();
        res.json({ message: "Event booked successfully", eventId: event._id });
    }
}

module.exports = new EventController();
