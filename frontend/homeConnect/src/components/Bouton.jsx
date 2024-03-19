import * as React from "react";
import {
  StyleSheet,
  View,
  Text,
  Animated,
  TouchableOpacity,
} from "react-native";

export default function Button({ name, onPress, accessibilityState }) {
  return (
    <TouchableOpacity
      onPress={onPress}
      className="w-full mb-2 shadow-xl shadow-inherit bg-regal-blue p-1  rounded-full "
    >
      <Text className="font-bold text-lg text-white text-center">{name}</Text>
    </TouchableOpacity>
  );
}
