import React from 'react'
import { Link } from 'react-router-dom'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const CartPayment = () => {
  return (
    <Row className="margin-top">
      <Col md={6}>
        <div className="single-cart-form padding60">
          <div className="log-title">
            <h3><strong>Điều kiện miễn phí giao hàng</strong></h3>
          </div>
          <div className="cart-form-text custom-input">
            <p>Các đơn hàng trên 500.000₫ sẽ được miễn phí giao hàng</p>
          </div>
        </div>
      </Col>
      <Col md={6}>
        <div className="single-cart-form padding60">
          <div className="log-title">
            <h3><strong>Chi tiết thanh toán</strong></h3>
          </div>
          <div className="cart-form-text pay-details table-responsive">
            <table>
              <tbody>
                <tr>
                  <th>Tổng cộng</th>
                  <td>400.000đ</td>
                </tr>
                <tr>
                  <th>Phí giao hàng</th>
                  <td>30.000đ</td>
                </tr>
              </tbody>
              <tfoot>
                <tr>
                  <th className="tfoot-padd">Tổng cộng thoanh toán</th>
                  <td className="tfoot-padd">430.000đ</td>
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
  )
}

export default CartPayment