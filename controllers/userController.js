const getUser = async (req, res) => {
  res.send({ message: 'Hello from user router' });
};

module.exports = { getUser };
