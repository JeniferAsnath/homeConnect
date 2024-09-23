const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const createHome = async (homeData) => {
  try {
    const newHome = await prisma.house.create({
      data: homeData,
    });
    return newHome;
  } catch (error) {
    throw error;
  }
};




async function getPopularHomes() {
  return await prisma.home.findMany({
    orderBy: {
      views: "desc",
    },
    take: 10,
  });
}

async function getNearbyHomes(latitude, longitude) {
  return await prisma.home.findMany({
    where: {
      // Implémentez la logique de recherche basée sur la distance par rapport aux coordonnées fournies
      // Vous pouvez utiliser des formules de calcul de distance comme la distance euclidienne ou la distance de Haversine
      // Pour cet exemple, supposons que vous recherchiez les maisons dans un rayon de 10 km autour des coordonnées fournies
      // Cela peut nécessiter des calculs plus complexes en fonction de votre système de coordonnées et des besoins spécifiques
      // Consultez la documentation de Prisma pour plus d'informations sur la construction de requêtes complexes
    },
  });
}

module.exports = {
  createHome,
  getPopularHomes,
  getNearbyHomes,
};
