const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const multer = require("multer");
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => cb(null, Date.now() + "-" + file.originalname),
});
const upload = multer({ storage });

const { createAddress } = require("./addressController");
const { createImage } = require("./imageController");

async function addHome(req, res) {
  upload.array("images", 10)(req, res, async (err) => {
    try {
      if (err) {
        return res.status(500).json({ error: "Erreur inattendue lors du téléchargement des fichiers" });
      }

      const { title, description, bedrooms, bathrooms, rent, bailleurId, visitorId } = req.body;
      const { street, city, country, postalCode } = req.body.address;

      let images = [];
      if (req.files && req.files.length > 0) {
        images = req.files.map((file) => file.path);
      }

      // Créer l'adresse
      const newAddress = await createAddress(req, res);

      // Créer la maison avec l'adresse associée
      const newHome = await prisma.house.create({
        data: {
          title,
          rent: parseFloat(rent),
          description,
          bedrooms: parseInt(bedrooms),
          bathrooms: parseInt(bathrooms),
          address: {
            connect: { id: newAddress.id }
          },
          
        },
      });

      // Créer les images associées à la maison
      const createdImages = [];
      for (const imagePath of images) {
        const newImage = await createImage(imagePath, newHome.id);
        createdImages.push(newImage);
      }

      res.status(201).json({ message: "Maison ajoutée avec succès", newHome, createdImages });
    } catch (error) {
      console.error("Erreur lors de l'ajout de la maison :", error);
      res.status(500).json({ error: "Erreur lors de l'ajout de la maison" });
    }
  });
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
