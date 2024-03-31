import * as React from 'react';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { StatusBar } from 'expo';
import Home from "../screens/HomeScreen.jsx";
import Explore from "../screens/ExploreScreen.jsx";
import Favorite from "../screens/FavoriteScreen.jsx";
import Message from "../screens/MessagerieScreen.jsx";
import AddHome from '../screens/home/AddHome.jsx'
import Profile from "../screens/profile/ProfileScreen.jsx";
import ProfileBaiScreen from '../screens/ProfileBaiScreen.jsx';
import ProfileVisitor from '../screens/profile/ProfileVisitor.jsx';
import { NavigationContainer } from '@react-navigation/native';
import { StyleSheet } from "react-native";
import TabButton from './TabButton.js';

const Tab = createBottomTabNavigator();

const MainTabs = ( {userRole}) => {
  // const userRole = "bailleur"; 

  const tabs = [
    {
      id: 1,
      name: "Home",
      screen: "Home",
      icon: "home-variant",
      Component: Home,
    },
    {
      id: 2,
      name: "Explore",
      screen: "Explore",
      icon: "map-marker",
      Component: Explore,
    },
    {
      id: 3,
      name: userRole === "bailleur" ? "AddHome" : "Favorite",
      screen: "Favorite",
      icon: userRole === "bailleur" ? "plus" : "heart-outline",
      Component: userRole === "bailleur" ? AddHome : Favorite,
    },
    {
      id: 4,
      name: "Message",
      screen: "Message",
      icon: "message-text",
      Component: Message,
    },
    {
      id: 5,
      name: "Profile",
      screen: "Profile",
      icon: "account",
      Component: userRole === "bailleur" ? ProfileBaiScreen : ProfileVisitor,
    },
  ];

  return (
    <>
      <Tab.Navigator
        initialRouteName={"Home"}
        screenOptions={{
          headerShown: false,
          tabBarStyle: styles.tabBar,
        }}
      >
        {tabs.map((item) => (
          <Tab.Screen
            key={item.id}
            name={item.name}
            component={item.Component}
            options={{
              tabBarShowLabel: false,
              tabBarButton: (props) => <TabButton item={item} {...props} />,
            }}
          />
        ))}
      </Tab.Navigator>
    </>
  );
};



const styles = StyleSheet.create({
  tabBar: {
    height: 60,
    position: 'absolute',
    // backgroundColor: '#F8F1D0',
    shadowColor: '#333',
    // borderTopLeftRadius: 50,
    // borderTopRightRadius:50,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 0.5,
    borderColor: '#dadada',
    shadowOpacity: 1
  }
});
export default MainTabs;