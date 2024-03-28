const { prisma } = require("./models");

async function createBailleur(userId, userType) {
  try {
    return await prisma.buyer.create({
      data: {
        user: {
          connect: { id: userId }
        }
      }
    });
  } catch (error) {
    throw new Error("Erreur lors de la création de l'acheteur.");
  }
}

// D'autres fonctions CRUD pour les acheteurs peuvent être ajoutées ici

module.exports = { createBailleur };
