import React, { Fragment } from 'react'
import Navbar from '../Navbar'
import Topbar from '../Topbar'

const Header = () => {
  return (
    <Fragment>
      <header className="header-one header-two">
        <Topbar />
        <Navbar />
      </header>
    </Fragment>
  )
}

export default Header