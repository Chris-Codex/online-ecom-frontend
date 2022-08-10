import React from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";

import ProductCheckout from "../pages/cart/Checkout/ProductCheckout";
import ProductPayment from "../pages/cart/Checkout/ProductPayment";
import Confirm from "../pages/cart/Checkout/Confirm";

const Tab = createMaterialTopTabNavigator();

const Tabs = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Shipping" component={ProductCheckout} />
      <Tab.Screen name="Payment" component={ProductPayment} />
      <Tab.Screen name="Confirm" component={Confirm} />
    </Tab.Navigator>
  );
};

export default function Checkout_NavStack() {
  return <Tabs />;
}
