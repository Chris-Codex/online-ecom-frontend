import { StyleSheet, LogBox, View } from "react-native";
import Products from "./pages/products/Products";
import Wheader from "./pages/welcomeHeader/Wheader";
import { NativeBaseProvider } from "native-base";

LogBox.ignoreAllLogs(true);
export default function App() {
  return (
    <View style={styles.container}>
      <Wheader />
      <Products />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FBD5D2",
    alignItems: "center",
    justifyContent: "center",
  },
});
