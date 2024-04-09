import React, { useState } from "react";
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
import Profile from "./src/screens/profile/ProfileScreen.jsx";
import ProfileVisitor from "./src/screens/profile/ProfileVisitor.jsx";
import ProfileBaiScreen from "./src/screens/ProfileBaiScreen.jsx";
import AddImage from "./src/screens/home/AddImage.jsx";
import { AuthProvider } from "./src/context/AuthContext.jsx";

export default function App() {
  const Stack = createStackNavigator();
  const Tab = createBottomTabNavigator();
  const [userRole, setUserRole] = useState(null);

  const updateUserRole = (role) => {
    setUserRole(role);
  };

  return (
    <SafeAreaView style={{
      flex: 1, height: "auto"
    }}>
      <AuthProvider>
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
            <Stack.Screen name="Login" options={{ headerShown: false }}>
              {() => <LoginScreen updateUserRole={updateUserRole} />}
            </Stack.Screen>

            <Stack.Screen
              name="Signup"
              component={SignupScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen name="Main" options={{ headerShown: false }}>
              {() => <MainTabs userRole={userRole} />}
            </Stack.Screen>
            <Stack.Screen
              name="Visiteur"
              component={ProfileVisitor}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Profile"
              component={Profile}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Bailleur"
              component={ProfileBaiScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Addimage"
              component={AddImage}
              options={{ headerShown: false }}
            />
            {/* <Stack.Screen name="HouseDetails" component={HouseDetailsScreen} />
          <Stack.Screen name="Reservation" component={ReservationForm} /> */}
          </Stack.Navigator>
        </NavigationContainer>
      </AuthProvider>
    </SafeAreaView >
  );
}
