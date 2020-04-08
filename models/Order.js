const mongoose = require("mongoose");
const slugify = require("slugify");

const OrderSchema = new mongoose.Schema({
  //
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  total: {
    type: Decimal128,
    required: true,
  },
  items: [{ type: mongoose.Schema.Types.ObjectId, ref: "Item" }],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Order", OrderSchema);
