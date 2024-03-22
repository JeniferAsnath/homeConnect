import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import SplashScreen from "./src/screens/SplashScreen.jsx";
import AccueilScreen from "./src/screens/AccueilScreen.jsx";
import LoginScreen from "./src/screens/LoginScreen.jsx";
import SignupScreen from "./src/screens/SignUpScreen.jsx";
import HomeScreen from "./src/screens/HomeScreen.jsx";
import MainTabs from "../../frontend/homeConnect/src/components/Tabs.js";

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const AuthStack = () => <Stack.Navigator></Stack.Navigator>;

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Splash">
        <Stack.Screen
          name="Splash"
          component={SplashScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Accueil"
          component={AccueilScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Signup"
          component={SignupScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen name="Main" component={MainTabs} />
        {/* <Stack.Screen name="Notification" component={NotificationScreen} /> */}
        {/* <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} /> */}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
