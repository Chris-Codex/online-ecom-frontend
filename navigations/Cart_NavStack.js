import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import ProductCart from "../pages/cart/ProductCart";
import Checkout_NavStack from "./Checkout_NavStack";
import User_NavStack from "./User_NavStack";
import Login from "../pages/User/Login";
import ProductCheckout from "../pages/cart/Checkout/ProductCheckout";
import ProductPayment from "../pages/cart/Checkout/ProductPayment";
import Confirm from "../pages/cart/Checkout/Confirm";
// import ProductCheckout from "../pages/cart/Checkout/ProductCheckout";

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
        name="Login"
        component={Login}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="CartCheckout"
        component={Checkout_NavStack}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="HomePage"
        component={User_NavStack}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Shipping"
        component={ProductCheckout}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Payment"
        component={ProductPayment}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Confirm"
        component={Confirm}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
}

export default function Cart_NavStack() {
  return <ProductCartScreen />;
}
