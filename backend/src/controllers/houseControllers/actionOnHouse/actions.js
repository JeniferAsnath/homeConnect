// houseController.js
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Fonction pour récupérer toutes les maisons
const getHouses = async (req, res) => {
  try {
    const houses = await prisma.house.findMany();
    res.json(houses);
  } catch (error) {
    console.error('Error fetching houses:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Fonction pour récupérer les détails d'une maison par son ID
const getHouseById = async (req, res) => {
  const { id } = req.params;
  try {
    const house = await prisma.house.findUnique({ where: { id } });
    if (house) {
      res.json(house);
    } else {
      res.status(404).json({ message: 'Maison non trouvée' });
    }
  } catch (error) {
    console.error('Error fetching house details:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Fonction pour enregistrer une vue sur une maison
const recordView = async (req, res) => {
  const { id } = req.params;
  try {
    await prisma.house.update({
      where: { id },
      data: { views: { increment: 1 } },
    });
    res.json({ message: 'View recorded successfully' });
  } catch (error) {
    console.error('Error recording view:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Fonction pour enregistrer la satisfaction concernant une maison
const recordSatisfaction = async (req, res) => {
  const { id } = req.params;
  const { score } = req.body;
  try {
    await prisma.house.update({
      where: { id },
      data: { satisfactionScore: score },
    });
    res.json({ message: 'Satisfaction recorded successfully' });
  } catch (error) {
    console.error('Error recording satisfaction:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Fonction pour noter une maison
const rateHouse = async (req, res) => {
  const { id } = req.params;
  const { value } = req.body;
  try {
    await prisma.house.update({
      where: { id },
      data: { rating: value },
    });
    res.json({ message: 'House rated successfully' });
  } catch (error) {
    console.error('Error rating house:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Fonction pour activer ou désactiver le bouton "Like" d'une maison
const toggleLike = async (req, res) => {
  const { id } = req.params;
  const { liked } = req.body;
  try {
    await prisma.house.update({
      where: { id },
      data: { liked },
    });
    res.json({ message: liked ? 'House liked' : 'House unliked' });
  } catch (error) {
    console.error('Error toggling like:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = {
  getHouses,
  getHouseById,
  recordView,
  recordSatisfaction,
  rateHouse,
  toggleLike,
};
