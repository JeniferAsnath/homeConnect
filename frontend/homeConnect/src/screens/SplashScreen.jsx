import React, { useEffect } from "react";
import { View, Text, StyleSheet, ImageBackground } from "react-native";
import { StatusBar } from "expo-status-bar";
import Logo from "../components/Logo.jsx";
import background from "../../assets/retro-living-room-interior-design.jpg";

export default function SplashScreen({ navigation }) {
  useEffect(() => {
    setTimeout(() => {
      navigation.navigate("Accueil");
    }, 3000); // Splash screen duration
  }, []);

  return (
    <View className="flex-1 ">
      <StatusBar hidden />
      <ImageBackground
        source={background}
        className="flex-1 justify-center "
        resizeMode="cover"
      >
        <Logo />
      </ImageBackground>
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
