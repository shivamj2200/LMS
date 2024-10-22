const User = require('../models/user');

// Helper function to calculate duration
const calculateDuration = (startDate, endDate) => {
  const start = new Date(startDate);
  const end = new Date(endDate);
  return Math.ceil((end - start) / (1000 * 60 * 60 * 24)) + 1;
};

// Apply for leave
const applyForLeave = async (req, res) => {
  const { username, leaveType, startDate, endDate } = req.body;
  try {
    const user = await User.findOne({ username });
    if (!user) return res.status(404).json({ error: 'User not found' });

    const leaveDuration = calculateDuration(startDate, endDate);

    if (leaveType === 'casual' && user.leaves.casual < leaveDuration) {
      return res.status(400).json({ error: 'Not enough casual leaves' });
    }

    if (leaveType === 'sick' && user.leaves.sick < leaveDuration) {
      return res.status(400).json({ error: 'Not enough sick leaves' });
    }

    user.appliedLeaves.push({ leaveType, startDate, endDate, duration: leaveDuration });

    if (leaveType === 'casual') user.leaves.casual -= leaveDuration;
    if (leaveType === 'sick') user.leaves.sick -= leaveDuration;

    await user.save();
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

// Get user dashboard
const getUserDashboard = async (req, res) => {
  const { username } = req.params;
  try {
    const user = await User.findOne({ username }, 'leaves appliedLeaves');
    if (!user) return res.status(404).json({ error: 'User not found' });
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

module.exports = {
  applyForLeave,
  getUserDashboard,
};
