import React, { Fragment } from 'react'
import CheckoutInfo from '../../components/CheckoutInfo'
import PageTitle from '../../components/PageTitle'

const Checkout = () => {
  return (
    <Fragment>
      <PageTitle title="Thanh toán" />
      <CheckoutInfo />
    </Fragment>
  )
}

export default Checkout