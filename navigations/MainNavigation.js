import React from "react";

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { View } from "react-native";

import {
  AntDesign,
  MaterialCommunityIcons,
  FontAwesome5,
} from "@expo/vector-icons";

//stacks
import HomeScreen from "./Home_NavStack";
import ProductCartScreen from "./Cart_NavStack";

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

          tabBarIcon: ({ color }) => (
            <AntDesign
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
        component={ProductCartScreen}
        options={{
          headerShown: false,
          tabBarIcon: ({ color }) => (
            <View>
              <MaterialCommunityIcons
                name="cart-arrow-right"
                size={30}
                style={{ position: "relative" }}
                color="#FAC5B4"
              />
              {/* <IconCart /> */}
            </View>
          ),
        }}
      />

      <Tab.Screen
        name="Admin"
        component={HomeScreen}
        options={{
          headerShown: false,
          tabBarIcon: ({ color }) => (
            <AntDesign name="amazon" size={30} color="#FAC5B4" />
          ),
        }}
      />
      <Tab.Screen
        name="User"
        component={HomeScreen}
        options={{
          headerShown: false,
          tabBarIcon: ({ color }) => (
            <FontAwesome5 name="user-cog" size={30} color="#FAC5B4" />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default AppStacks;
