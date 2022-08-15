import React, { useState, useReducer, useEffect } from "react";
import jwt_decode from "jwt-decode";
import AsyncStorage from "@react-native-async-storage/async-storage";

import reducerAuth from "../reducers/reducerAuth";
import { setCurrentUser } from "../actions/Authentication";
import AuthenticateGlobal from "./AuthenticateGlobal";

// run authentication check
const Authenticate = (props) => {
  const [userState, dispatch] = useReducer(reducerAuth, {
    isAuth: null,
    user: {},
  });
  // console.log("userState", userState);
  const [showChild, setShowChild] = useState(false);

  useEffect(() => {
    setShowChild(true);
    if (AsyncStorage.jwt) {
      const token = AsyncStorage.jwt ? AsyncStorage.jwt : "";
      const decoded = jwt_decode(token);
      if (setShowChild) {
        dispatch(setCurrentUser(decoded, token));
      }
    }
    return () => {
      setShowChild(false);
    };
  }, []);

  if (!showChild) {
    return null;
  } else {
    return (
      <AuthenticateGlobal.Provider
        value={{
          userState,
          dispatch,
        }}
      >
        {props.children}
      </AuthenticateGlobal.Provider>
    );
  }
};

export default Authenticate;
