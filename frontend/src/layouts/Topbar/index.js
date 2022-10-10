import React from 'react'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import { Link } from 'react-router-dom';

const Topbar = () => {
  return (
    <div className="header-top-two">
      <Container className="container">
        <Row>
          <Col>
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
                    <li><Link to="/login">Đăng nhập</Link></li>
                    <li><Link to="/register">Đăng ký</Link></li>
                    <li><Link to="/profile">Tài khoản</Link></li>
                  </ul>
                </li>
                <li>
                  <a href="#"><i className="mdi mdi-settings"></i></a>
                  <ul>
                    <li><Link to="/profile">Tài khoản</Link></li>
                    <li><Link to="/cart">Giỏ hàng</Link></li>
                    <li><Link to="/checkout">Thnah toán</Link></li>
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
          </Col>
        </Row>
      </Container>
    </div>
  )
}

export default Topbar