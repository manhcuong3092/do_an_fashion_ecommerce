import React, { Fragment } from 'react';
import Footer from '../../layouts/Footer';
import Header from '../../layouts/Header';
import PageTitle from '../../layouts/PageTitle';
import errorImg from '~/assets/img/error-404-monochrome.svg'
import { Link } from 'react-router-dom';

const PageNotFound = () => {
  return (
    <Fragment>
      <Header />
      <PageTitle title={'Không tìm thấy trang'} />
      <div className='text-center m-5'>
        <img src={errorImg} style={{ width: '500px' }} alt='' />
      </div>
      <div className='text-center m-5'>
        <Link to={'/'}>→ Về trang chủ</Link>
      </div>
      <Footer />
    </Fragment>
  );
};

export default PageNotFound;