import React, { useState } from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { logout } from '../../redux/actions/authActions';
import { ROLE_ADMIN } from '../../constants/role';
import { useMediaQuery, useTheme } from '@mui/material';

const Topbar = () => {
  const [keyword, setKeyword] = useState('');

  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const navigate = useNavigate();

  const logoutHandler = () => {
    dispatch(logout());
    navigate('/');
    toast.success('Đăng xuất thành công.');
  };

  const handleSearch = () => {
    navigate(`/shop?keyword=${keyword}`);
  };

  return (
    <div className="header-top-two">
      <Container className="container">
        <Row>
          <Col>
            <div className="middel-top">
              <div className="left floatleft">
                <p>
                  <i className="mdi mdi-clock"></i> {user ? <span>Xin chào: {user.name} </span> : 'Chưa đăng nhập'}
                </p>
              </div>
            </div>
            <div className="middel-top clearfix">
              <ul className="clearfix right floatright">
                <li>
                  <Link>
                    <i className="mdi mdi-account"></i>
                  </Link>
                  {user ? (
                    <ul>
                      <li>
                        <Link onClick={logoutHandler}>Đăng xuất</Link>
                      </li>
                      <li>
                        <Link to="/profile">Tài khoản</Link>
                      </li>
                      {user.role === ROLE_ADMIN && (
                        <li>
                          <Link to="/admin/dashboard">Bảng điều khiển</Link>
                        </li>
                      )}
                    </ul>
                  ) : (
                    <ul>
                      <li>
                        <Link to="/login">Đăng nhập</Link>
                      </li>
                      <li>
                        <Link to="/register">Đăng ký</Link>
                      </li>
                    </ul>
                  )}
                </li>
                <li>
                  <Link>
                    <i className="mdi mdi-settings"></i>
                  </Link>
                  <ul>
                    <li>
                      <Link to="/profile">Tài khoản</Link>
                    </li>
                    <li>
                      <Link to="/cart">Giỏ hàng</Link>
                    </li>
                    <li>
                      <Link to="/checkout">Thanh toán</Link>
                    </li>
                  </ul>
                </li>
              </ul>
              <div className={`right floatright ${isMobile ? '' : 'widthfull'}`}>
                <form action="" onSubmit={(e) => e.preventDefault()}>
                  <button type="submit" onClick={(e) => handleSearch()}>
                    <i className="mdi mdi-magnify"></i>
                  </button>
                  <input
                    type="text"
                    value={keyword}
                    onChange={(e) => setKeyword(e.target.value)}
                    placeholder="Tìm kiếm..."
                  />
                </form>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Topbar;
