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
  const [keepTrackStock, setKeepTrackStock] = useState(false);
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
    axios
      .get(`${baseUrlGenerator}categories`)
      .then((res) => {
        setCategories(res.data);
        console.log("CATEGORIES", res.data);
      })
      .catch((err) => console.log(err));

    //image selector
    (async () => {
      if (Platform.OS !== "web") {
        const { status } =
          await imagePicker.requestCameraRollPermissionsAsync();
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

  return (
    <>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => props.navigation.goBack()}>
          <Icon
            name="arrow-left"
            style={{ marginTop: 39, marginLeft: 14 }}
            size={18}
            color="#1662A2"
          />
        </TouchableOpacity>
        <Text
          style={{
            marginTop: 37,
            marginLeft: -80,
            fontSize: 18,
            fontWeight: "bold",
          }}
        >
          Products
        </Text>

        <TouchableOpacity
          onPress={() => {
            props.addItemToCart(props.route.params.productList),
              Toast.show({
                type: "success",
                position: "bottom",
                text1: `${productList.productName} added to cart`,
                text2: "Complete your purchase in the cart",
              });
          }}
        >
          <View
            style={{
              width: 130,
              height: 40,
              marginRight: 20,
              backgroundColor: "#1662A2",
              marginTop: 28,
              borderRadius: 10,
            }}
          >
            <Text
              style={{
                fontSize: 17,
                fontWeight: "bold",
                color: "#fff",
                marginLeft: 20,
                marginTop: 7,
              }}
            >
              Add to Cart
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
            </Text>{" "}
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
          id="tradeMark"
          name="tradeMark"
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

        <FormInput
          placeholder="Accepted Category: Clothing, Electronics, etc"
          onChangeText={(text) => setCategory(text)}
          value={category}
          id="category"
          name="category"
        />

        {errorMessage ? <FormError errorMessage={errorMessage} /> : null}

        <View style={styles.btn}>
          <Text style={styles.btnText}>Add Product</Text>
        </View>

        {/* <Picker
            selectedValue={picker}
            iosIcon={<Icon name="arrow-down" color="#1662A2" />}
            style={{
              width: 300,
              marginLeft: 10,
              backgroundColor: "#FBDDC7",
              marginTop: 20,
            }}
            onValueChange={(e) => [setPicker(e), setCategory(e)]}
            headerBackButtonTextStyle="white"
          >
            {categories.map((cat) => {
              console.log("HELLO", cat);
              return (
                <Picker.Item key={cat._id} label={cat.name} value={cat._id} />
              );
            })}
          </Picker> */}
      </FormContainer>
    </>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    height: 80,
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
