import React from 'react'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import in1 from '../../assets/img/footer/in1.png';
import in2 from '../../assets/img/footer/in2.png';
import in3 from '../../assets/img/footer/in3.png';
import in4 from '../../assets/img/footer/in4.png';
import in5 from '../../assets/img/footer/in5.png';
import in6 from '../../assets/img/footer/in6.png';

const FooterTop = () => {
  return (
    <div className="footer-top section-padding">
      <div className="footer-dsc">
        <Container>
          <Row>
            <Col md={6} lg={3}>
              <div className="single-text">
                <div className="footer-title">
                  <h4>Contact us</h4>
                </div>
                <div className="footer-text">
                  <ul>
                    <li>
                      <i className="mdi mdi-map-marker"></i>
                      <p>Your address goes here.</p>
                      <p>Your address goes here.</p>
                    </li>
                    <li>
                      <i className="mdi mdi-phone"></i>
                      <p>0123456789</p>
                      <p>0123456789</p>
                    </li>
                    <li>
                      <i className="mdi mdi-email"></i>
                      <p>demo@example.com</p>
                      <p>demo@example.com</p>
                    </li>
                  </ul>
                </div>
              </div>
            </Col>
            <Col md={3} lg={2}  className="wide-mobile">
              <div className="single-text">
                <div className="footer-title">
                  <h4>my account</h4>
                </div>
                <div className="footer-menu">
                  <ul>
                    <li><a href="login.html"><i className="mdi mdi-menu-right"></i>My Account</a></li>
                    <li><a href="wishlist.html"><i className="mdi mdi-menu-right"></i>My Wishlist</a></li>
                    <li><a href="cart.html"><i className="mdi mdi-menu-right"></i>My Cart</a></li>
                    <li><a href="login.html"><i className="mdi mdi-menu-right"></i>Sign In</a></li>
                    <li><a href="checkout.html"><i className="mdi mdi-menu-right"></i>Check out</a></li>
                    <li><a href="#"><i className="mdi mdi-menu-right"></i>Track My Orde</a></li>
                  </ul>
                </div>
              </div>
            </Col>
            <Col md={3} lg={2} className="wide-mobile">
              <div className="single-text">
                <div className="footer-title">
                  <h4>shipping</h4>
                </div>
                <div className="footer-menu">
                  <ul>
                    <li><a href="contact.html"><i className="mdi mdi-menu-right"></i>New Products</a></li>
                    <li><a href="#"><i className="mdi mdi-menu-right"></i>Top Sellers</a></li>
                    <li><a href="#"><i className="mdi mdi-menu-right"></i>Manufactirers</a></li>
                    <li><a href="#"><i className="mdi mdi-menu-right"></i>Suppliers</a></li>
                    <li><a href="#"><i className="mdi mdi-menu-right"></i>Specials</a></li>
                    <li><a href="#"><i className="mdi mdi-menu-right"></i>Availability</a></li>
                  </ul>
                </div>
              </div>
            </Col>
            <Col md={6} lg={2} className="r-margin-top wide-mobile">
              <div className="single-text">
                <div className="footer-title">
                  <h4>Information</h4>
                </div>
                <div className="footer-menu">
                  <ul>
                    <li><a href="contact.html"><i className="mdi mdi-menu-right"></i>Return Exchange</a></li>
                    <li><a href="#"><i className="mdi mdi-menu-right"></i>Fast Delivery</a></li>
                    <li><a href="#"><i className="mdi mdi-menu-right"></i>Online Shopping</a></li>
                    <li><a href="#"><i className="mdi mdi-menu-right"></i>Shipping Guide</a></li>
                    <li><a href="#"><i className="mdi mdi-menu-right"></i>Turm Of Use</a></li>
                    <li><a href="#"><i className="mdi mdi-menu-right"></i>Home Delivery</a></li>
                  </ul>
                </div>
              </div>
            </Col>
            <Col md={6} lg={3} className="r-margin-top wide-mobile">
              <div className="single-text">
                <div className="footer-title">
                  <h4>instagram</h4>
                </div>
                <div className="clearfix instagram">
                  <ul>
                    <li><a href="#"><img src={in1} alt="Instagram" /></a></li>
                    <li><a href="#"><img src={in2} alt="Instagram" /></a></li>
                    <li><a href="#"><img src={in3} alt="Instagram" /></a></li>
                    <li><a href="#"><img src={in4} alt="Instagram" /></a></li>
                    <li><a href="#"><img src={in5} alt="Instagram" /></a></li>
                    <li><a href="#"><img src={in6} alt="Instagram" /></a></li>
                  </ul>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </div>
  )
}

export default FooterTop