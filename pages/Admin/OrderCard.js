import React from "react";
import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
import Toast from "react-native-toast-message";
import Icon from "react-native-vector-icons/FontAwesome";

import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import baseUrlGenerator from "../../generator/baseUrlGenerator";
import Highlight from "../welcomeHeader/css/Highlight";
import { Picker } from "@react-native-picker/picker";
import { useState } from "react";
import { useEffect } from "react";

const statusLevels = [
  { name: "pending", statusLevel: "3" },
  { name: "shipped", statusLevel: "2" },
  { name: "delivered", statusLevel: "1" },
];
const OrderCard = (props) => {
  console.log("[OrderCard]:", props);
  const [orderStatus, setOrderStatus] = useState();
  const [statusText, setStatusText] = useState();
  const [statusChange, setStatusChange] = useState();
  const [token, setToken] = useState();
  const [cardColor, setCardColor] = useState();

  useEffect(() => {
    AsyncStorage.getItem("token")
      .then((res) => {
        setToken(res);
      })
      .catch((error) => console.log("TOKEN ERROR", error));

    if (props.status == "3") {
      console.log("CONFIRM", props.status);
      setOrderStatus(<Highlight unavailable></Highlight>);
      setStatusText("pending");
      setCardColor("#E74C3C");
    } else if (props.status == "2") {
      setOrderStatus(<Highlight limited></Highlight>);
      setStatusText("shipped");
      setCardColor("#AF1C40");
    } else {
      setOrderStatus(<Highlight available></Highlight>);
      setStatusText("delivered");
      setCardColor("#EBF2F4");
    }

    return () => {
      setOrderStatus();
      setStatusText();
      setCardColor();
    };
  }, []);

  const updateOrder = () => {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const order = {
      address: props.address,
      secondAddress: props.secondAddress,
      city: props.city,
      state: props.state,
      orderDate: props.orderDate,
      zip: props.zip,
      country: props.country,
      phone: props.phone,
      status: statusChange,
      user: props.user,
      orderList: props.orderList,
      id: props.id,
      totalAmount: props.totalAmount,
    };

    fetch(`${baseUrlGenerator}onlineOrder/${props.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(order),
    })
      .then((response) => response.json())
      .then((response) => {
        if (response.status == 200 || response.status == 300) {
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
          props.navigation.navigate("Products");
        }, 500);
      })
      .catch((error) => console.log("Error loading Orders", error));
  };

  return (
    <>
      <View style={[{ backgroundColor: cardColor }, styles.container]}>
        <View style={{ flexDirection: "row" }}>
          <Text style={{ fontWeight: "bold" }}>Order Number:</Text>
          <Text style={styles.tot}> {props.id} </Text>
        </View>

        <View style={{ flexDirection: "row" }}>
          <Text style={{ fontWeight: "bold" }}>Purchased date:</Text>
          <Text style={styles.tot}> {props.orderDate.split("T")[0]} </Text>
        </View>

        <View style={{ flexDirection: "row" }}>
          <Text style={{ fontWeight: "bold" }}>Total Price:</Text>
          <Text style={styles.tot}> € {props.totalAmount} </Text>
        </View>

        <View style={{ marginTop: 30 }}>
          <View style={{ flexDirection: "row" }}>
            <Text style={{ fontWeight: "bold" }}> Order Status:</Text>
            <Text style={styles.tot}>
              {statusText} &nbsp;{orderStatus}{" "}
            </Text>
          </View>

          <View style={{ flexDirection: "row" }}>
            <Text style={{ fontWeight: "bold" }}> Address:</Text>
            <Text style={styles.tot}>{props.shippers_addressOne}</Text>
          </View>

          <View style={{ flexDirection: "row" }}>
            <Text style={{ fontWeight: "bold" }}> City:</Text>
            <Text style={styles.tot}>{props.city}</Text>
          </View>

          <View style={{ flexDirection: "row" }}>
            <Text style={{ fontWeight: "bold" }}> Country:</Text>
            <Text style={styles.tot}>{props.country}</Text>
          </View>

          <Picker
            mode="dropdown"
            iosIcon={<Icon name="arrow-down" color="#1662A2" />}
            style={{
              width: 300,
              marginLeft: 4,
              backgroundColor: "#DAEBF3",
              marginTop: 20,
            }}
            selectedValue={statusChange}
            onValueChange={(e) => setStatusChange(e)}
            headerTitleStyle="Select Card"
            headerBackButtonTextStyle="#EBF2F4"
          >
            {statusLevels.map((item, index) => {
              return (
                <Picker.Item
                  key={item.statusLevel}
                  label={item.name}
                  value={item.statusLevel}
                />
              );
            })}
          </Picker>

          <TouchableOpacity onPress={() => updateOrder()}>
            <View
              style={{
                width: 140,
                height: 40,
                marginLeft: 90,
                backgroundColor: "red",
                marginTop: 10,
                borderRadius: 10,
              }}
            >
              <Text
                style={{
                  fontSize: 17,
                  fontWeight: "bold",
                  color: "#fff",
                  marginLeft: 15,
                  marginTop: 7,
                }}
              >
                Update Status
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    margin: 20,
    borderRadius: 15,
    marginTop: 10,
  },

  title: {
    fontSize: 15,
  },
});
export default OrderCard;
