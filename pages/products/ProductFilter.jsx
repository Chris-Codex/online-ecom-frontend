import React from 'react';
import { View, Text, StyleSheet, SafeAreaView} from 'react-native';

const ProductFilter = (props) => {
    const {search} = props
    console.log("Search:", search)
    return (
        <View style={styles.container}>
            {search.length > 0 ? (
                search.map((result) => (
                    <View key={result.id} style={styles.result}>
                        <Image source={{uri: result.img ? img : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg" >}} style={styles.image} />
                        <Text style={styles.resultText}>{result.productName}</Text>
                        <Text style={styles.resultText}>{result.price}</Text>
                    </View> 
                ))
            ) : (
                <Text style={styles.text}>No Products Found</Text>
            )}
        </View>
    )
}

export default ProductFilter;