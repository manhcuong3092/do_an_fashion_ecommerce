import './App.css';
import { Fragment } from 'react';
import Header from './components/Header/Header';
import SliderSection from './components/SliderSection';
import CollectionSection from './components/CollectionSection';
import SampleProducts from './components/SampleProducts';
import BlogSection from './components/BlogSection';
import Footer from './components/Footer';

function App() {
  return (
    <Fragment>
      <Header />
      <SliderSection />
      <CollectionSection />
      <SampleProducts />
      <BlogSection />
      <Footer />
    </Fragment>
  );
}

export default App;
