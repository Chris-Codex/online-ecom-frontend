import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Dimensions,
  ScrollView,
  Modal,
} from "react-native";
import { TouchableHighlight } from "react-native-gesture-handler";
import Icon from "react-native-vector-icons/FontAwesome";

// image dimensions
const Imagewidth = Dimensions.get("screen").width / 2 - 60;
const mainWidth = Dimensions.get("screen").width / 1.1;
const height = Dimensions.get("screen").height / 4.7;

const FetchItems = (props) => {
  const products = props;

  console.log("PRODUCTS", products.img);

  return (
    <ScrollView>
      <TouchableOpacity
        onPress={() => {
          props.navigation.navigate("Product Details", {
            productList: products,
          });
        }}
        style={{ flex: 1 }}
      >
        <View style={styles.container}>
          <View style={{ marginLeft: 10 }}>
            <Image
              source={{
                // retrieve img from imagesUpload folder
                uri: products.img
                  ? products.img
                  : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg",
              }}
              resizeMode="contain"
              style={styles.image}
            />
          </View>

          <View style={{ marginLeft: 10 }}>
            <Text style={styles.productName}>{products.productName}</Text>
            <Text style={{ fontSize: 16 }}>
              {products.trademark.length > 20
                ? products.trademark.substring(0, 20) + "..."
                : products.trademark}
            </Text>
            <Text style={{ fontSize: 16, fontWeight: "bold" }}>
              ${products.price}
            </Text>

            <View style={styles.btnContainer}>
              <TouchableOpacity
                onPress={() => {
                  props.navigation.navigate("UpdateProduct", {
                    productList: products,
                  });
                }}
              >
                <View
                  style={{
                    marginLeft: 110,
                    backgroundColor: "#1662A2",
                    width: 50,
                    height: 30,
                    alignItems: "center",
                    borderRadius: 10,
                    marginTop: -17,
                  }}
                >
                  <Text
                    style={{
                      fontWeight: "bold",
                      marginTop: 5,
                      color: "#fff",
                    }}
                  >
                    Edit
                  </Text>
                </View>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => {
                  //delete product by id
                  props.deleteItem(products.id);
                  // console.log(products.id);
                }}
              >
                <View
                  style={{
                    marginLeft: 10,
                    backgroundColor: "red",
                    width: 50,
                    height: 30,
                    marginTop: 5,
                    alignItems: "center",
                    borderRadius: 10,
                    marginTop: -17,
                  }}
                >
                  <Text
                    style={{
                      fontWeight: "bold",
                      marginTop: 5,
                      color: "#fff",
                    }}
                  >
                    Delete
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    alignSelf: "center",
    backgroundColor: "#F5FCFF",
    width: mainWidth,
    height: height - 70,
    marginTop: 10,
    marginBottom: 10,
    borderRadius: 10,
  },

  image: {
    width: 95,
    height: 300,
    marginLeft: 10,
    marginTop: 5,
    resizeMode: "contain",
    height: Imagewidth - 20 - 20,
    borderRadius: 5,
  },

  productName: {
    fontSize: 17,
    marginTop: 19,
    fontWeight: "bold",
  },

  btnContainer: {
    flexDirection: "row",
  },
});

export default FetchItems;
