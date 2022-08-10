import React from "react";
import { View, TextInput, StyleSheet } from "react-native";

const FormInput = (props) => {
  return (
    <TextInput
      placeholder={props.placeholder}
      style={styles.formInputText}
      id={props.id}
      name={props.name}
      autoCorrect={props.autoCorrect}
      onFocus={props.onFocus}
      keyboardType={props.keyboardType}
      onChangeText={props.onChangeText}
      value={props.value}
      secureTextEntry={props.secureTextEntry}
    ></TextInput>
  );
};

const styles = StyleSheet.create({
  formInputText: {
    width: "90%",
    height: 60,
    backgroundColor: "#fff",
    margin: 10,
    borderRadius: 10,
    padding: 10,
    borderWidth: 2,
    borderColor: "#1662A2",
  },
});

export default FormInput;
