import React from "react";
import { StyleSheet } from "react-native";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";

import ProductCheckout from "../pages/cart/Checkout/ProductCheckout";
import ProductPayment from "../pages/cart/Checkout/ProductPayment";
import Confirm from "../pages/cart/Checkout/Confirm";

const Tab = createMaterialTopTabNavigator();

const Tabs = () => {
  return (
    <Tab.Navigator style={styles.cart}>
      <Tab.Screen name="Shipping" component={ProductCheckout} />
      <Tab.Screen name="Payment" component={ProductPayment} />
      <Tab.Screen name="Confirm" component={Confirm} />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  cart: {
    marginTop: 50,
  },
});

export default function Checkout_NavStack() {
  return <Tabs />;
}
