import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import Products from "../pages/products/Products";

const Stack = createStackNavigator();

function MajorNav() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={Products}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
}

export default function HomeNav() {
  return <MajorNav />;
}
