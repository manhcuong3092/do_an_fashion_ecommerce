import React from 'react'
import CartIcon from '../CartIcon'

const Navbar = () => {
  return (
    <div className="container text-center">
      <div className="row">
        <div className="col-md-2">
          <div className="logo">
            <a href="index.html"><img src="img/logo2.png" alt="Sellshop" /></a>
          </div>
        </div>
        <div className="col-md-8">
          <div className="header-middel">
            <div className="mainmenu">
              <nav>
                <ul>
                  <li><a href="index.html">Trang chủ</a>
                  </li>
                  <li><a href="shop.html">Shop</a>
                    <ul className="dropdown">
                      <li><a href="#">Shirts & Top</a></li>
                      <li><a href="#">Shoes</a></li>
                      <li><a href="#">Dresses</a></li>
                      <li><a href="#">Shemwear</a></li>
                      <li><a href="#">Jeans</a></li>
                      <li><a href="#">Sweaters</a></li>
                      <li><a href="#">Jacket</a></li>
                      <li><a href="#">Men Watch</a></li>
                    </ul>
                  </li>
                  <li><a href="#">Trang</a>
                    <ul className="dropdown">
                      <li><a href="wishlist.html">Yêu thích</a></li>
                      <li><a href="checkout.html">Checkout</a></li>
                      <li><a href="cart.html">Giỏ hàng</a></li>
                      <li><a href="product-grid.html">Danh sách sản phẩm</a></li>
                      <li><a href="product-list.html">Danh sách sản phẩm</a></li>
                      <li><a href="single-product.html">Sản phẩm</a></li>
                      <li><a href="error-404.html">404 page</a></li>
                    </ul>
                  </li>
                  <li><a href="blog.html">Blog</a>
                    <ul className="dropdown">
                      <li><a href="blog-style-1.html">Danh sách bài viết</a></li>
                      <li><a href="single-blog.html">Bài viết</a></li>
                    </ul>
                  </li>
                  <li><a href="about.html">Giới thiệu</a></li>
                  <li><a href="contact.html">Liên hệ</a></li>
                </ul>
              </nav>
            </div>
          </div>
        </div>
        <div className="col-md-2">
          <CartIcon />
        </div>
      </div>
    </div>
  )
}

export default Navbar