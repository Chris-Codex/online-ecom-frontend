import { LogBox } from "react-native";
import Wheader from "./pages/welcomeHeader/Wheader";
import { NavigationContainer, DefaultTheme } from "@react-navigation/native";

// Navigations
import MainNavigation from "./navigations/MainNavigation";

// Redux
import { Provider } from "react-redux";
import store from "./App_Redux/store";

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
        <MainNavigation />
      </NavigationContainer>
    </Provider>
  );
}
