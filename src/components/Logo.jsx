import React from "react";
import { View, Text } from "react-native";
import { HomeMax } from "@mui/icons-material";
import Material from "react-native-vector-icons/MaterialCommunityIcons";

export default function Logo({style}) {
  return (
    <View className="flex-1 items-center justify-center  w-full h-full bg-black/[.5] ">
      <View className=" items-center justify-center flex-row-reverse gap-1  ">
        <Material name="home-switch-outline" color={"#fff"} size={60} />
        <Text className="font-extrabold text-[#F4511E] text-2xl">
          homeConnect
        </Text>
      </View>
        <Text className="text-[#fff] text-center">
          Find your dream home
        </Text>
    </View>
  );
}
