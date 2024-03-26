import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import React from "react";
import HeaderHome from "../components/HeaderHome.jsx";
import Research from "../components/research/Research.jsx";

export default function Explore({ nbrTrouve }) {
  return (
    <View>
      <HeaderHome icone={"chevron-left-box"} style={"#F4511E"} size={25} />
      <View className="px-5">
        <Research />
      </View>
      <View className="py-8 px-5 space-x-2 flex-row">
        <TouchableOpacity className="bg-base-color  w-25 rounded-3xl p-1 px-2 ">
          <Text className="text-white text-center ">5 bedroom </Text>
        </TouchableOpacity>
        <TouchableOpacity className="bg-base-color  w-25 rounded-3xl p-1 px-2 ">
          <Text className="text-white text-center ">5 bedroom </Text>
        </TouchableOpacity>
        <TouchableOpacity className="bg-base-color  w-25 rounded-3xl p-1 px-2 ">
          <Text className="text-white text-center ">5 bedroom </Text>
        </TouchableOpacity>
      </View>
      <ScrollView className="py-2 ">
        <View className="px-4 flex-row ">
          <Text className="font-bold ">{nbrTrouve} 20 </Text>
          <Text className="font-light "> Result found</Text>
        </View>
      </ScrollView>
    </View>
  );
}
