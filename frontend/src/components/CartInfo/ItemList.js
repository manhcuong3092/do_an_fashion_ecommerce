import React from 'react'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const ItemList = () => {
  return (
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
                <th>Xóa</th>
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
                      <a className="dec qtybutton">-</a>
                      <input type="text" value="02" name="qtybutton" className="plus-minus-box" />
                      <a className="inc qtybutton">+</a>
                    </div>
                  </form>
                </td>
                <td>
                  <strong>400.000đ</strong>
                </td>
                <td><i className="mdi mdi-close" title="Remove this product"></i></td>
              </tr>
            </tbody>
          </table>
        </div>
      </Col>
    </Row>
  )
}

export default ItemList