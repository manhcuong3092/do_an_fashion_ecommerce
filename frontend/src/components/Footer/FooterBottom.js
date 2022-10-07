import React from 'react'

const FooterBottom = () => {
  return (
    <div className="footer-bottom">
      <div className="container">
        <div className="row">
          <div className="col-md-6">
            <p className="copy-text"> © 2022 <strong>Amado</strong> Made With <i className="mdi mdi-heart" style={{'color': 'red'}} aria-hidden="true"></i> By <a className="company-name" href="https://themeforest.net/user/codecarnival/portfolio">
              <strong> ManhCuong</strong></a>.</p>
          </div>
          <div className="col-md-6 text-center text-md-end">
            <a href="#"><img src="img/footer/payment.png" alt="" /></a>
          </div>
        </div>
      </div>
    </div>
  )
}

export default FooterBottom