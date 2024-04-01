const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const jwt = require("jsonwebtoken");

const multer = require("multer");
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => cb(null, Date.now() + "-" + file.originalname),
});
const upload = multer({ storage });

function getUserIdFromToken(req) {
  // Récupérer le jeton JWT à partir des en-têtes de la requête
  const authorizationHeader = req.user;
  if (!authorizationHeader) {
    throw new Error("Authorization header is missing");
  }
  const token = authorizationHeader.split(" ")[1];
  // Décoder le jeton pour obtenir les informations de l'utilisateur
  const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
  // Récupérer l'ID de l'utilisateur à partir des informations décodées
  const userId = decodedToken.userId;
  return userId;
}

async function addHome(req, res) {
  upload.array("images", 10)(req, res, async (err) => {
    try {
      if (err) {
        return res.status(500).json({
          error: "Erreur inattendue lors du téléchargement des fichiers",
        });
      }

      const { title, description, bedrooms, bathrooms, rent, addressId } =
        req.body;
      
      const userId = getUserIdFromToken(req);
      let images = [];
      if (req.files && req.files.length > 0) {
        images = req.files.map((file) => file.path);
      }

      const newHome = await createHome(
        title,
        description,
        bedrooms,
        bathrooms,
        rent,
        addressId,
        userId
      );

      const createdImages = await createImages(newHome.id, images);

      res.status(201).json({
        message: "Maison ajoutée avec succès",
        newHome,
        createdImages,
      });
    } catch (error) {
      console.error("Erreur lors de l'ajout de la maison :", error);
      res.status(500).json({ error: "Erreur lors de l'ajout de la maison" });
    }
  });
}

async function createHome(title, description, bedrooms, bathrooms, rent, addressId, userId) {
  const newHome = await prisma.house.create({
    data: {
      title,
      rent: parseFloat(rent),
      description,
      bedrooms: parseInt(bedrooms),
      bathrooms: parseInt(bathrooms),
      address: {
        connect: { id: addressId },
      },
      bailleur: { connect: { id: userId } } // Ajout de l'utilisateur en tant que bailleur de la maison
    },
  });
  return newHome;
}

async function createImages(homeId, images) {
  const createdImages = [];
  for (const imagePath of images) {
    const newImage = await prisma.images.create({
      data: {
        url: imagePath,
        house: {
          connect: { id: homeId },
        },
      },
    });
    createdImages.push(newImage);
  }
  return createdImages;
}

module.exports = { addHome };

async function getAllHomes(req, res) {
  try {
    const homes = await prisma.house.findMany();
    res.status(200).json({ success: true, data: homes });
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
