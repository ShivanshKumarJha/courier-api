const jwt = require('jsonwebtoken');
const User = require('../models/user');
const { JWT_SECRET } = require('../config/environments');

const createToken = async user => {
  // console.log(`Inside the createToken: ${user}`);
  return jwt.sign(
    {
      email: user.email,
      name: user.name,
      userId: user._id.toString(),
    },
    JWT_SECRET,
    { expiresIn: '1d' },
  );
};

const getUser = async (req, res) => {
  res.send({ message: 'Hello from user router' });
};

// POST Signup controller
const postSignup = async (req, res) => {
  const userDetails = req.body;

  try {
    const user = await User.signup(userDetails);
    // console.log(`user details are: ${user}\n`);

    const token = await createToken(user);
    // console.log(`token is ${token}`);

    res.status(200).json({ user, token });
  } catch (err) {
    res.status(400).json({ error: err });
  }
};

// POST Login Controller
const postLogin = async (req, res) => {
  const { email, password } = req.body;
  // console.log(`Email:${email} Password:${password}`);

  try {
    const user = await User.login(email, password);
    // console.log(`user details are: ${user}\n`);

    const token = await createToken(user);
    // console.log(`token is ${token}`);

    res.status(200).json({ user, token });
  } catch (err) {
    res.status(400).json({ error: err });
  }
};

module.exports = { getUser, postSignup, postLogin };
