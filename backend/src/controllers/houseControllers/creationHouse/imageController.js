// addressController.js

const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function createAddress(req, res) {
  const { url } = req.body.images;

  try {
    const newAddress = await prisma.address.create({
      data: {
        url,
        houses : {
          connect : { id : houseId}
        }
      },
    });
    return newImage; 
  }catch (error) {
    console.error("Erreur lors de la création de l'image :", error);
    throw new Error("Erreur lors de la création de l'image");
  }
}

module.exports = { createAddress };
