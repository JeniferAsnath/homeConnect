// addressController.js

const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function createAddress(req, res) {
  const { street, city, country, postalCode } = req.body.address;

  try {
    const newAddress = await prisma.address.create({
      data: {
        street,
        city,
        country,
        postalCode
        
      },
    });
    return newAddress; 
  }catch (error) {
    console.error("Erreur lors de la création de l'adresse :", error);
    throw new Error("Erreur lors de la création de l'adresse");
  }
}

module.exports = { createAddress };
