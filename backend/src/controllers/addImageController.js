// Importez les modules nécessaires
const express = require('express');
const multer = require('multer'); // Middleware pour gérer les fichiers multipart
const prisma = require('@prisma/client');

const router = express.Router();

// Configurez le middleware pour gérer les fichiers multipart
const upload = multer({ dest: 'uploads/' }); // Destination où les fichiers seront enregistrés temporairement

// Route pour gérer l'upload des images
router.post('/upload', upload.single('file'), async (req, res) => {
  try {
    // Vérifiez si un fichier a été envoyé
    if (!req.file) {
      return res.status(400).json({ error: 'Aucun fichier envoyé' });
    }

    // Enregistrez les informations sur l'image dans la base de données en utilisant Prisma
    const { originalname, filename, mimetype, size } = req.file;
    const imageUrl = `http://your-backend-domain.com/uploads/${filename}`; // L'URL où l'image est accessible

    const image = await prisma.image.create({
      data: {
        originalname,
        filename,
        mimetype,
        size,
        imageUrl,
      },
    });

    // Envoyez une réponse avec les informations sur l'image enregistrée
    res.status(201).json({ success: true, image });
  } catch (error) {
    console.error('Erreur lors de l\'upload de l\'image :', error);
    res.status(500).json({ error: 'Erreur lors de l\'upload de l\'image' });
  }
});

module.exports = router;
