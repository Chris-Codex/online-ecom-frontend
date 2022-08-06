import React from 'react';
import { View, Text, StyleSheet, Image, Button, Dimensions} from 'react-native';

//connect to redux to have access to the state
import { connect } from 'react-redux';
import * as actions from '../../App_Redux/Actions/productCartActions';

// Dimesion
const width = Dimensions.get('screen').width / 2 - 30;

const ProductsCard = (props) => {
    const {_id, img, productName, productDescription, price, trademark,  keepTrackProducts} = props;
    return (

             <View style={styles.cardContainer} key={_id}>
             <View style={styles.imgContainer}>
                <Image resizeMode='contain' source={{ uri:img ? img : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"}} style={styles.image} />
             </View>
        
            <View style={styles.cardHolder}>
                <Text style={styles.productTitle}>
                    {productName.length > 20 ? productName.substring(0, 20) + '...' : productName}
                </Text>
                <Text style={styles.productDescription}>
                    {productDescription. length > 20 ? productDescription.substring(0, 20) + '...' : productDescription}
                </Text>
                <Text style={styles.tradeMark}>
                    {trademark. length > 20 ? trademark.substring(0, 20) + '...' : trademark}
                </Text>
                
                <View style={styles.priceContainer}>
                    <Text style={styles.priceText}>${price}</Text>
                    
                    {  keepTrackProducts > 0 ? (
                    <Button title={'ADD TO CART'} style={styles.addText} onPress={() => {
                        props.addItemToCart(props);
                    }} />
                ) : <Text style={styles.notAvailable}>Not Available</Text>}
                </View>
                
            </View>
        </View>
    )
}

//
const mapDispatchToProps = (dispatch) => {
    return {
        addItemToCart: (product) => {
            dispatch(actions.addToCart(product));
        }
    }
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
        marginTop: 40,
        alignItems: "center",
        backgroundColor: '#fff',  
    },

    cardHolder: {
        backgroundColor: 'transparent',
        width: width - 20,
        height: width - 30 - 7,
        marginTop: 10, 
        marginBottom: 20,
    },

    imgContainer: {
        backgroundColor: 'transparent',
        marginTop: 30,
    },

    image: {
        width: 162,
        marginTop: -4,
        borderRadius: 10,
        height: width - 20 - 35,
        backgroundColor: 'transparent',
    },

    productTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginLeft: 10,
        marginTop: -2,
    },

    productDescription: {
        margin: 10,
        fontWeight: 'bold',
        marginTop: 4,
    },

    tradeMark: {
        fontSize: 17,
        color: '#8C8C8C',
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
    },

    notAvailable: {
        fontWeight: 'bold',
        fontSize: 13,
        color: 'red',
        marginLeft: 10,
    }


})

export default connect(null, mapDispatchToProps)(ProductsCard);