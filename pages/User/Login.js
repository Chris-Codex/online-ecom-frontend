import React, { useEffect, useContext, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import FormContainer from "../welcomeHeader/ReusableForms/FormContainer";
import FormInput from "../welcomeHeader/ReusableForms/FormInput";
import FormError from "../welcomeHeader/ReusableForms/FormError";

// Conetx API
import AuthenticateGlobal from "../../ContextApi/store/AuthenticateGlobal";
import { login } from "../../ContextApi/actions/Authentication";

var { width } = Dimensions.get("window").width / 1.2;

const Login = (props) => {
  const context = useContext(AuthenticateGlobal);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    console.log("LOGIN", context.userState.userProfile);
    props.navigation.navigate("UserProfile");
    if (context.userState.isAuth === true) {
      // if user is already logged in, redirect to user profile page
      console.log("User is authenticated", context.userState.user);
      props.navigation.navigate("UserProfile");
    }
  }, [context.userState.isAuth]);

  //User Authentication
  const submitLogin = () => {
    const user = {
      email: email,
      password: password,
    };

    if (email === "" || password === "") {
      setError("Please fill all fields");
    } else {
      login(user, context.dispatch);
    }
  };

  return (
    <View style={styles.Container}>
      <View style={{ flexDirection: "row" }}>
        <Image
          source={{
            uri: "https://www.graphicsprings.com/filestorage/stencils/3055581cff0526602142cbb0bfba9fca.png?width=500&height=500",
          }}
          style={styles.logo}
        />
        <Text style={styles.title}>GRIFFITH-STORE</Text>
      </View>

      <View style={{ marginTop: -200 }}>
        <FormContainer title={"User Login"}>
          <FormInput
            placeholder="Enter your E-mail"
            value={email}
            onChangeText={(text) => setEmail(text.toLowerCase())}
            id={"email"}
            name={"email"}
          />

          <FormInput
            placeholder="Enter your Password"
            value={password}
            onChangeText={(text) => setPassword(text)}
            id={"password"}
            name={"password"}
            secureTextEntry={true}
          />
          <View style={{ flexDirection: "row", marginLeft: 75 }}>
            <Text>Don't have an account: </Text>
            <TouchableOpacity
              onPress={() => props.navigation.navigate("Register")}
            >
              <View>
                <Text style={{ fontWeight: "bold", fontSize: 15 }}>
                  Register
                </Text>
              </View>
            </TouchableOpacity>
          </View>
          {error ? <FormError error={error} /> : null}
          <TouchableOpacity onPress={() => submitLogin()}>
            <View style={styles.loginContainer}>
              <Text style={styles.logText}>LOG IN</Text>
            </View>
          </TouchableOpacity>
        </FormContainer>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  Container: {
    flex: 1,
    backgroundColor: "#fff",
    width: 390,
    height: "100%",
    marginTop: 10,
    marginLeft: 2,
    marginRight: -2,
    borderRadius: 20,
  },

  title: {
    fontSize: 26,
    fontWeight: "bold",
    marginTop: 90,
    marginLeft: -10,
  },

  logo: {
    width: 100,
    height: 100,
    marginLeft: 10,
    marginTop: 50,
  },

  loginContainer: {
    marginTop: 10,
    width: 200,
    height: 50,
    alignSelf: "center",
    backgroundColor: "#1662A2",
    borderRadius: 20,
    marginBottom: 20,
  },

  logText: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    paddingTop: 10,
  },
});

export default Login;
