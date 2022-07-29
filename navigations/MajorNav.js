import React from "react";

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Icon from "react-native-vector-icons/FontAwesome";

//stacks
import Home_Nav from "./Home_NavStack";

const Tab = createBottomTabNavigator();

const MajorNav = () => {
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
        component={Home_Nav}
        options={{
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

      {/* <Tab.Screen
        name="Cart"
        component={Home_Nav}
        options={{
          tabBatIcocon: ({ color }) => (
            <Icon
              name="shopping-cart"
              size={30}
              style={{ position: "relative" }}
              color={color}
            />
          ),
        }}
      /> */}

      {/* <Tab.Screen
        name="Admin"
        component={Home_Nav}
        options={{
          tabBatIcocon: ({ color }) => (
            <Icon name="cog" size={30} color={color} />
          ),
        }}
      /> */}

      {/* <Tab.Screen
        name="User"
        component={Home_Nav}
        options={{
          tabBatIcon: ({ color }) => (
            <Icon name="user" size={30} color={color} />
          ),
        }}
      /> */}
    </Tab.Navigator>
  );
};

export default MajorNav;
