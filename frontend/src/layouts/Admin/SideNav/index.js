import React, { useState } from 'react';
import Collapse from 'react-bootstrap/Collapse';
import { Link } from 'react-router-dom';

const SideNav = ({ children }) => {
  const [open, setOpen] = useState(false);

  return (
    <div id="layoutSidenav">
      <div id="layoutSidenav_nav">
        <nav className="sb-sidenav accordion sb-sidenav-custom" id="sidenavAccordion">
          <div className="sb-sidenav-menu">
            <div className="nav">
              <div className="sb-sidenav-menu-heading">Core</div>
              <Link className="nav-link" to="/admin/dashboard">
                <div className="sb-nav-link-icon">
                  <i className="fas fa-tachometer-alt"></i>
                </div>
                Dashboard
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
                  <i className="fas fa-columns"></i>
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
                      Danh mục
                    </Link>
                    <Link className="nav-link" to={'/admin/management/sizes'}>
                      Kích cỡ
                    </Link>
                    <Link className="nav-link" to={'/admin/management/colors'}>
                      Màu sắc
                    </Link>
                    <Link className="nav-link" to={'/admin/management/products'}>
                      Sản phẩm
                    </Link>
                  </nav>
                </div>
              </Collapse>
              <Link className="nav-link" to="/admin/management/blogs">
                <div className="sb-nav-link-icon">
                  <i className="fas fa-book-open"></i>
                </div>
                Blog
              </Link>
              <Link className="nav-link" to="/admin/management/contacts">
                <div className="sb-nav-link-icon">
                  <i className="fas fa-book-open"></i>
                </div>
                Liên hệ
              </Link>
              <a
                className="nav-link collapsed"
                href="#"
                data-bs-toggle="collapse"
                data-bs-target="#collapsePages"
                aria-expanded="false"
                aria-controls="collapsePages"
              >
                <div className="sb-nav-link-icon">
                  <i className="fas fa-book-open"></i>
                </div>
                Pages
                <div className="sb-sidenav-collapse-arrow">
                  <i className="fas fa-angle-down"></i>
                </div>
              </a>
              <div
                className="collapse"
                id="collapsePages"
                aria-labelledby="headingTwo"
                data-bs-parent="#sidenavAccordion"
              >
                <nav className="sb-sidenav-menu-nested nav accordion" id="sidenavAccordionPages">
                  <a
                    className="nav-link collapsed"
                    href="#"
                    data-bs-toggle="collapse"
                    data-bs-target="#pagesCollapseAuth"
                    aria-expanded="false"
                    aria-controls="pagesCollapseAuth"
                  >
                    Authentication
                    <div className="sb-sidenav-collapse-arrow">
                      <i className="fas fa-angle-down"></i>
                    </div>
                  </a>
                  <div
                    className="collapse"
                    id="pagesCollapseAuth"
                    aria-labelledby="headingOne"
                    data-bs-parent="#sidenavAccordionPages"
                  >
                    <nav className="sb-sidenav-menu-nested nav">
                      <a className="nav-link" href="login.html">
                        Login
                      </a>
                      <a className="nav-link" href="register.html">
                        Register
                      </a>
                      <a className="nav-link" href="password.html">
                        Forgot Password
                      </a>
                    </nav>
                  </div>
                  <a
                    className="nav-link collapsed"
                    href="#!"
                    data-bs-toggle="collapse"
                    data-bs-target="#pagesCollapseError"
                    aria-expanded="false"
                    aria-controls="pagesCollapseError"
                  >
                    Error
                    <div className="sb-sidenav-collapse-arrow">
                      <i className="fas fa-angle-down"></i>
                    </div>
                  </a>
                  <div
                    className="collapse"
                    id="pagesCollapseError"
                    aria-labelledby="headingOne"
                    data-bs-parent="#sidenavAccordionPages"
                  >
                    <nav className="sb-sidenav-menu-nested nav">
                      <a className="nav-link" href="401.html">
                        401 Page
                      </a>
                      <a className="nav-link" href="404.html">
                        404 Page
                      </a>
                      <a className="nav-link" href="500.html">
                        500 Page
                      </a>
                    </nav>
                  </div>
                </nav>
              </div>
              <div className="sb-sidenav-menu-heading">Addons</div>
              <a className="nav-link" href="charts.html">
                <div className="sb-nav-link-icon">
                  <i className="fas fa-chart-area"></i>
                </div>
                Charts
              </a>
              <a className="nav-link" href="tables.html">
                <div className="sb-nav-link-icon">
                  <i className="fas fa-table"></i>
                </div>
                Tables
              </a>
            </div>
          </div>
          <div className="sb-sidenav-footer">
            <div className="small">Logged in as:</div>
            User
          </div>
        </nav>
      </div>
      <div id="layoutSidenav_content">{children}</div>
    </div>
  );
};

export default SideNav;
