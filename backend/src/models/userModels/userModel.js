// model/User.js
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const createUser = async (userData) => {
    try {
      const newUser = await prisma.user.create({
        data: userData,
      });
      return newUser;
    } catch (error) {
      if (error.code === 'P2002' && error.meta?.target?.includes('email')) {
        // Gérer l'erreur d'unicité pour l'adresse e-mail ici
        throw new Error('L\'adresse e-mail est déjà utilisée.');
      } else {
        // Gérer d'autres erreurs ici
        throw new Error('Une erreur s\'est produite lors de l\'enregistrement de l\'utilisateur.');
      }
    }
  };

module.exports = { createUser };
