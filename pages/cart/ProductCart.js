import React from "react";
import {
  View,
  Text,
  Dimensions,
  StyleSheet,
  Button,
  TouchableOpacity,
  Image,
  ScrollView,
} from "react-native";

//connects to store to have access to the state
import { connect } from "react-redux";
import * as actions from "../../App_Redux/Actions/productCartActions";

// IconCart is the component that is connected to the store to selected the cartList
import IconCart from "../welcomeHeader/IconCart";
import ProductCartList from "./ProductCartList";

import { SwipeListView } from "react-native-swipe-list-view";
import Icon from "react-native-vector-icons/FontAwesome";

//Dimensions
const { width } = Dimensions.get("window").width;

const ProductCart = (props) => {
  //get total price of cart
  const getTotalPrice = () => {
    let total = 0;
    props.cartList.forEach((item) => {
      total += item.price;
    });
    return total;
  };

  return (
    <React.Fragment>
      {props.cartList.length > 0 ? (
        <View style={styles.cartContainer}>
          <View style={styles.cartHeader}>
            <Text style={styles.headerText}>My Cart</Text>
            <TouchableOpacity
              onPress={() => {
                props.clearCartList();
              }}
            >
              <View style={styles.ClearBtn}>
                <Text style={styles.ClearBtnText}>CLEAR ITEMS</Text>
              </View>
            </TouchableOpacity>
          </View>

          <SwipeListView
            data={props.cartList}
            renderItem={(data) => {
              return <ProductCartList product={data.item} />;
            }}
            renderHiddenItem={(data) => {
              return (
                <View style={styles.deleteWrapper}>
                  <TouchableOpacity
                    style={styles.deleteBtn}
                    onPress={() => {
                      props.removeFromCart(data.item._id);
                    }}
                  >
                    <Icon name="trash" size={30} color={"white"} />
                  </TouchableOpacity>
                </View>
              );
            }}
            disableRightSwipe={true}
            previewOpenDelay={3000}
            friction={1000}
            rightOpenValue={-75}
            leftOpenValue={75}
            stopLeftSwipe={75}
            tension={40}
          />
        </View>
      ) : (
        <View style={styles.cartContainer}>
          <Image
            resizeMode="contain"
            source={{
              uri: "https://mir-s3-cdn-cf.behance.net/projects/404/95974e121862329.Y3JvcCw5MjIsNzIxLDAsMTM5.png",
            }}
            style={styles.emptyCart}
          />
        </View>
      )}
      <View
        style={{
          backgroundColor: "#fff",
          width: 400,
          height: 150,
          position: "absolute",
          bottom: 0,
          left: 0,
          elevation: 20,
        }}
      >
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <Text
            style={{
              marginLeft: 20,
              marginTop: 20,
              fontSize: 20,
              fontWeight: "bold",
              color: "#1662A2",
            }}
          >
            Selected Item (<IconCart />)
          </Text>
          <Text
            style={{
              marginRight: 20,
              marginTop: 20,
              fontSize: 20,
              fontWeight: "bold",
              color: "#1662A2",
            }}
          >
            Total: € {getTotalPrice()}
          </Text>
        </View>
        <View style={{ marginTop: 12 }}>
          <TouchableOpacity
            onPress={() => props.navigation.navigate("CartCheckout")}
          >
            <View
              style={{
                width: width,
                height: 60,
                alignItems: "center",
                marginLeft: 20,
                marginRight: 20,
                backgroundColor: "#1662A2",
                paddingBottom: 20,
                borderRadius: 20,
              }}
            >
              <Text
                style={{
                  marginTop: 17,
                  fontSize: 20,
                  color: "#fff",
                  fontWeight: "bold",
                }}
              >
                PROCEED TO CHECKOUT
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </React.Fragment>
  );
};

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

  deleteWrapper: {
    flex: 1,
    justifyContent: "flex-end",
    flexDirection: "row",
  },

  deleteBtn: {
    backgroundColor: "red",
    justifyContent: "center",
    alignItems: "flex-end",
    paddingRight: 25,
    height: 110,
    width: 500,
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

export default connect(mapStateToProps, mapDispatchToProps)(ProductCart);
