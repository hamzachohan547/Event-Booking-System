const mongoose = require("mongoose");
const paymentSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    eventId: { type: mongoose.Schema.Types.ObjectId, ref: "Event" },
    method: String,
    amount: Number
});
module.exports = mongoose.model("Payment", paymentSchema);
