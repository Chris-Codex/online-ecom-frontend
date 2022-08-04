import React, {useState, useEffect} from 'react';
import { View, Text, StyleSheet, Image, Dimensions, Button, ScrollView} from 'react-native';

const OneProduct = (props) => {
    const [productList, setProductList] = useState(props.route.params.productList) 
    const [isAvailable, setIsAvailable] = useState(null) 


    return (
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
                <Text style={{fontWeight: "bold", fontSize: 15, marginBottom: 10}}>Descriptions</Text>
                <Text style={styles.productDescription}>{productList.productDescription}</Text>
            </View>
            </View>
           </ScrollView>

           <View style={{marginLeft: 20, marginRight: 20, marginBottom: 20}}>
            <Button style={styles.addBtn} title="Add to Cart" onPress={() => {}} />
           </View>
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
        fontSize: 17,
    }
})

export default OneProduct;