import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  Dimensions,
  TouchableOpacity,
} from "react-native";

import { connect } from "react-redux";
import * as actions from "../../App_Redux/Actions/productCartActions";

const { width } = Dimensions.get("window").width;

const ProductCartList = (props) => {
  const data = props.product;
  const [quantity, setQuantity] = useState();

  return (
    <View style={styles.cartItem} key={Math.random()}>
      <View style={styles.details}>
        <View style={styles.productImage}>
          <Image
            resizeMode="contain"
            source={{
              uri: data.img
                ? data.img
                : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg",
            }}
            style={styles.image}
          />
        </View>
        <View style={{ marginLeft: -50 }}>
          <Text
            style={{
              fontSize: 21,
              fontWeight: "bold",
              marginTop: 10,
              color: "#1662A2",
            }}
          >
            {data.productName.length > 13
              ? data.productName.substring(0, 13) + "..."
              : data.productName}
          </Text>
          <Text
            style={{
              fontSize: 18,
              fontWeight: "bold",
              marginTop: -2,
              color: "#999",
            }}
          >
            {data.productName.length > 16
              ? data.productName.substring(0, 16) + "..."
              : data.productName}
          </Text>
          <Text
            style={{
              fontSize: 18,
              fontWeight: "bold",
              marginTop: 3,
              color: "#5CA2DF",
            }}
          >
            € {data.price}
          </Text>
        </View>
        <TouchableOpacity
          onPress={() => {
            props.removeFromCart(data.id);
          }}
        >
          <View style={styles.deleteItem}>
            <Text
              style={{
                fontSize: 17,
                color: "#fff",
                fontWeight: "bold",
                marginTop: 7,
              }}
            >
              Delete
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  emptyCart: {
    width: width,
    height: 300,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    margin: 10,
    marginTop: 130,
  },

  cartHeader: {
    width: width,
    height: 50,
    backgroundColor: "#1662A2",
    marginTop: 10,
    flexDirection: "row",
    justifyContent: "space-between",
  },

  headerText: {
    color: "#fff",
    fontSize: 23,
    fontWeight: "bold",
    textAlign: "center",
    paddingTop: 10,
    marginLeft: 20,
  },

  details: {
    flexDirection: "row",
    backgroundColor: "#fff",
    width: width,
    height: 110,
    justifyContent: "space-between",
    marginBottom: 5,
  },

  productImage: {
    width: 110,
    height: 90,
    backgroundColor: "#fff",
    marginTop: 10,
  },

  image: {
    width: 110,
    height: 90,
  },

  deleteItem: {
    width: 70,
    backgroundColor: "red",
    height: 40,
    marginRight: 20,
    marginTop: 30,
    borderRadius: 10,
    alignItems: "center",
  },

  ClearBtn: {
    backgroundColor: "#5CA2DF",
    width: width,
    height: 40,
    borderRadius: 10,
    marginTop: 4,
    marginRight: 5,
  },

  ClearBtnText: {
    color: "#fff",
    fontSize: 15,
    marginLeft: 10,
    marginRight: 10,
    marginTop: 10,
    fontWeight: "bold",
  },
});

// get cartList from store
const mapStateToProps = (state) => {
  const { cartList } = state;
  return {
    cartList: cartList,
  };
};

//clear cartList
const mapDispatchToProps = (dispatch) => {
  return {
    clearCartList: () => dispatch(actions.clearItemFromCart()),
    removeFromCart: (id) => dispatch(actions.removeItemFromCart(id)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductCartList);
