import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import { connect } from "react-redux";
import * as actions from "../../../App_Redux/Actions/productCartActions";
import Icon from "react-native-vector-icons/Ionicons";

var { width } = Dimensions.get("window");
const height = Dimensions.get("window").height;

const Confirm = (props) => {
  // connect to server to get the data
  const ordersComfirmation = () => {
    setTimeout(() => {
      props.clearCart();
      props.navigation.navigate("Cart");
    }, 500);
  };
  const confirmOrders = props.route.params;
  return (
    <ScrollView style={styles.ScrollViewContainer}>
      <View
        style={{
          marginTop: 10,
          justifyContent: "center",
          alignSelf: "center",
        }}
      >
        <Text style={{ fontSize: 22, fontWeight: "bold" }}>
          Almost There, Just a Few More Steps
        </Text>
      </View>

      <View style={styles.ImageContainer}>
        <Image
          source={{
            uri: "https://www.unitedrentals.com/sites/default/files/inline-images/icon-Order-white-stroke-01.png",
          }}
          style={{
            width: 80,
            height: 80,
            marginLeft: 150,
            marginTop: 10,
            borderRadius: 10,
          }}
        />
      </View>

      <View style={styles.TextContainer}>
        <Text style={{ fontSize: 15, marginLeft: 10, marginTop: 10 }}>
          Please double check the items in your shopping cart. Press confirm if
          items are correct
        </Text>
      </View>

      {props.route.params ? (
        <>
          <View style={styles.orderContainer}>
            <Text style={styles.orderTitle}>
              Griffith Store Shipping Address
            </Text>

            <View style={styles.orderDetails}>
              <Text style={{ marginLeft: 10, marginTop: 5 }}>
                <Text style={{ fontWeight: "bold" }}>Address:</Text>&nbsp;&nbsp;
                <Text style={{ marginLeft: 30 }}>
                  {confirmOrders.order.address}
                </Text>
              </Text>
              <Text style={{ marginLeft: 10, marginTop: 5 }}>
                <Text style={{ fontWeight: "bold" }}>Address 2:</Text>
                &nbsp;&nbsp;
                <Text>{confirmOrders.order.secondAddress}</Text>
              </Text>
              <Text style={{ marginLeft: 10, marginTop: 5 }}>
                <Text style={{ fontWeight: "bold" }}>City:</Text>&nbsp;&nbsp;
                <Text>{confirmOrders.order.city}</Text>
              </Text>
              <Text style={{ marginLeft: 10, marginTop: 5 }}>
                <Text style={{ fontWeight: "bold" }}>Zip:</Text>&nbsp;&nbsp;
                <Text>{confirmOrders.order.zip}</Text>
              </Text>
              <Text style={{ marginLeft: 10, marginTop: 5 }}>
                <Text style={{ fontWeight: "bold" }}>Country:</Text>&nbsp;&nbsp;
                <Text>{confirmOrders.order.country}</Text>
              </Text>
            </View>
          </View>

          <View style={styles.orderContainer}>
            <Text style={styles.orderTitle}>
              Griffith Stores has your order!
            </Text>

            {confirmOrders.order.orders.map((result) => {
              return (
                <View style={{ flexDirection: "row", borderBottomWidth: 1 }}>
                  <View style={{ marginBottom: 7, flexDirection: "row" }}>
                    <View>
                      <Image
                        source={{
                          uri: result.img,
                        }}
                        style={{
                          width: 80,
                          height: 80,
                          marginLeft: 20,
                          marginTop: 10,
                          borderRadius: 10,
                        }}
                        resizeMode="contain"
                      />
                    </View>
                    <View>
                      <Text
                        style={{
                          marginLeft: 10,
                          marginTop: 10,
                          fontWeight: "bold",
                        }}
                      >
                        {result.productName}
                      </Text>
                      <Text style={{ marginLeft: 10, marginTop: 5 }}>
                        € {result.price}
                      </Text>
                    </View>
                  </View>
                </View>
              );
            })}
          </View>
        </>
      ) : null}

      <TouchableOpacity onPress={ordersComfirmation}>
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
            Confirm Orders
          </Text>
        </View>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  ScrollViewContainer: {
    height: height,
    backgroundColor: "#fff",
    padding: 10,
    alignContent: "center",
  },

  ImageContainer: {
    width: 80,
    height: 80,
    marginTop: -8,
  },

  orderContainer: {
    borderWidth: 1,
    borderRadius: 5,
    borderColor: "#979797",
    width: "95%",
    marginTop: 10,
    marginLeft: 10,
  },

  orderTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#1662A2",
    alignSelf: "center",
    marginTop: 10,
  },
});

const mapDispatchToProps = (dispatch) => {
  return {
    clearCart: () => dispatch(actions.clearItemFromCart()),
  };
};

export default connect(null, mapDispatchToProps)(Confirm);
