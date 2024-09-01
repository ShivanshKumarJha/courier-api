const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../config/environments');

const isAuth = async (req, res) => {
  const authHeader = req.get('Authorization');
  if (!authHeader) {
    const error = new Error('Not authenticated.');
    error.statusCode = 401;
    throw error;
  }

  const token = authHeader.split(' ')[1];
  let decodedtoken;
  try {
    decodedtoken = jwt.verify(token, JWT_SECRET);
  } catch (err) {
    err.statusCode = 500;
  }

  if (!decodedtoken) {
    const error = new Error('Not authenticated.');
    error.statusCode = 401;
    throw error;
  }

  req.userId = decodedtoken.userId;
};

module.exports = { isAuth };
