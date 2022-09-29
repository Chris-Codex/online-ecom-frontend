import React, { useState, useEffect, useContext } from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Button,
  TouchableOpacity,
} from "react-native";

import Icon from "react-native-vector-icons/FontAwesome";
import FormContainer from "../../welcomeHeader/ReusableForms/FormContainer";
import FormInput from "../../welcomeHeader/ReusableForms/FormInput";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import AsyncStorage from "@react-native-async-storage/async-storage";
import AuthenticateGlobal from "../../../ContextApi/store/AuthenticateGlobal";
import { Picker, Item } from "@react-native-picker/picker";

import { connect } from "react-redux";

//Dimensions
const { width } = Dimensions.get("window").width;

const countries = require("../../../data/countries.json");

const ProductCheckout = (props) => {
  const { userState } = useContext(AuthenticateGlobal);
  const [picker, setPicker] = useState();
  const [orders, setOrders] = useState([]);
  const [address, setAddress] = useState("");
  const [secondAddress, setSecondAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [zip, setZip] = useState("");
  const [country, setCountry] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [user, setUser] = useState();
  const [error, setError] = "";

  useEffect(() => {
    setOrders(props.cartList);

    if (userState.isAuth) {
      setUser(userState.userProfile._id);
    } else {
      props.navigation.navigate("Cart");
      Toast.show({
        topOffset: 60,
        type: "error",
        text1: "Please login to checkout",
      });
    }

    return () => {
      setOrders([]);
    };
  }, []);

  //pass information to Payment component
  const Checkout = async () => {
    const user = await AsyncStorage.getItem("user");
    props.navigation.navigate("Payment", {
      orders: orders,
      address: address,
      secondAddress: secondAddress,
      city: city,
      state: state,
      orderDate: Date.now(),
      zip: zip,
      country: country,
      phone: phone,
      status: "3",
      email: email,
      user,
    });
  };

  return (
    <View style={{ marginLeft: 10 }}>
      <KeyboardAwareScrollView
        viewIsInsideTabBar={true}
        extraHeight={200}
        enableOnAndroid={true}
      >
        <FormContainer title="Shipping/Delivery Address">
          <FormInput
            placeholder={"Phone"}
            onChangeText={(text) => setPhone(text)}
            value={phone}
            keyboardType={"numeric"}
            name={"phone"}
          />

          <FormInput
            placeholder={"Email"}
            onChangeText={(text) => setEmail(text)}
            value={email}
            name={"email"}
          />

          <FormInput
            placeholder={"Address 1"}
            onChangeText={(text) => setAddress(text)}
            value={address}
            name={"Address 1"}
          />

          <FormInput
            placeholder={"Address 2"}
            onChangeText={(text) => setSecondAddress(text)}
            value={secondAddress}
            name={"Address 2"}
          />

          <FormInput
            placeholder={"City"}
            onChangeText={(text) => setCity(text)}
            value={city}
            name={"City"}
          />

          <FormInput
            placeholder={"Zip Code"}
            onChangeText={(text) => setZip(text)}
            value={zip}
            keyboardType={"numeric"}
            name={"Zip Code"}
          />

          <Picker
            selectedValue={country}
            mode="Dropdown"
            iosIcon={<Icon name="arrow-down" color="#1662A2" />}
            style={{
              width: 343,
              marginLeft: 10,
              backgroundColor: "#fff",
              marginTop: -2,
            }}
            onValueChange={(e) => setCountry(e)}
            placeholder="Select your country"
            placeholderStyle={{ color: "#bfc6ea" }}
            headerBackButtonTextStyle="white"
          >
            {countries.map((country) => {
              const { name, code, iso } = country;
              return <Picker.Item key={name} label={name} value={iso} />;
            })}
          </Picker>

          <TouchableOpacity onPress={() => Checkout()}>
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
                Checkout
              </Text>
            </View>
          </TouchableOpacity>
        </FormContainer>
      </KeyboardAwareScrollView>
    </View>
  );
};

// get cartList from store
const mapStateToProps = (state) => {
  const { cartList } = state;
  return {
    cartList: cartList,
  };
};

const styles = StyleSheet.create({
  cartHeader: {
    width: width,
    height: 50,
    backgroundColor: "#1662A2",
    flexDirection: "row",
    justifyContent: "space-between",
  },

  headerText: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    paddingTop: 10,
    justifyContent: "center",
    marginRight: 100,
  },

  ClearBtn: {
    width: width,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 10,
  },
});

export default connect(mapStateToProps)(ProductCheckout);
