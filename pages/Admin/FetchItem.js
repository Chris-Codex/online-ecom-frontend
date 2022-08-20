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
    <ScrollView style={{ marginLeft: 10 }}>
      <View style={styles.container}>
        <TouchableOpacity
          onPress={() => {
            props.navigation.navigate("Product Details", {
              productList: products,
            });
          }}
        >
          <View style={styles.displayContainer}>
            <View style={styles.imageContainer}>
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
            <View style={styles.textContainer}>
              <Text style={styles.resultText1}>{products.productName}</Text>
              <Text style={styles.resultText2}>
                {products.productDescription.length > 20
                  ? products.productDescription.substring(0, 20) + "..."
                  : products.productDescription}
              </Text>
              <Text>$ {products.price}</Text>

              <View style={styles.addToCartContainer}>
                <TouchableOpacity
                  onPress={() => {
                    props.navigation.navigate("CustomisedForm");
                  }}
                >
                  <View
                    style={{
                      marginLeft: 60,
                      backgroundColor: "#1662A2",
                      width: 50,
                      height: 20,
                      alignItems: "center",
                      borderRadius: 10,
                      marginTop: -17,
                    }}
                  >
                    <Text style={{ fontWeight: "bold", color: "#fff" }}>
                      Edit
                    </Text>
                  </View>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => {
                    //delete product by id
                    props.deleteItem(products.id);
                  }}
                >
                  <View
                    style={{
                      marginRight: 20,
                      backgroundColor: "red",
                      width: 50,
                      height: 20,
                      alignItems: "center",
                      borderRadius: 10,
                      marginTop: -17,
                    }}
                  >
                    <Text style={{ fontWeight: "bold", color: "#fff" }}>
                      Delete
                    </Text>
                  </View>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  resultContainer: {
    flexDirection: "row",
  },

  container: {
    flex: 1,
    width: mainWidth,
    marginLeft: 10,
    marginTop: 20,
    marginBottom: 50,
  },

  displayContainer: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: "#fff",
    marginTop: 10,
    marginBottom: -50,
    borderRadius: 10,
  },

  imageContainer: {
    margin: 10,
  },

  image: {
    width: 140,
    height: 300,
    marginLeft: -20,
    marginTop: 20,
    resizeMode: "contain",
    height: Imagewidth - 20 - 18,
  },

  textContainer: {
    flex: 1,
    marginTop: 20,
  },

  addToCartContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
  },

  resultText1: {
    fontSize: 16,
    fontWeight: "bold",
  },

  resultText2: {
    fontSize: 15,
  },

  addToCartPrice: {
    fontSize: 15,
    fontWeight: "bold",
  },

  addToCartBtn: {
    fontSize: 13,
    fontWeight: "bold",
    color: "#1662A2",
    marginRight: 10,
  },
});

export default FetchItems;
