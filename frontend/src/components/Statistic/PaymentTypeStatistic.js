import React from 'react';
import { Cell, Legend, Pie, PieChart, ResponsiveContainer, Tooltip } from 'recharts';
import { PAYMENT_COD, PAYMENT_ONLINE } from '~/constants/payment';
import OutlineBox from '../OutlineBox';

const COLORS = ['#0088FE', '#00C49F'];

const PaymentTypeStatistic = ({ orders }) => {
  let orderData = [];

  if (orders) {
    let date = new Date();
    let currentMonth = new Date(date.getFullYear(), date.getMonth(), 1);
    const thisMonth = new Date(currentMonth);
    const nextMonth = new Date(currentMonth.setMonth(currentMonth.getMonth() + 1));
    const filterData = orders.filter((item) => {
      return new Date(item.paidAt) >= thisMonth && new Date(item.paidAt) < nextMonth;
    });
    const payment_cod = filterData.reduce((acc, item) => (item.paymentType === PAYMENT_COD ? acc + 1 : acc), 0);
    const payment_onl = filterData.reduce((acc, item) => (item.paymentType === PAYMENT_ONLINE ? acc + 1 : acc), 0);
    orderData = [
      {
        name: PAYMENT_COD,
        value: payment_cod,
      },
      {
        name: PAYMENT_ONLINE,
        value: payment_onl,
      },
    ];
  }

  console.log(orderData);

  return (
    <OutlineBox>
      <div style={{ height: '350px' }} className="m-3">
        <h5>Thống kê phương thức thanh toán</h5>
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

export default PaymentTypeStatistic;
