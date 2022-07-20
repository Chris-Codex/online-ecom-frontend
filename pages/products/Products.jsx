import React, {useState, useEffect} from 'react';
import { View, StyleSheet,  FlatList, TextInput } from 'react-native';
import Icon from "react-native-vector-icons/MaterialIcons";
import {Container, Header, Item, Text, Button, Input} from 'native-base'


import ProductDisplayItem from '../products/ProductDisplayItem'
import ProductFilter from './ProductFilter';

const data = require('../../data/products.json')

const Products = () => {

    const [products, setProducts] = useState([])
    const [searchProducts, setSearchProducts] = useState([])
    const [targetProduct, setSearchText] = useState("")

    // sets the products to the data from the json file
    useEffect(() => {
        setProducts(data)
        setSearchProducts(data)
        setSearchText(false)

        return () => {
            setProducts([])
           setSearchProducts([])
        setSearchText()  
        }
    },[])

    // filter products by search text
    const filterProducts = (text) => {
        setSearchProducts(products.filter(item => item.productName.toLowerCase().includes(text.toLowerCase())))
    }

    // search bar
    const openList = () => {
        setSearchText(true)
    }

    // close search bar
    const closeList = () => {
        setSearchText(false)
    }

    // search bar
    return (    
            <View>
                <View style={{flexDirection: "row"}}>
                    <View style={styles.search}>
                        <TextInput onChangeText={(text) => filterProducts(text)} onFocus={openList} style={styles.headerTextInput} placeholder="Search" />
                        <Icon name="search" style={{marginTop: 18, marginLeft: 20}}  size={20} color="#1662A2" />
                    </View>
                    {/* <View style={styles.searchBtn}>
                        <Icon name="filter-list" color="white" size={20} onPress={() => openList()}    />
                    </View> */}
                </View>
                {targetProduct > 0 ? (
                    <ProductFilter searchProducts={searchProducts} />
                ) : (
                    <FlatList data={products} 
                    style={styles.flatList}
                    numColumns={2}
                    columnWrapperStyle={{ justifyContent: "space-between", marginVertical: -20 }}
                    renderItem={({item}) => <ProductDisplayItem key={item.id} 
                    item={item} /> }
                    keyExtractor={item => item.id} 
                />
                )}
            
        </View>
    )
}

const styles = StyleSheet.create({
    search: {
        flexDirection: 'row',
        width: 360,
        height: 50,
        backgroundColor: "#fff",
        marginLeft: 10,
        borderRadius: 10,
        marginTop: 15
    },

    searchBtn: {
        borderRadius: 5, 
        color: "#fff", 
        backgroundColor: "#1662A2", 
        justifyContent: "center",
        alignItems: "center",
        marginLeft: 10,
        width: 50,
        height: 50,
        marginTop: 15
    },

    headerTextInput: {
        height: 55,
        width: 300,
        marginLeft: 10,
    }
})

export default Products;