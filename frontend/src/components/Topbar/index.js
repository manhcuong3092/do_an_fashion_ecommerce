import React from 'react'

const Topbar = () => {
  return (
    <div className="header-top-two">
      <div className="container text-center">
        <div className="row">
          <div className="col-12">
            <div className="middel-top">
              <div className="left floatleft">
                <p><i className="mdi mdi-clock"></i> Chưa đăng nhập</p>
              </div>
            </div>
            <div className="middel-top clearfix">
              <ul className="clearfix right floatright">
                <li>
                  <a href="#"><i className="mdi mdi-account"></i></a>
                  <ul>
                    <li><a href="login.html">Đăng nhập</a></li>
                    <li><a href="login.html">Đăng ký</a></li>
                    <li><a href="my-account.html">Tài khoản</a></li>
                  </ul>
                </li>
                <li>
                  <a href="#"><i className="mdi mdi-settings"></i></a>
                  <ul>
                    <li><a href="my-account.html">Tài khoản</a></li>
                    <li><a href="cart.html">Giỏ hàng</a></li>
                    <li><a href="wishlist.html">Yêu thích</a></li>
                    <li><a href="checkout.html">Thnah toán</a></li>
                  </ul>
                </li>
              </ul>
              <div className="right floatright widthfull">
                <form action="" onClick={e => e.preventDefault()}>
                  <button type="submit"><i className="mdi mdi-magnify"></i></button>
                  <input type="text" placeholder="Tìm kiếm..." />
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Topbar