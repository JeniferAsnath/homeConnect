// Fonction pour catégoriser les maisons populaires
const categorizePopularHomes = (homes) => {
    // Vous pouvez définir vos critères ici
    // Par exemple, supposons que les maisons avec un nombre de vues supérieur à 1000 sont considérées comme populaires
    const popularHomes = homes.filter((home) => home.views > 1000);
    return popularHomes;
  };
  
  // Fonction pour catégoriser les maisons proches
  const categorizeNearbyHomes = (homes, userLocation) => {
    // Vous pouvez définir vos critères ici
    // Par exemple, supposons que les maisons situées à moins de 5 km de la position de l'utilisateur sont considérées comme proches
    const nearbyHomes = homes.filter((home) => calculateDistance(home.location, userLocation) < 5); // Supposons que vous avez une fonction pour calculer la distance entre deux points
    return nearbyHomes;
  };
  
  module.exports = {
    categorizePopularHomes,
    categorizeNearbyHomes,
  };