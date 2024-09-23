const { prisma } = require("./models");
const { signup } = require ("")

async function createVisitor(userId, userType) {
  try {
    return await prisma.visitor.create({
      data: {
        user: {
          connect: { id: userId }
        }
      }
    });
  } catch (error) {
    throw new Error("Erreur lors de la création du visiteur.");
  }
}

// D'autres fonctions CRUD pour les visiteurs peuvent être ajoutées ici

module.exports = { createVisitor };
