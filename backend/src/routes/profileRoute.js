const express = require('express');
const router = express.Router();
const { profile } = require('../controllers/userControllers/loginController');
const verifyToken = require('../middleware/authMiddleware');

router.get('/profile', verifyToken);

module.exports = router;
