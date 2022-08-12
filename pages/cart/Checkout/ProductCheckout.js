import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Button,
  TouchableOpacity,
} from "react-native";

import Icon from "react-native-vector-icons/FontAwesome";
import { Item, Picker, Select } from "native-base";
import FormContainer from "../../welcomeHeader/ReusableForms/FormContainer";
import FormInput from "../../welcomeHeader/ReusableForms/FormInput";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

import { connect } from "react-redux";

//Dimensions
const { width } = Dimensions.get("window").width;

const countries = require("../../../data/countries.json");

const ProductCheckout = (props) => {
  const [orders, setOrders] = useState();
  const [address, setAddress] = useState();
  const [secondAddress, setSecondAddress] = useState();
  const [city, setCity] = useState();
  const [state, setState] = useState();
  const [zip, setZip] = useState();
  const [country, setCountry] = useState();
  const [phone, setPhone] = useState();
  const [email, setEmail] = useState();

  useEffect(() => {
    setOrders(props.cartList);

    return () => {
      setOrders([]);
    };
  }, []);

  //pass information to Payment component
  const Checkout = () => {
    props.navigation.navigate("Payment", {
      orders: orders,
      address: address,
      secondAddress: secondAddress,
      city: city,
      state: state,
      zip: zip,
      country: country,
      phone: phone,
      email: email,
    });

    // let order = {
    //   city,
    //   country,
    //   dateOrdered: Date.now(),
    //   order,
    //   phone,
    //   state,
    //   zip,
    //   email,
    //   address,
    //   secondAddress,
    // };
    // props.navigation.navigate("Payment", { order: order });
  };

  return (
    <View style={{ marginLeft: 10 }}>
      <KeyboardAwareScrollView
        viewIsInsideTabBar={true}
        extraHeight={200}
        enableOnAndroid={true}
      >
        <FormContainer title="Shipping/Delivery Address">
          {/* <FormInput
            placeholder={"Phone"}
            onChangeText={(text) => setPhone(text)}
            value={phone}
            keyboardType={"numeric"}
            name={"phone"}
          /> */}

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

          {/* <FormInput
            placeholder={"State"}
            onChangeText={(text) => setState(text)}
            value={state}
            name={"State"}
          /> */}

          <FormInput
            placeholder={"Zip Code"}
            onChangeText={(text) => setZip(text)}
            value={zip}
            keyboardType={"numeric"}
            name={"Zip Code"}
          />

          {/* <FormInput
            placeholder={"Email"}
            onChangeText={(text) => setEmail(text)}
            value={email}
            name={"Email"}
          /> */}

          <FormInput
            placeholder={"Country"}
            onChangeText={(text) => setCountry(text)}
            value={country}
            name={"Country"}
          />

          {/* <Item Picker>
            <Picker
              mode="dropdown"
              iosIcon={<Icon name="ios-arrow-down-outline" />}
              style={{ width: undefined }}
              placeholder="Select your country"
              placeholderStyle={{ color: "#bfc6ea" }}
              placeholderIconColor="#007aff"
              selectedValue={country}
              onValueChange={(e) => setCountry(e)}
            >
              {countries.map((country) => {
                const { name, code, iso } = country;
                console.log("XXXXXXXXXXXXXXXXXXXXXXX:", country);
                return <Picker.Item key={name} label={code} value={iso} />;
              })}
            </Picker>
          </Item> */}
          <View style={{ width: "100%", alignItems: "center" }}>
            <Button title="Checkout" onPress={() => Checkout()} />
          </View>
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
