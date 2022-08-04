import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import ProductCart from "../pages/cart/ProductCart";
import ProductCheckout from "../pages/cart/ProductCheckout";

const Stack = createStackNavigator();

function ProductCartScreen() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Cart"
        component={ProductCart}
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="Cart Details"
        component={ProductCheckout}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
}

export default function ProductCart_NavStack() {
  return <ProductCartScreen />;
}
