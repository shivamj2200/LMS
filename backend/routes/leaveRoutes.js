const express = require('express');
const { applyForLeave, getUserDashboard } = require('../controller/leaveController');
const router = express.Router();

router.post('/leaves', applyForLeave);
router.get('/users/:username/dashboard', getUserDashboard);

module.exports = router;
