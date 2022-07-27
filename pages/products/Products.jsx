import React, {useState, useEffect} from 'react';
import { View, StyleSheet,  FlatList, Text, TextInput, Image } from 'react-native';
import Icon from "react-native-vector-icons/MaterialIcons";



import ProductDisplayItem from '../products/ProductDisplayItem'
import ProductFilter from './ProductFilter';
import FectchedCategory from './FectchedCategory';
import Caurosel from "../carousel/Carousel";
import { ScrollView } from 'native-base';

const data = require('../../data/products.json')
const cat = require('../../data/categories.json')

const Products = () => {

    const [products, setProducts] = useState([]) // products array
    const [searchProducts, setSearchProducts] = useState([]) // to store the filtered products
    const [targetProduct, setSearchTarget] = useState("") // targets the search text
    const [productCategory, setProductCategory] = useState([]) // targets the product category
    const [isActive, setIsActive] = useState() // to check if the filter is active
    const [initialState, setInitialState] = useState([]) // to check if the filter is active
    const [pCat, setpCat] = useState([])//
   

    // sets the products to the data from the json file
    useEffect(() => {
        setProducts(data)
        setSearchProducts(data)
        setSearchTarget(false)
        setProductCategory(cat)
        setIsActive(-1)
        setInitialState(data)
        
        
       
        return () => {
            setProducts([])
            setSearchProducts([])
            setSearchTarget() 
            setProductCategory([])
            setIsActive()
            setInitialState() 
            
        }
    },[])

    // filter products by search text
    const filterProducts = (text) => {
        setSearchProducts(products.filter(item => item.productName.toLowerCase().includes(text.toLowerCase())))
    }

    // filter products by category
    const alternateCategory = (cats) => {
        {
            cats === "all" ? [setpCat(initialState), setIsActive(true)] : [
                setpCat(products.filter(item => item.category._id === cats)), setIsActive(true)
            ]
        }
    }

    // search bar
    const openList = () => {
        setSearchTarget(true)
    }

    // close search bar
    const closeList = () => {
        setSearchTarget(false)
    }

    // search bar
    return (    
            <View>
                <View style={{marginTop: 10, marginLeft: 5, marginRight: 5}}>
                    {/* <Caurosel /> */}
                    <Image source={{uri: "https://downloadmobilebankingapp.com/wp-content/uploads/2022/02/Global-Virtual-Visa-and-Mastercard-Bangladesh.jpg"}} style={{width: "100%", height: 200, borderRadius: 10}} />
                </View>
                 <View style={{flexDirection: "row"}}>
                    <View style={styles.search}>
                        <TextInput onChangeText={(text) => filterProducts(text)} onFocus={openList} style={styles.headerTextInput} placeholder="Search" />
                         {targetProduct == true ? (
                       <Icon name="cancel" onPress={closeList} style={{marginTop: 15, marginLeft: 20}}  size={25} color="#1662A2" />
                    ) : null }
                    </View>
                </View>
                
                {targetProduct > 0 ? (
                    <View style={{flex: 1}}>
                        <ProductFilter searchProducts={searchProducts} />
                    </View>
                ) : (
                        <>
                        <View style={{flex: 1}}>
                            <FectchedCategory productCategory={productCategory} 
                                      pCat={pCat} active={isActive}
                                      catFilter={alternateCategory}
                                      isActive={isActive}
                                      setIsActive={setIsActive}
                             />
                        </View>
                        {pCat.length > 0 ? (
                          <View style={{ flex: 1, marginTop: -500}}>
                            {pCat.map((item) => {
                                {console.log("MEGAAAAAAAAAAAA", item)}
                                return (
                                    <ProductDisplayItem key={item._id} item={item} />
                                )
                            })}
                          </View>
                        ): (
                            <View>
                                <Text>No Products</Text>
                            </View>
                        )}
                       
                </>
                )}
            
        </View>
    )
}

const styles = StyleSheet.create({
    search: {
        flexDirection: 'row',
        width: 378,
        height: 50,
        backgroundColor: "#fff",
        opacity: 0.4,
        borderRadius: 10,
        marginTop: 10,
        marginLeft: 5,
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
    },

    flatList: {
        marginTop: 10,
    }
})

export default Products;