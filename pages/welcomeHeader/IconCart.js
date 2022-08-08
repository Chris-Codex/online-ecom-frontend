import React from "react";
import { View, Text } from "react-native";

import { connect } from "react-redux";

const IconCart = (props) => {
  return (
    <React.Fragment>
      {props.cartList.length > 0 ? (
        <View>
          <Text
            style={{
              fontSize: 16,
              fontWeight: "bold",
              marginTop: -10,

              color: "red",
            }}
          >
            {props.cartList.length}
          </Text>
        </View>
      ) : null}
    </React.Fragment>
  );
};

const mapStateToProps = (state) => {
  const { cartList } = state;
  return {
    cartList: cartList,
  };
};

export default connect(mapStateToProps)(IconCart);
