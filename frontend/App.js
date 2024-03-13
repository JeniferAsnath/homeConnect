import * as React from 'react';
import { StatusBar } from "expo-status-bar";
import { Text, View } from "react-native";
import { NavigationContainer } from '@react-navigation/native';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Welcome from "./src/screens/WelcomeScreen.jsx";
import Tabs from './src/components/tabs.js'
import Accueil from './src/screens/AccueilScreen.jsx'
// const Stack = createStackNavigator();

const Tab = createMaterialBottomTabNavigator();

export default function App() {
  return (
    <Accueil/>
    // <Welcome/>
      // <Tabs/>
    
  );
}
