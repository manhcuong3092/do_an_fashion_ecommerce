import React from 'react';
import { Link } from 'react-router-dom';
import CartIcon from '../../components/CartIcon';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import logo from '../../assets/img/logo2.png';

const Navbar = () => {
  return (
    <Container className="text-center">
      <Row>
        <Col md={2}>
          <div className="logo">
            <a href="/">
              <img src={logo} alt="Sellshop" />
            </a>
          </div>
        </Col>
        <Col md={8}>
          <div className="header-middel">
            <div className="mainmenu">
              <nav>
                <ul>
                  <li>
                    <Link to="/">Trang chủ</Link>
                  </li>
                  <li>
                    <Link to="/shop">Shop</Link>
                  </li>
                  <li>
                    <Link to="/cart">Giỏ hàng</Link>
                    <ul className="dropdown dropdown-nav-menu">
                      <li>
                        <Link to="/cart">Giỏ hàng</Link>
                      </li>
                      <li>
                        <Link to="/checkout">Thanh toán</Link>
                      </li>
                    </ul>
                  </li>
                  <li>
                    <Link to="/blog">Blog</Link>
                  </li>
                  <li>
                    <Link to="/about-us">Giới thiệu</Link>
                  </li>
                  <li>
                    <Link to="/contact">Liên hệ</Link>
                  </li>
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
  );
};

export default Navbar;
