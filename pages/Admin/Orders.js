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
import { useCallback } from "react";

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

  const fetchOrders = () => {
    axios
      .get(`${baseUrlGenerator}onlineOrder`)
      .then((result) => {
        setOrder(result.data);
      })
      .catch((error) => console.log(error));
  };

  return (
    <View style={styles.Container}>
      <FlatList
        data={order}
        renderItem={({ item }) => <Text>{item.shippers_addressOne}</Text>}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  Container: {
    marginTop: 150,
  },
});

export default Orders;
