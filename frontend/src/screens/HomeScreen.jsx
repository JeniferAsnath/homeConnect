import React from "react";
import {
  ScrollView,
  Text,
  Button,
  StyleSheet,
  SafeAreaView,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useState, useEffect } from "react";
import WelcomeUser from "../components/WelcomeUser.jsx";
import HeaderHome from "../components/HeaderHome.jsx";
import PopularHomes from "../components/homes/PopularHomes.jsx";
import NearbyHomes from "../components/homes/NearbyHomes.jsx";
// import { getHomes, getPopularHomes, getNearbyHomes } from "../../../../backend/src/controllers/homeController.js";
import { StatusBar } from "expo-status-bar";
import { View } from "react-native";
import ListOfHome from "../components/homes/ListOfHome.jsx"

export default function HomeScreen({ navigations }) {
  // // const Stack = createStackNavigator();
  const navigation = useNavigation();
  // const [homes, setHomes] = useState([]);

  // useEffect(() => {
  //   fetchHomes();
  // }, []);

  // const fetchHomes = async () => {
  //   try {
  //     const data = await getHomes(); // Appel de la fonction de contrôleur pour récupérer les maisons depuis l'API
  //     setHomes(data);
  //   } catch (error) {
  //     console.error("Erreur lors de la récupération des maisons :", error);
  //   }
  // };
  const [popularHomes, setPopularHomes] = useState([]);
  const [nearbyHomes, setNearbyHomes] = useState([]);

  // useEffect(() => {
  //   fetchPopularHomes();
  //   fetchNearbyHomes();
  // }, []);

  // const fetchPopularHomes = async () => {
  //   try {
  //     const data = await getPopularHomes(); // Appel de la fonction de contrôleur pour récupérer les maisons populaires depuis l'API
  //     setPopularHomes(data);
  //   } catch (error) {
  //     console.error("Erreur lors de la récupération des maisons populaires :", error);
  //   }
  // };

  // const fetchNearbyHomes = async () => {
  //   try {
  //     const data = await getNearbyHomes(); // Appel de la fonction de contrôleur pour récupérer les maisons proches depuis l'API
  //     setNearbyHomes(data);
  //   } catch (error) {
  //     console.error("Erreur lors de la récupération des maisons proches :", error);
  //   }
  // };

  return (
    <View className=" h-auto space-y-1 ">
        <HeaderHome icon={"bell-outline"} 
        size={30} 
        imageUrl={require('../../assets/profile-pic(3).png')} 
        dimension={50} 
        onPress={()=>navigation.push("Profile")}
        handlePress={()=>navigation.push("Notification")}
        
        />

        <ScrollView>
          <WelcomeUser/>
          <ListOfHome/>
        </ScrollView>
      
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
