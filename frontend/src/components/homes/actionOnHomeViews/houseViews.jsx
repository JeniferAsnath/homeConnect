// import React, { useEffect, useState } from 'react';
// import { View, Text } from 'react-native';
// import { increaseViews } from './houseService'; // Importer la fonction pour augmenter le nombre de vues depuis houseService

// const HouseDetailsScreen = ({ route }) => {
//   const { houseId } = route.params;
//   const [views, setViews] = useState(0);

//   useEffect(() => {
//     // Appeler la fonction pour augmenter le nombre de vues lorsque l'écran est monté
//     increaseViews(houseId)
//       .then((newViews) => setViews(newViews))
//       .catch((error) => console.error('Error increasing views:', error));
//   }, [houseId]);

//   return (
//     <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
//       <Text>House Details Screen</Text>
//       <Text>Total Views: {views}</Text>
//     </View>
//   );
// };

// export default HouseDetailsScreen;
