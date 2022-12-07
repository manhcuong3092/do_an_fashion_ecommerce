import React, { useState } from 'react';
import Collapse from 'react-bootstrap/Collapse';
import { Link } from 'react-router-dom';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import CalendarViewMonthOutlinedIcon from '@mui/icons-material/CalendarViewMonthOutlined';
import CategoryOutlinedIcon from '@mui/icons-material/CategoryOutlined';
import ColorLensOutlinedIcon from '@mui/icons-material/ColorLensOutlined';
import HeightOutlinedIcon from '@mui/icons-material/HeightOutlined';
import LocalOfferOutlinedIcon from '@mui/icons-material/LocalOfferOutlined';
import LibraryBooksOutlinedIcon from '@mui/icons-material/LibraryBooksOutlined';
import ContactMailOutlinedIcon from '@mui/icons-material/ContactMailOutlined';
import SubscriptionsOutlinedIcon from '@mui/icons-material/SubscriptionsOutlined';
import DashboardOutlinedIcon from '@mui/icons-material/DashboardOutlined';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import CommentOutlinedIcon from '@mui/icons-material/CommentOutlined';
import InsertChartOutlinedIcon from '@mui/icons-material/InsertChartOutlined';
import { useSelector } from 'react-redux';

const SideNav = ({ children }) => {
  const [open, setOpen] = useState(false);
  const { user } = useSelector((state) => state.auth);

  return (
    <div id="layoutSidenav">
      <div id="layoutSidenav_nav">
        <nav className="sb-sidenav accordion sb-sidenav-custom" id="sidenavAccordion">
          <div className="sb-sidenav-menu">
            <div className="nav">
              <div className="sb-sidenav-menu-heading">Trang chủ</div>
              <Link className="nav-link" to="/admin/dashboard">
                <div className="sb-nav-link-icon">
                  <DashboardOutlinedIcon />
                </div>
                Bảng điều khiển
              </Link>
              <div className="sb-sidenav-menu-heading">Quản lý</div>
              <a
                href="#!"
                onClick={() => setOpen(!open)}
                className="nav-link"
                data-bs-toggle="collapse"
                data-bs-target="#collapseLayouts"
                aria-expanded={open}
                aria-controls="collapseLayouts"
              >
                <div className="sb-nav-link-icon">
                  <CalendarViewMonthOutlinedIcon />
                </div>
                Sản phẩm
                <div className="sb-sidenav-collapse-arrow">
                  <i className="fas fa-angle-down"></i>
                </div>
              </a>
              <Collapse id="collapseLayouts" in={open} aria-labelledby="headingOne" data-bs-parent="#sidenavAccordion">
                <div>
                  <nav className="sb-sidenav-menu-nested nav ml-5">
                    <Link className="nav-link" to={'/admin/management/categories'}>
                      <div className="sb-nav-link-icon">
                        <CategoryOutlinedIcon />
                      </div>
                      Danh mục
                    </Link>
                    <Link className="nav-link" to={'/admin/management/sizes'}>
                      <div className="sb-nav-link-icon">
                        <HeightOutlinedIcon />
                      </div>
                      Kích cỡ
                    </Link>
                    <Link className="nav-link" to={'/admin/management/colors'}>
                      <div className="sb-nav-link-icon">
                        <ColorLensOutlinedIcon />
                      </div>
                      Màu sắc
                    </Link>
                    <Link className="nav-link" to={'/admin/management/products'}>
                      <div className="sb-nav-link-icon">
                        <LocalOfferOutlinedIcon />
                      </div>
                      Sản phẩm
                    </Link>
                    {/* <Link className="nav-link" to={'/admin/management/reviews'}>
                      <div className="sb-nav-link-icon">
                        <CommentOutlinedIcon />
                      </div>
                      Nhận xét
                    </Link> */}
                  </nav>
                </div>
              </Collapse>
              <Link className="nav-link" to="/admin/management/orders">
                <div className="sb-nav-link-icon">
                  <ShoppingCartOutlinedIcon />
                </div>
                Đơn hàng
              </Link>
              <Link className="nav-link" to="/admin/management/blogs">
                <div className="sb-nav-link-icon">
                  <LibraryBooksOutlinedIcon />
                </div>
                Blog
              </Link>
              <Link className="nav-link" to="/admin/management/contacts">
                <div className="sb-nav-link-icon">
                  <ContactMailOutlinedIcon />
                </div>
                Liên hệ
              </Link>
              {/* <Link className="nav-link" to="/admin/management/subscribers">
                <div className="sb-nav-link-icon">
                  <SubscriptionsOutlinedIcon />
                </div>
                Đăng ký
              </Link> */}
              <Link className="nav-link" to="/admin/management/users">
                <div className="sb-nav-link-icon">
                  <PersonOutlineOutlinedIcon />
                </div>
                Người dùng
              </Link>
              <div className="sb-sidenav-menu-heading">Thống kê</div>
              <Link className="nav-link" to="/admin/statistic">
                <div className="sb-nav-link-icon">
                  <InsertChartOutlinedIcon />
                </div>
                Thống kê
              </Link>
            </div>
          </div>
          <div className="sb-sidenav-footer">
            <div className="small">Tài khoản:</div>
            {user.email}
          </div>
        </nav>
      </div>
      <div id="layoutSidenav_content">{children}</div>
    </div>
  );
};

export default SideNav;
