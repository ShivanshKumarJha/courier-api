const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
  {
    userType: {
      name: String,
      enum: ['company', 'individual', 'admin'],
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    companyName: {
      type: String, 
      default: '',
    },
    registrationYear: {
      type: Number,
      default: -1,
    },
    gmail: {
      type: String,
      required: true,
    },
    GSTNo: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    contactNumber: {
      type: String,
      required: true,
    },
    orders: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Order',
      },
    ],
    verified: {
      type: Boolean,
      default: false,
    },
    password: {
      type: String,
      required: true,
    },
    status: {
      type: Boolean,
      required: true,
    },
  },
  { timestamps: true }
);

const User = mongoose.model('User', userSchema);
module.exports = User;
