const Payment = require("../models/Payment");

class PaymentController {
    async makePayment(req, res) {
        const { userId, eventId, method } = req.body;
        const payment = new Payment({ userId, eventId, method,status: "paid" });
        await payment.save();
        res.json({ message: "Payment successful" });
    }
}

module.exports = new PaymentController();
