// import React, { useState } from 'react';
// import { View, Text, TouchableOpacity } from 'react-native';

// const RatingComponent = ({ onRate }) => {
//   const [rating, setRating] = useState(0);

//   const handleRate = (value) => {
//     setRating(value);
//     onRate(value); // Appeler la fonction de rappel onRate avec la note sélectionnée
//   };

//   return (
//     <View style={{ flexDirection: 'row', alignItems: 'center' }}>
//       {[1, 2, 3, 4, 5].map((value) => (
//         <TouchableOpacity key={value} onPress={() => handleRate(value)}>
//           <Text style={{ fontSize: 24, color: value <= rating ? 'orange' : 'gray' }}>&#9733;</Text>
//         </TouchableOpacity>
//       ))}
//     </View>
//   );
// };

// export default RatingComponent;
