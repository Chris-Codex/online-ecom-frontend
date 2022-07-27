import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView, Dimensions, FlatList, Button, Alert } from 'react-native';

import ProductsCard from './ProductsCard';

// Dimension
const { width } = Dimensions.get('window');

const ProductDisplayItem = (props) => {
    const { item } = props;
    return (
        <TouchableOpacity style={styles.opacity}>
            <View>
                <ProductsCard item={item} />
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
   opacity: {
    
    marginBottom: 10,
   }
})

export default ProductDisplayItem;