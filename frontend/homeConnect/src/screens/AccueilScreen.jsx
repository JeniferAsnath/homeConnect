import React from "react";
import { View, Text, Button, StyleSheet, Image,ImageBackground } from "react-native";
import { StatusBar } from "expo-status-bar";
import maison from "../../assets/rendu-3d-du-modele-maison.jpg";
import Bouton from "../components/Bouton.jsx";

export default function AccueilScreen({ navigation }) {
  return (
    <View className="flex-1 items-center mb-10 ">
      <StatusBar />
      <Image
        className="w-full h-[65%]  rounded-tl-none rounded-bl-[150px] "
        source={maison}
        resizeMode="cover"
      />
      <View className="w-full p-4">
        <Text className=" text-center font-bold my-8 ">
          Connectez-vous aux Meilleures Locations de Maisons
        </Text>
        <Bouton name="Se connecter" onPress={() => navigation.navigate("Login")} />
        <Bouton name="S'enregistrer" onPress={() => navigation.navigate("Signup")} />

      </View>
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
