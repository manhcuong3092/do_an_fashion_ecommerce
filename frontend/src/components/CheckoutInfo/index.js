import React from 'react'
import CheckoutCart from './CheckoutCart'
import ShippingForm from './ShippingForm'

const CheckoutInfo = () => {
  return (
    <section className="pages checkout section-padding">
      <div className="container">
        <div className="row">
          <div className="col-md-6">
            <ShippingForm />
          </div>
          <div className="col-md-6">
            <CheckoutCart />
          </div>
        </div>
        <div className="row margin-top">
          <div className="col-12">
            <div className="padding60">
              <div className="log-title">
                <h3><strong>Phương thức thanh toán</strong></h3>
              </div>
              <div className="categories">
                <ul id="accordion" className="panel-group clearfix">
                  <li className="panel">
                    <div data-bs-toggle="collapse" data-bs-target="#collapse1">
                      <div className="medium-a">
                        Thanh toán khi nhận hàng
                      </div>
                    </div>
                    <div className="panel-collapse collapse show" id="collapse1" data-bs-parent="#accordion">
                      <div className="normal-a">
                        <p>Lorem Ipsum is simply in dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry.</p>
                      </div>
                    </div>
                  </li>
                  <li className="panel">
                    <div data-bs-toggle="collapse" data-bs-target="#collapse3">
                      <div className="medium-a">
                        Stripe
                      </div>
                    </div>
                    <div className="paypal-dsc panel-collapse collapse" id="collapse3" data-bs-parent="#accordion">
                      <div className="normal-a">
                        <p>Lorem Ipsum is simply in dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry.</p>
                      </div>
                    </div>
                  </li>
                </ul>
                <div className="submit-text">
                  <a href="#">Đặt hàng</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default CheckoutInfo