
const express = require('express');
const userController = require('../controller/userController');
const router = express.Router();
router.post('/users', userController.createUser);
router.get('/users', userController.getAllUsers);

module.exports = router;
