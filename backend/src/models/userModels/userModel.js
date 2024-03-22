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
        throw new Error('L\'adresse e-mail est déjà utilisée.');
      } else {
        throw new Error('Une erreur s\'est produite lors de l\'enregistrement de l\'utilisateur.');
      }
    }
  };
  const findUserByIdentity = async (identity) => {
    return await prisma.user.findFirst({
      where: {
        OR: [
          {
            email: identity // Utiliser l'identifiant fourni comme email
          },
          {
            phoneNumber: identity // Ou comme numéro de téléphone
          }
        ]
      }
    });
  };
  
  

module.exports = { createUser, findUserByIdentity };
