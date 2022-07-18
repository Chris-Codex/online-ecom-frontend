import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView, Dimensions, FlatList, Button, Alert } from 'react-native';

import ProductsCard from './ProductsCard';

// Dimension
const { width } = Dimensions.get('window');

const ProductDisplayItem = (props) => {
    const { item } = props;
    console.log(item);
    return (
        <TouchableOpacity>
            <View >
                <ProductsCard item={item} />
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
   
})

export default ProductDisplayItem;