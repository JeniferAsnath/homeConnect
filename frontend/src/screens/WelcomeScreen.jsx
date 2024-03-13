import React from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, ImageBackground } from "react-native";
import Logo from "../components/Logo";
import background from "../../assets/wepik-export-20240312133032tOL2.png";

export default function welcomePage() {
  return (
    <View className="flex-1 bg-[#326383]">
      <StatusBar hidden />  
      <ImageBackground source={background} className="flex-1 justify-center " resizeMode="cover" >
        <Logo />
      </ImageBackground>
    </View>
  );
}
const styles = StyleSheet.create({
  bg : {
    opacity: .7,
  }
})
