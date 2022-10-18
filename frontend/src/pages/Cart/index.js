import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import CartInfo from '../../components/CartInfo';
import Footer from '../../layouts/Footer';
import Header from '../../layouts/Header';
import PageTitle from '../../layouts/PageTitle';

const Cart = () => {
  return (
    <Fragment>
      <Header />
      <PageTitle title={'Giỏ hàng'} />
      <section className="pages cart-page section-padding">
        <div className="container">
          <CartInfo />
        </div>
      </section>
      <Footer />
    </Fragment>
  );
};

export default Cart;
