import React, { Fragment, useEffect, useState } from 'react';
import PageTitle from '../../layouts/PageTitle';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Header from '../../layouts/Header';
import Footer from '../../layouts/Footer';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import { END_POINT } from '~/config';
import { toast } from 'react-toastify';

const OrderDetail = () => {
  const [order, setOrder] = useState(null);
  const { orderId } = useParams();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
    try {
      const getOrders = async () => {
        const { data } = await axios.get(`${END_POINT}/api/v1/order/${orderId}`, { withCredentials: true });
        console.log(data);
        setOrder(data.order);
      };
      getOrders();
    } catch (error) {
      toast.error(error.response.data.message);
    }
  }, [orderId]);

  return (
    <Fragment>
      <Header />
      <PageTitle title={'Chi tiết đơn hàng'} />
      <section className="pages cart-page section-padding">
        {order && (
          <Container>
            <Row>
              <Col>
                <div className="table-responsive padding60">
                  <table className="wishlist-table text-center">
                    <thead>
                      <tr>
                        <th>Sản phẩm</th>
                        <th>Đơn Giá</th>
                        <th>Số lượng</th>
                        <th>Tổng cộng</th>
                      </tr>
                    </thead>
                    <tbody>
                      {order.orderItems.map((item, index) => (
                        <tr key={index}>
                          <td className="td-img text-left">
                            <Link to={`/product/${item.productItem.product.slug}`}>
                              <img
                                src={item.productItem.product.images[0] ? item.productItem.product.images[0].url : ''}
                                alt="Add Product"
                              />
                            </Link>
                            <div className="items-dsc">
                              <h5>
                                <Link to={`/product/${item.productItem.product.slug}`}>
                                  {item.productItem.product.name}
                                </Link>
                              </h5>
                              <p className="itemcolor">
                                Màu : <span>{item.productItem.color.name}</span>
                              </p>
                              <p className="itemcolor">
                                Cỡ : <span>{item.productItem.size.name}</span>
                              </p>
                              <p className="itemcolor">
                                SKU : <span>{item.productItem.sku}</span>
                              </p>
                            </div>
                          </td>
                          <td>{item.price.toLocaleString('vi-VN')}₫</td>
                          <td>
                            <form action="#">
                              <div className="plus-minus">
                                <input
                                  type="text"
                                  readOnly
                                  value={item.quantity}
                                  name="qtybutton"
                                  className="plus-minus-box"
                                />
                              </div>
                            </form>
                          </td>
                          <td>
                            <strong>{(item.price * item.quantity).toLocaleString('vi-VN')}₫</strong>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </Col>
            </Row>

            <Row className="margin-top">
              <Col md={6}>
                <div className="single-cart-form padding60">
                  <div className="log-title">
                    <h3>
                      <strong>Trạng thái đơn hàng</strong>
                    </h3>
                  </div>
                  <div className="cart-form-text custom-input">
                    <p>{order.orderStatus}</p>
                  </div>
                  <div className="log-title mt-5">
                    <h3>
                      <strong>Thanh toán</strong>
                    </h3>
                  </div>
                  <div className="cart-form-text custom-input">
                    <p>{order.paymentStatus ? 'Đã thanh toán' : 'Chưa thanh toán'}</p>
                  </div>
                  <div className="log-title mt-5">
                    <h3>
                      <strong>Ngày đặt hàng</strong>
                    </h3>
                  </div>
                  <div className="cart-form-text custom-input">
                    <p>{new Date(Date.parse(order.createdAt)).toLocaleDateString('vi-VN')}</p>
                  </div>
                </div>
              </Col>
              <Col md={6}>
                <div className="single-cart-form padding60">
                  <div className="log-title">
                    <h3>
                      <strong>Chi tiết thanh toán</strong>
                    </h3>
                  </div>
                  <div className="cart-form-text pay-details table-responsive">
                    <table>
                      <tbody>
                        <tr>
                          <th>Tổng cộng</th>
                          <td>{order.itemsPrice.toLocaleString('vi-VN')}₫</td>
                        </tr>
                        <tr>
                          <th>Phí giao hàng</th>
                          <td>{order.shippingPrice.toLocaleString('vi-VN')}₫</td>
                        </tr>
                      </tbody>
                      <tfoot>
                        <tr>
                          <th className="tfoot-padd">Tổng cộng thoanh toán</th>
                          <td className="tfoot-padd">{order.totalPrice.toLocaleString('vi-VN')}₫</td>
                        </tr>
                      </tfoot>
                    </table>
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

export default OrderDetail;
