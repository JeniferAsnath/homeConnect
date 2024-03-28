const express = require('express');
const router = express.Router();
const HomeController = require('../controllers/homeController');

router.post('/', HomeController.addHome);

router.get('/', HomeController.getAllHomes);

router.get('/popularHome', HomeController.getPopularHomes);

router.get('/nearbyHome', HomeController.getNearbyHomes);

module.exports = router;
