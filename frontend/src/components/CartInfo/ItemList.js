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

  const removeCartItemHandler = (productItemId) => {
    dispatch(removeItemFromCart(productItemId, user));
    toast.info('Đã xóa sản phẩm');
  };

  const increaseQty = (productItem, quantity) => {
    const newQty = quantity + 1;
    if (newQty > productItem.stock) {
      toast.info('Trong kho chỉ có ' + quantity + ' sản phẩm.');
      return;
    }
    dispatch(updateItemInCart(productItem, newQty, user));
  };

  const decreaseQty = (productItem, quantity) => {
    const newQty = quantity - 1;
    if (newQty <= 0) {
      toast.info('Tối thiểu có 1 sản phẩm.');
      return;
    }
    dispatch(updateItemInCart(productItem, newQty, user));
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
                    <Link to={`/product/${item.productItem.product.slug}`}>
                      <img
                        src={item.productItem.product.images[0] ? item.productItem.product.images[0].url : ''}
                        alt="Add Product"
                      />
                    </Link>
                    <div className="items-dsc">
                      <h5>
                        <Link to={`/product/${item.productItem.product.slug}`}>{item.productItem.product.name}</Link>
                      </h5>
                      <p className="itemcolor">
                        Màu: <span>{item.productItem.color.name}</span>
                      </p>
                      <p className="itemcolor">
                        Kích cỡ: <span>{item.productItem.size.name}</span>
                      </p>
                      <p className="itemcolor">
                        SKU: <span>{item.productItem.sku}</span>
                      </p>
                    </div>
                  </td>
                  <td>
                    {(item.productItem.product.isSale
                      ? item.productItem.product.salePrice
                      : item.productItem.product.price
                    ).toLocaleString('vi-VN')}
                    ₫
                  </td>
                  <td>
                    <form action="#">
                      <div className="plus-minus">
                        <Link className="dec qtybutton" onClick={(e) => decreaseQty(item.productItem, item.quantity)}>
                          -
                        </Link>
                        <input type="text" readOnly value={item.quantity} name="qtybutton" className="plus-minus-box" />
                        <Link className="inc qtybutton" onClick={(e) => increaseQty(item.productItem, item.quantity)}>
                          +
                        </Link>
                      </div>
                    </form>
                  </td>
                  <td>
                    <strong className="text-primary">
                      {(item.productItem.product.isSale
                        ? item.productItem.product.salePrice * item.quantity
                        : item.productItem.product.price * item.quantity
                      ).toLocaleString('vi-VN')}
                      ₫
                    </strong>
                  </td>
                  <td>
                    <i
                      className="mdi mdi-close"
                      title="Remove this product"
                      onClick={(e) => removeCartItemHandler(item.productItem._id)}
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
