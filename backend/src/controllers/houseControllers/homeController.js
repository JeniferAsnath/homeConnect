const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const { verifyToken } = require("../../middleware/authMiddleware");
const jwt = require("jsonwebtoken");
const secretKey = process.env.JWT_SECRET;
async function addHome(req, res) {
  try {
    const { title, description, bedrooms, bathrooms, rent, addressId, userId } = req.body;

    // Vérification que userId est défini et non vide
    if (!userId) {
      return res.status(400).json({ message: "userId is required" });
    }

    // Vérification de l'identité de l'utilisateur et des autorisations
    const user = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      return res.status(403).json({ message: "Unauthorized action" });
    }

    // Création de la maison
    const newHouse = await createHome(
      title,
      description,
      bedrooms,
      bathrooms,
      rent,
      addressId,
      userId
    );

    res.status(201).json({
      message: "Maison ajoutée avec succès",
      newHouse,
    });
  } catch (error) {
    console.error("Erreur lors de l'ajout de la maison :", error);
    res.status(500).json({ error: "Erreur lors de l'ajout de la maison" });
  }
}

async function createHome(
  title,
  description,
  bedrooms,
  bathrooms,
  rent,
  addressId,
  userId
) {
  const newHouse = await prisma.house.create({
    data: {
      title,
      rent: parseFloat(rent),
      description,
      bedrooms: parseInt(bedrooms),
      bathrooms: parseInt(bathrooms),
      address: {
        connect: { id: addressId },
      },
      bailleur: { connect: { id: userId } },
    },
  });
  return  newHouse;
}

async function getAllHomes(req, res) {
  try {
    const houses = await prisma.house.findMany();
    res.status(200).json({ success: true, data: houses });
  } catch (error) {
    console.error("Erreur lors de la récupération des maisons :", error);
    res.status(500).json({
      success: false,
      message: "Erreur lors de la récupération des maisons",
    });
  }
}

async function getPopularHomes(req, res) {
  try {
    const popularHomes = await Home.getPopularHomes();
    res.status(200).json({ success: true, data: popularHomes });
  } catch (error) {
    console.error(
      "Erreur lors de la récupération des maisons populaires :",
      error
    );
    res.status(500).json({
      success: false,
      message: "Erreur lors de la récupération des maisons populaires",
    });
  }
}

async function getNearbyHomes(req, res) {
  try {
    const { latitude, longitude } = req.query;
    const nearbyHomes = await Home.getNearbyHomes(latitude, longitude);
    res.status(200).json({ success: true, data: nearbyHomes });
  } catch (error) {
    console.error(
      "Erreur lors de la récupération des maisons proches :",
      error
    );
    res.status(500).json({
      success: false,
      message: "Erreur lors de la récupération des maisons proches",
    });
  }
}


module.exports = {
  addHome,
  getAllHomes,
  getPopularHomes,
  getNearbyHomes,
};
