import React, { useState } from 'react';
import { NavDropdown } from 'react-bootstrap';
import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import OutlineBox from '~/components/OutlineBox';
import { TYPE_DAY, TYPE_MONTH, TYPE_WEEK } from '~/constants/statistic';

const OrderStatistic = ({ orders }) => {
  const [orderView, setOrderView] = useState(TYPE_DAY);

  let orderData = [];

  if (orders) {
    if (orderView === TYPE_DAY) {
      let last10Day = new Date(new Date().getTime() - 9 * 24 * 60 * 60 * 1000);
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
      let date = new Date();
      let last12Month = new Date(date.getFullYear(), date.getMonth() - 11, 1);
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

  return (
    <OutlineBox>
      <div style={{ height: '550px' }} className="m-3">
        <h4>Thống kê số lượng đơn hàng theo {orderView}</h4>
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
  );
};

export default OrderStatistic;
