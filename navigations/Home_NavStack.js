import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import Products from "../pages/products/Products";
import OneProduct from "../pages/products/OneProduct";

const Stack = createStackNavigator();

function HomeScreen() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={Products}
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="Product Details"
        component={OneProduct}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
}

export default function Home_NavStack() {
  return <HomeScreen />;
}
