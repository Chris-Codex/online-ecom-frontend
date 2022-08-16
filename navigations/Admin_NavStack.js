import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import Categories from "../pages/Admin/Categories";
import Products from "../pages/Admin/Products";
import Orders from "../pages/Admin/Orders";
import CustomisedForm from "../pages/Admin/CustomisedForm";

const stack = createStackNavigator();

const Admin_NavStack = () => {
  return (
    <stack.Navigator>
      <stack.Screen
        name="Categories"
        component={Categories}
        options={{
          headerShown: false,
        }}
      />
      <stack.Screen
        name="Products"
        component={Products}
        options={{
          headerShown: false,
        }}
      />
      <stack.Screen
        name="Orders"
        component={Orders}
        options={{
          headerShown: false,
        }}
      />
      <stack.Screen
        name="CustomisedForm"
        component={CustomisedForm}
        options={{
          headerShown: false,
        }}
      />
    </stack.Navigator>
  );
};

export default function AdminNavigation() {
  return <Admin_NavStack />;
}
