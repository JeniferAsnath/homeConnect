// houseRoutes.js

const express = require('express');
const router = express.Router();
const House = require('../models/House');

// Route pour la réservation de visites
router.post('/houses/:houseId/visits', async (req, res) => {
  const { houseId } = req.params;
  const { visitDate } = req.body;

  try {
    const house = await House.findById(houseId);
    if (!house) {
      return res.status(404).json({ error: 'House not found' });
    }

    // Logique de validation de la date de visite (par exemple, vérifier la disponibilité)

    // Mettre à jour la maison avec la nouvelle visite réservée
    house.visits.push({ date: visitDate });
    await house.save();

    res.status(201).json({ message: 'Visit reserved successfully' });
  } catch (error) {
    console.error('Error reserving visit:', error);
    res.status(500).json({ error: 'Failed to reserve visit' });
  }
});

module.exports = router;
