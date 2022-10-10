import React from 'react'
import ContactForm from '../ContactForm'
import BrandLogo from './BrandLogo'
import FooterBottom from './FooterBottom'
import FooterTop from './FooterTop'

const Footer = () => {
  return (
    <div className='footer-two'>
      <BrandLogo />
      <ContactForm />
      <FooterTop />
      <FooterBottom />
    </div>
  )
}

export default Footer