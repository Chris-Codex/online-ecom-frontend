import React, {useState, useEffect} from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView, Dimensions, FlatList, Button, Alert } from 'react-native';


const data = require('../data/products.json')

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
            <Text>Product</Text>
            <View>
                <FlatList data={products} 
                    renderItem={({item}) => <ProductDisplayItem key={item.id} 
                    item={item} /> }
                    keyExtractor={item.name} 
                />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({})

export default Products;