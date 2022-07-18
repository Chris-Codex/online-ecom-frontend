import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import Products from "./pages/products/Products";

export default function App() {
  return (
    <View style={styles.container}>
      <Products />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FBD5D2",
    alignItems: "center",
    justifyContent: "center",
  },
});
