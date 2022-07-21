import React, {useEffect, useState} from 'react';
import { View, StyleSheet, Image, Dimensions, ScrollView} from 'react-native';
import Swiper from 'react-native-swiper';
import Data from "./../carousel/data"

//Dimensions
const {width} = Dimensions.get('window'); 

const Caurosel = () => {
    const [images, setImages] = useState([])

    useEffect(() => {
        setImages([
            "http://surgetoday.com/wp-content/uploads/2016/03/surge-promo-items.png",
            "https://www.ortery.com/wp-content/uploads/2015/12/Beats_topshot__original01-750t.jpg",
            "https://professionalproductphotography.com/wp-content/uploads/2021/11/professional-product-photography-simple-gallery-1024x512.jpg",
        ])

         
    }, [])

    return (
        <ScrollView>
            <View style={styles.container}>
            <View style={styles.swiper}>
                <Swiper style={{height: width / 2}} showsButtons={false} autoplay={true} autoplayTimeout={3}>
                    {images.map((display) => {

                        return (
                            <View style={styles.slide}>
                                <Image key={display} resizeMode="contain" source={{uri: display}} style={styles.image} />
                            </View>
                        )
                    })}
                </Swiper>
                <View style={{height: 20}}></View>
            </View>
        </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FEEAE4',
        marginBottom: 20,
        marginTop: 20,
    },

    swiper: {
        width: width,
        alignItems: 'center',
        marginTop: 20,
        height: 310
    },

    image: {
        height: width / 2,
        width: width - 40,
        borderRadius: 10,
        marginHorizontal: 20,
        marginBottom: 20,
        marginTop: 20,

    }
})

export default Caurosel;