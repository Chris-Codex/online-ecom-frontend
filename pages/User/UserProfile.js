import React, { useState, useContext, useCallback } from "react";
import { useFocusEffect } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import baseUrlGenerator from "../../generator/baseUrlGenerator";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  StyleSheet,
} from "react-native";

import AuthenticateGlobal from "../../ContextApi/store/AuthenticateGlobal";
import { userLogout } from "../../ContextApi/actions/Authentication";
import { useEffect } from "react/cjs/react.development";

const UserProfile = (props) => {
  const { userState } = useContext(AuthenticateGlobal);
  const [userProfile, setUserProfile] = useState();

  useEffect(() => {
    console.log("YYYYYYYYYYYYYY", userState.userProfile);
    if (userState.isAuth === false || userState.isAuth === null) {
      props.navigation.navigate("Login");
    }
    AsyncStorage.getItem("token")
      .then((res) => {
        axios
          .get(`${baseUrlGenerator}onlineUser/${userState.userProfile._id}`, {
            headers: { Authorization: `Bearer ${res}` },
          })
          .then((user) => {
            setUserProfile(user.data);
            console.log(user);
            console.log(user.data);
          });
      })
      .catch((err) => console.log("USERPROFILE", err));

    return () => {
      setUserProfile();
    };
  }, [userState.isAuth]);

  return (
    <>
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

      <View
        style={{
          width: 370,
          height: 200,
          backgroundColor: "#fff",
          marginTop: 120,
          borderRadius: 20,
          alignSelf: "center",
        }}
      >
        <View
          style={{
            width: 80,
            height: 80,
            borderRadius: 50,
            backgroundColor: "red",
            alignSelf: "center",
            marginTop: -40,
          }}
        ></View>

        <View style={{ marginTop: 20 }}>
          <Text style={{ fontSize: 16, marginLeft: 20, color: "#1662A2" }}>
            Name: &nbsp;&nbsp;&nbsp; {userProfile ? userProfile.name : ""}
          </Text>
          <Text
            style={{
              fontSize: 16,
              marginLeft: 20,
              marginTop: 10,
              color: "#1662A2",
            }}
          >
            E-mail: &nbsp;&nbsp;&nbsp; {userProfile ? userProfile.email : ""}
          </Text>
          <Text
            style={{
              fontSize: 16,
              marginLeft: 20,
              marginTop: 10,
              color: "#1662A2",
            }}
          >
            Phone: &nbsp;&nbsp;&nbsp;{" "}
            {userProfile ? userProfile.phoneNumber : ""}
          </Text>
          <Text
            style={{
              fontSize: 16,
              marginLeft: 20,
              marginTop: 10,
              color: "#1662A2",
            }}
          >
            Phone: &nbsp;&nbsp;&nbsp; {userProfile ? userProfile.street : ""}
          </Text>
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    height: 80,
    backgroundColor: "white",
  },
});
export default UserProfile;
