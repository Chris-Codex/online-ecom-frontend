import { StyleSheet, Text, View } from "react-native";
import Products from "./pages/products/Products";
import Wheader from "./pages/welcomeHeader/Wheader";
import { NativeBaseProvider } from "native-base";

export default function App() {
  return (
    <NativeBaseProvider>
      <View style={styles.container}>
        <Wheader />
        <Products />
      </View>
    </NativeBaseProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FBD5D2",
    alignItems: "center",
    justifyContent: "center",
  },
});
