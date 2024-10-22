const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  department: { type: String, required: true},
  leaves: {
    casual: { type: Number, default: 2 },
    sick: { type: Number, default: 2 },
  },
  appliedLeaves: [
    {
      leaveType: { type: String, enum: ['casual', 'sick'], required: true },
      startDate: { type: Date, required: true },
      endDate: { type: Date, required: true },
      duration: Number,
    },
  ],
});
const User = mongoose.model('User', userSchema);
module.exports = User;
