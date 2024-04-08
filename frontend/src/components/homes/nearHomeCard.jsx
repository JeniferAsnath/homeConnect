// import React from "react";
// import { useRouter } from "expo-router";
// import { View, Text, TouchableOpacity, ActivityIndicator } from "react-native";

// import styles from "./NearHome.style";
// import { COLORS } from "../../../constants";
// import NearbyHomeCard from "../../common/cards/nearby/NearbyHomeCard";
// import useFetch from "../../../hook/useFetch";

// const NearHome = () => {
//   const router = useRouter();
//   const { data, isLoading, error } = useFetch("search", {
//     query: "React Native developer",
//     num_pages: "1",
//   });

//   return (
//     <View style={styles.container}>
//       <View style={styles.header}>
//         <Text style={styles.headerTitle}>Near homes</Text>
//         <TouchableOpacity>
//           <Text style={styles.headerBtn}>Show all</Text>
//         </TouchableOpacity>
//       </View>

//       <View style={styles.cardsContainer}>
//         {isLoading ? (
//           <ActivityIndicator size='large' color={COLORS.primary} />
//         ) : error ? (
//           <Text>Something went wrong</Text>
//         ) : (
//           data?.map((Home) => (
//             <NearbyHomeCard
//               Home={Home}
//               key={`nearby-Home-${Home.home_id}`}
//               handleNavigate={() => router.push(`/Home-details/${Home.home_id}`)}
//             />
//           ))
//         )}
//       </View>
//     </View>
//   );
// };

// export default NearHome;