// import { useState } from "react";
// import {
//   View,
//   Text,
//   TouchableOpacity,
//   FlatList,
//   ActivityIndicator,
// } from "react-native";

// // import styles from "./TopHome.style";
// // import { COLORS, SIZES } from "../../../constants";
// // import PopularHomeCard from "../../common/cards/popular/PopularHomeCard";
// // import useFetch from "../../../hook/useFetch";

// const TopHome = () => {
//   const router = useRouter();
//   const { data, isLoading, error } = useFetch("search", {
//     query: "React developer",
//     num_pages: "1",
//   });

//   const [selectedHome, setSelectedHome] = useState();

//   const handleCardPress = (item) => {
//     router.push(`/Home-details/${item.home_id}`);
//     setSelectedHome(item.home_id);
//   };

//   return (
//     <View style={styles.container}>
//       <View style={styles.header}>
//         <Text style={styles.headerTitle}>Top homes</Text>
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
//           <FlatList
//             data={data}
//             renderItem={({ item }) => (
//               <PopularHomeCard
//                 item={item}
//                 selectedHome={selectedHome}
//                 handleCardPress={handleCardPress}
//               />
//             )}
//             keyExtractor={(item) => item.home_id}
//             contentContainerStyle={{ columnGap: SIZES.medium }}
//             horizontal
//           />
//         )}
//       </View>
//     </View>
//   );
// };

// export default TopHome;