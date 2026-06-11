const mongoose = require("mongoose");
const eventSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    eventType: String,
    date: Date,
    phone: String,
    name: String
});
module.exports = mongoose.model("Event", eventSchema);
