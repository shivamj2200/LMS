
const User = require('../models/user');

// Create new user
const createUser = async (req, res) => {
  const { username, department } = req.body;
  const newUser = new User({ username, department });

  try {
    await newUser.save();
    res.status(201).json(newUser);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get all users (for dropdown)
const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({}, 'username department');
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

module.exports = {
  createUser,
  getAllUsers,
};
