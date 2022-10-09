import React from 'react'

const CheckoutCart = () => {
  return (
    <div className="padding60">
      <div className="log-title">
        <h3><strong>Đơn hàng của bạn</strong></h3>
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
            <tr>
              <th>Men’s White Shirt  x 2</th>
              <td>100.000 đ</td>
            </tr>
            <tr>
              <th>Men’s Black Shirt  x 1</th>
              <td>$69.00</td>
            </tr>
            <tr>
              <th>Tổng giỏ hàng</th>
              <td>$155.00</td>
            </tr>
            <tr>
              <th>Phí giao hàng</th>
              <td>$15.00</td>
            </tr>
          </tbody>
          <tfoot>
            <tr>
              <th>Tổng thanh toán</th>
              <td>$325.00</td>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  )
}

export default CheckoutCart