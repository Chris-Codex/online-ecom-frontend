import React from 'react'
import { View, Text } from 'react-native'

//connects to store to have access to the state
import { connect } from 'react-redux'

const ProductCart = (props) => {
  return (
    <View>
        <Text>ProductCart</Text>
    </View>
  )
}

const mapStateToProps = (state) => {
  const { cartObj } = state
  return {
    cartObj: cartObj
  }
}

export default (connect(mapStateToProps, null)(ProductCart))