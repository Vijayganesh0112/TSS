const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/TSS");

const orderSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  companyName: { type: String, required: true },
  quantity: { type: Number, required: true },
  amount: { type: Number, required: true },
  status: { 
    type: String, 
    enum: [
      "Awaiting Token Amount", 
      "Pending Payment", 
      "Order Rejected", 
      "Payment Successful", 
      "Completed"
    ], 
    required: true 
  },
  transactionCopyUrl: { type: String, default: null },
  invoiceUrl: { type: String, default: null },
  avgPrice: { type: Number, required: true },
  date: { type: Date, default: Date.now },
  cancellationReason: { type: String, default: null }, // Added for storing reasons for cancellations
  deliveryETA: { type: String, default: null }, // Added for "Payment Successful" status
});

const Order = mongoose.model("Order", orderSchema);
module.exports = Order;
