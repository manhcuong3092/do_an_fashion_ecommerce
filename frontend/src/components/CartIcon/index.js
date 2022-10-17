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
    if (item.product.isSale) {
      return acc + item.product.salePrice * item.quantity;
    } else {
      return acc + item.product.price * item.quantity;
    }
  }, 0);

  const removeCartItemHandler = (productId, colorId, sizeId) => {
    dispatch(removeItemFromCart(productId, colorId, sizeId, user));
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
        <a className="cart-itme-a" href="cart.html">
          <i className="mdi mdi-cart"></i>
          {cartItems.length !== 0 ? cartItems.length : 0} SP : <strong>{totalPrice.toLocaleString('vi-VN')}₫</strong>
        </a>
        <div className="cartdrop">
          {cartItems.map((item, index) => (
            <div className="sin-itme clearfix" key={index}>
              <i
                className="mdi mdi-close"
                onClick={() => removeCartItemHandler(item.product._id, item.color._id, item.size._id)}
              ></i>
              <Link className="cart-img" to={`/product/${item.product.slug}`}>
                <img src={item.product.images[0] ? item.product.images[0].url : ''} alt="" />
              </Link>
              <div className="menu-cart-text">
                <a>
                  <h6>{item.product.name}</h6>
                </a>
                <span>Màu : {item.color.name}</span>
                <span>Kích cỡ : {item.size.name}</span>
                <span>Số lượng : {item.quantity}</span>
                <strong>
                  {(item.product.isSale ? item.product.salePrice : item.product.price).toLocaleString('vi-VN')}₫
                </strong>
              </div>
            </div>
          ))}
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
