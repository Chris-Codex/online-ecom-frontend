import React from "react";
import { View, Text, StyleSheet } from "react-native";

const FormError = (props) => {
  return (
    <View style={styles.errorContainer}>
      <Text style={styles.errorText}>{props.error}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  errorContainer: {
    marginLeft: 10,

    marginBottom: 10,
    width: "100%",
    height: "10%",
    borderRadius: 20,
  },

  errorText: {
    color: "red",
    fontSize: 15,
    textAlign: "center",
  },
});

export default FormError;
