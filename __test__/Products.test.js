import "react-native";
import React from "react";
import Products from "../pages/products/Products";
import TestRenderer from "react-test-renderer";

jest.mock("react-native-vector-icons/MaterialIcons", () => ({
  MaterialIcons: "",
}));

jest.mock("react-native-vector-icons/FontAwesome", () => ({
  FontAwesome: "",
}));

jest.mock("react-native-toast-message", () => ({
  toast: "",
}));

test("Products snapShot", () => {
  const snap = TestRenderer.create(<Products />).toJSON();

  expect(snap).toMatchSnapshot();
});

// test("Products snapShot", () => {
//   const snap = create(<Products />);
//   expect(snap.toJSON()).toMatchSnapshot();
// });
