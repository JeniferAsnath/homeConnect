import { View, Text } from "react-native";
import React from "react";

const ActionFollow = ({ Followers, Following, like }) => {
  return (
    <View className="flex-row items-center justify-center py-4 space-x-6 ">
      <View className="items-center">
        <Text className="text-regal-blue text-center ">{Followers}</Text>
        <Text>followers</Text>
      </View>
      <View className="items-center px-4">
        <Text className="text-regal-blue text-center">{Following}</Text>
        <Text>followings</Text>
      </View>
      <View className="items-center pr-">
        <Text className="text-regal-blue text-center">{like}</Text>
        <Text>likes</Text>
      </View>
    </View>
  );
};

export default ActionFollow;
