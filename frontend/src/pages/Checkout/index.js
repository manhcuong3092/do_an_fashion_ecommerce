import React, { Fragment } from 'react'
import CheckoutInfo from '../../components/CheckoutInfo'
import Footer from '../../layouts/Footer'
import Header from '../../layouts/Header'
import PageTitle from '../../layouts/PageTitle'

const Checkout = () => {
  return (
    <Fragment>
      <Header />
      <PageTitle title="Thanh toán" />
      <CheckoutInfo />
      <Footer />
    </Fragment>
  )
}

export default Checkout