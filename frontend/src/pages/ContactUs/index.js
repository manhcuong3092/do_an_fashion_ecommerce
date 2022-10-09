import React, { Fragment } from 'react'
import ContactMap from '../../components/ContactMap'
import PageTitle from '../../components/PageTitle'

const ContactUs = () => {
  return (
    <Fragment>
      <PageTitle title={"Liên Hệ"} />
      <ContactMap />
    </Fragment>
  )
}

export default ContactUs