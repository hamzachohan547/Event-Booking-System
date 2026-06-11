const express = require("express");
const router = express.Router();
const Payment = require("../models/Payment");

// Make payment
router.post("/", async (req, res) => {
    const { userId, eventId, method, amount } = req.body;
    const payment = new Payment({ userId, eventId, method, amount });
    await payment.save();
    res.json({ message: "Payment done successfully", payment });
});

module.exports = router;
