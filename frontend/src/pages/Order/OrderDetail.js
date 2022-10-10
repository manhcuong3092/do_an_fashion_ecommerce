import React, { Fragment } from 'react'
import PageTitle from '../../components/PageTitle'

const OrderDetail = () => {
  return (
    <Fragment>
      <PageTitle title={"Chi tiết đơn hàng"} />
      <section className="pages cart-page section-padding">
        <div className="container">
          <div className="row">
            <div className="col-12">
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
                    <tr>
                      <td className="td-img text-left">
                        <a href="#"><img src="img/cart/1.png" alt="Add Product" /></a>
                        <div className="items-dsc">
                          <h5><a href="#">men’s black t-shirt</a></h5>
                          <p className="itemcolor">Color : <span>Blue</span></p>
                          <p className="itemcolor">Size   : <span>SL</span></p>
                        </div>
                      </td>
                      <td>400.000đ</td>
                      <td>
                        <form action="#">
                          <div className="plus-minus">
                            <input type="text" value="02" name="qtybutton" className="plus-minus-box" />
                          </div>
                        </form>
                      </td>
                      <td>
                        <strong>400.000đ</strong>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          <div className="row margin-top">
            <div className="col-md-6">
              <div className="single-cart-form padding60">
                <div className="log-title">
                  <h3><strong>Trạng thái đơn hàng</strong></h3>
                </div>
                <div className="cart-form-text custom-input">
                  <p>Đã giao hàng</p>
                </div>
                <div className="log-title mt-5">
                  <h3><strong>Thanh toán</strong></h3>
                </div>
                <div className="cart-form-text custom-input">
                  <p>Chưa thanh toán</p>
                </div>
                <div className="log-title mt-5">
                  <h3><strong>Ngày đặt hàng</strong></h3>
                </div>
                <div className="cart-form-text custom-input">
                  <p>12/31/2022</p>
                </div>
              </div>
            </div>
            <div className="col-md-6">
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
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Fragment>
  )
}

export default OrderDetail