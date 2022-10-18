import React, { Fragment } from 'react';
import Header from '../layouts/Header';
import BlogSection from '../components/BlogSection';
import CollectionSection from '../components/CollectionSection';
import SampleProducts from '../components/SampleProducts';
import SliderSection from '../components/SliderSection';
import Footer from '../layouts/Footer';
import Metadata from '~/layouts/Metadata';

const Home = () => {
  return (
    <Fragment>
      <Header />
      <Metadata title="Trang chủ" />
      <SliderSection />
      <CollectionSection />
      <SampleProducts />
      <BlogSection />
      <Footer />
    </Fragment>
  );
};

export default Home;
