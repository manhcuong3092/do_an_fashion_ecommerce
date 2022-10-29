import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import CartIcon from '../../components/CartIcon';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import logo from '../../assets/img/logo2.png';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '~/redux/actions/authActions';
import { toast } from 'react-toastify';
import axios from 'axios';
import { END_POINT } from '~/config';

const Navbar = () => {
  const [categories, setCategories] = useState(null);

  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    const getCategories = async () => {
      const { data } = await axios.get(`${END_POINT}/api/v1/categories`, { withCredentials: true });
      if (data.success) {
        setCategories(data.categories);
      }
    };
    getCategories();
  }, []);

  const logoutHandler = () => {
    dispatch(logout());
    toast.success('Đăng xuất thành công.');
  };

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
                    <ul className="dropdown dropdown-nav-menu">
                      {categories &&
                        categories.map((item) => (
                          <li>
                            <Link to={`/shop?category=${item.slug}`}>{item.name}</Link>
                          </li>
                        ))}
                    </ul>
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
                      <li>
                        <Link to="/order-history">Lịch sử đặt hàng</Link>
                      </li>
                    </ul>
                  </li>
                  <li>
                    <Link to="/blog">Blog</Link>
                  </li>
                  <li>
                    <Link to="/about-us">Giới thiệu</Link>
                    <ul className="dropdown dropdown-nav-menu">
                      <li>
                        <Link to="/contact">Liên hệ</Link>
                      </li>
                      <li>
                        <Link to="/return-policy">Chính sách đổi trả</Link>
                      </li>
                      <li>
                        <Link to="/security-policy">Chính sách bảo mật</Link>
                      </li>
                    </ul>
                  </li>
                  <li>
                    <Link to="/profile">Tài khoản</Link>
                    <ul className="dropdown dropdown-nav-menu">
                      {user ? (
                        <li>
                          <Link onClick={() => logoutHandler()}>Đăng xuất</Link>
                        </li>
                      ) : (
                        <li>
                          <Link to="/login">Đăng nhập</Link>
                        </li>
                      )}
                      <li>
                        <Link to="/register">Đăng ký</Link>
                      </li>
                    </ul>
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
