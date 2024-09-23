// houseController.js

const House = require('../models/House');

// Fonction pour réserver une visite pour une maison
const reserveVisit = async (req, res) => {
  const { houseId } = req.params;
  const { visitDate } = req.body;

  try {
    // Vérifier la disponibilité de la date de visite
    const house = await House.findById(houseId);
    if (!house) {
      return res.status(404).json({ error: 'House not found' });
    }

    // Vérifier si la date de visite est déjà réservée
    const isDateAvailable = house.visits.every(visit => visit.date !== visitDate);
    if (!isDateAvailable) {
      return res.status(400).json({ error: 'Visit date is not available' });
    }

    // Enregistrer la réservation de visite dans la base de données
    house.visits.push({ date: visitDate });
    await house.save();

    res.status(201).json({ message: 'Visit reserved successfully' });
  } catch (error) {
    console.error('Error reserving visit:', error);
    res.status(500).json({ error: 'Failed to reserve visit' });
  }
};

module.exports = {
  reserveVisit
};
// reservationController.js

const Reservation = require('../models/Reservation');
const User = require('../models/User');
const NotificationService = require('../services/NotificationService');

// Fonction pour créer une nouvelle réservation de visite
const createReservation = async (req, res) => {
  const { userId, houseId, visitDate } = req.body;

  try {
    // Créer la réservation dans la base de données
    const reservation = await Reservation.create({ userId, houseId, visitDate });

    // Récupérer les informations sur la maison et le bailleur
    const house = await House.findById(houseId);
    const landlord = await User.findById(house.landlordId);

    // Envoyer une notification au bailleur
    NotificationService.sendNotification(landlord.deviceToken, 'Nouvelle réservation de visite', 'Une nouvelle réservation de visite a été effectuée pour votre maison');

    res.status(201).json(reservation);
  } catch (error) {
    console.error('Error creating reservation:', error);
    res.status(500).json({ error: 'Failed to create reservation' });
  }
};

module.exports = {
  createReservation
};
