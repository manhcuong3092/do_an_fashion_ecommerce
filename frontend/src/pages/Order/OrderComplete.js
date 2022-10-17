import React, { Fragment } from 'react';
import PageTitle from '../../layouts/PageTitle';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Metadata from '../../layouts/Metadata';
import Header from '../../layouts/Header';
import Footer from '../../layouts/Footer';

const OrderComplete = () => {
  return (
    <Fragment>
      <Header />
      <PageTitle title={'Chi tiết đơn hàng'} />
      <section className="pages checkout order-complete section-padding">
        <Container>
          <Row>
            <Col className="text-center">
              <div className="complete-title">
                <p>Cảm ơn bạn đã đặt hàng. Đơn hàng của bạn đã được ghi nhận.</p>
              </div>
              <div className="order-no clearfix">
                <ul>
                  <li>
                    Mã đơn hàng <span>m 2653257</span>
                  </li>
                  <li>
                    Ngày<span>jun 15, 2021</span>
                  </li>
                  <li>
                    Tổng cộng<span>$ 325.00</span>
                  </li>
                  <li>
                    Phương thức thanh toán<span>Online</span>
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
                    <strong>your order</strong>
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
                      <tr>
                        <th>Men’s White Shirt x 2</th>
                        <td>$86.00</td>
                      </tr>
                      <tr>
                        <th>Men’s Black Shirt x 1</th>
                        <td>$69.00</td>
                      </tr>
                      <tr>
                        <th>Tổng cộng giỏ hàng</th>
                        <td>$155.00</td>
                      </tr>
                      <tr>
                        <th>Phí giao hàng</th>
                        <td>$15.00</td>
                      </tr>
                    </tbody>
                    <tfoot>
                      <tr>
                        <th>Tổng cộng</th>
                        <td>$325.00</td>
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
                    <strong>Billing address</strong>
                  </h3>
                </div>
                <p>123 Van Xuan, Dan Phuong, Ha Noi</p>
                <p>Số điện thoại: 0123456789,</p>
                <p>Email: test@gmail.com</p>
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
                        Name<strong>:</strong>
                      </span>{' '}
                      MD: Cuong
                    </li>
                    <li>
                      <span>
                        Email<strong>:</strong>
                      </span>{' '}
                      test@gmail.com
                    </li>
                    <li>
                      <span>
                        Phone<strong>:</strong>
                      </span>{' '}
                      +0123456789
                    </li>
                  </ul>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
      <Footer />
    </Fragment>
  );
};

export default OrderComplete;
