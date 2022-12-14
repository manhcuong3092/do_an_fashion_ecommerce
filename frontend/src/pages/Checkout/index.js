import React, { Fragment, useEffect, useState } from 'react';
import { Col, Collapse, Container, Form, Row } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import validator from 'validator';
import Footer from '../../layouts/Footer';
import Header from '../../layouts/Header';
import PageTitle from '../../layouts/PageTitle';

import { CardCvcElement, CardExpiryElement, CardNumberElement, useElements, useStripe } from '@stripe/react-stripe-js';
import { toast } from 'react-toastify';
import {
  FREE_SHIP_MINIMUM,
  NOT_PAID,
  PAID,
  PAYMENT_COD,
  PAYMENT_ONLINE,
  PAYMENT_PAYPAL,
  SHIPPING_PRICE,
  USD_TO_VND,
} from '~/constants/payment';
import axios from 'axios';
import { END_POINT } from '~/config';
import { useNavigate } from 'react-router-dom';
import Loader from '~/layouts/Loader';
import { PayPalButtons } from '@paypal/react-paypal-js';
import stripeLogo from '../../assets/img/stripe_icon.png';

const options = {
  style: {
    base: {
      fontSize: '16px',
    },
    invalid: {
      color: '#9e2146',
    },
  },
};

const Checkout = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNo, setPhoneNo] = useState('');
  const [city, setCity] = useState('');
  const [address, setAddress] = useState('');
  const [loading, setLoading] = useState(false);

  const [paymentType, setPaymentType] = useState(PAYMENT_COD);

  const { user } = useSelector((state) => state.auth);
  const { cartItems } = useSelector((state) => state.cart);
  const navigate = useNavigate();

  const stripe = useStripe();
  const elements = useElements();

  const subTotal = cartItems.reduce((acc, item) => {
    if (item.productItem.product.isSale) {
      return acc + item.productItem.product.salePrice * item.quantity;
    } else {
      return acc + item.productItem.product.price * item.quantity;
    }
  }, 0);
  const shippingPrice = subTotal < FREE_SHIP_MINIMUM ? SHIPPING_PRICE : 0;
  const totalPrice = subTotal + shippingPrice;

  useEffect(() => {
    if (user) {
      setName(user.name);
      setAddress(user.address);
      setPhoneNo(user.phoneNo);
      setCity(user.city);
      setEmail(user.email);
    }
  }, [user]);

  const validateData = () => {
    if (!name) {
      toast.warn('Vui l??ng nh???p h??? t??n');
      return false;
    }
    if (!email) {
      toast.warn('Vui l??ng nh???p email');
      return false;
    } else if (!validator.isEmail(email)) {
      toast.warn('Email kh??ng h???p l???');
      return false;
    }
    if (!phoneNo) {
      toast.warn('Vui l??ng nh???p s??? ??i???n tho???i');
      return false;
    } else if (!phoneNo.match(/\d{10,11}/)) {
      toast.warn('S??? ??i???n tho???i g???m 10 - 11 s???');
      return false;
    }
    if (!city) {
      toast.warn('Vui l??ng nh???p t???nh/th??nh ph???');
      return false;
    }
    if (!address) {
      toast.warn('Vui l??ng nh???p ?????a ch???');
      return false;
    }
    if (cartItems.length === 0) {
      toast.warn('B???n ch??a c?? h??ng trong gi???');
      return false;
    }
    return true;
  };

  const submitHandler = async (e) => {
    if (!validateData()) {
      return;
    }

    setLoading(true);

    const orderItems = cartItems.map((item) => {
      const orderItem = {
        price: item.productItem.product.isSale ? item.productItem.product.salePrice : item.productItem.product.price,
        productItem: item.productItem._id,
        quantity: item.quantity,
      };
      return orderItem;
    });
    const shippingInfo = {
      name,
      email,
      phoneNo,
      city,
      address,
    };

    if (paymentType === PAYMENT_COD) {
      const orderData = {
        orderItems,
        shippingInfo,
        paymentStatus: NOT_PAID,
        paymentType: PAYMENT_COD,
        user: user ? user._id : null,
        itemsPrice: subTotal,
        shippingPrice,
        totalPrice: totalPrice,
      };

      try {
        const { data } = await axios.post(`${END_POINT}/api/v1/order`, orderData, { withCredentials: true });
        toast.success('?????t h??ng th??nh c??ng');
        if (user) {
          await axios.put(`${END_POINT}/api/v1/cart`, { cartItems: [] }, { withCredentials: true });
        } else {
          localStorage.setItem('cartItems', []);
        }
        navigate('/order-complete', { replace: true, state: data.order });
      } catch (error) {
        toast.error(error);
      }
    } else if (paymentType === PAYMENT_ONLINE) {
      try {
        const config = {
          headers: {
            'Content-Type': 'application/json',
          },
          withCredentials: true,
        };
        const res = await axios.post(
          `${END_POINT}/api/v1/payment/process/stripe`,
          { amount: totalPrice, currency: 'vnd' },
          config,
        );
        const clientSecret = res.data.client_secret;
        if (!stripe || !elements) {
          return;
        }
        const result = await stripe.confirmCardPayment(clientSecret, {
          payment_method: {
            card: elements.getElement(CardNumberElement),
            billing_details: {
              name,
              email,
            },
          },
        });

        if (result.error) {
          toast.error(result.error.message);
        } else {
          //The payment is processed or not
          if (result.paymentIntent.status === 'succeeded') {
            const orderData = {
              orderItems,
              shippingInfo,
              paymentStatus: PAID,
              paymentType: PAYMENT_ONLINE,
              user: user ? user._id : null,
              itemsPrice: subTotal,
              shippingPrice,
              totalPrice: totalPrice,
              onlinePaymentInfo: {
                id: result.paymentIntent.id,
                status: result.paymentIntent.status,
              },
            };

            const { data } = await axios.post(`${END_POINT}/api/v1/order`, orderData, { withCredentials: true });
            toast.success('?????t h??ng th??nh c??ng');
            if (user) {
              await axios.put(`${END_POINT}/api/v1/cart`, { cartItems: [] }, { withCredentials: true });
            } else {
              localStorage.setItem('cartItems', []);
            }
            navigate('/order-complete', { replace: true, state: data.order });
          } else {
            toast.error('C?? l???i x???y ra trong khi thanh to??n.');
          }
        }
      } catch (error) {
        toast.error(error);
      }
    }

    setLoading(false);
  };

  const createPaypalOrder = async (id, status) => {
    if (!validateData()) {
      return;
    }

    const orderItems = cartItems.map((item) => {
      const orderItem = {
        price: item.productItem.product.isSale ? item.productItem.product.salePrice : item.productItem.product.price,
        productItem: item.productItem._id,
        quantity: item.quantity,
      };
      return orderItem;
    });
    const shippingInfo = {
      name,
      email,
      phoneNo,
      city,
      address,
    };
    const orderData = {
      orderItems,
      shippingInfo,
      paymentStatus: PAID,
      paymentType: PAYMENT_PAYPAL,
      user: user ? user._id : null,
      itemsPrice: subTotal,
      shippingPrice,
      totalPrice: totalPrice,
      onlinePaymentInfo: {
        id,
        status,
      },
    };

    const { data } = await axios.post(`${END_POINT}/api/v1/order`, orderData, { withCredentials: true });
    toast.success('?????t h??ng th??nh c??ng');
    if (user) {
      await axios.put(`${END_POINT}/api/v1/cart`, { cartItems: [] }, { withCredentials: true });
    } else {
      localStorage.setItem('cartItems', []);
    }
    navigate('/order-complete', { replace: true, state: data.order });
  };

  return (
    <Fragment>
      <Header />
      <PageTitle title="Thanh to??n" />
      {loading && <Loader />}
      <section className="pages checkout section-padding">
        <Container>
          <Row>
            <Col md={6}>
              <div className="main-input single-cart-form padding60">
                <div className="log-title">
                  <h3>
                    <strong>Th??ng tin giao h??ng</strong>
                  </h3>
                </div>
                <div className="custom-input">
                  <Form>
                    <Form.Label>
                      H??? t??n <span className="text-danger">(*)</span>
                    </Form.Label>
                    <input
                      type="text"
                      name="name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="T??n"
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
                      S??? ??i???n tho???i <span className="text-danger">(*)</span>
                    </Form.Label>
                    <input
                      type="text"
                      name="phone"
                      value={phoneNo}
                      onChange={(e) => setPhoneNo(e.target.value)}
                      placeholder="S??? ??i???n tho???i"
                    />
                    <Form.Label>
                      T???nh th??nh ph??? <span className="text-danger">(*)</span>
                    </Form.Label>
                    <input
                      type="text"
                      name="city"
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      placeholder="T???nh/Th??nh ph???"
                    />
                    <Form.Label>
                      ?????a ch??? <span className="text-danger">(*)</span>
                    </Form.Label>
                    <div className="custom-mess">
                      <textarea
                        rows="2"
                        placeholder="?????a ch???"
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
                    <strong>????n h??ng c???a b???n</strong>
                  </h3>
                </div>
                <div className="cart-form-text pay-details table-responsive">
                  <table>
                    <thead>
                      <tr>
                        <th>S???n ph???m</th>
                        <td>T???ng</td>
                      </tr>
                    </thead>
                    <tbody>
                      {cartItems.map((item, index) => (
                        <tr key={index}>
                          <th>
                            {item.productItem.product.name} ({item.productItem.color.name}) (
                            {item.productItem.size.name}) x {item.quantity}
                          </th>
                          <td>
                            {(item.productItem.product.isSale
                              ? item.productItem.product.salePrice * item.quantity
                              : item.productItem.product.price * item.quantity
                            ).toLocaleString('vi-VN')}
                            ???
                          </td>
                        </tr>
                      ))}
                      <tr className="text-primary">
                        <th>T???ng gi??? h??ng</th>
                        <td>{subTotal.toLocaleString('vi-VN')}???</td>
                      </tr>
                      <tr>
                        <th>Ph?? giao h??ng</th>
                        <td>{shippingPrice.toLocaleString('vi-VN')}???</td>
                      </tr>
                    </tbody>
                    <tfoot>
                      <tr>
                        <th>T???ng thanh to??n</th>
                        <td>{totalPrice.toLocaleString('vi-VN')}???</td>
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
                    <strong>Ph????ng th???c thanh to??n</strong>
                  </h3>
                </div>
                <div className="">
                  <ul id="accordion" className="panel-group clearfix">
                    <li className="panel">
                      <div
                        data-bs-toggle="collapse"
                        data-bs-target="#collapse1"
                        onClick={(e) => setPaymentType(PAYMENT_COD)}
                      >
                        <div className="medium-a align-middle">
                          <input readOnly type="radio" checked={paymentType === PAYMENT_COD ? true : false} />
                          <span className="payment-type-title">Thanh to??n khi nh???n h??ng</span>
                        </div>
                      </div>
                      <Collapse
                        in={paymentType === PAYMENT_COD ? true : false}
                        id="collapse1"
                        data-bs-parent="#accordion"
                      >
                        <div className="normal-a border">
                          <p>Thanh to??n b???ng ti???n m???t khi nh???n h??ng</p>
                        </div>
                      </Collapse>
                    </li>
                    <li className="panel">
                      <div
                        data-bs-toggle="collapse"
                        data-bs-target="#collapse2"
                        onClick={(e) => setPaymentType(PAYMENT_PAYPAL)}
                      >
                        <div className="medium-a align-middle">
                          <input readOnly type="radio" checked={paymentType === PAYMENT_PAYPAL ? true : false} />
                          <span className="payment-type-title">Thanh to??n qua Paypal</span>
                        </div>
                      </div>
                      <Collapse
                        in={paymentType === PAYMENT_PAYPAL ? true : false}
                        id="collapse2"
                        data-bs-parent="#accordion"
                      >
                        <div className="normal-a border">
                          <PayPalButtons
                            style={{ layout: 'horizontal' }}
                            forceReRender={[name, email, address, city, phoneNo]}
                            createOrder={(data, actions) => {
                              return actions.order.create({
                                purchase_units: [
                                  {
                                    amount: {
                                      value: (totalPrice / USD_TO_VND).toFixed(2),
                                      currency_code: 'USD',
                                    },
                                  },
                                ],
                              });
                            }}
                            onApprove={(data, actions) => {
                              return actions.order.capture().then((details) => {
                                const { id, status } = details;
                                createPaypalOrder(id, status);
                              });
                            }}
                          />
                        </div>
                      </Collapse>
                    </li>
                    <li className="panel">
                      <div
                        data-bs-toggle="collapse"
                        data-bs-target="#collapse3"
                        onClick={(e) => setPaymentType(PAYMENT_ONLINE)}
                      >
                        <div className="medium-a align-middle">
                          <input readOnly type="radio" checked={paymentType === PAYMENT_ONLINE ? true : false} />
                          <span className="payment-type-title">Thanh to??n qua th??? online</span>
                        </div>
                      </div>
                      <Collapse
                        in={paymentType === PAYMENT_ONLINE ? true : false}
                        id="collapse3"
                        data-bs-parent="#accordion"
                      >
                        <div className="normal-a border p-4">
                          <Form className="" onSubmit={submitHandler}>
                            <h2 className="mb-4">
                              Th??ng tin th???{' '}
                              <img
                                src={stripeLogo}
                                style={{ width: '200px', height: '40px' }}
                                className="mb-2"
                                alt="Brand Logo"
                              />
                            </h2>
                            <div className="form-group">
                              <label htmlFor="card_num_field">S??? th???</label>
                              <CardNumberElement
                                type="text"
                                id="card_num_field"
                                className="form-control"
                                options={options}
                              />
                            </div>

                            <div className="form-group mt-3">
                              <label htmlFor="card_exp_field">H???t h???n</label>
                              <CardExpiryElement
                                type="text"
                                id="card_exp_field"
                                className="form-control"
                                options={options}
                              />
                            </div>

                            <div className="form-group mt-3">
                              <label htmlFor="card_cvc_field">S??? CVC</label>
                              <CardCvcElement
                                type="text"
                                id="card_cvc_field"
                                className="form-control"
                                options={options}
                              />
                            </div>
                          </Form>
                        </div>
                      </Collapse>
                    </li>
                  </ul>
                  <div className="submit-text">
                    <button onClick={(e) => submitHandler(e)}>?????t h??ng</button>
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
