import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { getUserCart, removeItemFromCart } from '~/redux/actions/cartActions';

const CartIcon = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { cartItems } = useSelector((state) => state.cart);

  const totalPrice = cartItems.reduce((acc, item) => {
    if (item.productItem.product.isSale) {
      return acc + item.productItem.product.salePrice * item.quantity;
    } else {
      return acc + item.productItem.product.price * item.quantity;
    }
  }, 0);

  const removeCartItemHandler = (productItemId) => {
    dispatch(removeItemFromCart(productItemId, user));
    toast.info('Đã xóa sản phẩm');
  };

  useEffect(() => {
    try {
      dispatch(getUserCart(user));
    } catch (error) {
      toast.error(error);
    }
  }, [dispatch, user]);

  return (
    <div>
      <div className="cart-itmes">
        <Link className="cart-itme-a" to="/cart">
          <i className="mdi mdi-cart"></i>
          {cartItems.length !== 0 ? cartItems.length : 0} SP : <strong>{totalPrice.toLocaleString('vi-VN')}₫</strong>
        </Link>
        <div className="cartdrop">
          {cartItems.length !== 0 ? (
            cartItems.map((item, index) => (
              <div className="sin-itme clearfix" key={index}>
                <i className="mdi mdi-close" onClick={() => removeCartItemHandler(item.productItem._id)}></i>
                <Link className="cart-img" to={`/product/${item.productItem.product.slug}`}>
                  <img src={item.productItem.product.images[0] ? item.productItem.product.images[0].url : ''} alt="" />
                </Link>
                <div className="menu-cart-text">
                  <Link to={`/product/${item.productItem.product.slug}`}>
                    <h6>{item.productItem.product.name}</h6>
                  </Link>
                  <span>Màu : {item.productItem.color.name}</span>
                  <span>Kích cỡ : {item.productItem.size.name}</span>
                  <span>Số lượng : {item.quantity}</span>
                  <strong>
                    {(
                      (item.productItem.product.isSale
                        ? item.productItem.product.salePrice
                        : item.productItem.product.price) * item.quantity
                    ).toLocaleString('vi-VN')}
                    ₫
                  </strong>
                </div>
              </div>
            ))
          ) : (
            <h5>Giỏ hàng trống</h5>
          )}
          <div className="total">
            <span>
              Tổng cộng <span className="text-danger">{totalPrice.toLocaleString('vi-VN')}₫</span>
            </span>
          </div>
          <Link className="goto" to="/cart">
            Vào giỏ hàng
          </Link>
          <Link className="out-menu" to="/checkout">
            Thanh toán
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CartIcon;
