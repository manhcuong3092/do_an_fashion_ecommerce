import React from 'react';
import { Link } from 'react-router-dom';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useSelector } from 'react-redux';
import { FREE_SHIP_MINIMUM, SHIPPING_PRICE } from '~/constants/payment';

const CartPayment = () => {
  const { cartItems } = useSelector((state) => state.cart);

  const totalPrice = cartItems.reduce((acc, item) => {
    if (item.product.isSale) {
      return acc + item.product.salePrice * item.quantity;
    } else {
      return acc + item.product.price * item.quantity;
    }
  }, 0);

  const shippingPrice = totalPrice < FREE_SHIP_MINIMUM ? SHIPPING_PRICE : 0;

  return (
    <Row className="margin-top">
      <Col md={6}>
        <div className="single-cart-form padding60">
          <div className="log-title">
            <h3>
              <strong>Điều kiện miễn phí giao hàng</strong>
            </h3>
          </div>
          <div className="cart-form-text custom-input">
            <p>Các đơn hàng trên {FREE_SHIP_MINIMUM.toLocaleString('vi-VN')}₫ sẽ được miễn phí giao hàng</p>
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
                  <td>{totalPrice.toLocaleString('vi-VN')}₫</td>
                </tr>
                <tr>
                  <th>Phí giao hàng</th>
                  <td>{shippingPrice}đ</td>
                </tr>
              </tbody>
              <tfoot>
                <tr>
                  <th className="tfoot-padd">Tổng cộng thoanh toán</th>
                  <td className="tfoot-padd">{(totalPrice + shippingPrice).toLocaleString('vi-VN')}₫</td>
                </tr>
              </tfoot>
            </table>
            <div className="submit-text coupon">
              <Link to="/checkout">Đi đến thanh toán </Link>
            </div>
          </div>
        </div>
      </Col>
    </Row>
  );
};

export default CartPayment;
