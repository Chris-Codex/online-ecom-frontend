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
  const [quantity, setQuantity] = useState(1);

  const handleDecrement = () => {
    setQuantity((prevCount) => prevCount - 1);
  };

  const handleIncrement = () => {
    setQuantity((prevCount) => prevCount + 1);
  };

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
        <View style={{ marginLeft: 10 }}>
          <Text
            style={{
              fontSize: 18,
              fontWeight: "bold",
              marginTop: 10,
              color: "#1662A2",
            }}
          >
            {data.productName.length > 30
              ? data.productName.substring(0, 30) + "..."
              : data.productName}
          </Text>
          <Text
            style={{
              fontSize: 15,
              fontWeight: "bold",
              marginTop: -2,
              color: "#999",
            }}
          >
            {data.productDescription.length > 38
              ? data.productDescription.substring(0, 38) + "..."
              : data.productDescription}
          </Text>
          <Text
            style={{
              fontSize: 17,
              fontWeight: "bold",
              marginTop: 3,
              color: "#5CA2DF",
            }}
          >
            € {data.price}
          </Text>
        </View>

        {/* <View
          style={{
            marginTop: 10,
            marginRight: 5,
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <TouchableOpacity onPress={() => handleDecrement()}>
              <View style={styles.borderBtn}>
                <Text style={styles.borderBtnText}>-</Text>
              </View>
            </TouchableOpacity>

            <Text style={{ marginLeft: 5, marginRight: 5, fontWeight: "bold" }}>
              {quantity}
            </Text>

            <TouchableOpacity
              onPress={() => {
                handleIncrement();
              }}
            >
              <View style={styles.borderBtn}>
                <Text style={styles.borderBtnText}>+</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View> */}
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

  borderBtn: {
    borderColor: "grey",
    borderWidth: 1,
    borderRadius: 5,
    width: 40,
    height: 30,
    alignItems: "center",
    justifyContent: "center",
  },

  borderBtnText: {
    fontWeight: "bold",
    fontSize: 25,
    marginTop: -3,
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
    increaseQuantity: (id) => dispatch(actions.increaseQuantity(id)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductCartList);
