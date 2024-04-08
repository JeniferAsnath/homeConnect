const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const logout = async (req, res) => {
  const token = req.headers['authorization'];

  // Ajouter le token à la liste noire (table blacklisted_tokens)
  await prisma.blacklistedToken.create({
    data: {
      token: token,
    },
  });

  // Répondre avec un message de déconnexion réussie
  res.json({ message: 'Déconnexion réussie.' });
};

module.exports = logout;
