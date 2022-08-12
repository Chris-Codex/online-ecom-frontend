import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import UserProfile from "../pages/User/UserProfile";
import Login from "../pages/User/Login";
import Register from "../pages/User/Register";

const Stack = createStackNavigator();

const User_NavStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Login"
        component={Login}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="UserProfile"
        component={UserProfile}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Register"
        component={Register}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
};

export default function UserNavigation() {
  return <User_NavStack />;
}
