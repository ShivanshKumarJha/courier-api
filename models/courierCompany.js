const mongoose = require('mongoose');

const courierCompanySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    logo: {
      type: String,
      required: true,
    },
    establishedYear: {
      type: Number,
      required: true,
    },
    estimatedDeliveryDate: {
      type: String,
    },
    contactNumber: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const courierCompany = mongoose.model('CourierCompany', courierCompanySchema);
module.expors = courierCompany;
