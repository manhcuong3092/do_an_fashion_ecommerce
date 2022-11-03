import React from 'react';
import logo from '../../../assets/img/logocrop.png';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import defaultAvatar from '../../../assets/img/default_avatar.jpg';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '~/redux/actions/authActions';
import { toast } from 'react-toastify';

const TopNav = () => {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logoutHandler = () => {
    dispatch(logout());
    toast.success('Đăng xuất thành công.');
    navigate('/');
  };
  const handleExpandSidebar = (e) => {
    e.preventDefault();
    document.body.classList.toggle('sb-sidenav-toggled');
    localStorage.setItem('sb|sidebar-toggle', document.body.classList.contains('sb-sidenav-toggled'));
  };

  return (
    <Navbar className="sb-topnav navbar-expand navbar-dark">
      <Navbar.Brand className="ps-3 mr-5" as={Link} to="/admin/dashboard">
        <img src={logo} width={40} height={40} alt="logo" /> <span className="ml-5">Trang Quản Trị</span>
      </Navbar.Brand>
      <button
        className="btn btn-link btn-sm order-1 order-lg-0 me-4 me-lg-0"
        id="sidebarToggle"
        onClick={handleExpandSidebar}
      >
        <i className="fas fa-bars"></i>
      </button>
      <form className="d-none d-md-inline-block form-inline ms-auto me-0 me-md-3 my-2 my-md-0">
        <div className="input-group">
          <input
            className="form-control"
            type="text"
            placeholder="Tìm kiếm..."
            aria-label="Tìm kiếm..."
            aria-describedby="btnNavbarSearch"
          />
          <button className="btn btn-primary" id="btnNavbarSearch" type="button">
            <i className="fas fa-search"></i>
          </button>
        </div>
      </form>
      <div>
        <p>{user.name}</p>
      </div>
      <ul className="navbar-nav ms-auto ms-md-0 me-3 me-lg-4" id="nav-ul">
        <NavDropdown
          id="admin-nav"
          align="end"
          title={
            <img
              src={user.avatar ? user.avatar.url : defaultAvatar}
              width={40}
              height={40}
              alt="avatar"
              className="rounded-circle"
            />
          }
        >
          <NavDropdown.Item as={Link} to="/">
            Trang mua hàng
          </NavDropdown.Item>
          <NavDropdown.Item as={Link} to="/">
            Cài đặt
          </NavDropdown.Item>
          <NavDropdown.Item href="#!">Hoạt động</NavDropdown.Item>
          <NavDropdown.Divider />
          <NavDropdown.Item href="#!" onClick={logoutHandler}>
            Đăng xuất
          </NavDropdown.Item>
        </NavDropdown>
      </ul>
    </Navbar>
  );
};

export default TopNav;
