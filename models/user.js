const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema(
  {
    userType: {
      name: String,
      enum: ['company', 'individual', 'admin'],
      // required: true,
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
    email: {
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
        default: [],
      },
    ],
    password: {
      type: String,
      required: true,
    },
    status: {
      type: Boolean,
      required: true,
      default: true,
    },
  },
  { timestamps: true },
);

userSchema.statics.signup = async function (user) {
  const {
    userType,
    name,
    companyName,
    registrationYear,
    email,
    GSTNo,
    address,
    contactNumber,
    password,
  } = user;

  if (
    !email ||
    !password ||
    !userType ||
    !name ||
    !GSTNo ||
    !address ||
    !contactNumber
  ) {
    throw Error('All fields are required');
  }

  // TODO to check the status attribute also - which is being controlled by the admin side
  const exist = await this.findOne({ email });
  if (exist) throw Error('User already exists');

  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);

  return await this.create({ ...user, password: hash });
};

userSchema.statics.login = async (email, password) => {
  if (!email || !password) throw Error('Please enter complete details!');

  const user = await User.findOne({ email });
  if (!user) throw Error(`User doesn't exists`);

  const compare = await bcrypt.compare(password, user.password);
  if (!compare) throw Error(`Password doesn't match`);

  return user;
};

const User = mongoose.model('User', userSchema);
module.exports = User;
