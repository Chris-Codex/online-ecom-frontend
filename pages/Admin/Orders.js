import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  FlatList,
} from "react-native";
import axios from "axios";
import { useFocusEffect } from "@react-navigation/native";
import baseUrlGenerator from "../../generator/baseUrlGenerator";
import Icon from "react-native-vector-icons/Ionicons";
import { useCallback } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import OrderCard from "./OrderCard";

const Orders = (props) => {
  const [order, setOrder] = useState();

  useFocusEffect(
    useCallback(() => {
      fetchOrders();
      return () => {
        setOrder();
      };
    }, [])
  );

  const fetchOrders = async () => {
    const token = await AsyncStorage.getItem("token");

    fetch(`${baseUrlGenerator}onlineOrder`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      // body: JSON.stringify()
    })
      .then((response) => response.json())
      .then((response) => {
        setOrder(response);
        let result = response;
        console.log("DISPLAY RESULT", result);
      })
      .catch((error) => console("Error loading Orders", error));
  };

  return (
    <View style={styles.Container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => props.navigation.goBack()}>
          <Icon
            name="ios-arrow-back"
            style={{ marginTop: 12, marginLeft: 14 }}
            size={25}
            color="#1662A2"
          />
        </TouchableOpacity>

        <Text
          style={{
            marginTop: 12,
            marginLeft: 14,
            fontSize: 20,
            fontWeight: "bold",
          }}
        >
          Order Details
        </Text>
      </View>

      <Image
        source={{
          uri: "http://cdn.onlinewebfonts.com/svg/img_487282.png",
        }}
        style={styles.image}
        resizeMode="contain"
      />

      <FlatList
        data={order}
        renderItem={({ item }) => (
          <OrderCard navigation={props.navigation} {...item} />
        )}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  Container: {
    marginTop: 150,
    marginBottom: 40,
  },

  header: {
    flexDirection: "row",
    height: 60,
    backgroundColor: "white",
    marginTop: -120,
  },

  headerText: {
    fontSize: 20,
    marginLeft: 5,
    fontWeight: "bold",
    color: "black",
    marginTop: 20,
  },

  headerText2: {
    fontSize: 30,
    marginLeft: 5,
    fontWeight: "bold",
    color: "#1662A2",
  },

  image: {
    width: "15%",
    height: 80,
    marginTop: 10,
    alignSelf: "center",
  },
});

export default Orders;
