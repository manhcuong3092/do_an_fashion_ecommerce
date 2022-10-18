import React, { Fragment, useEffect } from 'react';
import PageTitle from '../../layouts/PageTitle';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Header from '../../layouts/Header';
import Footer from '../../layouts/Footer';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const OrderComplete = () => {
  const { state } = useLocation();
  const order = state;
  const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  const navigate = useNavigate();

  useEffect(() => {
    if (!order) {
      toast.error('Bạn chưa mua hàng.');
      navigate('/');
    }
  }, [navigate, order]);

  return (
    <Fragment>
      <Header />
      <PageTitle title={'Đặt hàng thành công'} />
      <section className="pages checkout order-complete section-padding">
        {order && (
          <Container>
            <Row>
              <Col className="text-center">
                <div className="complete-title">
                  <p>Cảm ơn bạn đã đặt hàng. Đơn hàng của bạn đã được ghi nhận.</p>
                </div>
                <div className="order-no clearfix">
                  <ul>
                    <li>
                      Mã đơn hàng <span>{order._id}</span>
                    </li>
                    <li>
                      Ngày<span>{new Date(Date.parse(order.createdAt)).toLocaleDateString('vi-VN', options)}</span>
                    </li>
                    <li>
                      Tổng cộng<span>{order.totalPrice.toLocaleString('vi-VN')}₫</span>
                    </li>
                    <li>
                      Phương thức thanh toán<span>{order.paymentType}</span>
                    </li>
                  </ul>
                </div>
              </Col>
            </Row>
            <Row>
              <Col md={6}>
                <div className="padding60">
                  <div className="log-title">
                    <h3>
                      <strong>Đơn hàng</strong>
                    </h3>
                  </div>
                  <div className="cart-form-text pay-details">
                    <table>
                      <thead>
                        <tr>
                          <th>Sản phẩm</th>
                          <td>Tổng cộng</td>
                        </tr>
                      </thead>
                      <tbody>
                        {order.orderItems.map((item, index) => (
                          <tr key={index}>
                            <th>
                              {item.product.name} ({item.color.name}) ({item.size.name}) x {item.quantity}
                            </th>
                            <td>{(item.quantity * item.price).toLocaleString('vi-VN')}₫</td>
                          </tr>
                        ))}
                        <tr>
                          <th>Tổng cộng giỏ hàng</th>
                          <td>{order.itemsPrice.toLocaleString('vi-VN')}₫</td>
                        </tr>
                        <tr>
                          <th>Phí giao hàng</th>
                          <td>{order.shippingPrice.toLocaleString('vi-VN')}₫</td>
                        </tr>
                      </tbody>
                      <tfoot>
                        <tr>
                          <th>Tổng cộng</th>
                          <td>{order.totalPrice.toLocaleString('vi-VN')}₫</td>
                        </tr>
                      </tfoot>
                    </table>
                  </div>
                </div>
              </Col>
              <Col md={6}>
                <div className="order-address bill padding60">
                  <div className="log-title">
                    <h3>
                      <strong>Địa chỉ giao hàng</strong>
                    </h3>
                  </div>
                  <p>
                    {order.shippingInfo.address}, {order.shippingInfo.city}
                  </p>
                  <p>Số điện thoại: {order.shippingInfo.phoneNo}</p>
                  <p>Email: {order.shippingInfo.email}</p>
                </div>
                <div className="order-details padding60">
                  <div className="log-title">
                    <h3>
                      <strong>Thông tin khách hàng</strong>
                    </h3>
                  </div>
                  <div className="por-dse clearfix">
                    <ul>
                      <li>
                        <span>
                          Họ tên<strong>:</strong>
                        </span>{' '}
                        {order.shippingInfo.name}
                      </li>
                      <li>
                        <span>
                          Email<strong>:</strong>
                        </span>{' '}
                        {order.shippingInfo.email}
                      </li>
                      <li>
                        <span>
                          Số điện thoại<strong>:</strong>
                        </span>{' '}
                        {order.shippingInfo.phoneNo}
                      </li>
                    </ul>
                  </div>
                </div>
              </Col>
            </Row>
          </Container>
        )}
      </section>
      <Footer />
    </Fragment>
  );
};

export default OrderComplete;
