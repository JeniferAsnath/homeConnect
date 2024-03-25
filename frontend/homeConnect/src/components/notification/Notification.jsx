import { View, Text, Image } from "react-native";
import React from "react";
import { TouchableOpacity } from "react-native";

export default function Notification() {
  return (
    <View>
      <View>
        <TouchableOpacity>
          <Image />
        </TouchableOpacity>
      </View>
      <View>
        <TouchableOpacity>
          <Text>en tete</Text>
          <Text>1er ligne</Text>
          <Text>date </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
