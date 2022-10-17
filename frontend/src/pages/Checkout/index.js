import React, { Fragment, useEffect, useState } from 'react';
import { Col, Collapse, Container, Form, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Footer from '../../layouts/Footer';
import Header from '../../layouts/Header';
import PageTitle from '../../layouts/PageTitle';

const Checkout = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNo, setPhoneNo] = useState('');
  const [city, setCity] = useState('');
  const [address, setAddress] = useState('');

  const [paymentType, setPaymentType] = useState('cod');

  const { user } = useSelector((state) => state.auth);
  const { cartItems } = useSelector((state) => state.cart);

  const subTotal = cartItems.reduce((acc, item) => {
    if (item.product.isSale) {
      return acc + item.product.salePrice * item.quantity;
    } else {
      return acc + item.product.price * item.quantity;
    }
  }, 0);

  const shippingPrice = subTotal < 500000 ? 30000 : 0;

  useEffect(() => {
    if (user) {
      setName(user.name);
      setAddress(user.address);
      setPhoneNo(user.phoneNo);
      setCity(user.city);
      setEmail(user.email);
    }
  }, [user]);

  return (
    <Fragment>
      <Header />
      <PageTitle title="Thanh toán" />
      <section className="pages checkout section-padding">
        <Container>
          <Row>
            <Col md={6}>
              <div className="main-input single-cart-form padding60">
                <div className="log-title">
                  <h3>
                    <strong>Thông tin giao hàng</strong>
                  </h3>
                </div>
                <div className="custom-input">
                  <Form>
                    <Form.Label>
                      Họ tên <span className="text-danger">(*)</span>
                    </Form.Label>
                    <input
                      type="text"
                      name="name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Tên"
                    />
                    <Form.Label>
                      Email <span className="text-danger">(*)</span>
                    </Form.Label>
                    <input
                      type="text"
                      name="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Email"
                    />
                    <Form.Label>
                      Số điện thoại <span className="text-danger">(*)</span>
                    </Form.Label>
                    <input
                      type="text"
                      name="phone"
                      value={phoneNo}
                      onChange={(e) => setPhoneNo(e.target.value)}
                      placeholder="Số điện thoại"
                    />
                    <Form.Label>
                      Tỉnh thành phố <span className="text-danger">(*)</span>
                    </Form.Label>
                    <input
                      type="text"
                      name="city"
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      placeholder="Tỉnh/Thành phố"
                    />
                    <Form.Label>
                      Địa chỉ <span className="text-danger">(*)</span>
                    </Form.Label>
                    <div className="custom-mess">
                      <textarea
                        rows="2"
                        placeholder="Địa chỉ"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        name="address"
                      ></textarea>
                    </div>
                  </Form>
                </div>
              </div>
            </Col>
            <Col md={6}>
              <div className="padding60">
                <div className="log-title">
                  <h3>
                    <strong>Đơn hàng của bạn</strong>
                  </h3>
                </div>
                <div className="cart-form-text pay-details table-responsive">
                  <table>
                    <thead>
                      <tr>
                        <th>Sản phẩm</th>
                        <td>Tổng</td>
                      </tr>
                    </thead>
                    <tbody>
                      {cartItems.map((item, index) => (
                        <tr key={index}>
                          <th>
                            {item.product.name} ({item.color.name}) ({item.size.name}) x {item.quantity}
                          </th>
                          <td>
                            {(item.product.isSale
                              ? item.product.salePrice * item.quantity
                              : item.product.price * item.quantity
                            ).toLocaleString('vi-VN')}
                            ₫
                          </td>
                        </tr>
                      ))}
                      <tr className="text-primary">
                        <th>Tổng giỏ hàng</th>
                        <td>{subTotal.toLocaleString('vi-VN')}₫</td>
                      </tr>
                      <tr>
                        <th>Phí giao hàng</th>
                        <td>{shippingPrice.toLocaleString('vi-VN')}₫</td>
                      </tr>
                    </tbody>
                    <tfoot>
                      <tr>
                        <th>Tổng thanh toán</th>
                        <td>{(subTotal - shippingPrice).toLocaleString('vi-VN')}₫</td>
                      </tr>
                    </tfoot>
                  </table>
                </div>
              </div>
            </Col>
          </Row>
          <Row className="margin-top">
            <Col>
              <div className="padding60">
                <div className="log-title">
                  <h3>
                    <strong>Phương thức thanh toán</strong>
                  </h3>
                </div>
                <div className="categories">
                  <ul id="accordion" className="panel-group clearfix">
                    <li className="panel">
                      <div data-bs-toggle="collapse" data-bs-target="#collapse1" onClick={(e) => setPaymentType('cod')}>
                        <div className="medium-a">
                          <input type="radio" checked={paymentType === 'cod' ? true : false} />
                          <span className="payment-type-title">Thanh toán khi nhận hàng</span>
                        </div>
                      </div>
                      <Collapse in={paymentType === 'cod' ? true : false} id="collapse1" data-bs-parent="#accordion">
                        <div className="normal-a">
                          <p>
                            Lorem Ipsum is simply in dummy text of the printing and typesetting industry. Lorem Ipsum
                            has been the industry.
                          </p>
                        </div>
                      </Collapse>
                    </li>
                    <li className="panel">
                      <div
                        data-bs-toggle="collapse"
                        data-bs-target="#collapse3"
                        onClick={(e) => setPaymentType('online')}
                      >
                        <div className="medium-a">
                          <input type="radio" checked={paymentType === 'online' ? true : false} />
                          <span className="payment-type-title">Thanh toán online</span>
                        </div>
                      </div>
                      <Collapse in={paymentType === 'online' ? true : false} id="collapse3" data-bs-parent="#accordion">
                        <div className="normal-a">
                          <p>
                            Lorem Ipsum is simply in dummy text of the printing and typesetting industry. Lorem Ipsum
                            has been the industry.
                          </p>
                        </div>
                      </Collapse>
                    </li>
                  </ul>
                  <div className="submit-text">
                    <a href="#">Đặt hàng</a>
                  </div>
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

export default Checkout;
