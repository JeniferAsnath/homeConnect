const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const logout = async (req, res) => {
  const token = req.headers['authorization'];

  req.logout();
  if (!req.session) {
    req.session.destroy(function(err) {
      res.redirect('/login');
    });

  }
  res.clearCookie(process.env.SESSION_NAME)

  // Ajouter le token à la liste noire (table blacklisted_tokens)
  await prisma.blacklistedToken.create({
    data: {
      token: token,
    },
  });

  res.json({ message: 'Déconnexion réussie.' });
};

module.exports = logout;
