import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  FlatList,
  Dimensions,
} from "react-native";
import baseUrlGenerator from "../../generator/baseUrlGenerator";
import FormContainer from "../welcomeHeader/ReusableForms/FormContainer";
import FormInput from "../welcomeHeader/ReusableForms/FormInput";
import Icon from "react-native-vector-icons/FontAwesome";
import Toast from "react-native-toast-message";
import FormError from "../welcomeHeader/ReusableForms/FormError";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { TextInput } from "react-native-paper";
import { useEffect } from "react";
import axios from "axios";
import { clearItemFromCart } from "../../App_Redux/Actions/productCartActions";

var { width } = Dimensions.get("window");

const CategoryItem = (props) => {
  return (
    <View style={styles.categoryContainer}>
      <Text style={{ marginLeft: 10, marginTop: 15 }}>{props.item.name}</Text>
      <TouchableOpacity onPress={() => props.delete(props.item._id)}>
        <View style={styles.delete}>
          <Text
            style={{
              alignSelf: "center",
              marginTop: 15,
              color: "#fff",
              fontWeight: "bold",
            }}
          >
            Delete Category
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const Categories = (props) => {
  const [categories, setCategories] = useState([]);
  const [categoryName, setCategoryName] = useState();
  const [token, setToken] = useState();

  useEffect(() => {
    AsyncStorage.getItem("token")
      .then((res) => {
        setToken(res);
      })
      .catch((error) => console.log(error));

    axios
      .get(`${baseUrlGenerator}onlineCategory`)
      .then((res) => setCategories(res.data))
      .catch((error) => alert("Error to load categories"));

    return () => {
      setCategories();
      setToken();
    };
  }, []);

  const addCategory = () => {
    const category = {
      name: categoryName,
    };

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    axios
      .post(`${baseUrlGenerator}onlineCategory`, category, config)
      .then((res) => setCategories([...categories, res.data]))
      .catch((error) => alert("Something went wrong. Pls try again!!"));

    setCategoryName("");
  };

  const deleteCategory = (id) => {
    const category = {
      name: categoryName,
    };

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    axios
      .delete(`${baseUrlGenerator}onlineCategory/${id}`, config, category)
      .then((res) => {
        const newCategories = categories.filter((item) => item.id !== id);
        setCategories(newCategories);
      })
      .catch((error) => console.log("ERROR", error));
  };

  return (
    <>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => props.navigation.goBack()}>
          <Icon
            name="arrow-left"
            style={{ marginTop: 53, marginLeft: 14 }}
            size={18}
            color="#1662A2"
          />
        </TouchableOpacity>
        <Text
          style={{
            marginTop: 50,
            marginLeft: -80,
            fontSize: 18,
            fontWeight: "bold",
          }}
        >
          Products
        </Text>

        <TouchableOpacity onPress={() => addCategory()}>
          <View
            style={{
              width: 150,
              height: 40,
              marginRight: 20,
              backgroundColor: "#1662A2",
              marginTop: 40,
              borderRadius: 10,
            }}
          >
            <Text
              style={{
                fontSize: 17,
                fontWeight: "bold",
                color: "#fff",
                alignSelf: "center",
                marginTop: 7,
              }}
            >
              Add Category
            </Text>
          </View>
        </TouchableOpacity>
      </View>

      <View style={{ marginTop: 30 }}>
        <Text style={{ marginLeft: 20, fontSize: 16, fontWeight: "bold" }}>
          Pls kindly enter specified Category
        </Text>

        <View style={styles.input}>
          <TextInput
            value={categoryName}
            onChangeText={(text) => setCategoryName(text)}
            style={{ backgroundColor: "#fff", borderRadius: 10, marginTop: 10 }}
          />
        </View>

        <FlatList
          style={{ marginTop: 30, marginLeft: 21 }}
          data={categories}
          renderItem={({ item, index }) => (
            <CategoryItem item={item} delete={deleteCategory} index={index} />
          )}
          keyExtractor={(item) => item.id}
        />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    height: 100,
    marginTop: 3,
    backgroundColor: "white",
  },

  input: {
    width: 350,
    height: 50,
    alignSelf: "center",
  },

  categoryContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: 350,
    height: 50,
    backgroundColor: "#F5FCFF",
    marginTop: 10,
    borderRadius: 10,
  },

  delete: {
    backgroundColor: "red",
    width: 120,
    height: 50,
  },
});

export default Categories;
