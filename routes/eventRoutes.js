const express = require("express");
const router = express.Router();
const Event = require("../models/Event");

// Book Event
// router.post("/", async (req, res) => {
//     const { userId, eventType, date, phone } = req.body;
//     const event = new Event({ userId, eventType, date, phone });
//     await event.save();
//     res.json({ message: "Event booked successfully", event });
// });

// // Get all events for a user
// router.get("/:userId", async (req, res) => {
//     const events = await Event.find({ userId: req.params.userId });
//     res.json(events);
// });
router.post("/", async (req, res) => {
  const event = new Event(req.body);
  await event.save();

  res.json({
    message: "Event booked successfully",
    eventId: event._id
  });
});


module.exports = router;
