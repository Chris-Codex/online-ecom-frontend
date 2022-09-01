import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  FlatList,
  Platform,
} from "react-native";
import { RadioButton } from "react-native-paper";
import { Picker, Item } from "@react-native-picker/picker";
import * as imagePicker from "expo-image-picker";
import mime from "mime";

import FormContainer from "../welcomeHeader/ReusableForms/FormContainer";
import FormInput from "../welcomeHeader/ReusableForms/FormInput";
import Icon from "react-native-vector-icons/FontAwesome";
import Toast from "react-native-toast-message";
import FormError from "../welcomeHeader/ReusableForms/FormError";
import AsyncStorage from "@react-native-async-storage/async-storage";
import baseUrlGenerator from "../../generator/baseUrlGenerator";
import axios from "axios";
import { clearItemFromCart } from "../../App_Redux/Actions/productCartActions";

const CustomisedForm = (props) => {
  const [picker, setPicker] = useState();
  const [trademark, setTrademark] = useState();
  const [name, setName] = useState();
  const [price, setPrice] = useState();
  const [description, setDescription] = useState();
  const [keepTrackStock, setKeepTrackStock] = useState();
  const [image, setImage] = useState();
  const [realImage, setRealImage] = useState("");
  const [category, setCategory] = useState();
  const [categories, setCategories] = useState([]);
  const [token, setToken] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [rating, setRating] = useState(0);
  const [isFeatured, setIsFeatured] = useState(false);
  const [subDescription, setSubDescription] = useState("");
  const [reviews, setReviews] = useState(0);
  const [item, setItem] = useState(null);

  useEffect(() => {
    // check if props params exist
    if (!props.route.params) {
      // console.log("PULL OUT", props.route.params);
      setItem(null);
    } else {
      setItem(props.route.params.productList);
      setTrademark(props.route.params.productList.trademark);
      setName(props.route.params.productList.productName);
      setPrice(props.route.params.productList.price.toString());
      setDescription(props.route.params.productList.productDescription);
      setRealImage(props.route.params.productList.img);
      setImage(props.route.params.productList.img);
      setCategory(props.route.params.productList.category._id);
      setKeepTrackStock(
        props.route.params.productList.keepTrackProducts.toString()
      );
    }

    AsyncStorage.getItem("token")
      .then((res) => {
        setToken(res);
      })
      .catch((err) => console.log("TOKEN", err));

    // get categories from api
    axios
      .get(`${baseUrlGenerator}onlineCategory`)
      .then((res) => {
        setCategories(res.data);
        // console.log("CATEGORIES", res.data);
      })
      .catch((err) => console.log(err));

    //image selector
    (async () => {
      if (Platform.OS !== "web") {
        const { status } =
          await imagePicker.requestCameraRollPermissionsAsync();
        // await imagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== "granted") {
          alert("Sorry, we need camera roll permissions to make this work!");
        }
      }
    })();

    return () => {
      setCategories([]);
    };
  }, []);

  const pickImage = async () => {
    let result = await imagePicker.launchImageLibraryAsync({
      mediaTypes: imagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      setImage(result.uri);
      setRealImage(result.uri);
    }
  };

  // Add product to api
  const addProduct = () => {
    if (
      name === "" ||
      price === "" ||
      description === "" ||
      category === "" ||
      image === "" ||
      subDescription === ""
    ) {
      setErrorMessage("Please fill all fields");
    }

    let formData = new FormData();

    const newImageUrl = "file:///" + image.split("file:/").join("");

    formData.append("productName", name);
    formData.append("productDescription", description);
    formData.append("subDescription", subDescription);
    formData.append("img", {
      uri: newImageUrl,
      name: newImageUrl.split("/").pop(),
      type: mime.getType(newImageUrl),
    });
    formData.append("trademark", trademark);
    formData.append("price", price);
    formData.append("category", category);
    formData.append("keepTrackProducts", keepTrackStock);
    formData.append("rating", rating);
    formData.append("isFeatured", isFeatured);
    formData.append("reviews", reviews);

    // console.log("FORM DATA", formData);

    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      },
    };

    if (item !== null) {
    } else {
      fetch(`${baseUrlGenerator}products`, {
        method: "POST",
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },

        body: formData,
      })
        .then((res) => res.json())
        .then((res) => {
          // console.log("RES", res);
          // if (res.status == 200 || res.status == 201) {

          // }
          Toast.show({
            type: "success",
            position: "top",
            text1: "Product Added",
            text2: "Successful",
            visibilityTime: 3000,
            topOffset: 50,
          });
          console.log("PRODUCT ADDED", res);
          setTimeout(() => {
            props.navigation.navigate("Products");
          }, 500);
        })
        .catch((err) => {
          console.log("ERROR", err);
        });
    }
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

        <TouchableOpacity onPress={() => addProduct()}>
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
              Add Products
            </Text>
          </View>
        </TouchableOpacity>
      </View>

      <FormContainer>
        <View style={styles.imageContainer}>
          <Image source={{ uri: realImage }} style={styles.image} />
          <TouchableOpacity onPress={pickImage} style={styles.imagePicker}>
            <Icon name="camera" size={20} color="#1662A2" />
          </TouchableOpacity>
        </View>

        <View style={{ marginTop: 10 }}>
          <Text style={{ marginLeft: 10 }}>
            <Text style={{ fontWeight: "bold", fontSize: 16 }}>
              Add Products:
            </Text>
            &nbsp;&nbsp;
            <Text style={{ marginLeft: 10, color: "red" }}>
              All fields are neccessary
            </Text>
          </Text>
        </View>
        <FormInput
          placeholder="Enter TradeMark"
          onChangeText={(text) => setTrademark(text)}
          value={trademark}
          id="trademark"
          name="trademark"
        />

        <FormInput
          placeholder="Enter Product Name"
          onChangeText={(text) => setName(text)}
          value={name}
          id="name"
          name="name"
        />

        <FormInput
          placeholder="Enter Price"
          onChangeText={(text) => setPrice(text)}
          value={price}
          id="price"
          keyboardType="numeric"
          name="price"
        />

        <FormInput
          placeholder="Enter Product Description"
          onChangeText={(text) => setDescription(text)}
          value={description}
          id="description"
          name="description"
        />

        <FormInput
          placeholder="Enter Stock Keeping Unit"
          onChangeText={(text) => setKeepTrackStock(text)}
          value={keepTrackStock}
          keyboardType="numeric"
          id="keepTrackStock"
          name="keepTrackStock"
        />

        {errorMessage ? <FormError errorMessage={errorMessage} /> : null}

        <Picker
          selectedValue={picker}
          mode="Dropdown"
          iosIcon={<Icon name="arrow-down" color="#1662A2" />}
          style={{
            width: 343,
            marginLeft: 10,
            backgroundColor: "#fff",
            marginTop: -2,
          }}
          onValueChange={(e) => [setPicker(e), setCategory(e)]}
          headerBackButtonTextStyle="white"
        >
          {categories.map((cat) => {
            return (
              <Picker.Item key={cat._id} label={cat.name} value={cat._id} />
            );
          })}
        </Picker>
      </FormContainer>
    </>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    height: 100,
    marginTop: 40,
    backgroundColor: "white",
  },

  btn: {
    width: 120,
    height: 40,
    backgroundColor: "#1662A2",
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    borderRadius: 10,
  },

  btnText: {
    fontSize: 17,
    color: "white",
    fontWeight: "bold",
  },

  image: {
    width: "100%",
    height: "100%",
    borderRadius: 100,
  },

  imagePicker: {
    position: "absolute",
    right: 5,
    bottom: 5,
    backgroundColor: "grey",
    padding: 8,
    borderRadius: 100,
    elevation: 20,
  },

  imageContainer: {
    width: 200,
    height: 200,
    borderStyle: "solid",
    borderWidth: 8,
    padding: 0,
    justifyContent: "center",
    borderRadius: 100,
    elevation: 10,
    borderColor: "#E2E9EC",
    alignSelf: "center",
  },
});

export default CustomisedForm;
