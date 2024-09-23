const express = require('express');
const router = express.Router();
const { logout } = require('../../controllers/userControllers/logout');
const { createBailleur } = require('../controllers/bailleurController');

router.post("/bailleurs", createBailleur)

module.exports = router;
