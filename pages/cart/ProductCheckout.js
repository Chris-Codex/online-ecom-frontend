import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from "react-native";

import Icon from "react-native-vector-icons/FontAwesome";

//Dimensions
const { width } = Dimensions.get("window").width;

const ProductCheckout = (props) => {
  return (
    <View>
      <View style={styles.cartHeader}>
        <TouchableOpacity
          style={styles.ClearBtn}
          onPress={() => {
            props.navigation.navigate("Cart");
          }}
        >
          <Icon name="arrow-left" size={20} color={"white"} />
        </TouchableOpacity>
        <Text style={styles.headerText}>Product Checkout</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  cartHeader: {
    width: width,
    height: 50,
    backgroundColor: "#1662A2",
    marginTop: 10,
    flexDirection: "row",
    justifyContent: "space-between",
  },

  headerText: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    paddingTop: 10,
    justifyContent: "center",
    marginRight: 100,
  },

  ClearBtn: {
    width: width,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 10,
  },
});

export default ProductCheckout;
