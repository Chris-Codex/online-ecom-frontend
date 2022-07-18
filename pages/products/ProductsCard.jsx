import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView, Dimensions, FlatList, Button, Alert } from 'react-native';
import Icon from "react-native-vector-icons/MaterialIcons";
// Dimesion
const width = Dimensions.get('screen').width / 2 - 30;

const ProductsCard = ({item}) => {
    const {_id, img, productName, productDescription, price, trademark,  keepTrackProducts} = item;
    return (
        <View style={styles.cardContainer}>
             <View style={styles.imgContainer}>
                <Image source={{ uri:img }} style={styles.image} />
             </View>
        
            <View style={styles.cardHolder}>
                <Text style={styles.productTitle}>
                    {productName. length > 20 ? productName.substring(0, 20) + '...' : productName}
                </Text>
                <Text style={styles.productDescriiption}>
                    {productDescription. length > 20 ? productDescription.substring(0, 20) + '...' : productDescription}
                </Text>
                <Text style={styles.tradeMark}>
                    {trademark. length > 20 ? trademark.substring(0, 20) + '...' : trademark}
                </Text>
                
                <View style={styles.priceContainer}>
                    <Text style={styles.priceText}>${price}</Text>
                    
                    {  keepTrackProducts > 0 ? (
                    <Text style={styles.addText}>ADD TO CART</Text>
                ) : <Text style={styles.addText}>Not Available</Text>}
                </View>
                
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    cardContainer: {
        backgroundColor: 'transparent',
        margin: 10,
        justifyContent: 'center',
        borderRadius: 10,
        width: width,
        height: 260,
        marginHorizontal: 10,
        marginTop: 55,
        alignItems: "center",
        backgroundColor: '#F9F2F2',    
    },

    cardHolder: {
        backgroundColor: 'transparent',
        width: width - 20,
        height: width - 30 - 7,
        marginTop: 10, 
    },

    imgContainer: {
        backgroundColor: 'transparent',
        marginTop: -5,
    },

    image: {
        width: width - 5,
        marginTop: 10,
        borderRadius: 10,
        height: width - 20 - 30,
        backgroundColor: 'transparent',
    },

    productTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginLeft: 10,
        marginTop: -2,
    },

    productDescriiption: {
        margin: 10,
        fontWeight: 'bold',
        marginTop: 4,
    },

    tradeMark: {
        fontSize: 17,
        color: '#828282',
        marginLeft: 10,
        fontWeight: 'bold',
        marginTop: -4,
    },

    priceContainer: {
        flexDirection: 'row',
        marginTop: 10,
    },

    priceText: {
        marginLeft: 10,
        fontWeight: 'bold',
        fontSize: 15,
    },

    addText: {
        marginLeft: 10,
        fontWeight: 'bold',
        fontSize: 13,
        color: '#1662A2',
    }


})

export default ProductsCard;