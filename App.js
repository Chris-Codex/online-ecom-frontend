import { LogBox } from "react-native";
import Products from "./pages/products/Products";
import Wheader from "./pages/welcomeHeader/Wheader";
import { NavigationContainer, DefaultTheme } from "@react-navigation/native";
import { View } from "react-native";

// Navigations
import MajorNav from "./navigations/MajorNav";

// Redux
import { Provider } from "react-redux";
import store from "./Redux/store";

const MyTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: "#F7E4DE",
  },
};

LogBox.ignoreAllLogs(true);
export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer theme={MyTheme}>
        <Wheader />
        <MajorNav />
      </NavigationContainer>
    </Provider>
  );
}
