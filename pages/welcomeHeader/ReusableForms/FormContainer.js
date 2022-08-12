import React from "react";
import { Dimensions, ScrollView, Text, StyleSheet } from "react-native";

const { width } = Dimensions.get("window").width;

const FormContainer = (props) => {
  return (
    <ScrollView contentContainerStyle={styles.wrapper}>
      <Text style={styles.wraperTitle}>{props.title}</Text>
      {props.children}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    marginTop: 30,
    marginBottom: 10,
    width: width,
    marginLeft: 10,
    alignContent: "center",
    justifyContent: "center",
  },

  wraperTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginLeft: 10,
    marginTop: 20,
  },
});

export default FormContainer;
