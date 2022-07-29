import React, {useState, useEffect} from 'react';
import { View, StyleSheet,  ScrollView, Text, TextInput, Image, Dimensions } from 'react-native';
import Icon from "react-native-vector-icons/MaterialIcons";



import ProductDisplayItem from '../products/ProductDisplayItem'
import ProductFilter from './ProductFilter';
import FectchedCategory from './FectchedCategory';
import Caurosel from "../carousel/Carousel";


const data = require('../../data/products.json')
const categories = require('../../data/categories.json')
var {width} = Dimensions.get('window');
const height = Dimensions.get('screen').height / 2.2;

const Products = (props) => {

    const [products, setProducts] = useState([]) // products array
    const [searchProducts, setSearchProducts] = useState([]) // to store the filtered products
    const [targetProduct, setSearchTarget] = useState("") // targets the search text
    const [cat, setCat] = useState([]) // targets the product category
    const [pCat, setpCat] = useState([])//
    const [isActive, setIsActive] = useState() // to check if the filter is active
    const [initialState, setInitialState] = useState([]) // to check if the filter is active
    
   

    // sets the products to the data from the json file
    useEffect(() => {
        setProducts(data)
        setSearchProducts(data)
        setSearchTarget(false)
        setCat(categories)
        setpCat(data)
        setIsActive(-1)
        setInitialState(data)
        
        
       
        return () => {
            setProducts([])
            setSearchProducts([])
            setSearchTarget() 
            setCat([])
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
            <View style={{height: height}}>
                <View style={{marginTop: 10, justifyContent: "center"}}>
                    {/* <Caurosel /> */}
                    <Image source={{uri: "https://downloadmobilebankingapp.com/wp-content/uploads/2022/02/Global-Virtual-Visa-and-Mastercard-Bangladesh.jpg"}} style={{width: "100%", height: 200, borderRadius: 10, }} />
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
                        <ScrollView >
                           
                        {pCat.length > 0 ? (
                          <View style={styles.displayIem}>
                            {pCat.map((item) => {
                                {console.log("MEGAAAAAAAAAAAA", item)}
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
    )
}

const styles = StyleSheet.create({
    search: {
        flexDirection: 'row',
        width: width,
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

    displayIem: {
        marginTop: -40,
        flex: 1,
        flexDirection: "row",
        width: width,
        flexWrap: "wrap",
        justifyContent: "center",
        marginBottom: 250
    }

   
})

export default Products;