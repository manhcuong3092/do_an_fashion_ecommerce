import { Avatar } from '@mui/material';
import React, { Fragment, useEffect, useState } from 'react';
import { Card, Col, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import FooterAdmin from '~/layouts/Admin/FooterAdmin';
import SideNav from '~/layouts/Admin/SideNav';
import TopNav from '~/layouts/Admin/TopNav';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import ContactMailOutlinedIcon from '@mui/icons-material/ContactMailOutlined';
import LibraryBooksOutlinedIcon from '@mui/icons-material/LibraryBooksOutlined';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import SubscriptionsOutlinedIcon from '@mui/icons-material/SubscriptionsOutlined';
import SellIcon from '@mui/icons-material/Sell';
import { blue, cyan, green, orange, red, yellow } from '@mui/material/colors';
import axios from 'axios';
import { END_POINT } from '~/config';
import { ORDER_CANCEL, ORDER_DELIVERING, ORDER_PENDING, ORDER_SUCCESS } from '~/constants/order';

const Dashboard = () => {
  const [orders, setOrders] = useState(null);
  const [products, setProducts] = useState(null);
  const [subscribers, setSubscribers] = useState(null);
  const [users, setUsers] = useState(null);
  const [contacts, setContacts] = useState(null);
  const [blogs, setBlogs] = useState(null);

  useEffect(() => {
    const config = { withCredentials: true };
    const fetchData = async () => {
      const promise1 = axios.get(`${END_POINT}/api/v1/admin/orders`, config);
      const promise2 = axios.get(`${END_POINT}/api/v1/admin/products`, config);
      const promise3 = axios.get(`${END_POINT}/api/v1/admin/subscribers`, config);
      const promise4 = axios.get(`${END_POINT}/api/v1/admin/users`, config);
      const promise5 = axios.get(`${END_POINT}/api/v1/admin/contacts`, config);
      const promise6 = axios.get(`${END_POINT}/api/v1/admin/blogs`, config);
      Promise.all([promise1, promise2, promise3, promise4, promise5, promise6]).then((value) => {
        setOrders(value[0].data.orders);
        setProducts(value[1].data.products);
        setSubscribers(value[2].data.subscribers);
        setUsers(value[3].data.users);
        setContacts(value[4].data.contacts);
        setBlogs(value[5].data.blogs);
      });
    };
    fetchData();
  }, []);

  let pendingOrder = 0,
    deliveringOrder = 0,
    successOrder = 0,
    cancelledOrder = 0;
  if (orders) {
    pendingOrder = orders.reduce((acc, item) => {
      if (item.orderStatus === ORDER_PENDING) {
        return acc + 1;
      }
      return acc;
    }, 0);

    deliveringOrder = orders.reduce((acc, item) => {
      if (item.orderStatus === ORDER_DELIVERING) {
        return acc + 1;
      }
      return acc;
    }, 0);

    successOrder = orders.reduce((acc, item) => {
      if (item.orderStatus === ORDER_SUCCESS) {
        return acc + 1;
      }
      return acc;
    }, 0);

    cancelledOrder = orders.reduce((acc, item) => {
      if (item.orderStatus === ORDER_CANCEL) {
        return acc + 1;
      }
      return acc;
    }, 0);
  }

  return (
    <Fragment>
      <TopNav />
      <SideNav>
        <main>
          <div className="container-fluid px-4">
            <h1 className="mt-4">Bảng điều khiển</h1>
            <ol className="breadcrumb mb-4">
              <li className="breadcrumb-item active">Bảng điều khiển</li>
            </ol>
            <Row>
              <Col xl={3} md={6}>
                <Card className="bg-primary text-white mb-4">
                  <Card.Body>
                    <h6 className="cart-dashboard-title">Số đơn hàng đang chờ xử lý</h6>
                    <Card.Title>
                      <h2>{pendingOrder}</h2>
                    </Card.Title>
                  </Card.Body>
                  <Card.Footer className="d-flex align-items-center justify-content-between">
                    <Link className="small text-white stretched-link" to="/admin/management/products">
                      Xem chi tiết
                    </Link>
                    <div className="small text-white">
                      <i className="fas fa-angle-right"></i>
                    </div>
                  </Card.Footer>
                </Card>
              </Col>
              <Col xl={3} md={6}>
                <Card className="bg-warning text-white mb-4">
                  <Card.Body>
                    <h6 className="cart-dashboard-title">Số đơn hàng đang giao</h6>
                    <Card.Title>
                      <h2>{deliveringOrder}</h2>
                    </Card.Title>
                  </Card.Body>
                  <Card.Footer className="d-flex align-items-center justify-content-between">
                    <Link className="small text-white stretched-link" to="/admin/management/orders">
                      Xem chi tiết
                    </Link>
                    <div className="small text-white">
                      <i className="fas fa-angle-right"></i>
                    </div>
                  </Card.Footer>
                </Card>
              </Col>
              <Col xl={3} md={6}>
                <Card className="bg-success text-white mb-4">
                  <Card.Body>
                    <h6 className="cart-dashboard-title">Số đơn hàng đã giao</h6>
                    <Card.Title>
                      <h2>{successOrder}</h2>
                    </Card.Title>
                  </Card.Body>
                  <Card.Footer className="d-flex align-items-center justify-content-between">
                    <Link className="small text-white stretched-link" to="/admin/management/orders">
                      Xem chi tiết
                    </Link>
                    <div className="small text-white">
                      <i className="fas fa-angle-right"></i>
                    </div>
                  </Card.Footer>
                </Card>
              </Col>
              <Col xl={3} md={6}>
                <Card className="bg-danger text-white mb-4">
                  <Card.Body>
                    <h6 className="cart-dashboard-title">Số đơn hàng đã hủy</h6>
                    <Card.Title>
                      <h2>{cancelledOrder}</h2>
                    </Card.Title>
                  </Card.Body>
                  <Card.Footer className="d-flex align-items-center justify-content-between">
                    <Link className="small text-white stretched-link" to="/admin/management/orders">
                      Xem chi tiết
                    </Link>
                    <div className="small text-white">
                      <i className="fas fa-angle-right"></i>
                    </div>
                  </Card.Footer>
                </Card>
              </Col>
            </Row>
            <Row>
              <Col xl={4} md={6}>
                <Card>
                  <Card.Body className="card-body">
                    <h6 className="cart-dashboard-title">Tổng số đơn hàng</h6>
                    <div className="d-flex align-items-center">
                      <div className="d-flex">
                        <Avatar sx={{ bgcolor: green[500], width: 80, height: 80 }}>
                          <ShoppingCartOutlinedIcon sx={{ width: 40, height: 40 }} />
                        </Avatar>
                      </div>
                      <div className="ps-3">
                        <h3>{orders && orders.length}</h3>
                      </div>
                    </div>
                  </Card.Body>
                  <Card.Footer className="d-flex align-items-center justify-content-between">
                    <Link className="small stretched-link" to="/admin/management/orders">
                      Xem chi tiết
                    </Link>
                    <div className="small">
                      <i className="fas fa-angle-right"></i>
                    </div>
                  </Card.Footer>
                </Card>
              </Col>
              <Col xl={4} md={6}>
                <Card>
                  <Card.Body className="card-body">
                    <h6 className="cart-dashboard-title">Tổng số người dùng liên hệ</h6>
                    <div className="d-flex align-items-center">
                      <div className="d-flex">
                        <Avatar sx={{ bgcolor: orange[500], width: 80, height: 80 }}>
                          <ContactMailOutlinedIcon sx={{ width: 40, height: 40 }} />
                        </Avatar>
                      </div>
                      <div className="ps-3">
                        <h4>{contacts && contacts.length}</h4>
                      </div>
                    </div>
                  </Card.Body>
                  <Card.Footer className="d-flex align-items-center justify-content-between">
                    <Link className="small stretched-link" to="/admin/management/contacts">
                      Xem chi tiết
                    </Link>
                    <div className="small">
                      <i className="fas fa-angle-right"></i>
                    </div>
                  </Card.Footer>
                </Card>
              </Col>
              <Col xl={4} md={6}>
                <Card>
                  <Card.Body className="card-body">
                    <h6 className="cart-dashboard-title">Tổng số bài viết tin tức</h6>
                    <div className="d-flex align-items-center">
                      <div className="d-flex">
                        <Avatar sx={{ bgcolor: cyan[500], width: 80, height: 80 }}>
                          <LibraryBooksOutlinedIcon sx={{ width: 40, height: 40 }} />
                        </Avatar>
                      </div>
                      <div className="ps-3">
                        <h4>{blogs && blogs.length}</h4>
                      </div>
                    </div>
                  </Card.Body>
                  <Card.Footer className="d-flex align-items-center justify-content-between">
                    <Link className="small stretched-link" to="/admin/management/blogs">
                      Xem chi tiết
                    </Link>
                    <div className="small">
                      <i className="fas fa-angle-right"></i>
                    </div>
                  </Card.Footer>
                </Card>
              </Col>
            </Row>
            <Row>
              <Col xl={4} md={6}>
                <Card>
                  <Card.Body className="card-body">
                    <h6 className="cart-dashboard-title">Tổng số sản phẩm</h6>
                    <div className="d-flex align-items-center">
                      <div className="d-flex">
                        <Avatar sx={{ bgcolor: blue[500], width: 80, height: 80 }}>
                          <SellIcon sx={{ width: 40, height: 40 }} />
                        </Avatar>
                      </div>
                      <div className="ps-3">
                        <h4>{products && products.length}</h4>
                        {/* <span className="text-muted pt-2 ps-1">Tăng </span>
                        <span className="text-success pt-1 fw-bold">12%</span>{' '} */}
                      </div>
                    </div>
                  </Card.Body>
                  <Card.Footer className="d-flex align-items-center justify-content-between">
                    <Link className="small stretched-link" to="/admin/management/products">
                      Xem chi tiết
                    </Link>
                    <div className="small">
                      <i className="fas fa-angle-right"></i>
                    </div>
                  </Card.Footer>
                </Card>
              </Col>
              <Col xl={4} md={6}>
                <Card>
                  <Card.Body className="card-body">
                    <h6 className="cart-dashboard-title">Tổng số người dùng</h6>
                    <div className="d-flex align-items-center">
                      <div className="d-flex">
                        <Avatar sx={{ bgcolor: yellow[600], width: 80, height: 80 }}>
                          <PersonOutlineOutlinedIcon sx={{ width: 40, height: 40 }} />
                        </Avatar>
                      </div>
                      <div className="ps-3">
                        <h3>{users && users.length}</h3>
                      </div>
                    </div>
                  </Card.Body>
                  <Card.Footer className="d-flex align-items-center justify-content-between">
                    <Link className="small stretched-link" to="/admin/management/users">
                      Xem chi tiết
                    </Link>
                    <div className="small">
                      <i className="fas fa-angle-right"></i>
                    </div>
                  </Card.Footer>
                </Card>
              </Col>
              <Col xl={4} md={6}>
                <Card>
                  <Card.Body className="card-body">
                    <h6 className="cart-dashboard-title">Tổng số người đăng ký</h6>
                    <div className="d-flex align-items-center">
                      <div className="d-flex">
                        <Avatar sx={{ bgcolor: red[500], width: 80, height: 80 }}>
                          <SubscriptionsOutlinedIcon sx={{ width: 40, height: 40 }} />
                        </Avatar>
                      </div>
                      <div className="ps-3">
                        <h4>{subscribers && subscribers.length}</h4>
                      </div>
                    </div>
                  </Card.Body>
                  <Card.Footer className="d-flex align-items-center justify-content-between">
                    <Link className="small stretched-link" to="/admin/management/subscribers">
                      Xem chi tiết
                    </Link>
                    <div className="small">
                      <i className="fas fa-angle-right"></i>
                    </div>
                  </Card.Footer>
                </Card>
              </Col>
            </Row>
          </div>
        </main>
        <FooterAdmin />
      </SideNav>
    </Fragment>
  );
};

export default Dashboard;
