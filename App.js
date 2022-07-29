import { LogBox } from "react-native";
import Products from "./pages/products/Products";
import Wheader from "./pages/welcomeHeader/Wheader";
import { NavigationContainer } from "@react-navigation/native";

// Navigations
import MajorNav from "./navigations/MajorNav";

LogBox.ignoreAllLogs(true);
export default function App() {
  return (
    <NavigationContainer>
      <Wheader />
      <MajorNav />
    </NavigationContainer>
  );
}
