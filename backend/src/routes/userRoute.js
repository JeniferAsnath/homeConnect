const express = require('express');
const router = express.Router();
const { getAllUsers } = require('../../src/controllers/userController.js');

router.get('/', getAllUsers);

module.exports = router;