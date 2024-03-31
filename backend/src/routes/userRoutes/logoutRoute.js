const express = require('express');
const router = express.Router();
const  logout  = require('../../controllers/userControllers/logout.js');
const { verifyToken } = require('../../middleware/authMiddleware.js');


router.get('/', verifyToken, logout);

module.exports = router;
