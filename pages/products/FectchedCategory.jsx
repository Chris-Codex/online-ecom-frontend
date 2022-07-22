import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, ScrollView} from 'react-native';

const FectchedCategory = (props) => {
    return (
        <ScrollView bounces={true} horizontal={true} style={{marginBottom: 40}}>
            <View style={styles.container}>
                <TouchableOpacity key={1} onPress={() => {
                    props.catFilter('app'), props.setIsActive(-1);
                }}>
                    <View style={[ {margin: 5}, 
                    props.isActive == -1 ? styles.isActive : styles.notActive]}>
                        <Text style={styles.allText}>All Products</Text>
                    </View>
                </TouchableOpacity>
                {props.productCategory.map((results) => {
                    return (
                        <TouchableOpacity key={results._id} onPress={() => {
                            props.catFilter(results._id), props.setIsActive(props.productCategory.indexOf(results));
                        }}>
                            <View style={[ {margin: 5}, 
                            props.isActive == props.productCategory.indexOf(results) ? styles.isActive : styles.notActive]}>
                                <Text style={styles.renderText}>{results.name}</Text>
                            </View>
                        </TouchableOpacity>
                    )

                })}
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
    flexDirection: "row",
    justifyContent: "space-between",
    height: 60,
    marginTop: -2,
    marginBottom: 20,
    },

    center: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F9F2F2',
        marginTop: 10,
        borderRadius: 10,
    },

    isActive: {
       color: "#1662A2",
    paddingBottom: 5,
    borderBottomWidth: 2,
    borderColor: "#1662A2",
    },

    notActive: { 
        color: '#1662A2',
    },

    allText: {
        fontWeight: "bold",
        color: "#1662A2",
        fontSize: 15,
    },

    renderText: {
        fontWeight: "bold",
         fontSize: 15,
    }
})

export default FectchedCategory;