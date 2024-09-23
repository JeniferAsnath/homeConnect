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
// server.js

const express = require('express');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware pour parser le corps des requêtes en JSON
app.use(express.json());

// Route pour créer un bailleur
app.post('/bailleurs', async (req, res) => {
  const { userId } = req.body;
  try {
    const bailleur = await prisma.bailleur.create({
      data: {
        userId: userId
        // Vous pouvez ajouter d'autres champs spécifiques au bailleur ici si nécessaire
      }
    });
    res.status(201).json(bailleur);
  } catch (error) {
    console.error('Erreur lors de la création du bailleur :', error);
    res.status(500).send('Erreur lors de la création du bailleur.');
  }
});

// Route pour obtenir tous les bailleurs
app.get('/bailleurs', async (req, res) => {
  try {
    const bailleurs = await prisma.bailleur.findMany({
      include: { user: true } // Inclure les détails de l'utilisateur associé
    });
    res.json(bailleurs);
  } catch (error) {
    console.error('Erreur lors de la récupération des bailleurs :', error);
    res.status(500).send('Erreur lors de la récupération des bailleurs.');
  }
});

// Route pour obtenir un bailleur par ID
app.get('/bailleurs/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const bailleur = await prisma.bailleur.findUnique({
      where: { id: parseInt(id) },
      include: { user: true } // Inclure les détails de l'utilisateur associé
    });
    if (!bailleur) {
      return res.status(404).send('Bailleur non trouvé.');
    }
    res.json(bailleur);
  } catch (error) {
    console.error('Erreur lors de la récupération du bailleur :', error);
    res.status(500).send('Erreur lors de la récupération du bailleur.');
  }
});

// Route pour mettre à jour un bailleur par ID
app.put('/bailleurs/:id', async (req, res) => {
  const { id } = req.params;
  const { userId } = req.body;
  try {
    const updatedBailleur = await prisma.bailleur.update({
      where: { id: parseInt(id) },
      data: {
        userId: userId
        // Vous pouvez ajouter d'autres champs spécifiques au bailleur à mettre à jour ici si nécessaire
      }
    });
    res.json(updatedBailleur);
  } catch (error) {
    console.error('Erreur lors de la mise à jour du bailleur :', error);
    res.status(500).send('Erreur lors de la mise à jour du bailleur.');
  }
});

// Route pour supprimer un bailleur par ID
app.delete('/bailleurs/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await prisma.bailleur.delete({
      where: { id: parseInt(id) }
    });
    res.send('Bailleur supprimé avec succès.');
  } catch (error) {
    console.error('Erreur lors de la suppression du bailleur :', error);
    res.status(500).send('Erreur lors de la suppression du bailleur.');
  }
});

