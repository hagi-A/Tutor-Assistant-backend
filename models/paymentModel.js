const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema({
          amount: { type: Number, required: true },
          currency: { type: String, required: true },
          email: { type: String, required: false },
          first_name: { type: String, required: false },
          last_name: { type: String, required: false },
          phone_number: { type: Number, required: true },
          tx_ref: { type: String, required: true },
},{collection:"Chapa"});

const Payment = mongoose.model("Payment", paymentSchema);
module.exports = Payment