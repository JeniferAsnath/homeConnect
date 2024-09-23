// houseController.js

const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

exports.getHouses = async (req, res) => {
  const houses = await prisma.house.findMany();
  res.json(houses);
};

exports.getHouseById = async (req, res) => {
  const { id } = req.params;
  const house = await prisma.house.findUnique({ where: { id } });
  res.json(house);
};

exports.getHouseRating = async (req, res) => {
  const { id } = req.params;
  // Logique pour récupérer l'évaluation de la maison avec l'id spécifié
  res.json({ houseId: id, rating: 4.5 }); // Exemple de réponse factice
};

exports.getHouseStats = async (req, res) => {
  // Logique pour calculer les statistiques sur les maisons
  const totalHouses = await prisma.house.count();
  const totalVisits = await prisma.visit.count();
  const totalLikes = await prisma.like.count();
  res.json({ total: totalHouses, visits: totalVisits, likes: totalLikes });
};

exports.getNotifications = async (req, res) => {
  // Logique pour récupérer les notifications pertinentes
  const notifications = await prisma.notification.findMany();
  res.json(notifications);
};

exports.getMessages = async (req, res) => {
  // Logique pour récupérer les messages pertinents
  const messages = await prisma.message.findMany();
  res.json(messages);
};
