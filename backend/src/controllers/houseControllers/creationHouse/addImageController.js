const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const multer = require("multer");

// Définition de la configuration de stockage pour Multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "public/uploads/"), // Le répertoire où les fichiers seront stockés
  filename: (req, file, cb) => cb(null, Date.now() + "-" + file.originalname), // Nom du fichier
});

// Initialisation de Multer avec la configuration de stockage
const upload = multer({ storage });

async function handleRoute(req, res) {
  try {
    // Utilisation du middleware upload.single() pour gérer le téléchargement d'une seule image
    upload.array("image", 10)(req, res, async function (err) {
      if (err) {
        return res.status(500).json({
          error: "Erreur inattendue lors du téléchargement des fichiers",
        });
      }

      // Récupération du chemin de l'image téléchargée
      const imagePath = req.file.path;

      const { houseId } = req.body;

      // Vérifier l'existence de la maison
      const house = await prisma.house.findUnique({ where: { id: houseId } });
      if (!house) {
        return res.status(404).send("Maison non trouvée.");
      }

      // Appel à la fonction de création d'image avec le chemin de l'image et l'ID de la maison
      const newImage = await createImage(imagePath, houseId);

      // Envoi de la réponse
      res.status(200).json({ message: "Image téléchargée avec succès.", newImage });
    });
  } catch (error) {
    console.error("Erreur lors du traitement de la requête:", error);
    return res.status(500).send("Erreur interne du serveur.");
  }
}

// Fonction pour créer une nouvelle image dans la base de données
async function createImage(imagePath, houseId) {
  try {
    const newImage = await prisma.images.create({
      data: {
        url: imagePath,
        house: {
          connect: { id: houseId },
        },
      },
    });
    console.log("Nouvelle image:", newImage);
    return newImage;
  } catch (error) {
    console.error("Erreur lors de la création de l'image:", error);
    throw error; // Vous pouvez gérer cette erreur comme vous le souhaitez
  }
}

module.exports = {
  handleRoute,
};
