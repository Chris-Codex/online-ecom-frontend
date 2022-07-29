import React from "react";

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Icon from "react-native-vector-icons/FontAwesome";

//stacks
import HomeScreen from "./Home_NavStack";

const Tab = createBottomTabNavigator();

const AppStacks = () => {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      tabBarOptions={{
        tabBarHideOnKeyboard: true,
        tabBarActiveTintColor: "#e91e63",
        tabBarShowLabel: false,
        tabBarStyle: [
          {
            display: "flex",
          },
          null,
        ],
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          headerShown: false,
          tabBatIcon: ({ color }) => (
            <Icon
              name="home"
              size={30}
              style={{ position: "relative" }}
              color={color}
            />
          ),
        }}
      />

      <Tab.Screen
        name="Cart"
        component={HomeScreen}
        options={{
          headerShown: false,
          tabBatIcocon: ({ color }) => (
            <Icon
              name="shopping-cart"
              size={30}
              style={{ position: "relative" }}
              color={color}
            />
          ),
        }}
      />

      <Tab.Screen
        name="Admin"
        component={HomeScreen}
        options={{
          headerShown: false,
          tabBatIcocon: ({ color }) => (
            <Icon name="cog" size={30} color={color} />
          ),
        }}
      />

      <Tab.Screen
        name="User"
        component={HomeScreen}
        options={{
          headerShown: false,
          tabBatIcon: ({ color }) => (
            <Icon name="user" size={30} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default AppStacks;
