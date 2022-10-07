import React from 'react'

const CartIcon = () => {
  return (
    <div>
      <div className="cart-itmes">
        <a className="cart-itme-a" href="cart.html">
          <i className="mdi mdi-cart"></i>
          02 items :  <strong>$86.00</strong>
        </a>
        <div className="cartdrop">
          <div className="sin-itme clearfix">
            <i className="mdi mdi-close"></i>
            <a className="cart-img" href="cart.html"><img src="img/cart/1.png" alt="" /></a>
            <div className="menu-cart-text">
              <a href="#"><h5>men’s black t-shirt</h5></a>
              <span>Color :  Black</span>
              <span>Size :     SL</span>
              <strong>$122.00</strong>
            </div>
          </div>
          <div className="sin-itme clearfix">
            <i className="mdi mdi-close"></i>
            <a className="cart-img" href="cart.html"><img src="img/cart/2.png" alt="" /></a>
            <div className="menu-cart-text">
              <a href="#"><h5>men’s black t-shirt</h5></a>
              <span>Color :  Black</span>
              <span>Size :     SL</span>
              <strong>$132.00</strong>
            </div>
          </div>
          <div className="total">
            <span>total <strong>= $306.00</strong></span>
          </div>
          <a className="goto" href="cart.html">go to cart</a>
          <a className="out-menu" href="checkout.html">Check out</a>
        </div>
      </div>
    </div>
  )
}

export default CartIcon