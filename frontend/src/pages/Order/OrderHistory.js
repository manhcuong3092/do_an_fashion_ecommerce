import React, { Fragment, useEffect, useState } from 'react';
import PageTitle from '../../layouts/PageTitle';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Header from '../../layouts/Header';
import Footer from '../../layouts/Footer';
import { toast } from 'react-toastify';
import axios from 'axios';
import { END_POINT } from '~/config';
import { Link } from 'react-router-dom';

const OrderHistory = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    try {
      const getOrders = async () => {
        const { data } = await axios.get(`${END_POINT}/api/v1/orders/me`, { withCredentials: true });
        setOrders(data.orders);
      };
      getOrders();
    } catch (error) {
      toast.error(error.response.data.message);
    }
  }, []);

  return (
    <Fragment>
      <Header />
      <PageTitle title={'Lịch sử đặt hàng'} />
      <section className="pages cart-page section-padding">
        <Container>
          <Row>
            <Col>
              <div className="table-responsive padding60">
                <table className="wishlist-table text-center">
                  <thead>
                    <tr>
                      <th>Mã đơn hàng</th>
                      <th>Ngày đặt</th>
                      <th>Tổng cộng</th>
                      <th>Thanh toán</th>
                      <th>Trạng thái</th>
                      <th>Chi tiết</th>
                    </tr>
                  </thead>
                  <tbody>
                    {orders.map((item, index) => (
                      <tr key={index}>
                        <td className="text-left">{item._id}</td>
                        <td>{new Date(Date.parse(item.createdAt)).toLocaleDateString('vi-VN')}</td>
                        <td>{item.totalPrice.toLocaleString('vi-VN')}₫</td>
                        <td>
                          {item.paymentStatus ? (
                            <span className="text-success">Đã thanh toán</span>
                          ) : (
                            <span className="text-danger">Chưa thanh toán</span>
                          )}
                        </td>
                        <td>
                          <strong>{item.orderStatus}</strong>
                        </td>
                        <td>
                          <Link to={`/order-detail/${item._id}`}>
                            <i className="mdi mdi-information" title="Xem chi tiết đơn hàng"></i>
                          </Link>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
      <Footer />
    </Fragment>
  );
};

export default OrderHistory;
