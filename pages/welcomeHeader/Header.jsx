import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';


const Header = (props) => {
    return (
         <View style={styles.header}>
        <Text
          style={{
            marginTop: 38,
            marginLeft: 20,
            fontSize: 20,
            fontWeight: "bold",
          }}
        >
          My Profile
        </Text>

        <TouchableOpacity
        // onPress={() => {
        //   AsyncStorage.removeItem("token");
        //   userLogout(userState.dispatch);
        // }}
        >
          <View
            style={{
              width: 130,
              height: 40,
              marginRight: 20,
              backgroundColor: "#1662A2",
              marginTop: 33,
              borderRadius: 10,
            }}
          >
            <Text
              style={{
                fontSize: 17,
                fontWeight: "bold",
                color: "#fff",
                marginLeft: 30,
                marginTop: 7,
              }}
            >
              Log Out
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    )
}

const styles = StyleSheet.create({
     header: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    height: 80,
    backgroundColor: "white",
  },
})

export default Header;