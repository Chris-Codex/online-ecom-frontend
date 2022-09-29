import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Button,
  Alert,
} from "react-native";
import { useStripe, CardField } from "@stripe/stripe-react-native";
import baseUrlGenerator from "../../generator/baseUrlGenerator";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect } from "react";
import { clearItemFromCart } from "../../App_Redux/Actions/productCartActions";

const StripApp = (props) => {
  const {
    productName,
    productPrice,
    confirmOrder,
  } = props;
  console.log("DETAILS", props);
  const { confirmPayment } = useStripe();
  const [key, setKey] = useState("");

  const handlePayment = async () => {
    const data = {
      amount: productPrice,
      name: productName,
    };
    fetch(`${baseUrlGenerator}payment/payment`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((res) => {
        console.log("RES", res);
        const intent = res;
        setKey(intent.paymentIntent);
        initPayment(intent.paymentIntent);
        console.log("clientSecret", intent.paymentIntent);
      })
      .catch((error) => {
        console.log("ERROR", error);
      });
  };

  const initPayment = async (keyy) => {
    const data = {
      amount: productPrice,
      name: productName,
    };
    const { error } = await confirmPayment(keyy, {
      type: "Card",
      billingDetails: {
        email: 'obinna@gmail.com',
      },
    });
    if (error) {
      Alert.alert("Error", error.message);
    } else {
      Alert.alert("Payment Successful");
      confirmOrder();
      clearCart();
    }
  };

  return (
    <View style={styles.container}>
      <CardField
        postalCodeEnabled={false}
        style={{
          height: 50,
          width: "100%",
          backgroundColor: "red",
        }}
      />

      <TouchableOpacity onPress={() => handlePayment()}>
        <View style={styles.paymentBtn}>
          <Text style={styles.paymentText}>Pay</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    margin: 20,
    marginTop: 20,
  },

  input: {
    backgroundColor: "#efefefef",
    borderRadius: 8,
    fontSize: 20,
    height: 50,
    padding: 10,
  },

  card: {
    backgroundColor: "#fefefefe",
  },

  cardContainer: {
    height: 50,
    marginVertical: 30,
  },

  paymentBtn: {
    width: 100,
    height: 50,
    marginTop: 10,
    backgroundColor: "#1662A2",
    borderRadius: 10,
    alignSelf: "center",
  },

  paymentText: {
    alignSelf: "center",
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 12,
    color: "#fff",
  },
});

export default StripApp;
