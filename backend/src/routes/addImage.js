const express = require('express');
const router = express.Router();
const {handleRoute} = require('../controllers/houseControllers/creationHouse/addImageController.js');


router.post('/',  handleRoute);

module.exports = router;
