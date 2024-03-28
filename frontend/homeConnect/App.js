import React from "react";
import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import { SafeAreaView } from "react-native-safe-area-context";
import MainTabs from "./src/navigations/MainTabs.js";
import SplashScreen from "./src/screens/accueil/SplashScreen.jsx";
import AccueilScreen from "./src/screens/accueil/AccueilScreen.jsx";
import LoginScreen from "./src/screens/connection/LoginScreen.jsx";
import SignupScreen from "./src/screens/connection/SignUpScreen.jsx";
import NotificationScreen from "./src/screens/Notifications.jsx";
import Profile from "./src/screens/profile/ProfileScreen.jsx";
import ProfileVisitor from "./src/screens/profile/ProfileVisitor.jsx";
import ProfileBaiScreen from "./src/screens/ProfileBaiScreen.jsx";

export default function App() {
  const Stack = createStackNavigator();
  const Tab = createBottomTabNavigator();
  return (
    <SafeAreaView style={{ flex: 1, height: "auto" }}>
      <StatusBar hidden={false} />
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
          <Stack.Screen
            name="Main"
            component={MainTabs}
            options={{ headerShown: false }}
          />
          {/* <Stack.Screen name="Notification" component={NotificationScreen} /> */}
          <Stack.Screen name="Visiteur" component={ProfileVisitor} options={{ headerShown: false }} />
          <Stack.Screen name="Profile" component={Profile} options={{ headerShown: false }} />
          <Stack.Screen name="Bailleur" component={ProfileBaiScreen} options={{ headerShown: false }} />

        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaView>
  );
}
