// routes/userRoutes.js
const express = require('express');
const { signup } = require('../../controllers/userControllers/signupController.js');

const router = express.Router();

// Route pour l'enregistrement d'un nouvel utilisateur
router.post('/', signup);

module.exports = router;
