import React from 'react'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { logout } from "../../redux/actions/authActions";

const Topbar = () => {

  const { user } = useSelector(state => state.auth);
  const dispatch = useDispatch();

  const logoutHandler = () => {
    dispatch(logout());
    toast.success('Đăng xuất thành công.');
  }

  return (
    <div className="header-top-two">
      <Container className="container">
        <Row>
          <Col>
            <div className="middel-top">
              <div className="left floatleft">
                <p><i className="mdi mdi-clock"></i> {user ? <span>Xin chào: {user.name} </span> : 'Chưa đăng nhập'}</p>
              </div>
            </div>
            <div className="middel-top clearfix">
              <ul className="clearfix right floatright">
                <li>
                  <Link><i className="mdi mdi-account"></i></Link>
                  {user ? (
                    <ul>
                      <li><Link onClick={logoutHandler}>Đăng xuất</Link></li>
                      <li><Link to="/profile">Tài khoản</Link></li>
                    </ul>
                  ) : (
                    <ul>
                      <li><Link to="/login">Đăng nhập</Link></li>
                      <li><Link to="/register">Đăng ký</Link></li>
                    </ul>
                  )}
                </li>
                <li>
                  <Link><i className="mdi mdi-settings"></i></Link>
                  <ul>
                    <li><Link to="/profile">Tài khoản</Link></li>
                    <li><Link to="/cart">Giỏ hàng</Link></li>
                    <li><Link to="/checkout">Thanh toán</Link></li>
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