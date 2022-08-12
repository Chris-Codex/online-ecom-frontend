import React from 'react';
import { View, Text, StyleSheet, Dimensions, TouchableOpacity, ScrollView} from 'react-native';

const width = Dimensions.get('screen').width;

const FectchedCategory = (props) => {
    return (
        <ScrollView bounces={true} horizontal={true} showsHorizontalScrollIndicator={false} style={{ width: width  }}>
            <View style={styles.container}>
                <TouchableOpacity key={1} onPress={() => {
                    props.catFilter('all'), props.setIsActive(-1);
                }}>
                    <View style={[ {margin: 5}, 
                    props.isActive == -1 ? styles.isActive : styles.notActive]}>
                        <Text style={styles.allText}>All Products</Text>
                    </View>
                </TouchableOpacity>
                {props.cat.map((results) => { 
                    return (
                        <TouchableOpacity key={results._id}  onPress={() => {
                            props.catFilter(results._id), props.setIsActive(props.cat.indexOf(results));
                        }}>
                            <View style={[ {margin: 5}, 
                            props.isActive == props.cat.indexOf(results) ? styles.isActive : styles.notActive]}>
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
    height: 33,
    width: width,
    marginRight: width,
    marginTop: 12,
   
    },

    // center: {
    //     flex: 1,
    //     justifyContent: 'center',
    //     alignItems: 'center',
    //     backgroundColor: '#F9F2F2',
    //     marginTop: 10,
    //     borderRadius: 10,
    // },

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
        fontSize: 17,
    },

    renderText: {
        fontWeight: "bold",
        fontSize: 17,
    }
})

export default FectchedCategory;