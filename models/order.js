const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema(
  {
    consignmentNo: {
      type: String,
      required: true,
      unique: true,
    },
    photoUrl: {
      type: String,
      required: true,
    },
    dateOfOrder: {
      type: Date,
      default: Date.now(),
    },
    status: {
      type: String,
      enum: ['pending', 'shipped', 'delivered', 'cancelled'],
      default: 'pending',
      required: true,
    },
    fromAddress: {
      type: String,
      required: true,
    },
    toAddress: {
      type: String,
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    gst: {
      type: String,
      enum: ['cgst', 'sgst', 'igst'],
    },
    othersCost: [
      {
        name: { type: String },
        amount: { type: Number },
      },
    ],
    courierCompany: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'courierCompany',
      required: true,
    },
  },
  { timestamps: true }
);

const Order = mongoose.model('Order', orderSchema);
module.exports = Order;
