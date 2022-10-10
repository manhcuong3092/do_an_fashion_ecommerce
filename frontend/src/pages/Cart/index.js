import React, { Fragment } from 'react'
import { Link } from 'react-router-dom'
import CartInfo from '../../components/CartInfo'
import PageTitle from '../../layouts/PageTitle'

const Cart = () => {
  return (
    <Fragment>
      <PageTitle title={"Giỏ hàng"} />
      <section className="pages cart-page section-padding">
        <div className="container">
          <CartInfo />
        </div>
      </section>
    </Fragment>
  )
}

export default Cart