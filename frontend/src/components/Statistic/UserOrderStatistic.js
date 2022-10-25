import React, { useState } from 'react';
import { NavDropdown } from 'react-bootstrap';
import { Cell, Legend, Pie, PieChart, ResponsiveContainer, Tooltip } from 'recharts';
import { TYPE_CURRENT_MONTH, TYPE_LAST_MONTH } from '~/constants/statistic';
import OutlineBox from '../OutlineBox';

const COLORS = ['#03ac13', '#555555'];

const UserOrderStatistic = ({ orders }) => {
  const [monthView, setMonthView] = useState(TYPE_CURRENT_MONTH);

  let orderData = [];

  if (orders) {
    let thisMonth, nextMonth;
    let date = new Date();
    if (monthView === TYPE_CURRENT_MONTH) {
      let currentMonth = new Date(date.getFullYear(), date.getMonth(), 1);
      thisMonth = new Date(currentMonth);
      nextMonth = new Date(currentMonth.setMonth(currentMonth.getMonth() + 1));
    } else if (monthView === TYPE_LAST_MONTH) {
      let currentMonth = new Date(date.getFullYear(), date.getMonth(), 1);
      currentMonth.setMonth(currentMonth.getMonth() - 1);
      thisMonth = new Date(currentMonth);
      nextMonth = new Date(currentMonth.setMonth(currentMonth.getMonth() + 1));
    }
    const filterData = orders.filter((item) => {
      return new Date(item.paidAt) >= thisMonth && new Date(item.paidAt) < nextMonth;
    });
    const haveUser = filterData.reduce((acc, item) => (item.user ? acc + 1 : acc), 0);
    const noUser = filterData.reduce((acc, item) => (!item.user ? acc + 1 : acc), 0);
    orderData = [
      {
        name: 'Có tài khoản',
        value: haveUser,
      },
      {
        name: 'Không tài khoản',
        value: noUser,
      },
    ];
  }

  return (
    <OutlineBox>
      <div style={{ height: '350px' }} className="m-3">
        <h5>Thống kê nguời dùng đăng nhập mua hàng</h5>
        <ul className="navbar-nav ms-auto ms-md-0 me-3 me-lg-4" align="end" id="nav-ul">
          <NavDropdown id="admin-nav" align="end" title="Xem theo">
            <NavDropdown.Item onClick={() => setMonthView(TYPE_CURRENT_MONTH)}>{TYPE_CURRENT_MONTH}</NavDropdown.Item>
            <NavDropdown.Item onClick={() => setMonthView(TYPE_LAST_MONTH)}>{TYPE_LAST_MONTH}</NavDropdown.Item>
          </NavDropdown>
        </ul>
        <ul className="navbar-nav ms-auto ms-md-0 me-3 me-lg-4" align="end" id="nav-ul">
          {monthView}
        </ul>
        <ResponsiveContainer width="100%" height="80%">
          <PieChart width={400} height={400}>
            <Pie
              dataKey="value"
              isAnimationActive={false}
              data={orderData}
              cx="50%"
              cy="50%"
              outerRadius={80}
              fill="#8884d8"
              label
            >
              {orderData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </OutlineBox>
  );
};

export default UserOrderStatistic;
