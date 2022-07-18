import React, {useState, useEffect} from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView, Dimensions, FlatList, Button, Alert, ActivityIndicator } from 'react-native';

import ProductDisplayItem from '../products/ProductDisplayItem'

const data = require('../../data/products.json')

const Products = () => {

    const [products, setProducts] = useState([])

    useEffect(() => {
        setProducts(data)

        return () => {
            setProducts([]) 
        }
    },[])

    return (    
        <View>
            <View>
                <FlatList data={products} 
                    renderItem={({item}) => <ProductDisplayItem key={item.id} 
                    item={item} /> }
                    keyExtractor={item => item.id} 
                />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({})

export default Products;