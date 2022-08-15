import { LogBox } from "react-native";
import Toast from "react-native-toast-message";
import Wheader from "./pages/welcomeHeader/Wheader";
import { NavigationContainer, DefaultTheme } from "@react-navigation/native";

// Navigations
import MainNavigation from "./navigations/MainNavigation";

// Contexts
import Authentication from "./ContextApi/store/Authentication";

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
    <Authentication>
      <Provider store={store}>
        <NavigationContainer theme={MyTheme}>
          <Wheader />
          <MainNavigation />
          <Toast forwardRef={(forwardRef) => Toast.setRef(forwardRef)} />
        </NavigationContainer>
      </Provider>
    </Authentication>
  );
}
