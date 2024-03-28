const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function createUser(firstName, lastName, email, phoneNumber, password, userType) {
  try {
    const newUser = await prisma.user.create({
      data: {
        firstName,
        lastName,
        email,
        phoneNumber,
        password,
        [userType.toLowerCase()]: {} 
      }
    });
    return newUser;
  } catch (error) {
    if (error.code === 'P2002' && error.meta?.target?.includes('email')) {
      throw new Error('L\'adresse e-mail est déjà utilisée.');
    } else {
      throw new Error('Une erreur s\'est produite lors de l\'enregistrement de l\'utilisateur.');
    }
  }
}

async function findUserByIdentity(identity) {
  return await prisma.user.findFirst({
    where: {
      OR: [
        {
          email: identity 
        },
        {
          phoneNumber: identity 
        }
      ]
    }
  });
}

module.exports = { createUser, findUserByIdentity };
