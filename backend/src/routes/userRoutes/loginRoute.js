const express = require('express');
const router = express.Router();
const { login, profile } = require('../../controllers/userControllers/loginController.js');

router.post('/', login);
router.post('/', profile);

module.exports = router;
