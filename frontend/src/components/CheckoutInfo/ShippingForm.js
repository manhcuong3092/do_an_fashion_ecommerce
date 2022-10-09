import React from 'react'

const ShippingForm = () => {
  return (
    <div className="main-input single-cart-form padding60">
      <div className="log-title">
        <h3><strong>Thông tin giao hàng</strong></h3>
      </div>
      <div className="custom-input">
        <form action="#">
          <input type="text" name="name" placeholder="Tên" />
          <input type="text" name="email" placeholder="Email" />
          <input type="text" name="phone" placeholder="Số điện thoại" />
          <input type="text" name="state" placeholder="Tỉnh/Thành phố" />
          <div className="custom-mess">
            <textarea rows="2" placeholder="Địa chỉ" name="address"></textarea>
          </div>
        </form>
      </div>
    </div>
  )
}

export default ShippingForm