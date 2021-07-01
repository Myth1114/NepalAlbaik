const mongoose = require("mongoose");
const validator = require("validator");
const ordersSchema = new mongoose.Schema(
  {
    userID: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    orderItems: [
      {
        quantity: { type: Number, required: true },
        option: String,
        // price: { type: Number, required: true },
        _id: {
          type: mongoose.Schema.Types.ObjectId,
          required: true,
          ref: "Product",
        },
      },
    ],
    orderAddress: {},

    originalPrice: {
      type: Number,
      required: true,
      min: 100,
    },
    isPaid: {
      type: Boolean,
      required: true,
      default: false,
    },
    paidAt: {
      type: Date,
    },
    isDelivered: {
      type: String,
      required: true,
      enum: ["Pending Confirmation", "confirmed", "delivered", "cancelled"],
      default: "Pending Confirmation",
    },
    deliveredAt: {
      type: Date,
    },
    orderTime: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
);
const orders = mongoose.model("orders", ordersSchema);
module.exports = orders;
