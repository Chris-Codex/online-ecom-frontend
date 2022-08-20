import React, {useState, useCallback} from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { View, StyleSheet,  ScrollView, Text, TextInput, Image, Dimensions, ActivityIndicator } from 'react-native';
import Icon from "react-native-vector-icons/MaterialIcons";
import IconCart from "../welcomeHeader/IconCart";


import baseUrlGenerator from "../../generator/baseUrlGenerator"
import axios from "axios"



import ProductDisplayItem from '../products/ProductDisplayItem'
import ProductFilter from './ProductFilter';
import FectchedCategory from './FectchedCategory';
import Caurosel from "../carousel/Carousel";



// const data = require('../../data/products.json')
const categories = require('../../data/categories.json')
var {width} = Dimensions.get('window');
const height = Dimensions.get('screen').height / 2.2;

const Products = (props) => {
    const [loading , setLoading] = useState(true)
    const [products, setProducts] = useState([]) // products array
    const [searchProducts, setSearchProducts] = useState([]) // to store the filtered products
    const [targetProduct, setSearchTarget] = useState("") // targets the search text
    const [cat, setCat] = useState([]) // targets the product category
    const [pCat, setpCat] = useState([])//
    const [isActive, setIsActive] = useState() // to check if the filter is active
    const [initialState, setInitialState] = useState([]) // to check if the filter is active
    
   

    // sets the products to the data from the json file
    useFocusEffect((
        useCallback(() => {
             setSearchTarget(false)
             setIsActive(-1)

    // gets the products from the server  
     axios.get(`${baseUrlGenerator}products`) 
        .then(res => {
            setLoading(false)
            setProducts(res.data)
            setSearchProducts(res.data)
            setpCat(res.data) 
            setInitialState(res.data)
        }).catch(err => {
            console.log('Product API Error: ', err)
        }) 
     
     // gets the products by category from the server
         axios.get(`${baseUrlGenerator}onlineCategory`) 
        .then(res => {
            setCat(res.data)
        }).catch(err => {
            console.log('Product API Error: ', err)
        })
       
        return () => {
            setProducts([])
            setSearchProducts([])
            setSearchTarget() 
            setCat([])
            setIsActive()
            setInitialState()
            
        }
        }, [])
    ) )

    // filter products by search text
    const filterProducts = (text) => {
        setSearchProducts(products.filter(item => item.productName.toLowerCase().includes(text.toLowerCase())))
    }

    // filter products by categories
    const alternateCategory = (cats) => {
        {
            cats === "all" ? [setpCat(initialState), setIsActive(true)] : [ 
                setpCat(products.filter(item => item.category._id === cats)), setIsActive(true)
            ]
        }
    }

    // responsible for opening the filter modal
    const openList = () => {//
        setSearchTarget(true)
    }

    // close search bar
    const closeList = () => {
        setSearchTarget(false)
    }

    // search bar
    return (    
            <>
                {loading == false ? (
            <View style={{height: height}}>
                 <View style={styles.header}>
                 
                <View>
                    <Text style={styles.headerText}>Welcome to</Text>
                    <Text style={styles.headerText2}>Griffith Stores</Text>
                </View>
                <View style={{marginRight: 10}}>
                    <Icon  name="shopping-cart" size={30} color="#1662A2">
                    <IconCart />
                </Icon>
                </View>
            </View>
                <View style={{marginTop: 30, marginLeft: 30, marginRight: 20, justifyContent: "center"}}>
                  
                    {/* <Caurosel /> */}
                    <Image source={{uri: "https://downloadmobilebankingapp.com/wp-content/uploads/2022/02/Global-Virtual-Visa-and-Mastercard-Bangladesh.jpg"}} style={{width: 370, height: 200, marginLeft: -18, borderRadius: 10 }} />
                </View>
                 <View style={{flexDirection: "row", justifyContent: "center"}}>
                    <View style={styles.search}>
                        <TextInput onChangeText={(text) => filterProducts(text)} onFocus={openList} style={styles.headerTextInput} placeholder="Search" />
                         {targetProduct == true ? (
                       <Icon name="cancel" onPress={closeList} style={{marginTop: 15, marginLeft: 20}}  size={25} color="#1662A2" />
                    ) : null }
                    </View>
                </View>
                
                {targetProduct > 0 ? (
                    <View>
                        <ProductFilter navigation={props.navigation} searchProducts={searchProducts} />
                    </View>
                ) : (
                    <View >
                         <View style={{justifyContent: "center"}}>
                            <FectchedCategory 
                                      cat={cat} 
                                      pCat={pCat}
                                      catFilter={alternateCategory}
                                      active={isActive}
                                      setIsActive={setIsActive}
                             />
                        </View>
                        <ScrollView style={{marginTop: 20}}>
                        {pCat.length > 0 ? (
                          <View style={styles.displayIem}>
                            {pCat.map((item) => {
                                return (
                                    <ProductDisplayItem navigation={props.navigation} key={item._id} item={item} />
                                )
                            })}
                          </View>
                        ): (
                            <View style={{marginTop: 40, alignItems: "center"}}>
                                <Text style={{color: "red", fontWeight: "bold"}}>No Products found</Text>
                            </View>
                        )} 
                        </ScrollView>
                    </View>    
                )}  
        </View>
                ) : (
                    <View style={{flex: 1, justifyContent: "center", alignItems: "center"}}>
                        <ActivityIndicator size="large" color="#1662A2" />
                    </View>
                )}
            </>
    )
}

const styles = StyleSheet.create({
    header: {
        flexDirection: 'row',
        justifyContent: "space-between",
        alignItems: "center",
        width: "100%",
        backgroundColor: "#F7E4DE",
        
    },

    headerText: {
        fontSize: 20,
        marginLeft: 5,
        fontWeight: "bold",
        color: "black",
        marginTop: 40,
    },

     headerText2: {
        fontSize: 30,
        marginLeft: 5,
        fontWeight: "bold",
        color: "#1662A2",
    },

    search: {
        flexDirection: 'row',
        width: width,
        height: 50,
        backgroundColor: "#fff",
        opacity: 0.4,
        borderRadius: 10,
        marginTop: 10,
        marginLeft: 15,
       
    },

    searchBtn: {
        borderRadius: 5, 
        color: "#fff", 
        backgroundColor: "#D5D8DA", 
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
        fontSize: 18,
        fontWeight: "bold",    
    },

    displayIem: {
        marginTop: -40,
        flex: 1,
        flexDirection: "row",
        width: width,
        flexWrap: "wrap",
        justifyContent: "center",
        marginBottom: 130
    }

   
})

export default Products;