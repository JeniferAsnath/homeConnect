// import React from "react";
// import { View, Text, TouchableOpacity, ActivityIndicator, StyleSheet } from "react-native";
// import { useNavigation } from '@react-navigation/native';
// import NearbyHomeCard from "../../common/cards/nearby/NearbyHomeCard"; // Assurez-vous d'avoir NearbyHomeCard correctement défini
// import useFetch from "../../../hook/useFetch";

// const NearbyHomes = () => {
//   const navigation = useNavigation();
//   const { data, isLoading, error } = useFetch("search", {
//     query: "React Native developer",
//     num_pages: "1",
//   });

//   return (
//     <View style={styles.container}>
//       <View style={styles.header}>
//         <Text style={styles.headerTitle}>Nearby homes</Text>
//         <TouchableOpacity onPress={() => navigation.navigate('AllHomes')}>
//           <Text style={styles.headerBtn}>Show all</Text>
//         </TouchableOpacity>
//       </View>

//       <View style={styles.cardsContainer}>
//         {isLoading ? (
//           <ActivityIndicator size='large' color={COLORS.primary} />
//         ) : error ? (
//           <Text>Something went wrong</Text>
//         ) : (
//           data?.map((home) => (
//             <NearbyHomeCard
//               home={home}
//               key={`nearby-home-${home.home_id}`}
//               handleNavigate={() => navigation.navigate('HomeDetails', { homeId: home.home_id })}
//             />
//           ))
//         )}
//       </View>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: COLORS.white,
//     padding: 20,
//   },
//   header: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "center",
//     marginBottom: 20,
//   },
//   headerTitle: {
//     fontSize: 24,
//     fontWeight: "bold",
//     color: COLORS.black,
//   },
//   headerBtn: {
//     fontSize: 16,
//     color: COLORS.primary,
//   },
//   cardsContainer: {
//     flex: 1,
//   },
// });

// export default NearbyHomes;
