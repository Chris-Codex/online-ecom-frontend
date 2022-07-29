import React, {useState, useEffect} from 'react';
import { View, Text, StyleSheet, Image, Dimensions, Button, ScrollView} from 'react-native';


const OneProduct = (props) => {
    const [productList, setProductList] = useState(props.route.params.productList) 
    const [isAvailable, setIsAvailable] = useState(null) 


    return (
        <View style={styles.container}>
           <ScrollView style={styles.scrollview}>
             <View style={styles.imageContainer}>
                <Image source={{ uri: productList.img ?  productList.img : 
                'https://images.unsplash.com/photo-1518791841217-8f162f1e1131?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60' }}
                 style={styles.image}
                 resizeMode="contain"
            />
            </View>
            <View style={styles.infoContainer}>
                <Text style={styles.productName}>{productList.productName}</Text>
                <Text style={styles.productPrice}>{productList.price}</Text>
                <Text style={styles.productDescription}>{productList.productDescription}</Text>
            </View>
           </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        position: 'relative',
        height: '100%',
    },

    scrollview: {
        marginBottom: 80,
        padding: 10,
    },

    imageContainer: {
        backgroundColor: '#fff',
        padding: 0,
        margin: 0
    },

    image: {
        width: '100%',
        height: 250,
    }
})

export default OneProduct;