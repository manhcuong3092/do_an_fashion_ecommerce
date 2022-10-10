import React, { Fragment } from 'react'
import PageTitle from '../../components/PageTitle'

const OrderHistory = () => {
  return (
    <Fragment>
      <PageTitle title={"Lịch sử đặt hàng"} />
      <section className="pages cart-page section-padding">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="table-responsive padding60">
                <table className="wishlist-table text-center">
                  <thead>
                    <tr>
                      <th>Mã đơn hàng</th>
                      <th>Ngày đặt</th>
                      <th>Tổng cộng</th>
                      <th>Trạng thái</th>
                      <th>Thanh toán</th>
                      <th>Chi tiết</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="td-img text-left">
                        <div className="items-dsc">
                          <h5><a href="#">123xzc1xz23vd</a></h5>
                        </div>
                      </td>
                      <td>12/12/2022</td>
                      <td>400.000đ</td>
                      <td>
                        <strong>Đang xử lý</strong>
                      </td>
                      <td>
                        <strong>Đã thanh toán</strong>
                      </td>
                      <td><i className="mdi mdi-information" title="Xem chi tiết đơn hàng"></i></td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Fragment>
  )
}

export default OrderHistory