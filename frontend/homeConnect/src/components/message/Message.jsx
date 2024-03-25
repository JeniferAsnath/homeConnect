import { View, Text, TouchableOpacity, Image } from "react-native";
import React from "react";
import { Avatar } from "react-native-elements";
export default function Message({ image, nom, message, date }) {
  
  return (
    <View className="flex-row px-4 py-3 space-x-3 ">
      <View>
        <TouchableOpacity className=" ">
          <Avatar source={image} size={70} rounded />
        </TouchableOpacity>
      </View>
      <View className="bg-black/5  w-54 rounded-xl p-2  ">
        <TouchableOpacity className=" space-y-1">
          <View className="flex-row items-center space-x-1">
            <Text className="font-bold">{nom} </Text>
            <Text className="font-light text-xs">{date}</Text>
          </View>
          <Text>{message}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
