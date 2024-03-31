const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const getAllUsers = async (req, res) => {
  try {
    const users = await prisma.user.findMany({
      include: { bailleur: true, visitor: true } // Inclut les bailleurs et les visiteurs associés dans la réponse
    });
    res.json(users);
  } catch (error) {
    console.error('Erreur lors de la récupération des utilisateurs :', error);
    res.status(500).send('Erreur lors de la récupération des utilisateurs.');
  }
};

module.exports = { getAllUsers };