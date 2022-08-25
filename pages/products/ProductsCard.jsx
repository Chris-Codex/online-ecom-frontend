import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Dimensions} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Toast from 'react-native-toast-message';

//connect to redux to have access to the state
import { connect } from 'react-redux';
import * as actions from '../../App_Redux/Actions/productCartActions';

// Dimesion
const width = Dimensions.get('screen').width / 2 - 30;

const ProductsCard = (props) => {
    const {_id, img, productName, productDescription, price, trademark,  keepTrackProducts} = props;
    console.log("test",img);
    return (

             <View style={styles.cardContainer} key={_id}>
             <View style={styles.imgContainer}>
                <Image resizeMode='contain' source={{ uri: img }} style={styles.image} />
             </View>
        
            <View style={styles.cardHolder}>
                <Text style={styles.productTitle}>
                    {productName.length > 13 ? productName.substring(0, 13) + '...' : productName}
                </Text>
                <Text style={styles.tradeMark}>
                    {trademark. length > 20 ? trademark.substring(0, 20) + '...' : trademark}
                </Text>
                <Text style={styles.productDescription}>
                    {productDescription. length > 20 ? productDescription.substring(0, 20) + '...' : productDescription}
                </Text>
                 <Text style={styles.priceText}>${price}</Text>
                
                
                <View style={styles.priceContainer}> 
                    {  keepTrackProducts > 0 ? (
                    <TouchableOpacity onPress={() => {
                        props.addItemToCart(props),
                        Toast.show({
                            type: 'success',
                            position: 'bottom',
                            text1: `${productName} added to cart`,
                            text2: 'Complete your purchase in the cart',
                        })
                    }}>
                        <View style={{marginTop: -17, flexDirection: "row", backgroundColor: "#1662A2", width: 70, height: 32, borderRadius: 7, alignSelf: "flex-end"}}>
                            <Icon name="plus" style={{marginLeft: 7, alignSelf: "center"}} size={16} color="#fff" />
                            <Text style={styles.addProduct}>Add</Text>
                        </View>
                    </TouchableOpacity>
                ) : <Text style={styles.notAvailable}>Not Available</Text>}
                </View>
                
            </View>
        </View>
    )
}

//connect to store to have access to the state
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
        marginTop: 30,
        width: width - 20,
        resizeMode: 'contain',

    },

    image: {
        width: 150,
        marginTop: 10,
        borderRadius: 10,
        height: width - 20 - 56,
        backgroundColor: 'transparent',
        alignSelf: 'center',
    },

    productTitle: {
        fontSize: 17,
        fontWeight: 'bold',
        marginLeft: 10,
        marginTop: -2,
    },

    productDescription: {
        margin: 10,
        fontWeight: 'bold',
        marginTop: 2,
        fontSize: 14
    },

    addProduct: {
        fontSize: 15,
        fontWeight: 'bold',
        color: '#fff',
        marginLeft: 7,
        marginTop: 5
    },

    tradeMark: {
        fontSize: 17,
        color: '#8C8C8C',
        marginLeft: 10,
        fontWeight: 'bold',
        marginTop: -4,
    },

    priceContainer: {
        marginTop: -10
    },

    priceText: {
        marginLeft: 10,
        fontWeight: 'bold',
        fontSize: 15,
        marginTop: -4,
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
        marginTop: 10
    }


})

export default connect(null, mapDispatchToProps)(ProductsCard);