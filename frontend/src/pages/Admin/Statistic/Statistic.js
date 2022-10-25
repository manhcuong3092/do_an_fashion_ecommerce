import React, { Fragment, useEffect, useState } from 'react';
import axios from 'axios';
import TopNav from '~/layouts/Admin/TopNav';
import SideNav from '~/layouts/Admin/SideNav';
import FooterAdmin from '~/layouts/Admin/FooterAdmin';
import Metadata from '~/layouts/Metadata';
import { END_POINT } from '~/config';
import { Col, NavDropdown, Row } from 'react-bootstrap';
import OutlineBox from '~/components/OutlineBox';
import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import { REVENUE_DAY, REVENUE_MONTH, REVENUE_WEEK } from '~/constants/statistic';

const Statistic = () => {
  const [orders, setOrders] = useState(null);
  const [products, setProducts] = useState(null);
  const [users, setUsers] = useState(null);
  const [revenue, setRevenue] = useState(REVENUE_DAY);

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

  if (orders && products && users) {
    if (revenue === REVENUE_DAY) {
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
    }
    if (revenue === REVENUE_WEEK) {
      let last10Week = new Date(new Date().getTime() - 10 * 24 * 60 * 60 * 7 * 1000);
      last10Week.setHours(0, 0, 0, 0);
      for (let i = 0; i < 10; i++) {
        const thisWeek = new Date(last10Week);
        const nextWeek = new Date(last10Week.setDate(last10Week.getDate() + 7));
        const filterData = orders.filter((item) => {
          if (item.paidAt) {
            console.log(new Date(item.paidAt));
            console.log(thisWeek);
            console.log(nextWeek);
            console.log(new Date(item.paidAt) >= thisWeek && new Date(item.paidAt) < nextWeek);
          }
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
    }
    if (revenue === REVENUE_MONTH) {
      let last12Month = new Date(new Date().getTime() - 12 * 24 * 60 * 60 * 30 * 1000);
      last12Month.setHours(0, 0, 0, 0);
      for (let i = 0; i < 12; i++) {
        const thisMonth = new Date(last12Month);
        const nextMonth = new Date(last12Month.setDate(last12Month.getDate() + 30));
        const filterData = orders.filter((item) => {
          if (item.paidAt) {
            console.log(new Date(item.paidAt));
            console.log(thisMonth);
            console.log(nextMonth);
            console.log(new Date(item.paidAt) >= thisMonth && new Date(item.paidAt) < nextMonth);
          }
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

  return (
    <Fragment>
      <Metadata title={'Danh sách kích cỡ'} />
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
                        <NavDropdown.Item onClick={() => setRevenue(REVENUE_DAY)}>Ngày</NavDropdown.Item>
                        <NavDropdown.Item onClick={() => setRevenue(REVENUE_WEEK)}>Tuần</NavDropdown.Item>
                        <NavDropdown.Item onClick={() => setRevenue(REVENUE_MONTH)}>Tháng</NavDropdown.Item>
                      </NavDropdown>
                    </ul>
                    <ul className="navbar-nav ms-auto ms-md-0 me-3 me-lg-4" align="end" id="nav-ul">
                      {revenue}
                    </ul>
                    <h4>Thống kê doanh thu theo {revenue}</h4>
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
                        <Bar dataKey="totalRevenue" fill="#82ca9d" />
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
                        <NavDropdown.Item>Ngày</NavDropdown.Item>
                        <NavDropdown.Item>Tuần</NavDropdown.Item>
                        <NavDropdown.Item>Tháng</NavDropdown.Item>
                      </NavDropdown>
                    </ul>
                    <ul className="navbar-nav ms-auto ms-md-0 me-3 me-lg-4" align="end" id="nav-ul">
                      Test
                    </ul>
                    <h4>Thống kê doanh thu theo ngày</h4>
                    <ResponsiveContainer width="100%" height="80%">
                      <BarChart
                        width={500}
                        height={300}
                        data={data}
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
                        <Bar dataKey="pv" fill="#8884d8" />
                        <Bar dataKey="uv" fill="#82ca9d" />
                      </BarChart>
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
