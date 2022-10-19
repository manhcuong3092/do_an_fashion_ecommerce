import React from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useDispatch, useSelector } from 'react-redux';
import { removeItemFromCart, updateItemInCart } from '~/redux/actions/cartActions';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';

const ItemList = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { cartItems } = useSelector((state) => state.cart);

  const removeCartItemHandler = (productId, colorId, sizeId) => {
    dispatch(removeItemFromCart(productId, colorId, sizeId, user));
    toast.info('Đã xóa sản phẩm');
  };

  const increaseQty = (product, color, size, quantity) => {
    const newQty = quantity + 1;
    const existIndex = product.stock.findIndex((i) => i.size === size._id && i.color === color._id);
    if (existIndex === -1) {
      return;
    }
    if (newQty > product.stock[existIndex].quantity) {
      toast.info('Trong kho chỉ có ' + quantity + ' sản phẩm.');
      return;
    }
    dispatch(updateItemInCart(product, color, size, newQty, user));
  };

  const decreaseQty = (product, color, size, quantity) => {
    const newQty = quantity - 1;
    if (newQty <= 0) {
      toast.info('Tối thiểu có 1 sản phẩm.');
      return;
    }
    dispatch(updateItemInCart(product, color, size, newQty, user));
  };

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
              {cartItems.map((item, index) => (
                <tr key={index}>
                  <td className="td-img text-left">
                    <Link to={`/product/${item.product.slug}`}>
                      <img src={item.product.images[0] ? item.product.images[0].url : ''} alt="Add Product" />
                    </Link>
                    <div className="items-dsc">
                      <h5>
                        <Link to={`/product/${item.product.slug}`}>{item.product.name}</Link>
                      </h5>
                      <p className="itemcolor">
                        Màu: <span>{item.color.name}</span>
                      </p>
                      <p className="itemcolor">
                        Kích cỡ : <span>{item.size.name}</span>
                      </p>
                    </div>
                  </td>
                  <td>
                    {(item.product.isSale ? item.product.salePrice : item.product.price).toLocaleString('vi-VN')}₫
                  </td>
                  <td>
                    <form action="#">
                      <div className="plus-minus">
                        <a
                          className="dec qtybutton"
                          onClick={(e) => decreaseQty(item.product, item.color, item.size, item.quantity)}
                        >
                          -
                        </a>
                        <input type="text" readOnly value={item.quantity} name="qtybutton" className="plus-minus-box" />
                        <a
                          className="inc qtybutton"
                          onClick={(e) => increaseQty(item.product, item.color, item.size, item.quantity)}
                        >
                          +
                        </a>
                      </div>
                    </form>
                  </td>
                  <td>
                    <strong className="text-primary">
                      {(item.product.isSale
                        ? item.product.salePrice * item.quantity
                        : item.product.price * item.quantity
                      ).toLocaleString('vi-VN')}
                      ₫
                    </strong>
                  </td>
                  <td>
                    <i
                      className="mdi mdi-close"
                      title="Remove this product"
                      onClick={(e) => removeCartItemHandler(item.product._id, item.color._id, item.size._id)}
                    ></i>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Col>
    </Row>
  );
};

export default ItemList;
