const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function getHomes() {
  try {
    const homes = await prisma.home.findMany();
    return homes;
  } catch (error) {
    throw error;
  }
}

async function getPopularHomes() {
  try {
    // Implémentation de la logique pour récupérer les maisons populaires
    const popularHomes = await prisma.home.findMany({ where: { popularity: { gt: 50 } } });
    return popularHomes;
  } catch (error) {
    throw error;
  }
}

async function getNearbyHomes(latitude, longitude) {
  try {
    // Implémentation de la logique pour récupérer les maisons proches
    const nearbyHomes = await prisma.home.findMany({
      where: {
        AND: [
          { latitude: { lt: latitude + 0.1, gt: latitude - 0.1 } },
          { longitude: { lt: longitude + 0.1, gt: longitude - 0.1 } }
        ]
      }
    });
    return nearbyHomes;
  } catch (error) {
    throw error;
  }
}

module.exports = {
  getHomes,
  getPopularHomes,
  getNearbyHomes,
};
