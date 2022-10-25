import React from 'react';
import { Cell, Legend, Pie, PieChart, ResponsiveContainer, Tooltip } from 'recharts';
import OutlineBox from '../OutlineBox';

const COLORS = ['#03ac13', '#555555'];

const UserOrderStatistic = ({ orders }) => {
  let orderData = [];

  if (orders) {
    let date = new Date();
    let currentMonth = new Date(date.getFullYear(), date.getMonth(), 1);
    const thisMonth = new Date(currentMonth);
    const nextMonth = new Date(currentMonth.setMonth(currentMonth.getMonth() + 1));
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

  console.log(orderData);

  return (
    <OutlineBox>
      <div style={{ height: '350px' }} className="m-3">
        <h5>Thống kê nguời dùng đăng nhập mua hàng</h5>
        <h6>Theo tháng</h6>
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
