// routes.js

const express = require('express');
const router = express.Router();
const houseController = require('./houseController');

router.get('/houses', houseController.getHouses);
router.get('/houses/:id', houseController.getHouseById);
router.get('/houses/:id/rating', houseController.getHouseRating);
router.get('/houses/stats', houseController.getHouseStats);
router.get('/notifications', houseController.getNotifications);
router.get('/messages', houseController.getMessages);

module.exports = router;
