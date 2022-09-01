import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import { connect } from "react-redux";
import * as actions from "../../../App_Redux/Actions/productCartActions";

import Toast from "react-native-toast-message";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { userLogout } from "../../../ContextApi/actions/Authentication";

const BASE_API_ENDPOINT = "http://10.0.2.2:5000/ecommerce_api/";

var { width } = Dimensions.get("window");
const height = Dimensions.get("window").height;

const Confirm = (props) => {
  const confirmOrders = props.route.params;

  const ordersComfirmation = async () => {
    const tokens = await AsyncStorage.getItem("token");
    const userr = await AsyncStorage.getItem("user");
    const user = await JSON.parse(userr);
    const order = confirmOrders.order;
    console.log("[Confirm SSSSSS]:", user);

    const orderUpload = {
      orderList: [
        {
          quantity: 1,
          product: order.orders[0].id,
        },
      ],
      shippers_addressOne: order.address,
      shippers_addressTwo: order.address,
      city: order.city,
      zip: order.zip,
      country: order.country,
      phone: user.phoneNumber,
      status: "pending",
      totalAmount: order.orders[0].price,
      user: user._id,
    };
    console.log("[Confirm Orders]:", orderUpload);

    fetch(`${BASE_API_ENDPOINT}onlineOrder`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${tokens}`,
      },
      body: JSON.stringify(orderUpload),
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.status == 200 || res.status == 300) {
        }
        Toast.show({
          type: "success",
          position: "top",
          text1: "Order Successful",
          text2: "Congratulations",
          visibilityTime: 3000,
          topOffset: 50,
        });
        setTimeout(() => {
          props.clearCart();
          props.navigation.navigate("Cart");
        }, 500);
      })
      .catch((err) => {
        console.log("ERROR", err);
      });
  };

  return (
    <ScrollView style={styles.ScrollViewContainer}>
      <View
        style={{
          marginTop: 10,
          justifyContent: "center",
          alignSelf: "center",
        }}
      >
        <Text style={{ fontSize: 22, fontWeight: "bold" }}>
          Almost There, Just a Few More Steps
        </Text>
      </View>

      <View style={styles.ImageContainer}>
        <Image
          source={{
            uri: "https://www.unitedrentals.com/sites/default/files/inline-images/icon-Order-white-stroke-01.png",
          }}
          style={{
            width: 80,
            height: 80,
            marginLeft: 150,
            marginTop: 10,
            borderRadius: 10,
          }}
        />
      </View>

      <View style={styles.TextContainer}>
        <Text style={{ fontSize: 15, marginLeft: 10, marginTop: 10 }}>
          Please double check the items in your shopping cart. Press confirm if
          items are correct
        </Text>
      </View>

      {props.route.params ? (
        <>
          <View style={styles.orderContainer} key={confirmOrders.id}>
            <Text style={styles.orderTitle}>
              Griffith Store Shipping Address
            </Text>

            <View style={styles.orderDetails}>
              <View style={{ marginLeft: 10, marginTop: 5 }}>
                <Text style={{ fontWeight: "bold" }}>Address:</Text>
                <Text style={{ marginLeft: 30 }}>
                  {confirmOrders.order.address}
                </Text>
              </View>
              <View style={{ marginLeft: 10, marginTop: 5 }}>
                <Text style={{ fontWeight: "bold" }}>Address 2:</Text>

                <Text>{confirmOrders.order.secondAddress}</Text>
              </View>
              <View style={{ marginLeft: 10, marginTop: 5 }}>
                <Text style={{ fontWeight: "bold" }}>City:</Text>
                <Text>{confirmOrders.order.city}</Text>
              </View>
              <View style={{ marginLeft: 10, marginTop: 5 }}>
                <Text style={{ fontWeight: "bold" }}>Zip:</Text>
                <Text>{confirmOrders.order.zip}</Text>
              </View>
              <View style={{ marginLeft: 10, marginTop: 5 }}>
                <Text style={{ fontWeight: "bold" }}>Country:</Text>
                <Text>{confirmOrders.order.country}</Text>
              </View>
            </View>
          </View>

          <View style={styles.orderContainer}>
            <Text style={styles.orderTitle}>
              Griffith Stores has your order!
            </Text>

            {confirmOrders.order.orders.map((result) => {
              return (
                <View style={{ flexDirection: "row", borderBottomWidth: 1 }}>
                  <View style={{ marginBottom: 7, flexDirection: "row" }}>
                    <View>
                      <Image
                        source={{
                          uri: result.img,
                        }}
                        style={{
                          width: 80,
                          height: 80,
                          marginLeft: 20,
                          marginTop: 10,
                          borderRadius: 10,
                        }}
                        resizeMode="contain"
                      />
                    </View>
                    <View>
                      <Text
                        style={{
                          marginLeft: 10,
                          marginTop: 10,
                          fontWeight: "bold",
                        }}
                      >
                        {result.productName}
                      </Text>
                      <Text style={{ marginLeft: 10, marginTop: 5 }}>
                        € {result.price}
                      </Text>
                    </View>
                  </View>
                </View>
              );
            })}
          </View>
        </>
      ) : null}

      <TouchableOpacity onPress={ordersComfirmation}>
        <View
          style={{
            width: 300,
            height: 60,
            backgroundColor: "#1662A2",
            borderRadius: 10,
            marginBottom: 30,
            marginTop: 20,
            alignSelf: "center",
          }}
        >
          <Text
            style={{
              fontSize: 20,
              color: "#fff",
              fontWeight: "bold",
              alignSelf: "center",
              marginTop: 15,
            }}
          >
            Confirm Orders
          </Text>
        </View>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  ScrollViewContainer: {
    height: height,
    backgroundColor: "#fff",
    padding: 10,
    alignContent: "center",
  },

  ImageContainer: {
    width: 80,
    height: 80,
    marginTop: -8,
  },

  orderContainer: {
    borderWidth: 1,
    borderRadius: 5,
    borderColor: "#979797",
    width: "95%",
    marginTop: 10,
    marginLeft: 10,
  },

  orderTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#1662A2",
    alignSelf: "center",
    marginTop: 10,
  },
});

const mapDispatchToProps = (dispatch) => {
  return {
    clearCart: () => dispatch(actions.clearItemFromCart()),
  };
};

export default connect(null, mapDispatchToProps)(Confirm);
