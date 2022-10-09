import React, { Fragment } from 'react'
import CartPayment from './CartPayment'
import ItemList from './ItemList'

const CartInfo = () => {
  return (
    <Fragment>
      <ItemList />
      <CartPayment />
    </Fragment>
  )
}

export default CartInfo