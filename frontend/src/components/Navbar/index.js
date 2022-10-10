import React from 'react'
import { Link } from 'react-router-dom'
import CartIcon from '../CartIcon'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';

const Navbar = () => {
  return (
    <Container className="text-center">
      <Row>
        <Col md={2}>
          <div className="logo">
            <a href="index.html"><img src="img/logo2.png" alt="Sellshop" /></a>
          </div>
        </Col>
        <Col md={8}>
          <div className="header-middel">
            <div className="mainmenu">
              <nav>
                <ul>
                  <li><Link to="/">Trang chủ</Link></li>
                  <li><Link to="/shop">Shop</Link>
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
                  <li><Link to="/blog">Blog</Link>
                    <ul className="dropdown">
                      <li><a href="blog-style-1.html">Danh sách bài viết</a></li>
                      <li><a href="single-blog.html">Bài viết</a></li>
                    </ul>
                  </li>
                  <li><Link to="/about-us">Giới thiệu</Link></li>
                  <li><Link to="/contact">Liên hệ</Link></li>
                </ul>
              </nav>
            </div>
          </div>
        </Col>
        <Col md={2}>
          <CartIcon />
        </Col>
      </Row>
    </Container>
  )
}

export default Navbar