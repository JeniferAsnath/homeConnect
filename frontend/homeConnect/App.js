import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import SplashScreen from './src/screens/SplashScreen.jsx';
import AccueilScreen from './src/screens/AccueilScreen.jsx';
import LoginScreen from './src/screens/LoginScreen.jsx';
import SignupScreen from './src/screens/SignUpScreen.jsx'
import HomeScreen from './src/screens/HomeScreen.jsx';
import FavoritesScreen from './src/screens/FavoriteScreen.jsx';
import ExploreScreen from './src/screens/ExploreScreen.jsx';
import MessagesScreen from './src/screens/MessagerieScreen.jsx';
import ProfileScreen from './src/screens/ProfileScreen.jsx';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function HomeTabNavigator() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Favorites" component={FavoritesScreen} />
      <Tab.Screen name="Explore" component={ExploreScreen} />
      <Tab.Screen name="Messages" component={MessagesScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Splash">
        <Stack.Screen name="Splash" component={SplashScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Accueil" component={AccueilScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Se connecter" component={LoginScreen} options={{ headerShown: false }}/>
        <Stack.Screen name="S'enregistrer" component={SignupScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Home" component={HomeTabNavigator} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
