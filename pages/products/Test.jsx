import React from 'react'

const Test = (props) => {
    const {name, email, address} = props
  return (
    <div>Hello {name}</div>
  )
}

export default Test