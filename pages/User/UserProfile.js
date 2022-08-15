import React, { useState, useContext, useCallback } from "react";
import { useFocusEffect } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import baseUrlGenerator from "../../generator/baseUrlGenerator";
import { View, Text, ScrollView, StyleSheet } from "react-native";

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
    <View>
      <Text> {userProfile ? userProfile.name : ""}</Text>
      <View>
        <Text> {userProfile ? userProfile.email : ""}</Text>
      </View>
    </View>
  );
};

export default UserProfile;
