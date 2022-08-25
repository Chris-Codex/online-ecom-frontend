import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  TextInput,
  Dimensions,
  ScrollView,
  FlatList,
} from "react-native";
import { useState, useCallback } from "react";
import Header from "../welcomeHeader/Header";
import Icon from "react-native-vector-icons/FontAwesome";
import { useFocusEffect } from "@react-navigation/native";

import axios from "axios";
import baseUrlGenerator from "../../generator/baseUrlGenerator";
import AsyncStorage from "@react-native-async-storage/async-storage";
import FetchItems from "./FetchItem";

var { height, width } = Dimensions.get("window");

const Products = (props) => {
  const [productsItem, setProductsItem] = useState();
  const [filter, setFilter] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [token, setToken] = useState();

  useFocusEffect(
    useCallback(() => {
      // Do something when the screen is focused
      setIsLoading(true);
      // get token from async storage
      AsyncStorage.getItem("token")
        .then(() => {
          setToken("token");
        })
        .catch((err) => console.log("TOKEN", err));

      // get products from api
      axios.get(`${baseUrlGenerator}products`).then((res) => {
        setProductsItem(res.data);
        setFilter(res.data);
        setIsLoading(false);
      });

      return () => {
        setProductsItem();
        setFilter();
        setIsLoading(true);
      };
    }, [])
  );

  const filterProducts = (text) => {
    if (text === "") {
      setFilter(productsItem);
    } else {
      const filtered = productsItem.filter((item) => {
        return item.productName.toLowerCase().includes(text.toLowerCase());
      });
      setFilter(filtered);
    }
  };

  // delete product from api and update state
  const deleteItem = (id) => {
    console.log("na here", id);
    fetch(`${baseUrlGenerator}products/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((res) => {
        const filtered = productsItem.filter((item) => item.id !== id);
        setProductsItem(filtered);
      })
      .catch((err) => console.log("DELETE ERROR", err));

    // axios
    //   .delete(`${baseUrlGenerator}products/${id}`, {
    //     headers: { Authorization: `Bearer ${token}` },
    //   })
    //   .then((res) => {
    //     const filtered = productsItem.filter((item) => item.id !== id);
    //     setProductsItem(filtered);
    //   })
    //   .catch((err) => console.log("DELETE ERROR", err));
  };

  return (
    <>
      <View style={styles.header}>
        <Text
          style={{
            marginTop: 55,
            marginLeft: 20,
            fontSize: 20,
            fontWeight: "bold",
          }}
        >
          Products
        </Text>

        <TouchableOpacity
        // onPress={() => {
        //   AsyncStorage.removeItem("token");
        //   userLogout(userState.dispatch);
        // }}
        >
          <View
            style={{
              width: 130,
              height: 40,
              marginRight: 20,
              backgroundColor: "red",
              marginTop: 55,
              borderRadius: 10,
            }}
          >
            <Text
              style={{
                fontSize: 17,
                fontWeight: "bold",
                color: "#fff",
                marginLeft: 30,
                marginTop: 7,
              }}
            >
              Log Out
            </Text>
          </View>
        </TouchableOpacity>
      </View>

      <View style={{ flexDirection: "row", alignSelf: "center" }}>
        <TouchableOpacity onPress={() => props.navigation.navigate("Orders")}>
          <View style={styles.order}>
            <Icon
              name="shopping-cart"
              style={{ marginTop: 12, marginLeft: 10 }}
              size={20}
              color="#fff"
            />
            <Text
              style={{
                fontSize: 18,
                color: "#fff",
                alignSelf: "center",
                marginTop: -22,
                marginLeft: 22,
              }}
            >
              Orders
            </Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => props.navigation.navigate("CustomisedForm")}
        >
          <View style={styles.products}>
            <Icon
              name="plus"
              style={{ marginTop: 12, marginLeft: 10 }}
              size={20}
              color="#fff"
            />
            <Text
              style={{
                fontSize: 18,
                color: "#fff",
                alignSelf: "center",
                marginTop: -22,
                marginLeft: 22,
              }}
            >
              Products
            </Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => props.navigation.navigate("Categories")}
        >
          <View style={styles.categories}>
            <Icon
              name="plus"
              style={{ marginTop: 12, marginLeft: 10 }}
              size={20}
              color="#fff"
            />
            <Text
              style={{
                fontSize: 18,
                color: "#fff",
                alignSelf: "center",
                marginTop: -22,
                marginLeft: 22,
              }}
            >
              Categories
            </Text>
          </View>
        </TouchableOpacity>
      </View>

      <View style={styles.search}>
        <View style={styles.searchInput}>
          <Icon
            name="search"
            style={{ marginLeft: 10, marginTop: 13, color: "#1662A2" }}
            size={20}
            color="#1662A2"
          />
          <TextInput
            onChangeText={(text) => filterProducts(text)}
            style={styles.Input}
            placeholder="Search"
          />
        </View>
      </View>

      <View style={{ marginBottom: 250 }}>
        {isLoading ? (
          <View style={{ marginTop: 50 }}>
            <ActivityIndicator
              size="large"
              style={styles.loader}
              color="#1662A2"
            />
          </View>
        ) : (
          <FlatList
            data={filter}
            renderItem={({ item, index }) => (
              <FetchItems
                {...item}
                index={index}
                navigation={props.navigation}
                deleteItem={deleteItem}
              />
            )}
            keyExtractor={(item) => item._id}
          />
        )}
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    height: 110,
    backgroundColor: "white",
  },

  headerText: {
    fontSize: 20,
    marginLeft: 5,
    fontWeight: "bold",
    color: "black",
    marginTop: 40,
  },

  headerText2: {
    fontSize: 30,
    marginLeft: 5,
    fontWeight: "bold",
    color: "#1662A2",
  },

  search: {
    width: 380,
    height: 50,
    backgroundColor: "#fff",
    opacity: 0.8,
    borderRadius: 10,
    marginTop: 10,
    alignSelf: "center",
  },

  searchInput: {
    flexDirection: "row",
    marginLeft: 10,
  },

  Input: {
    width: "100%",
    fontSize: 17,
    marginLeft: 10,
    marginTop: 10,
  },

  headerTextInput: {
    height: 55,
    width: 300,
    marginLeft: 10,
    fontSize: 18,
    fontWeight: "bold",
  },

  loader: {
    height: height / 2,
    alignItems: "center",
    justifyContent: "center",
  },

  order: {
    width: 140,
    height: 50,
    backgroundColor: "#1662A2",
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    marginLeft: 10,
  },

  products: {
    width: 120,
    height: 50,
    backgroundColor: "#1662A2",
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    marginLeft: 2,
  },

  categories: {
    width: 120,
    height: 50,
    backgroundColor: "#1662A2",
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    marginLeft: 2,
    marginRight: 10,
  },
});

export default Products;
