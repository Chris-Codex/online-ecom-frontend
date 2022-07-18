import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView, Dimensions, FlatList, Button, Alert } from 'react-native';

import Card from './Card';

const ProductDisplayItem = (props) => {
    const { item } = props;
    console.log(item);
    return (
        <View style={styles.listContainer}>
            <View style={styles.textContainer}>
                <Text>
                {item.productName}
            </Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    listContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'red',
        marginTop: 10,
    },
})

export default ProductDisplayItem;