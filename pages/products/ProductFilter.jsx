import React from 'react';
import { View, Text, StyleSheet, Image, Dimensions, SafeAreaView} from 'react-native';

// image dimensions
const Imagewidth = Dimensions.get('screen').width / 2 - 60;
const mainWidth = Dimensions.get('screen').width /1.1;

const ProductFilter = (props) => {
    const {search} = props
    console.log("Search:", search)
    return (
        <View style={styles.container}>
            {search.length > 0 ? (
                search.map((result) => (
                    <View style={styles.displayContainer} key={result.id}>
                       <View style={styles.imageContainer}>
                         <Image source={{uri: result.img ? result.img : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"}} style={styles.image} />
                       </View>
                       <View style={styles.textContainer}>
                            <Text style={styles.resultText1}>{result.productName}</Text>
                            <Text style={styles.resultText2}>{result.productDescription.length > 0 ?  result.productDescription.substring(0, 50) + '...' : result.productDescription }</Text>
                            <View style={styles.addToCartContainer}>
                                <Text style={styles.addToCartPrice}>${result.price}</Text>
                                <Text style={styles.addToCartBtn}>{result.keepTrackProducts > 0 ? "ADD TO CART" : <Text style={{color: "red"}}>Not Available</Text>}</Text>
                            </View>
                       </View>
                     </View> 
                ))
            ) : (
                <Text style={styles.text}>No Products Found</Text>
            )}
        </View>
    )
}

const styles = StyleSheet.create({
    resultContainer: {
        flexDirection: 'row',
    },

    container: {
       flex: 1,
        width: mainWidth,
        marginLeft: 10,
        marginTop: 20,
        marginBottom: 90,
    },

    displayContainer: {
        flex: 1,
        flexDirection: 'row',
        
    },

    image: {
        width: 140,
        height: 300,
        marginLeft: -20,
        marginTop: 20,
        resizeMode: 'contain',
        height: Imagewidth  - 20 - 20,
    },

    textContainer: {
        flex: 1,
        marginTop: 20,
    },

    addToCartContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 20,
    },

    resultText1: {
        fontSize: 19,
        fontWeight: 'bold',
    },

    resultText2: {
        fontSize: 15,
    },

    addToCartPrice: {
        fontSize: 15,
        fontWeight: 'bold',
    },

    addToCartBtn: {
        fontSize: 13,
        fontWeight: 'bold',
        color: '#1662A2',
    }
})

export default ProductFilter;