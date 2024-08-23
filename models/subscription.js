const mongoose = require('mongoose');

const subscriptionSchema = new mongoose.Schema(
  {
    order: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Order',
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ['approved', 'denied'],
      default: 'approved',
    },
    subscribedAt: {
      type: Date,
      default: Date.now(),
    },
  },
  { timestamps: true }
);

const Subscription = mongoose.model('Subscription', subscriptionSchema);
module.exports = Subscription;
