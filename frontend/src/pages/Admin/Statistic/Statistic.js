import React, { Fragment, useEffect, useState } from 'react';
import axios from 'axios';
import TopNav from '~/layouts/Admin/TopNav';
import SideNav from '~/layouts/Admin/SideNav';
import FooterAdmin from '~/layouts/Admin/FooterAdmin';
import Metadata from '~/layouts/Metadata';
import { END_POINT } from '~/config';
import { Col, NavDropdown, Row } from 'react-bootstrap';
import OutlineBox from '~/components/OutlineBox';
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import { TYPE_DAY, TYPE_MONTH, TYPE_WEEK } from '~/constants/statistic';

const Statistic = () => {
  const [orders, setOrders] = useState(null);
  const [products, setProducts] = useState(null);
  const [users, setUsers] = useState(null);
  const [revenueView, setRevenueView] = useState(TYPE_DAY);
  const [orderView, setOrderView] = useState(TYPE_DAY);

  useEffect(() => {
    const config = { withCredentials: true };
    const fetchData = async () => {
      try {
        const { data } = await axios.get(`${END_POINT}/api/v1/admin/statistic`, config);
        setOrders(data.orders);
        setProducts(data.products);
        setUsers(data.users);
        console.log(data);
      } catch (error) {
        toast.error(error.response.data.message);
      }
    };
    fetchData();
  }, []);

  let revenueData = [];
  let orderData = [];

  if (orders && products && users) {
    if (revenueView === TYPE_DAY) {
      let last10Day = new Date(new Date().getTime() - 10 * 24 * 60 * 60 * 1000);
      last10Day.setHours(0, 0, 0, 0);
      for (let i = 0; i < 10; i++) {
        const toDay = new Date(last10Day);
        const nextDay = new Date(last10Day.setDate(last10Day.getDate() + 1));
        const filterData = orders.filter((item) => {
          return item.paidAt && new Date(item.paidAt) >= toDay && new Date(item.paidAt) < nextDay;
        });
        const totalRevenue = filterData.reduce((acc, item) => {
          return acc + item.totalPrice;
        }, 0);
        revenueData.push({
          name: toDay.toLocaleDateString('vi-VN'),
          totalRevenue,
        });
        last10Day = nextDay;
      }
    } else if (revenueView === TYPE_WEEK) {
      let last10Week = new Date(new Date().getTime() - 10 * 24 * 60 * 60 * 7 * 1000);
      const thislast10Week = last10Week.getDate();
      const currentlast10Week = last10Week.getDay();
      last10Week.setDate(thislast10Week - currentlast10Week + 7);
      last10Week.setHours(0, 0, 0, 0);
      for (let i = 0; i < 10; i++) {
        const thisWeek = new Date(last10Week);
        const nextWeek = new Date(last10Week.setDate(last10Week.getDate() + 7));
        const filterData = orders.filter((item) => {
          return item.paidAt && new Date(item.paidAt) >= thisWeek && new Date(item.paidAt) < nextWeek;
        });
        const totalRevenue = filterData.reduce((acc, item) => {
          return acc + item.totalPrice;
        }, 0);
        revenueData.push({
          name: thisWeek.toLocaleDateString('vi-VN'),
          totalRevenue,
        });
        last10Week = nextWeek;
      }
    } else if (revenueView === TYPE_MONTH) {
      let date = new Date(),
        y = date.getFullYear();
      let last12Month = new Date(y, 0, 1);
      for (let i = 0; i < 12; i++) {
        const thisMonth = new Date(last12Month);
        const nextMonth = new Date(last12Month.setMonth(last12Month.getMonth() + 1));
        const filterData = orders.filter((item) => {
          return item.paidAt && new Date(item.paidAt) >= thisMonth && new Date(item.paidAt) < nextMonth;
        });
        const totalRevenue = filterData.reduce((acc, item) => {
          return acc + item.totalPrice;
        }, 0);
        revenueData.push({
          name: thisMonth.toLocaleDateString('vi-VN', { month: 'numeric', year: 'numeric' }).substring(),
          totalRevenue,
        });
        last12Month = nextMonth;
      }
    }

    if (orderView === TYPE_DAY) {
      let last10Day = new Date(new Date().getTime() - 10 * 24 * 60 * 60 * 1000);
      last10Day.setHours(0, 0, 0, 0);
      for (let i = 0; i < 10; i++) {
        const toDay = new Date(last10Day);
        const nextDay = new Date(last10Day.setDate(last10Day.getDate() + 1));
        const filterData = orders.filter((item) => {
          return new Date(item.createdAt) >= toDay && new Date(item.createdAt) < nextDay;
        });
        orderData.push({
          name: toDay.toLocaleDateString('vi-VN'),
          orders: filterData.length,
        });
        last10Day = nextDay;
      }
    } else if (orderView === TYPE_WEEK) {
      let last10Week = new Date(new Date().getTime() - 10 * 24 * 60 * 60 * 7 * 1000);
      const thislast10Week = last10Week.getDate();
      const currentlast10Week = last10Week.getDay();
      last10Week.setDate(thislast10Week - currentlast10Week + 7);
      last10Week.setHours(0, 0, 0, 0);
      for (let i = 0; i < 10; i++) {
        const thisWeek = new Date(last10Week);
        const nextWeek = new Date(last10Week.setDate(last10Week.getDate() + 7));
        const filterData = orders.filter((item) => {
          return new Date(item.createdAt) >= thisWeek && new Date(item.createdAt) < nextWeek;
        });
        orderData.push({
          name: thisWeek.toLocaleDateString('vi-VN'),
          orders: filterData.length,
        });
        last10Week = nextWeek;
      }
    } else if (orderView === TYPE_MONTH) {
      let date = new Date(),
        y = date.getFullYear();
      let last12Month = new Date(y, 0, 1);
      for (let i = 0; i < 12; i++) {
        const thisMonth = new Date(last12Month);
        const nextMonth = new Date(last12Month.setMonth(last12Month.getMonth() + 1));
        const filterData = orders.filter((item) => {
          return new Date(item.paidAt) >= thisMonth && new Date(item.paidAt) < nextMonth;
        });
        orderData.push({
          name: thisMonth.toLocaleDateString('vi-VN', { month: 'numeric', year: 'numeric' }).substring(),
          orders: filterData.length,
        });
        last12Month = nextMonth;
      }
    }
  }

  const data = [
    {
      name: 'Page A',
      uv: 4000,
      pv: 2400,
      amt: 2400,
    },
    {
      name: 'Page B',
      uv: 3000,
      pv: 1398,
      amt: 2210,
    },
    {
      name: 'Page C',
      uv: 2000,
      pv: 9800,
      amt: 2290,
    },
    {
      name: 'Page D',
      uv: 2780,
      pv: 3908,
      amt: 2000,
    },
    {
      name: 'Page E',
      uv: 1890,
      pv: 4800,
      amt: 2181,
    },
    {
      name: 'Page F',
      uv: 2390,
      pv: 3800,
      amt: 2500,
    },
    {
      name: 'Page G',
      uv: 3490,
      pv: 4300,
      amt: 2100,
    },
  ];

  const data01 = [
    { name: 'Group A', value: 400 },
    { name: 'Group B', value: 300 },
    { name: 'Group C', value: 300 },
    { name: 'Group D', value: 200 },
    { name: 'Group E', value: 278 },
    { name: 'Group F', value: 189 },
  ];

  const data02 = [
    { name: 'Group A', value: 2400 },
    { name: 'Group B', value: 4567 },
    { name: 'Group C', value: 1398 },
    { name: 'Group D', value: 9800 },
    { name: 'Group E', value: 3908 },
    { name: 'Group F', value: 4800 },
  ];

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
                <OutlineBox>
                  <div style={{ height: '550px' }} className="m-3">
                    <ul className="navbar-nav ms-auto ms-md-0 me-3 me-lg-4" align="end" id="nav-ul">
                      <NavDropdown id="admin-nav" align="end" title="Xem theo">
                        <NavDropdown.Item onClick={() => setRevenueView(TYPE_DAY)}>Ngày</NavDropdown.Item>
                        <NavDropdown.Item onClick={() => setRevenueView(TYPE_WEEK)}>Tuần</NavDropdown.Item>
                        <NavDropdown.Item onClick={() => setRevenueView(TYPE_MONTH)}>Tháng</NavDropdown.Item>
                      </NavDropdown>
                    </ul>
                    <ul className="navbar-nav ms-auto ms-md-0 me-3 me-lg-4" align="end" id="nav-ul">
                      {revenueView}
                    </ul>
                    <h4>Thống kê doanh thu theo {revenueView}</h4>
                    <ResponsiveContainer width="100%" height="80%">
                      <BarChart
                        width={500}
                        height={300}
                        data={revenueData}
                        margin={{
                          top: 5,
                          right: 30,
                          left: 20,
                          bottom: 5,
                        }}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar name="Tổng" dataKey="totalRevenue" fill="#82ca9d" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </OutlineBox>
              </Col>

              <Col md={6}>
                <OutlineBox>
                  <div style={{ height: '550px' }} className="m-3">
                    <ul className="navbar-nav ms-auto ms-md-0 me-3 me-lg-4" align="end" id="nav-ul">
                      <NavDropdown id="admin-nav" align="end" title="Xem theo">
                        <NavDropdown.Item onClick={() => setOrderView(TYPE_DAY)}>Ngày</NavDropdown.Item>
                        <NavDropdown.Item onClick={() => setOrderView(TYPE_WEEK)}>Tuần</NavDropdown.Item>
                        <NavDropdown.Item onClick={() => setOrderView(TYPE_MONTH)}>Tháng</NavDropdown.Item>
                      </NavDropdown>
                    </ul>
                    <ul className="navbar-nav ms-auto ms-md-0 me-3 me-lg-4" align="end" id="nav-ul">
                      {orderView}
                    </ul>
                    <h4>Thống kê số lượng đơn hàng theo {orderView}</h4>
                    <ResponsiveContainer width="100%" height="80%">
                      <BarChart
                        width={500}
                        height={300}
                        data={orderData}
                        margin={{
                          top: 5,
                          right: 30,
                          left: 20,
                          bottom: 5,
                        }}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar name="Số đơn" dataKey="orders" fill="#8884d8" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </OutlineBox>
              </Col>
            </Row>

            <Row>
              <Col md={4}>
                <OutlineBox>
                  <div style={{ height: '350px' }} className="m-3">
                    <h5>Thống kê phương thức thanh toán</h5>
                    <h6>Theo tháng</h6>
                    <ResponsiveContainer width="100%" height="80%">
                      <PieChart width={400} height={400}>
                        <Pie
                          dataKey="value"
                          isAnimationActive={false}
                          data={data01}
                          cx="50%"
                          cy="50%"
                          outerRadius={80}
                          fill="#8884d8"
                          label
                        />
                        <Tooltip />
                        <Legend />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </OutlineBox>
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
