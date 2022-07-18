import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView, Dimensions, FlatList, Button, Alert } from 'react-native';

const Card = (props) => {
    const { item } = props;
    return (
        <View>
            <Text>{item}</Text>
        </View>
    )
}

export default Card;