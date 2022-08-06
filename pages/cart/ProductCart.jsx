import React from 'react'
import { View, Text, Dimensions, StyleSheet } from 'react-native'

//connects to store to have access to the state
import { connect } from 'react-redux'

const ProductCart = (props) => {
  return (
    <View style={{ flex: 1 }}>
        {props.cartList.map((i) => {
            return (
                <Text>{i.productName}</Text>
            )
        })}
    </View>
  )
} 


const mapStateToProps = (state) => {
  const { cartList } = state
  return {
    cartList: cartList
  }
}

export default connect(mapStateToProps, null)(ProductCart)