import React, { useState } from 'react';
import { NavDropdown } from 'react-bootstrap';
import { Cell, Legend, Pie, PieChart, ResponsiveContainer, Tooltip } from 'recharts';
import { ORDER_CANCEL, ORDER_SUCCESS } from '~/constants/order';
import { TYPE_CURRENT_MONTH, TYPE_LAST_MONTH } from '~/constants/statistic';
import OutlineBox from '../OutlineBox';

const COLORS = ['#03ce4a', '#c61a09'];

const OrderSuccessRateStatic = ({ orders }) => {
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
      return (
        (new Date(item.paidAt) >= thisMonth && new Date(item.paidAt) < nextMonth) ||
        (item.orderStatus === ORDER_CANCEL &&
          new Date(item.createdAt) >= thisMonth &&
          new Date(item.createdAt) < nextMonth)
      );
    });
    const orderSuccess = filterData.reduce((acc, item) => (item.orderStatus === ORDER_SUCCESS ? acc + 1 : acc), 0);
    const orderCanceled = filterData.reduce((acc, item) => (item.orderStatus === ORDER_CANCEL ? acc + 1 : acc), 0);
    orderData = [
      {
        name: ORDER_SUCCESS,
        value: orderSuccess,
      },
      {
        name: ORDER_CANCEL,
        value: orderCanceled,
      },
    ];
  }

  return (
    <OutlineBox>
      <div style={{ height: '400px' }} className="m-3">
        <h5>Thống kê tỉ lệ đơn hàng thành công</h5>
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

export default OrderSuccessRateStatic;
