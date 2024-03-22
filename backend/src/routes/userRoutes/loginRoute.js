const express = require('express');
const router = express.Router();
const { login } = require('../../controllers/userControllers/loginController.js');

router.post('/', login);

module.exports = router;
