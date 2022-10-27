import React, { Fragment, useEffect, useState } from 'react';
import axios from 'axios';
import TopNav from '~/layouts/Admin/TopNav';
import SideNav from '~/layouts/Admin/SideNav';
import FooterAdmin from '~/layouts/Admin/FooterAdmin';
import Metadata from '~/layouts/Metadata';
import { END_POINT } from '~/config';
import { Col, Row } from 'react-bootstrap';
import { toast } from 'react-toastify';
import RevenueStatistic from '~/components/Statistic/RevenueStatistic';
import OrderStatistic from '~/components/Statistic/OrderStatistic';
import PaymentTypeStatistic from '~/components/Statistic/PaymentTypeStatistic';
import OrderSuccessRateStatic from '~/components/Statistic/OrderSuccessRateStatic';
import UserOrderStatistic from '~/components/Statistic/UserOrderStatistic';
import ProductStatistic from '~/components/Statistic/ProductStatistic';
import CategoryStatistic from '~/components/Statistic/CategoryStatistic';

const Statistic = () => {
  const [orders, setOrders] = useState(null);
  // const [products, setProducts] = useState(null);
  // const [users, setUsers] = useState(null);

  useEffect(() => {
    const config = { withCredentials: true };
    const fetchData = async () => {
      try {
        const { data } = await axios.get(`${END_POINT}/api/v1/admin/statistic`, config);
        setOrders(data.orders);
        // setProducts(data.products);
        // setUsers(data.users);
        console.log(data);
      } catch (error) {
        toast.error(error.response.data.message);
      }
    };
    fetchData();
  }, []);

  return (
    <Fragment>
      <Metadata title={'Thống kê'} />
      <TopNav />
      <SideNav>
        <main>
          <div className="container-fluid px-4">
            <h1 className="my-4">Thống kê</h1>
            <Row>
              <Col md={6}>
                <RevenueStatistic orders={orders} />
              </Col>

              <Col md={6}>
                <OrderStatistic orders={orders} />
              </Col>
            </Row>

            <Row>
              <Col md={4}>
                <PaymentTypeStatistic orders={orders} />
              </Col>
              <Col md={4}>
                <OrderSuccessRateStatic orders={orders} />
              </Col>
              <Col md={4}>
                <UserOrderStatistic orders={orders} />
              </Col>
            </Row>

            <Row>
              <Col md={6}>
                <ProductStatistic orders={orders} />
              </Col>
              <Col md={6}>
                <CategoryStatistic orders={orders} />
              </Col>
            </Row>
          </div>
        </main>
        <FooterAdmin />
      </SideNav>
    </Fragment>
  );
};

export default Statistic;
