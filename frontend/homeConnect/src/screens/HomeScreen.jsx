import React from "react";
import {
  ScrollView,
  Text,
  Button,
  StyleSheet,
  SafeAreaView,
} from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import { useNavigation } from "@react-navigation/native";
import WelcomeUser from "../components/WelcomeUser.jsx";
import HeaderHome from "../components/HeaderHome.jsx";
import TopHome from "../components/homes/TopHome.jsx";
import NearHome from "../components/homes/NearHome.jsx";
import { StatusBar } from "expo-status-bar";
import { View } from "react-native";
import ListOfHome from "../components/homes/ListOfHome.jsx"

export default function HomeScreen({ navigations }) {
  // const Stack = createStackNavigator();
  const navigation = useNavigation();

  return (
    <View className=" h-auto space-y-1 ">
        <HeaderHome icon={"bell-outline"} 
        size={30} 
        imageUrl={require('../../assets/profile-pic(3).png')} 
        dimension={50} 
        onPress={()=>navigation.push("Profile")}
        handlePress={()=>navigation.push("Notification")}
        
        />

        <ScrollView>
          <WelcomeUser/>
          <ListOfHome/>
        </ScrollView>
      
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
