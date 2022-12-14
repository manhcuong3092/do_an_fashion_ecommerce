import { Avatar } from '@mui/material';
import React, { Fragment, useEffect, useState } from 'react';
import { Card, Col, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import FooterAdmin from '~/layouts/Admin/FooterAdmin';
import SideNav from '~/layouts/Admin/SideNav';
import TopNav from '~/layouts/Admin/TopNav';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import CategoryOutlinedIcon from '@mui/icons-material/CategoryOutlined';
import LibraryBooksOutlinedIcon from '@mui/icons-material/LibraryBooksOutlined';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import SellIcon from '@mui/icons-material/Sell';
import { blue, cyan, green, orange, red, yellow } from '@mui/material/colors';
import axios from 'axios';
import { END_POINT } from '~/config';
import { ORDER_CANCEL, ORDER_DELIVERING, ORDER_PENDING, ORDER_SUCCESS } from '~/constants/order';
import Metadata from '~/layouts/Metadata';

const Dashboard = () => {
  const [orders, setOrders] = useState(null);
  const [products, setProducts] = useState(null);
  const [categories, setCategories] = useState(null);
  const [users, setUsers] = useState(null);
  // const [contacts, setContacts] = useState(null);
  const [blogs, setBlogs] = useState(null);

  useEffect(() => {
    const config = { withCredentials: true };
    const fetchData = async () => {
      const promise1 = axios.get(`${END_POINT}/api/v1/admin/orders`, config);
      const promise2 = axios.get(`${END_POINT}/api/v1/admin/products`, config);
      const promise3 = axios.get(`${END_POINT}/api/v1/categories`, config);
      const promise4 = axios.get(`${END_POINT}/api/v1/admin/users`, config);
      // const promise5 = axios.get(`${END_POINT}/api/v1/admin/contacts`, config);
      const promise5 = axios.get(`${END_POINT}/api/v1/admin/blogs`, config);
      Promise.all([promise1, promise2, promise3, promise4, promise5]).then((value) => {
        setOrders(value[0].data.orders);
        setProducts(value[1].data.products);
        setCategories(value[2].data.categories);
        setUsers(value[3].data.users);
        // setContacts(value[4].data.contacts);
        setBlogs(value[4].data.blogs);
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
      <Metadata title={'B???ng ??i???u khi???n'} />
      <TopNav />
      <SideNav>
        <main>
          <div className="container-fluid px-4">
            <h1 className="mt-4">B???ng ??i???u khi???n</h1>
            <ol className="breadcrumb mb-4">
              <li className="breadcrumb-item active">B???ng ??i???u khi???n</li>
            </ol>
            <Row>
              <Col xl={3} md={6}>
                <Card className="bg-primary text-white mb-4">
                  <Card.Body>
                    <h6 className="cart-dashboard-title">S??? ????n h??ng ??ang ch??? x??? l??</h6>
                    <Card.Title>
                      <h2>{pendingOrder}</h2>
                    </Card.Title>
                  </Card.Body>
                  <Card.Footer className="d-flex align-items-center justify-content-between">
                    <Link className="small text-white stretched-link" to="/admin/management/orders">
                      Xem chi ti???t
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
                    <h6 className="cart-dashboard-title">S??? ????n h??ng ??ang giao</h6>
                    <Card.Title>
                      <h2>{deliveringOrder}</h2>
                    </Card.Title>
                  </Card.Body>
                  <Card.Footer className="d-flex align-items-center justify-content-between">
                    <Link className="small text-white stretched-link" to="/admin/management/orders">
                      Xem chi ti???t
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
                    <h6 className="cart-dashboard-title">S??? ????n h??ng ???? giao</h6>
                    <Card.Title>
                      <h2>{successOrder}</h2>
                    </Card.Title>
                  </Card.Body>
                  <Card.Footer className="d-flex align-items-center justify-content-between">
                    <Link className="small text-white stretched-link" to="/admin/management/orders">
                      Xem chi ti???t
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
                    <h6 className="cart-dashboard-title">S??? ????n h??ng ???? h???y</h6>
                    <Card.Title>
                      <h2>{cancelledOrder}</h2>
                    </Card.Title>
                  </Card.Body>
                  <Card.Footer className="d-flex align-items-center justify-content-between">
                    <Link className="small text-white stretched-link" to="/admin/management/orders">
                      Xem chi ti???t
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
                    <h6 className="cart-dashboard-title">T???ng s??? ????n h??ng</h6>
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
                      Xem chi ti???t
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
                    <h6 className="cart-dashboard-title">T???ng s??? danh m???c s???n ph???m</h6>
                    <div className="d-flex align-items-center">
                      <div className="d-flex">
                        <Avatar sx={{ bgcolor: orange[500], width: 80, height: 80 }}>
                          <CategoryOutlinedIcon sx={{ width: 40, height: 40 }} />
                        </Avatar>
                      </div>
                      <div className="ps-3">
                        <h4>{categories && categories.length}</h4>
                      </div>
                    </div>
                  </Card.Body>
                  <Card.Footer className="d-flex align-items-center justify-content-between">
                    <Link className="small stretched-link" to="/admin/management/categories">
                      Xem chi ti???t
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
                    <h6 className="cart-dashboard-title">T???ng s??? b??i vi???t tin t???c</h6>
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
                      Xem chi ti???t
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
                    <h6 className="cart-dashboard-title">T???ng s??? s???n ph???m</h6>
                    <div className="d-flex align-items-center">
                      <div className="d-flex">
                        <Avatar sx={{ bgcolor: blue[500], width: 80, height: 80 }}>
                          <SellIcon sx={{ width: 40, height: 40 }} />
                        </Avatar>
                      </div>
                      <div className="ps-3">
                        <h4>{products && products.length}</h4>
                        {/* <span className="text-muted pt-2 ps-1">T??ng </span>
                        <span className="text-success pt-1 fw-bold">12%</span>{' '} */}
                      </div>
                    </div>
                  </Card.Body>
                  <Card.Footer className="d-flex align-items-center justify-content-between">
                    <Link className="small stretched-link" to="/admin/management/products">
                      Xem chi ti???t
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
                    <h6 className="cart-dashboard-title">T???ng s??? ng?????i d??ng</h6>
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
                      Xem chi ti???t
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
