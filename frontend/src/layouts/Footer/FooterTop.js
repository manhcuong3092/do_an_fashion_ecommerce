import React from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import in1 from '../../assets/img/footer/in1.png';
import in2 from '../../assets/img/footer/in2.png';
import in3 from '../../assets/img/footer/in3.png';
import in4 from '../../assets/img/footer/in4.png';
import in5 from '../../assets/img/footer/in5.png';
import in6 from '../../assets/img/footer/in6.png';
import { Link } from 'react-router-dom';

const FooterTop = () => {
  return (
    <div className="footer-top section-padding">
      <div className="footer-dsc">
        <Container>
          <Row>
            <Col md={6} lg={3}>
              <div className="single-text">
                <div className="footer-title">
                  <h4>Liên hệ</h4>
                </div>
                <div className="footer-text">
                  <ul>
                    <li>
                      <i className="mdi mdi-map-marker"></i>
                      <p>Số 1 đường Vạn Xuân, xã Hạ Mỗ, Đan Phượng, Hà Nội.</p>
                    </li>
                    <li>
                      <i className="mdi mdi-phone"></i>
                      <p>0123456789</p>
                      <p>0123456789</p>
                    </li>
                    <li>
                      <i className="mdi mdi-email"></i>
                      <p>cuongamando@gmail.com</p>
                      <p>amdando@gmail.com</p>
                    </li>
                  </ul>
                </div>
              </div>
            </Col>
            <Col md={3} lg={2} className="wide-mobile">
              <div className="single-text">
                <div className="footer-title">
                  <h4>Tài khoản</h4>
                </div>
                <div className="footer-menu">
                  <ul>
                    <li>
                      <Link to={'/profile'}>
                        <i className="mdi mdi-menu-right"></i>Tài khoản
                      </Link>
                    </li>
                    <li>
                      <Link to={'/cart'}>
                        <i className="mdi mdi-menu-right"></i>Giỏ hàng
                      </Link>
                    </li>
                    <li>
                      <Link to={'/checkout'}>
                        <i className="mdi mdi-menu-right"></i>Thanh toán
                      </Link>
                    </li>
                    <li>
                      <Link to={'/order-history'}>
                        <i className="mdi mdi-menu-right"></i>Lịch sử
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
            </Col>
            <Col md={3} lg={2} className="wide-mobile">
              <div className="single-text">
                <div className="footer-title">
                  <h4>Chính sách</h4>
                </div>
                <div className="footer-menu">
                  <ul>
                    <li>
                      <Link to={'/return-policy'}>
                        <i className="mdi mdi-menu-right"></i>Đổi trả
                      </Link>
                    </li>
                    <li>
                      <Link to={'/security-policy'}>
                        <i className="mdi mdi-menu-right"></i>Bảo mật
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
            </Col>
            <Col md={6} lg={2} className="r-margin-top wide-mobile">
              <div className="single-text">
                <div className="footer-title">
                  <h4>Thông tin</h4>
                </div>
                <div className="footer-menu">
                  <ul>
                    <li>
                      <Link to={'/about-us'}>
                        <i className="mdi mdi-menu-right"></i>Giới thiệu
                      </Link>
                    </li>
                    <li>
                      <Link to={'/contact'}>
                        <i className="mdi mdi-menu-right"></i>Liên hệ
                      </Link>
                    </li>
                    <li>
                      <Link to={'/shop'}>
                        <i className="mdi mdi-menu-right"></i>Cửa hàng
                      </Link>
                    </li>
                    <li>
                      <Link to={'/blog'}>
                        <i className="mdi mdi-menu-right"></i>Tin tức
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
            </Col>
            <Col md={6} lg={3} className="r-margin-top wide-mobile">
              <div className="single-text">
                <div className="footer-title">
                  <h4>Fanpage</h4>
                </div>
                <div className="clearfix instagram">
                  <iframe
                    title="fanpage"
                    src="https://www.facebook.com/plugins/page.php?href=https%3A%2F%2Fwww.facebook.com%2Fprofile.php%3Fid%3D100086919084094&tabs&width=340&height=130&small_header=false&adapt_container_width=true&hide_cover=false&show_facepile=false&appId=423808619085199"
                    width="340"
                    height="130"
                    style={{ border: 'none', overflow: 'hidden' }}
                    scrolling="no"
                    frameBorder="0"
                    allowFullScreen={true}
                    allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
                  ></iframe>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </div>
  );
};

export default FooterTop;
