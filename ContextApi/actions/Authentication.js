import jwt_decode from "jwt-decode";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Toast from "react-native-toast-message";
import baseUrlGenerator from "../../generator/baseUrlGenerator";

export const SET_CURRENT_USER = "SET_CURRENT_USER";

export const login = (user, dispatch) => {
  fetch(`${baseUrlGenerator}onlineUser/login`, {
    method: "POST",
    body: JSON.stringify(user),
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  })
    .then((res) => res.json())
    .then((data) => {
      if (data) {
        const token = data.token;
        AsyncStorage.setItem("token", token);
        const decoded = jwt_decode(token);
        dispatch(setCurrentUser(decoded, user));
      } else {
        userLogout(dispatch);
      }
    })
    .catch((err) => {
      console.log("LOGIN ERROR", err);
      Toast.show({
        type: "error",
        position: "top",
        text1: "Error",
        text2: "Some went wrong",
      });
      userLogout(dispatch);
    });
};

export const fetchUserProfile = (_id) => {
  fetch(`${baseUrlGenerator}onlineUser/${_id}`, {
    method: "GET",
    body: JSON.stringify(user),
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
  })
    .then((res) => res.json())
    .then((res) => console.log("STURBORN ERROR", res));
  // .then((res) => {
  // if (res.success === 200) {
  //     dispatch({
  //     type: SET_USER,
  //     payload: res.user,
  //     });
  // } else {
  //     Toast.show({
  //     type: "error",
  //     position: "top",
  //     text1: "Login Failed",
  //     text2: "Please Try Again",
  //     visibilityTime: 3000,
  //     topOffset: 50,
  //     });
  // }
};

export const register = (dispatch) => {
  AsyncStorage.removeItem("token");
  dispatch(setCurrentUser({}));
};

//logout user
export const userLogout = (dispatch) => {
  AsyncStorage.removeItem("token");
  dispatch(setCurrentUser({}));
};

export const setCurrentUser = (user, decoded) => {
  return {
    type: SET_CURRENT_USER,
    payload: decoded,
    userProfile: user,
  };
};
