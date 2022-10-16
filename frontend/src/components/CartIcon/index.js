import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { getUserCart, removeItemFromCart } from '~/redux/actions/cartActions';

const CartIcon = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { cartItems } = useSelector((state) => state.cart);

  const totalPrice = cartItems.reduce((acc, item) => {
    if (item.isSale) {
      return acc + item.product.salePrice;
    } else {
      return acc + item.product.price;
    }
  }, 0);

  const removeCartItemHandler = (id) => {
    dispatch(removeItemFromCart(id));
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
          {cartItems.length !== 0 ? cartItems.length : 0} Sản phẩm :{' '}
          <strong>{totalPrice.toLocaleString('vi-VN')}₫</strong>
        </a>
        <div className="cartdrop">
          {cartItems.map((item) => (
            <div className="sin-itme clearfix">
              <i
                className="mdi mdi-close"
                onClick={() => removeCartItemHandler(item.product._id, item.color._id, item.size._id)}
              ></i>
              <a className="cart-img" href="cart.html">
                <img src={item.product.images[0] ? item.product.images[0].url : ''} alt="" />
              </a>
              <div className="menu-cart-text">
                <a>
                  <h6>{item.product.name}</h6>
                </a>
                <span>Màu : {item.color.name}</span>
                <span>Size : {item.size.name}</span>
                <strong>
                  {(item.product.isSale ? item.product.salePrice : item.product.price).toLocaleString('vi-VN')}₫
                </strong>
              </div>
            </div>
          ))}
          <div className="total">
            <span>
              total <strong>= $306.00</strong>
            </span>
          </div>
          <a className="goto" href="cart.html">
            go to cart
          </a>
          <a className="out-menu" href="checkout.html">
            Check out
          </a>
        </div>
      </div>
    </div>
  );
};

export default CartIcon;
