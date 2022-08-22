import React, {useState, useEffect} from 'react';
import Toast from 'react-native-toast-message';
import { View, Text, StyleSheet, Image, TouchableOpacity, Dimensions, Button, ScrollView} from 'react-native';
import { connect } from 'react-redux';
import * as actions from '../../App_Redux/Actions/productCartActions';
import Icon from 'react-native-vector-icons/Ionicons';
import Highlight from '../welcomeHeader/css/Highlight';



const OneProduct = (props) => {
    const [productList, setProductList] = useState(props.route.params.productList) 
    const [isAvailable, setIsAvailable] = useState(null) 
    const [availText, setAvailText] = useState("")

    useEffect(() => { //check if product is available
        if(props.route.params.productList.keepTrackProducts == 0){
            setIsAvailable(<Highlight unavailable></Highlight>)
            setAvailText("Product is not available")
        } else if (props.route.params.productList.keepTrackProducts <= 5 ) {
            setIsAvailable(<Highlight limited></Highlight>)
            setAvailText("Limited Stock")
        } else {
            setIsAvailable(<Highlight available></Highlight>)
            setAvailText("Product is Available")
        }

        return () => {
            setIsAvailable(null)
            setAvailText("")
        }
    },[])


    return (
        <>
        <View style={styles.header}>
            <TouchableOpacity onPress={() => props.navigation.goBack()} >
                <Icon name="ios-arrow-back" style={{marginTop: 22, marginLeft: 14}} size={25} color="#1662A2" />
            </TouchableOpacity>
            <Text
            style={{
                marginTop: 23,
                marginLeft: 10,
                fontSize: 18,
                fontWeight: "bold",
            }}
            >
            Home
            </Text>
        

        <TouchableOpacity
            onPress={() => {
                props.addItemToCart(props.route.params.productList),
                Toast.show({
                    type: 'success',
                    position: 'bottom',
                    text1: `${productList.productName} added to cart`,
                    text2: 'Complete your purchase in the cart',
                })
            }}
        >
          <View
            style={{
              width: 130,
              height: 40,
              marginLeft: 170,
              backgroundColor: "#1662A2",
              marginTop: 28,
              borderRadius: 10,
            }}
          >
            <Text
              style={{
                fontSize: 17,
                fontWeight: "bold",
                color: "#fff",
                marginLeft: 20,
                marginTop: 7,
              }}
            >
              Add to Cart
            </Text>
          </View>
        </TouchableOpacity>
      </View>

        <View style={styles.container}>
           <ScrollView style={styles.scrollview}>
             <View style={styles.imageContainer}>
                <View style={styles.namePrice}>
                <View style={{marginTop: 20}}>
                    <Text style={{marginLeft: 15, fontSize: 25, fontWeight: "bold"}}>{productList.productName}</Text>
                    <Text style={{marginLeft: 15, fontSize: 17, color: "#1662A2", fontWeight: "bold"}}>{productList.trademark}</Text>
                </View>
                <View style={styles.price}>
                    <Text style={{marginRight: 15, marginTop: 36, fontSize: 20, fontWeight: "bold"}}>€ {productList.price}</Text>
                </View>
             </View>
                <Image source={{ uri: productList.img ?  productList.img : 
                'https://images.unsplash.com/photo-1518791841217-8f162f1e1131?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60' }}
                 style={styles.image}
                 resizeMode="contain"
            />
             <View style={styles.infoContainer}>
                <View>
                    {isAvailable}
                    <Text>
                        <Text style={{fontWeight: "bold"}}>Available:</Text> {availText}
                    </Text>
                </View>
                <Text style={{fontWeight: "bold", fontSize: 15, marginTop: 10, marginBottom: 10}}>Descriptions</Text>
                <Text style={styles.productDescription}>{productList.productDescription}</Text>
            </View>
            </View>
           </ScrollView>
        </View>
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        position: 'relative',
        height: '100%',
    },

    scrollview: {
        marginTop: 20,
        marginBottom: 80,
        padding: 10,
    },

    imageContainer: {
        backgroundColor: '#fff',
        padding: 0,
        margin: 0,
        backgroundColor: "#fff",
        borderRadius: 10,
        marginBottom: 20,
    },

    image: {
        width: '100%',
        height: 250,
        marginTop: 30
    },

    namePrice: {
        flexDirection: 'row',
        justifyContent: 'space-between',
      
    },

    infoContainer: {
        marginTop: 15,
        marginLeft: 15,
        marginBottom: 30,
    },

    productDescription: {
        fontSize: 16,
        marginRight: 7
    },
    header: {
        flexDirection: 'row',
        alignItems: "center",
        width: "100%",
        height: 80,
        marginTop: 20,
        backgroundColor: "#fff",
        
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

    singleAddToCart: {
        backgroundColor: "#1662A2",
        marginTop: -190,
        width: 150,
        height: 50,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 10,
        alignSelf: "center",
    }
})

//connect to store to have access to the state
const mapDispatchToProps = (dispatch) => {
    return {
        addItemToCart: (product) => {
            dispatch(actions.addToCart(product));
        }
    }
}


export default connect(null, mapDispatchToProps)(OneProduct);