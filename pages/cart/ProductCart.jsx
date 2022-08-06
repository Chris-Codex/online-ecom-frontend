import React from 'react'
import { View, Text, Dimensions, StyleSheet, Button, TouchableOpacity, Image, ScrollView } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'

//connects to store to have access to the state
import { connect } from 'react-redux'
import * as actions from '../../App_Redux/Actions/productCartActions'

//Dimensions
const {width} = Dimensions.get('window').width

const ProductCart = (props) => {

  //get total price of cart
  const getTotalPrice = () => {
    let total = 0
    props.cartList.forEach(item => {
      total += item.price
    })
    return total
  }  

  return (
    <React.Fragment>
      {props.cartList.length > 0 ? (
        <View style={styles.cartContainer}>
          <View style={styles.cartHeader}>
              <Text style={styles.headerText}>My Cart</Text>
              <View style={styles.ClearBtn}>
                <TouchableOpacity>
                  <Text style={styles.ClearBtnText}>CLEAR ITEMS</Text>
                </TouchableOpacity>
              </View>
          </View>
          {props.cartList.map((item) => {
            return (
               <View style={styles.cartItem} key={Math.random()}>
                <View style={styles.details}>
                  <View style={styles.productImage}>
                    <Image resizeMode='contain' source={{ uri:item.img ? item.img : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"}} style={styles.image} />
                  </View>
                  <View style={{marginLeft: -50}}>
                    <Text style={{fontSize:21, fontWeight: "bold", marginTop: 10, color: "#1662A2"}}>{item.productName.length > 13 ? item.productName.substring(0, 13) + '...' : item.productName}</Text>
                    <Text style={{fontSize:18, fontWeight: "bold", marginTop: -2, color: "#999"}}>{item.productName.length > 16 ? item.productName.substring(0, 16) + '...' : item.productName}</Text>
                    <Text style={{fontSize:18, fontWeight: "bold", marginTop: 3, color: "#5CA2DF"}}>€ {item.price}</Text>
                  </View>
                  <View style={styles.orderCount}>
                    <Text style={{fontSize:17, fontWeight: "bold", marginTop: 7}}>1</Text>
                  </View>
                </View>
              </View>
            )
          })}
              
        </View>
      ):  (
        <View style={styles.cartContainer}>
          <Image resizeMode='contain' source={{ uri : "https://mir-s3-cdn-cf.behance.net/projects/404/95974e121862329.Y3JvcCw5MjIsNzIxLDAsMTM5.png"}} style={styles.emptyCart} />
        </View>
      )}
        <View style={{backgroundColor: "#fff", width: 400, height: 150, position: "absolute", bottom: 0, left: 0, elevation: 20}}>
          <View style={{flexDirection: "row", justifyContent: "space-between"}}>
            <Text style={{marginLeft: 20, marginTop: 20, fontSize: 20, fontWeight: "bold", color: "#1662A2"}}>Selected Item(3)</Text>
            <Text style={{marginRight: 20, marginTop: 20, fontSize: 20, fontWeight: "bold", color: "#1662A2"}}>Total: € {getTotalPrice()}</Text>
          </View>
          <View style={{marginTop: 12}}>
            <TouchableOpacity onPress={() => props.navigation.navigate('ProductCheckout')}>
              <View style={{width:width, height: 60, alignItems: "center", marginLeft: 20, marginRight: 20, backgroundColor: "#1662A2", paddingBottom: 20, borderRadius: 20}}>
                <Text style={{marginTop: 17, fontSize: 20, color: "#fff", fontWeight: "bold"}}>PROCEED TO CART</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
    </React.Fragment>
  )
} 


const mapStateToProps = (state) => {
  const { cartList } = state
  return {
    cartList: cartList
  }
}

const styles = StyleSheet.create({
  emptyCart: {
    width: width,
    height: 300,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 10,
    marginTop: 130
  },

cartHeader: {
  width: width,
  height: 50,
  backgroundColor: '#1662A2',
  marginTop: 10,
  flexDirection: 'row',
  justifyContent: 'space-between',
},

headerText: {
  color: '#fff',
  fontSize: 23,
  fontWeight: 'bold',
  textAlign: 'center',
  paddingTop: 10,
  marginLeft: 20
},

details: {
  flexDirection: 'row',
  backgroundColor: '#fff',
  width: width,
  height: 110,
  justifyContent: 'space-between',
  marginBottom: 5
},

productImage: {
  width: 110,
  height: 90,
  backgroundColor: '#fff',
  marginTop: 10,
},

image: {
  width: 110,
  height: 90,
},

orderCount: {
 width: 40,
 backgroundColor: "#EBF1F3",
  height: 40,
  marginRight: 20,
  marginTop: 30,
  borderRadius: 10,
  alignItems: 'center',
},

ClearBtn: {
  backgroundColor: '#5CA2DF',
  width: width,
  borderRadius: 10,
  marginRight: 5,
},

ClearBtnText: {
  color: '#fff',
  fontSize: 15,
  marginLeft: 10,
  marginRight: 10,
  marginTop: 12,
  fontWeight: 'bold'
}

})

export default connect(mapStateToProps, null)(ProductCart)