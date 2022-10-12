import React, { Fragment } from 'react'
import ContactMap from '../../components/ContactMap'
import Footer from '../../layouts/Footer'
import Header from '../../layouts/Header'
import PageTitle from '../../layouts/PageTitle'

const ContactUs = () => {
  return (
    <Fragment>
      <Header />
      <PageTitle title={"Liên Hệ"} />
      <ContactMap />
      <Footer />
    </Fragment>
  )
}

export default ContactUs