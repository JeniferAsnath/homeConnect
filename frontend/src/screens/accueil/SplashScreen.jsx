import React, { useEffect } from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import { StatusBar } from "expo-status-bar";
import Logo from "../../components/Logo.jsx";
import background from "../../../assets/retro-living-room-interior-design.jpg";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext.jsx";

export default function SplashScreen({ navigation }) {
  const { user, isLoading } = useContext(AuthContext);

  useEffect(() => {
    setTimeout(() => {
      // navigation.navigate("Accueil");
      if (user) {
        navigation.navigate("Main");
      } else {
        navigation.navigate("Accueil");
      }
    }, 3000); // Splash screen duration
  }, []);

  return (
    <View className="flex-1 items-center justify-center">
      <StatusBar hidden />
      <Image
        source={require("../../../assets/icon.png")}
        resizeMode="contain"
        className="h-[100px]"
      />
      <Text className="font-extrabold text-[#F4511E] text-2xl">
        homeConnect
      </Text>
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
