import React from "react";
import { View, Text, StyleSheet, Button, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { RadioButton } from "react-native-paper";
import { Picker } from "@react-native-picker/picker";

const paymentMethod = [
  { name: "Cash on Delivery", value: 1 },
  { name: "Credit Card", value: 2 },
  { name: "Debit Card", value: 3 },
];

//paymentment cards
const paymentCards = [
  { name: "Visa", value: 1 },
  { name: "Verve", value: 2 },
  { name: "Master", value: 3 },
];

const ProductPayment = (props) => {
  const order = props.route.params;
  console.log("SHOW ME NOW", order);

  const [selected, setSelected] = React.useState();
  const [selectCard, setSelectCard] = React.useState();

  return (
    <View>
      <View style={styles.titleHeader}>
        <Text style={styles.titleText}>Payment Method</Text>
      </View>

      {paymentMethod.map((item, index) => {
        return (
          <TouchableOpacity
            key={item.name}
            onPress={() => setSelected(item.value)}
            style={styles.paymentCard}
          >
            <View style={{ marginLeft: 10, marginTop: 20 }}>
              <Icon name="credit-card" size={25} color={"#1662A2"} />
            </View>
            <View
              style={{
                marginRight: 210,
                width: 140,
                marginTop: -6,
              }}
            >
              <Text style={styles.paymentText}>{item.name}</Text>
            </View>
            <View style={{ marginLeft: -50, marginTop: 15 }}>
              <RadioButton
                value={item.value}
                status={selected === item.value ? "checked" : "unchecked"}
                color="#1662A2"
                selected={selected == item.value}
              />
            </View>
          </TouchableOpacity>
        );
      })}
      {selected == 3 ? (
        <Picker
          mode="dropdown"
          iosIcon={<Icon name="arrow-down" color="#1662A2" />}
          style={{
            width: 370,
            marginLeft: 10,
            backgroundColor: "#FBDDC7",
            marginTop: 20,
          }}
          selectedValue={selectCard}
          onValueChange={(itemValue) => setSelectCard(itemValue)}
          headerTitleStyle="Select Card"
          headerBackButtonTextStyle="white"
        >
          {paymentCards.map((item, index) => {
            console.log("RESULTS:", item);
            return (
              <Picker.Item
                key={item.name}
                label={item.name}
                value={item.value}
              />
            );
          })}
        </Picker>
      ) : null}
      <View style={{ marginTop: 30, alignSelf: "center" }}>
        <TouchableOpacity
          onPress={() => props.navigation.navigate("Confirm", { order })}
        >
          <View
            style={{
              width: 200,
              height: 50,
              backgroundColor: "#1662A2",
              borderRadius: 10,
            }}
          >
            <Text
              style={{
                alignSelf: "center",
                marginTop: 14,
                fontSize: 18,
                fontWeight: "bold",
                color: "#fff",
              }}
            >
              Confirm Payment
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  titleHeader: {
    width: "100%",
    height: 50,
    backgroundColor: "#1662A2",
    marginTop: 1,
  },

  titleText: {
    fontSize: 17,
    marginLeft: 10,
    justifyContent: "center",
    marginTop: 12,
    color: "#fff",
  },

  paymentCard: {
    flexDirection: "row",
    width: "95%",
    height: 60,
    marginLeft: 10,
    marginTop: 20,
    borderRadius: 15,
    backgroundColor: "#fff",
    justifyContent: "space-between",
    marginBottom: -16,
  },

  paymentText: {
    marginLeft: 10,
    fontSize: 17,
    fontWeight: "bold",
    marginTop: 26,
  },
});

export default ProductPayment;
