import React from 'react';
import { View, Text, StyleSheet, SafeAreaView} from 'react-native';
import Icon from "react-native-vector-icons/MaterialIcons";
import IconCart from './IconCart';

const Header = () => {
    return (
            <View style={styles.header}>
                 
                <View>
                    <Text style={styles.headerText}>Welcome to</Text>
                    <Text style={styles.headerText2}>Griffith Stores</Text>
                </View>
                <View style={{marginRight: 10}}>
                    <Icon  name="shopping-cart" size={30} color="#1662A2">
                    <IconCart />
                </Icon>
                </View>
              
            </View>
    )
}

const styles = StyleSheet.create({
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        justifyContent: "space-between",
        alignItems: "center",
        width: "100%",
        backgroundColor: "#F7E4DE",
        
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

    
})

export default Header;