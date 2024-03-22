import React from "react";
import {
  ScrollView,
  Text,
  Button,
  StyleSheet,
  SafeAreaView,
} from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import { WelcomeUser, Hea } from "../components";
export default function HomeScreen({ navigation }) {
  const Stack = createStackNavigator();
  return (
    <SafeAreaView>
      <Stack.Screen options={h} />

      <ScrollView></ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
